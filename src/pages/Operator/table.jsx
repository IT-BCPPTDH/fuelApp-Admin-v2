import React, { useEffect, useState } from "react";
import {
  EuiBasicTable,
  EuiFieldSearch,
  EuiText,
  EuiButton,
} from "@elastic/eui";
import { useNavigate } from "react-router-dom";
import operatorService from "../../services/operatorService";
import ModalAddOperator from "../../components/ModalForm/ModalAddOperator";
import ModalEditOperator from "../../components/ModalForm/EditOperator";
import ModalBulkOperator from "../../components/ModalForm/ModalBulkOperator";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const TableData = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);
  const [operator, setOperator] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const columns = [
    {
      field: "JDE",
      name: "JDE",
      truncateText: true,
    },
    {
      field: "fullname",
      name: "Fullname",
      truncateText: true,
    },
    {
      field: "position",
      name: "Position",
      truncateText: true,
    },
    {
      field: "division",
      name: "Divisi",
      truncateText: true,
    },
    {
      field: "action",
      name: "Action",
      render: (e, row) => <ModalEditOperator row={row} />,
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

  const filteredItems = operator.filter(
    (item) =>
      String(item.JDE).toLowerCase().includes(searchValue.toLowerCase()) ||
      String(item.fullname).toLowerCase().includes(searchValue.toLowerCase()) ||
      item.position.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.division.toLowerCase().includes(searchValue.toLowerCase())
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
    if (!operator || operator.length === 0) {
      alert("Tidak ada data untuk diunduh!");
      return;
    }

    const exportData = operator.map((item, index) => ({
      JDE: item.JDE || "",
      fullname: item.fullname || "",
      position: item.position || "",
      division: item.division || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet([], { skipHeader: true });

    XLSX.utils.sheet_add_aoa(worksheet, [["DAFTAR OPERATOR"]], {
      origin: "A1",
    });

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["JDE", "fullname", "position", "division"]],
      { origin: "A3" }
    );

    XLSX.utils.sheet_add_json(worksheet, exportData, {
      skipHeader: true,
      origin: "A4",
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Operator List");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `Operator_List_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  useEffect(() => {
    const fetchOperator = async () => {
      try {
        const res = await operatorService.getAllOperator();
        if (res.status != 200) {
          throw new Error("Network response was not ok");
        } else if (res.status == 404) {
          setOperator([]);
        } else {
          setOperator(res.data);
        }
      } catch (error) {
        console.log(error);
        // setError(error);
      }
    };
    fetchOperator();
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
        <ModalAddOperator />
        <ModalBulkOperator />
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
