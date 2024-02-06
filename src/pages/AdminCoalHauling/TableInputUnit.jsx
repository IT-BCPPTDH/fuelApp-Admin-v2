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
    columnId: "nounit",
    renderHeaderCell: () => <>No Unit</>,
  }),
  createTableColumn({
    columnId: "model",
    renderHeaderCell: () => <>Model</>,
  }),
  createTableColumn({
    columnId: "tonnage",
    renderHeaderCell: () => <>Tonnage</>,
  }),
  createTableColumn({
    columnId: "action",
    renderHeaderCell: () => <>Action</>,
  }),
];

const items = [
  {
    id: { label: 1 },
    nounit: { label: "11528" },
    model: { label: "Exavator" },
    tonnage: {
      label: "1189",
    },
  },
  {
    id: { label: 2 },
    nounit: { label: "11528" },
    model: { label: "Exavator" },
    tonnage: {
      label: "1189",
    },
  },
 
];

const TableInputUnit = () => {
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
    model: {
      idealWidth: 400,
      minWidth: 150,
    },
    tonnage: {
      idealWidth: 500,
      minWidth: 150,
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
      <div className="form-wrapper wrapper" style={{ marginTop: "27px"}}>
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
                    {...columnSizing_unstable.getTableCellProps("nounit")}
                  >
                    <TableCellLayout>{item.nounit.label}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("model")}
                  >
                    <TableCellLayout truncate>
                      {item.model.label}
                    </TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("model")}
                  >
                    <TableCellLayout truncate>
                      {item.tonnage.label}
                    </TableCellLayout>
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
                              <Button appearance="secondary">
                                Hapus
                              </Button>
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

export default TableInputUnit;
