import React, { useEffect, useState } from "react";
import {
  EuiBasicTable,
  EuiButton,
  EuiFieldSearch,
  EuiText,
  EuiLink,
  EuiButtonIcon,
} from "@elastic/eui";
import { Data } from "./data"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";
import ModalForm from "../../components/ModalForm";
import ModalFormElipse from "../../components/ModalForm/ModalAddElipse";
import ModalFormEditElipse from "../../components/ModalForm/EditFormElipse";
import masterElipseService from "../../services/masterElipse";
import ModalBulkElipse from "../../components/ModalForm/ModalBulkElipse";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const TableData = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);
  const [elipses, setElipses] = useState([]);

  const columns = [
    {
      field: "id",
      name: "No",
      truncateText: true,
    },
    {
      field: "equip_no_unit",
      name: "No Unit",
      truncateText: true,
    },
    {
      field: "equip_no_show",
      name: "No show",
      truncateText: true,
    },
    {
      field: "equip_model_egi",
      name: "Model",
      truncateText: true,
    },
    {
      field: "equip_description",
      name: "Deskirpsi",
      truncateText: true,
    },
    {
      field: "equip_category",
      name: "Kategori",
      truncateText: true,
    },
    {
      field: "equip_cap_tank",
      name: "Kapasitas Tank",
      truncateText: true,
    },
    {
      field: "equip_fbr",
      name: "FBR",
      truncateText: true,
    },
    {
      field: "equip_position",
      name: "Posisi",
      truncateText: true,
    },
    {
      field: "equip_owner_protes",
      name: "Protes",
      truncateText: true,
    },
    {
      field: "equip_owner_elipse",
      name: "Elipse",
      truncateText: true,
    },
    {
      field: "keterangan",
      name: "Keterangan",
      truncateText: true,
    },
    {
      field: "action",
      name: "Action",
      render: (e, row) => (
        <>
          <ModalFormEditElipse row={row} />
        </>
      ),
      truncateText: true,
    },
  ];

  const getRowProps = (item) => ({
    "data-test-subj": `row-${item.station}`,
    className: "customRowClass",
    onClick: () => handleRowClick(item),
  });

  const getCellProps = (item, column) => ({
    className: "customCellClass",
    "data-test-subj": `cell-${item.station}-${String(column.field)}`,
    textOnly: true,
  });

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const filteredItems = elipses.filter((item) =>
    item.equip_no_unit.toLowerCase().includes(searchValue.toLowerCase())
  );

  const findPageItems = (items, pageIndex, pageSize) => {
    const startIndex = pageIndex * pageSize;
    return {
      pageOfItems: items.slice(startIndex, startIndex + pageSize),
      totalItemCount: items.length,
    };
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
    if (!elipses || elipses.length === 0) {
      alert("Tidak ada data untuk diunduh!");
      return;
    }

    const exportData = elipses.map((item, index) => ({
      "Unit No": item.equip_no_unit || "",
      "No Show": item.equip_no_show || "",
      "Type / Model": item.equip_model_egi || "",
      Description: item.equip_description || "",
      Category: item.equip_category || "",
      Capacity: item.equip_cap_tank || "",
      FBR: item.equip_fbr || "",
      Potition: item.equip_position || "",
      "Owner Protes": item.equip_owner_protes || "",
      "Owner Ellipse": item.equip_owner_protes || "",
      Remark: item.keterangan || "",
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
          "No Show",
          "Type / Model",
          "Description",
          "Category",
          "Capacity",
          "FBR",
          "Potition",
          "Owner Protes",
          "Owner Ellipse",
          "Remark",
        ],
      ],
      { origin: "A3" }
    );

    XLSX.utils.sheet_add_json(worksheet, exportData, {
      skipHeader: true,
      origin: "A4",
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ellipse List");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `Eliipse_List_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  useEffect(() => {
    const fetchElipse = async () => {
      try {
        const res = await masterElipseService.getElipses();
        if (res.status != 200) {
          throw new Error("Network response was not ok");
        } else if (res.status == 404) {
          setElipses([]);
        } else {
          setElipses(res.data);
        }
      } catch (error) {
        console.log(error);
        // setError(error);
      }
    };
    fetchElipse();
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
          style={{ marginRight: "10px" }}
        />
        <EuiButton
          style={{ background: "#087720ff", color: "white" }}
          onClick={handleDownloadCustom}
        >
          Download Master
        </EuiButton>
        <ModalFormElipse />
        <ModalBulkElipse />
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
