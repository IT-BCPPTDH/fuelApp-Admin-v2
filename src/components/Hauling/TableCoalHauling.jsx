import { SearchBox } from "@fluentui/react-search-preview";

import {
  ArrowDownload24Regular,
} from "@fluentui/react-icons";
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
    shift: { label: "Day" },
    total: { label: 177 },
  },
];

const columns = [
  { columnKey: "tanggal", label: "Tanggal" },
  { columnKey: "author", label: "Author" },
  { columnKey: "shift", label: "Shift" },
  { columnKey: "total", label: "Total Hauling" },
];

const TableCoalHauling = () => {
  return (
    <>
      <div className="form-wrapper">
        <div className="search-box">
          <Button
            icon={<ArrowDownload24Regular />}
            iconPosition="after"
            style={{ backgroundColor: "#28499c", color: "#ffffff" }}>
            Download
          </Button>
          <SearchBox placeholder="Search" />
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
                  <TableCellLayout>{item.shift.label}</TableCellLayout>
                </TableCell>
                <TableCell>
                  <TableCellLayout>{item.total.label}</TableCellLayout>
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
