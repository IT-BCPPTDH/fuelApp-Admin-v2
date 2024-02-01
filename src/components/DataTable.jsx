import { useState } from "react";
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
  Input,
  useId,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";

import {
  DocumentPdfRegular,
  DocumentRegular,
  EditRegular,
  FolderRegular,
  OpenRegular,
  PeopleRegular,
  VideoRegular,
} from "@fluentui/react-icons";

const columnsDef = [
  createTableColumn({
    columnId: "file",
    renderHeaderCell: () => <>File</>,
  }),
  createTableColumn({
    columnId: "author",
    renderHeaderCell: () => <>Author</>,
  }),
  createTableColumn({
    columnId: "lastUpdated",
    renderHeaderCell: () => <>Last updated</>,
  }),
  createTableColumn({
    columnId: "lastUpdate",
    renderHeaderCell: () => <>Last update</>,
  }),
];

const ResizableColumnsUncontrolled = () => {
  const [columns] = useState(columnsDef);
  const [columnSizingOptions] = useState({
    file: {
      idealWidth: 300,
      minWidth: 150,
    },
    author: {
      minWidth: 110,
      defaultWidth: 250,
    },
    lastUpdate: {
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

  const [inputValue, setInputValue] = useState("300");

  const onWidthChange = (e) => {
    setInputValue(e.target.value);
    const numeric = parseInt(e.target.value, 10);
    if (!Number.isNaN(numeric)) {
      columnSizing_unstable.setColumnWidth("file", numeric);
    }
  };

  const rows = getRows();
  const inputId = useId("column-width");

  return (
    <>
      <p>
        <label htmlFor={inputId}>First column width: </label>
        <Input
          type="number"
          id={inputId}
          onChange={onWidthChange}
          value={inputValue ? inputValue.toString() : ""}
        />
      </p>
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
              <TableRow key={item.file.label}>
                <TableCell {...columnSizing_unstable.getTableCellProps("file")}>
                  <TableCellLayout truncate media={item.file.icon}>
                    {item.file.label}
                  </TableCellLayout>
                </TableCell>
                <TableCell
                  {...columnSizing_unstable.getTableCellProps("author")}
                >
                  <TableCellLayout
                    truncate
                  >
                    {item.author.label}
                  </TableCellLayout>
                </TableCell>
                <TableCell
                  {...columnSizing_unstable.getTableCellProps("lastUpdated")}
                >
                  <TableCellLayout truncate>
                    {item.lastUpdated.label}
                  </TableCellLayout>
                </TableCell>
                <TableCell
                  {...columnSizing_unstable.getTableCellProps("lastUpdate")}
                >
                  <TableCellLayout truncate media={item.lastUpdate.icon}>
                    {item.lastUpdate.label}
                  </TableCellLayout>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ResizableColumnsUncontrolled;
