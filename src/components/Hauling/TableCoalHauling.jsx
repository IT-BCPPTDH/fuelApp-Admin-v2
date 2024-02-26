import React, { useMemo } from "react";
import { SearchBox } from "@fluentui/react-search-preview";
import FormComponent from "../FormComponent";
import { Link } from "react-router-dom";
import { ArrowSquareUpRight24Regular } from "@fluentui/react-icons";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Button,
  Avatar,
} from "@fluentui/react-components";

const items = [
  {
    tanggal: { label: "12/01/2024" },
    author: { label: "Rahmansyah Kurniawan" },
    total: { label: 177 },
  },
  {
    tanggal: { label: "13/01/2024" },
    author: { label: "Walyadin" },
    total: { label: 478 },
  },
];

const columns = [
  { columnKey: "tanggal", label: "Tanggal" },
  { columnKey: "author", label: "Author" },
  { columnKey: "total", label: "Total Hauling" },
  { columnKey: "action", label: "Action" },
];

const TableCoalHauling = () => {
  const selectTgl = useMemo(() => [
    {
      name: "tanggal",
      grid: "col-12",
      value: "",
      readOnly: false,
      disabled: false,
      type: "DatePicker",
    },
  ]);


  return (
    <>
      <div className="form-wrapper">
        <div className="search-box">
          {/* <Button
            icon={<ArrowDownload24Regular />}
            iconPosition="after"
            style={{ backgroundColor: "#28499c", color: "#ffffff" }}>
            Download
          </Button>
          <SearchBox placeholder="Search" /> */}
          <FormComponent components={selectTgl} />
        </div>
        <Table aria-label="Default table">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHeaderCell key={column.columnKey}>
                  {column.label}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.tanggal.label}>
                <TableCell>
                  <TableCellLayout media={item.tanggal.icon}>
                    {item.tanggal.label}
                  </TableCellLayout>
                </TableCell>
                <TableCell>
                  <TableCellLayout
                    media={
                      <Avatar
                        aria-label={item.author.label}
                        name={item.author.label}
                        badge={{
                          status: item.author.status,
                        }}
                      />
                    }>
                    {item.author.label}
                  </TableCellLayout>
                </TableCell>
                <TableCell>
                  <TableCellLayout>{item.total.label}</TableCellLayout>
                </TableCell>
                <TableCell>
                  <Link to="/coalhauling-dataentry/detail/">
                    <Button
                      icon={<ArrowSquareUpRight24Regular />}
                      iconPosition="after">
                      Detail
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TableCoalHauling;
