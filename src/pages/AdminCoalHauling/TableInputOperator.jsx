import React, { useState } from "react";
import { SearchBox } from "@fluentui/react-search-preview";
import {
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  createTableColumn,
  useTableColumnSizing_unstable,
  useTableFeatures,
  Avatar,
  Input,
  useId,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Button,
  Field,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from "@fluentui/react-components";
import {
  EditRegular,
  DeleteRegular,
  ArrowDownload24Regular,
} from "@fluentui/react-icons";

const columnsDef = [
  createTableColumn({
    columnId: "id",
    renderHeaderCell: () => <>Id</>,
  }),
  createTableColumn({
    columnId: "nojde",
    renderHeaderCell: () => <>No JDE</>,
  }),
  createTableColumn({
    columnId: "namaoperator",
    renderHeaderCell: () => <>Nama Operator</>,
  }),
];

const items = [
  {
    id: { label: 1 },
    nojde: { label: "YWT144" },
    namaoperator: { label: "Rahmansyah" },
  },
  {
    id: { label: 2 },
    nojde: { label: "YWT168" },
    namaoperator: { label: "Adin" },
  },
];

const TableInputOperator = () => {
  const [columns] = useState(columnsDef);
  const [columnSizingOptions] = useState({
    id: {
      idealWidth: 40,
      minWidth: 50,
    },
    // nounit: {
    //   minWidth: 60,
    //   defaultWidth: 80,
    // },
    namaoperator: {
      idealWidth: 100,
      minWidth: 20,
    },
  });

  const { getRows, columnSizing_unstable, tableRef } = useTableFeatures(
    {
      columns,
      items,
    },
    [useTableColumnSizing_unstable({ columnSizingOptions })]
  );

  // const [inputValue, setInputValue] = useState("300");

  const rows = getRows();

  const inputId = useId("column-width");

  return (
    <>
      <div className="form-wrapper wrapper" style={{ marginTop: "27px" }}>
        <div className="search-box">
          <Button icon={<ArrowDownload24Regular />}>Download</Button>
          <SearchBox placeholder="Search" />
        </div>
        <div style={{ overflowX: "auto" }}>
          <Table
            sortable
            aria-label="Table with sort"
            ref={tableRef}
            {...columnSizing_unstable.getTableProps()}
          >
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <Menu openOnContext key={column.columnId}>
                    <MenuTrigger>
                      <TableHeaderCell
                        key={column.columnId}
                        {...columnSizing_unstable.getTableHeaderCellProps(
                          column.columnId
                        )}
                      >
                        {column.renderHeaderCell()}
                      </TableHeaderCell>
                    </MenuTrigger>
                    <MenuPopover>
                      <MenuList>
                        <MenuItem
                          onClick={columnSizing_unstable.enableKeyboardMode(
                            column.columnId
                          )}
                        >
                          Keyboard Column Resizing
                        </MenuItem>
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(({ item }) => (
                <TableRow key={item.id.label}>
                  <TableCell {...columnSizing_unstable.getTableCellProps("id")}>
                    <TableCellLayout>{item.id.label}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("nama")}
                  >
                    <TableCellLayout truncate>
                      {item.namaoperator.label}
                    </TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("nojde")}
                  >
                    <TableCellLayout>{item.nojde.label}</TableCellLayout>
                  </TableCell>

                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("action")}
                  >
                    <TableCellLayout>
                      <Button
                        icon={<EditRegular />}
                        aria-label="Edit"
                        onClick={(e) => handleEdit(e)}
                      />
                      {/* <Button icon={<DeleteRegular />} aria-label="Delete" /> */}
                      <Dialog modalType="alert">
                        <DialogTrigger disableButtonEnhancement>
                          <Button
                            icon={<DeleteRegular />}
                            aria-label="Delete"
                          />
                        </DialogTrigger>
                        <DialogSurface>
                          <DialogBody>
                            <DialogTitle>Hapus Data Ini?</DialogTitle>
                            <DialogContent>
                              Data ini akan di hapus dan tidak dapat di pulihkan
                            </DialogContent>
                            <DialogActions>
                              <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Batalkan</Button>
                              </DialogTrigger>
                              <Button appearance="secondary">Hapus</Button>
                            </DialogActions>
                          </DialogBody>
                        </DialogSurface>
                      </Dialog>
                    </TableCellLayout>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default TableInputOperator;
