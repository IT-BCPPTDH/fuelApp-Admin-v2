import React, { useEffect, useState } from "react";
import {
  EuiBasicTable,
  EuiFieldSearch,
  EuiText,
  EuiButton,
} from "@elastic/eui";
import { useNavigate } from "react-router-dom";
import ModalAddEquip from "../../components/ModalForm/ModalAddEquip";
import ModalEditEquipment from "../../components/ModalForm/EditEquipment";
import EquipService from "../../services/EquiptmentService";
import ModalBulkUnit from "../../components/ModalForm/ModalBulkUnit";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const TableData = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);
  const [banlaws, setBanlaws] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const columns = [
    {
      name: "No",
      render: (row) => <span>{row.pageIndex + 1}</span>,
      truncateText: true,
    },
    {
      field: "unit_no",
      name: "No Unit",
      truncateText: true,
    },
    {
      field: "brand",
      name: "Description",
      truncateText: true,
    },
    {
      field: "type",
      name: "Unit Type",
      truncateText: true,
    },
    {
      field: "tank_cap",
      name: "Tank Capacity/L",
      truncateText: true,
    },
    {
      field: "category",
      name: "Unit Group Id",
      truncateText: true,
    },
    {
      field: "usage",
      name: "Usage",
      truncateText: true,
    },
    {
      field: "site",
      name: "Site",
      truncateText: true,
    },
    {
      field: "owner",
      name: "Owner",
      truncateText: true,
    },
    {
      field: "action",
      name: "Action",
      render: (e, row) => <ModalEditEquipment row={row} />,
      truncateText: true,
    },
  ];

  const getRowProps = (item) => ({
    "data-test-subj": `row-${item.station}`,
    className: "customRowClass",
  });

  const getCellProps = (item, column) => ({
    className: "customCellClass",
    "data-test-subj": `cell-${item.station}-${String(column.field)}`,
    textOnly: true,
  });

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const filteredItems = banlaws.filter(
    (item) =>
      String(item.unit_no).toLowerCase().includes(searchValue.toLowerCase()) ||
      String(item.type).toLowerCase().includes(searchValue.toLowerCase()) ||
      item.category.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.site.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchValue.toLowerCase())
  );

  const findPageItems = (items, pageIndex, pageSize) => {
    const startIndex = pageIndex * pageSize;
    const pageOfItems = items
      .slice(startIndex, startIndex + pageSize)
      .map((item, index) => ({ ...item, pageIndex: startIndex + index }));
    return { pageOfItems, totalItemCount: items.length };
  };

  const { pageOfItems, totalItemCount } = findPageItems(
    filteredItems,
    pageIndex,
    pageSize
  );

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [10, 20, 50, 100],
    showPerPageOptions,
  };

  const resultsCount =
    pageSize === 0 ? (
      <strong>All</strong>
    ) : (
      <>
        <strong>
          {pageSize * pageIndex + 1}-
          {Math.min(pageSize * (pageIndex + 1), totalItemCount)}
        </strong>{" "}
        of {totalItemCount}
      </>
    );

  const handleDownloadCustom = () => {
    if (!banlaws || banlaws.length === 0) {
      alert("Tidak ada data untuk diunduh!");
      return;
    }

    const exportData = banlaws.map((item, index) => ({
      "Unit No": item.unit_no || "",
      "Type / Model": item.type || "",
      Description: item.brand || "",
      Category: item.category || "",
      Owner: item.owner || "",
      Usage: item.usage || "",
      Site: item.site || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet([], { skipHeader: true });

    XLSX.utils.sheet_add_aoa(worksheet, [["DAFTAR UNIT EQUIPMENT"]], {
      origin: "A1",
    });

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "Unit No",
          "Type / Model",
          "Description",
          "Category",
          "Owner",
          "Usage",
          "Site",
        ],
      ],
      { origin: "A3" }
    );

    XLSX.utils.sheet_add_json(worksheet, exportData, {
      skipHeader: true,
      origin: "A4",
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Equipment List");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(
      blob,
      `Equipment_List_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  };

  useEffect(() => {
    const fetchBanlaws = async () => {
      try {
        const res = await EquipService.getEquip();
        if (res.status != 200) {
          throw new Error("Network response was not ok");
        } else if (res.status == 404) {
          setBanlaws([]);
        } else {
          setBanlaws(res.data);
        }
      } catch (error) {
        console.log(error);
        // setError(error);
      }
    };
    fetchBanlaws();
  }, []);

  return (
    <>
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <EuiFieldSearch
          placeholder="Search data"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          aria-label="Search data"
        />

        <EuiButton
          style={{ background: "#087720ff", color: "white" }}
          onClick={handleDownloadCustom}
        >
          Download Master
        </EuiButton>
        <ModalAddEquip />
        <ModalBulkUnit />
      </div>

      <EuiText size="xs">
        Showing {resultsCount} <strong>Data</strong>
      </EuiText>

      <EuiBasicTable
        style={{ marginTop: "20px" }}
        tableCaption="Demo of EuiBasicTable"
        items={pageOfItems}
        columns={columns}
        rowProps={getRowProps}
        cellProps={getCellProps}
        pagination={pagination}
        onChange={({ page }) => {
          if (page) {
            setPageIndex(page.index);
            setPageSize(page.size);
          }
        }}
      />
    </>
  );
};

export default TableData;
