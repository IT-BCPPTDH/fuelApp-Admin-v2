// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableCellLayout,
//   TableColumnDefinition,
//   TableHeader,
//   TableHeaderCell,
//   TableRow,
//   useTableColumnSizing_unstable,
//   useTableFeatures,
// } from "@fluentui/react-components";

// const columns = [
//   { columnKey: "id", label: "ID" },
//   { columnKey: "tanggal", label: "Tanggal" },
//   { columnKey: "shift", label: "Shift" },
//   { columnKey: "unit", label: "Unit" },
//   { columnKey: "operator", label: "Operator" },
//   { columnKey: "tonnace", label: "Tonnace" },
//   { columnKey: "loader", label: "Loader" },
//   { columnKey: "pit", label: "Pit" },
//   { columnKey: "inrom", label: "In Rom" },
//   { columnKey: "outrom", label: "On Rom" },
//   { columnKey: "seam", label: "Seam" },
//   { columnKey: "dumpingpoint", label: "Dumping Point" },
// ];

// const items = [
//   {
//     id: 1,
//     tanggal: "18/01/2024",
//     shift: "Day",
//     unit: "HMP7322",
//     operator: "Rahmansyah Kurniawan",
//     tonnace: 169,
//     loader: "EXA4025",
//     pit: "A",
//     inrom: "16:26",
//     outrom: "17:26",
//     seam: "A",
//     dumpingpoint: 1,

//   },
//   {
//     id: 2,
//     tanggal: "18/01/2024",
//     shift: "Day",
//     unit: "HMP7322",
//     operator: "M. Fadel Agustin",
//     tonnace: 169,
//     loader: "EXA4025",
//     pit: "A",
//     inrom: "16:26",
//     outrom: "17:26",
//     seam: "A",
//     dumpingpoint: 1,

//   },
// ];

// const TableHauling = () => {
//   const [columns] = (columns);
//   const [columnSizingOptions] = {
//     id: {
//       idealWidth: 300,
//       minWidth: 150,
//     },
//     tanggal: {
//       minWidth: 110,
//       defaultWidth: 250,
//     },
//     unit: {
//       minWidth: 150,
//     },
//   };

//   const { getRows, columnSizing_unstable, tableRef } = useTableFeatures(
//     {
//       columns,
//       items,
//     },
//     [useTableColumnSizing_unstable({ columnSizingOptions })]
//   );

//   return (
//     <div style={{ overflowX: "auto" }}>
//       <Table sortable aria-label="Default table">
//         <TableHeader>
//           <TableRow>
//             {columns.map((column) => (
//               <TableHeaderCell key={column.columnKey}>
//                 {column.label}
//               </TableHeaderCell>
//             ))}
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {items.map((item) => (
//             <TableRow key={item.id}>
//               {columns.map((column) => (
//                 <TableCell key={column.columnKey}>
//                   <TableCellLayout>{item[column.columnKey]}</TableCellLayout>
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default TableHauling;

import React, { useState, ChangeEvent } from "react";
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
} from "@fluentui/react-components";
import {
  DocumentPdfRegular,
  DocumentRegular,
  EditRegular,
  FolderRegular,
  OpenRegular,
  PeopleRegular,
  VideoRegular,
  DeleteRegular,
} from "@fluentui/react-icons";

const columnsDef = [
  createTableColumn({
    columnId: "id",
    renderHeaderCell: () => <>Id</>,
  }),
  createTableColumn({
    columnId: "tanggal",
    renderHeaderCell: () => <>Tanggal</>,
  }),
  createTableColumn({
    columnId: "shift",
    renderHeaderCell: () => <>Shift</>,
  }),
  createTableColumn({
    columnId: "unit",
    renderHeaderCell: () => <>Unit</>,
  }),
  createTableColumn({
    columnId: "operator",
    renderHeaderCell: () => <>Operator</>,
  }),
  createTableColumn({
    columnId: "tonnace",
    renderHeaderCell: () => <>Tonnace</>,
  }),
  createTableColumn({
    columnId: "loader",
    renderHeaderCell: () => <>Loader</>,
  }),
  createTableColumn({
    columnId: "pit",
    renderHeaderCell: () => <>Pit</>,
  }),
  createTableColumn({
    columnId: "seam",
    renderHeaderCell: () => <>Seam</>,
  }),
  createTableColumn({
    columnId: "dumpingpoint",
    renderHeaderCell: () => <>Dumping Point</>,
  }),
  createTableColumn({
    columnId: "inrom",
    renderHeaderCell: () => <>In Rom</>,
  }),
  createTableColumn({
    columnId: "outrom",
    renderHeaderCell: () => <>Out Rom</>,
  }),
  createTableColumn({
    columnId: "action",
    renderHeaderCell: () => <>Action</>,
  }),
];

const items = [
  {
    id: { label: 1 },
    tanggal: { label: "18/1/2024" },
    shift: { label: "Day" },
    unit: {
      label: "HMP7322",
    },
    operator: {
      label: "Rahmansyah Kurniawan",
    },
    tonnace: {
      label: 126,
    },
    loader: {
      label: "EXA624",
    },
    pit: {
      label: "A",
    },
    seam: {
      label: "A",
    },
    dumpingpoint: {
      label: 1,
    },
    inrom: {
      label: "12.00",
    },
    outrom: {
      label: "13.00",
    },
    action: {
      label: "13.00",
    },
  },
  {
    id: { label: 1 },
    tanggal: { label: "18/1/2024" },
    shift: { label: "Day" },
    unit: {
      label: "HMP7322",
    },
    operator: {
      label: "Audra Diaz",
    },
    tonnace: {
      label: 126,
    },
    loader: {
      label: "EXA624",
    },
    pit: {
      label: "A",
    },
    seam: {
      label: "A",
    },
    dumpingpoint: {
      label: 1,
    },
    inrom: {
      label: "12.00",
    },
    outrom: {
      label: "13.00",
    },
    action: {
      label: "13.00",
    },
  },
];

const TableHauling = () => {
  const [columns] = useState(columnsDef);
  const [columnSizingOptions] = useState({
    id: {
      idealWidth: 40,
      minWidth: 50,
    },
    operator: {
      minWidth: 200,
      defaultWidth: 150,
    },
    shift: {
      idealWidth: 40,
      minWidth: 50,
    },
    pit: {
      idealWidth: 40,
      minWidth: 50,
    },
    dumpingpoint: {
      minWidth: 120,
      defaultWidth: 150,
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
      <p>
        <small>DataBase</small>
      </p>
      <div className="search-box">
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
                  {...columnSizing_unstable.getTableCellProps("tanggal")}
                >
                  <TableCellLayout>{item.tanggal.label}</TableCellLayout>
                </TableCell>
                <TableCell
                  {...columnSizing_unstable.getTableCellProps("shift")}
                >
                  <TableCellLayout truncate>{item.shift.label}</TableCellLayout>
                </TableCell>
                <TableCell {...columnSizing_unstable.getTableCellProps("unit")}>
                  <TableCellLayout>{item.unit.label}</TableCellLayout>
                </TableCell>
                <TableCell
                  {...columnSizing_unstable.getTableCellProps("operator")}
                >
                  <TableCellLayout>{item.operator.label}</TableCellLayout>
                </TableCell>
                <TableCell
                  {...columnSizing_unstable.getTableCellProps("tonnace")}
                >
                  <TableCellLayout>{item.tonnace.label}</TableCellLayout>
                </TableCell>
                <TableCell
                  {...columnSizing_unstable.getTableCellProps("loader")}
                >
                  <TableCellLayout>{item.loader.label}</TableCellLayout>
                </TableCell>
                <TableCell {...columnSizing_unstable.getTableCellProps("pit")}>
                  <TableCellLayout>{item.pit.label}</TableCellLayout>
                </TableCell>
                <TableCell {...columnSizing_unstable.getTableCellProps("seam")}>
                  <TableCellLayout>{item.seam.label}</TableCellLayout>
                </TableCell>
                <TableCell
                  {...columnSizing_unstable.getTableCellProps("dumpingpoint")}
                >
                  <TableCellLayout>{item.dumpingpoint.label}</TableCellLayout>
                </TableCell>
                <TableCell
                  {...columnSizing_unstable.getTableCellProps("inrom")}
                >
                  <TableCellLayout>{item.inrom.label}</TableCellLayout>
                </TableCell>
                <TableCell
                  {...columnSizing_unstable.getTableCellProps("outrom")}
                >
                  <TableCellLayout>{item.outrom.label}</TableCellLayout>
                </TableCell>
                <TableCell
                  {...columnSizing_unstable.getTableCellProps("action")}
                >
                  <TableCellLayout>
                    <Button icon={<EditRegular />} aria-label="Edit" />
                    <Button icon={<DeleteRegular />} aria-label="Delete" />
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

export default TableHauling;
