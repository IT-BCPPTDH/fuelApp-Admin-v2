import React, { useState, useEffect } from "react";
import { SearchBox } from "@fluentui/react-search-preview";
import Transaksi from "../../services/inputCoalHauling";
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
    columnId: "tanggal",
    renderHeaderCell: () => <>Tanggal</>,
  }),
  createTableColumn({
    columnId: "shift",
    renderHeaderCell: () => <>Shift</>,
  }),
  createTableColumn({
    columnId: "unitNo",
    renderHeaderCell: () => <>Unit</>,
  }),
  createTableColumn({
    columnId: "operator",
    renderHeaderCell: () => <>Operator</>,
  }),
  createTableColumn({
    columnId: "tonnage",
    renderHeaderCell: () => <>Tonnage</>,
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

// const items = [
//   {
//     id: { label: 1 },
//     tanggal: { label: "18/1/2024" },
//     shift: { label: "Day" },
//     unitNo: {
//       label: "HMP7322",
//     },
//     operator: {
//       label: "Rahmansyah Kurniawan",
//     },
//     tonnage: {
//       label: 126,
//     },
//     loader: {
//       label: "EXA624",
//     },
//     pit: {
//       label: "A",
//     },
//     seam: {
//       label: "A",
//     },
//     dumpingpoint: {
//       label: 1,
//     },
//     inrom: {
//       label: "12.00",
//     },
//     outrom: {
//       label: "13.00",
//     },
//     action: {
//       label: "13.00",
//     },
//   },
//   {
//     id: { label: 2 },
//     tanggal: { label: "18/1/2024" },
//     shift: { label: "Day" },
//     unitNo: {
//       label: "HMP7322",
//     },
//     operator: {
//       label: "Audra Diaz",
//     },
//     tonnage: {
//       label: 126,
//     },
//     loader: {
//       label: "EXA624",
//     },
//     pit: {
//       label: "A",
//     },
//     seam: {
//       label: "A",
//     },
//     dumpingpoint: {
//       label: 1,
//     },
//     inrom: {
//       label: "12.00",
//     },
//     outrom: {
//       label: "13.00",
//     },
//     action: {
//       label: "13.00",
//     },
//   },
// ];

const TableHauling = ({ handleEdit }) => {
  const [columns] = useState(columnsDef);

  const [columnSizingOptions] = useState({
    id: {
      idealWidth: 20,
      minWidth: 20,
    },
    operator: {
      minWidth: 190,
      defaultWidth: 100,
    },
    shift: {
      idealWidth: 40,
      minWidth: 50,
    },
    pit: {
      idealWidth: 40,
      minWidth: 50,
    },
   
  });

  const [items, setItems] = useState([]);

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
  const formatDate = (dateString) => {
    const options = {
      day:  '2-digit', month: '2-digit', year:'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dts = await Transaksi.getAllTransaction();
        console.log(dts);

        // Mengganti label pada setiap objek dengan nilai dari database
        const updatedItems = dts.data.map((itemFromDB) => ({
          id: { label: itemFromDB.id },
          tanggal: { label: itemFromDB.tanggal },
          shift: { label: itemFromDB.shift },
          unitNo: { label: itemFromDB.unitno },
          operator: { label: itemFromDB.operator },
          tonnage: { label: itemFromDB.tonnage },
          loader: { label: itemFromDB.loader },
          pit: { label: itemFromDB.pit },
          seam: { label: itemFromDB.seam },
          dumpingpoint: { label: itemFromDB.dumpingpoint },
          inrom: { label: itemFromDB.inrom },
          outrom: { label: itemFromDB.outrom },
          action: { label: itemFromDB.action },
        }));

        setItems(updatedItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="form-wrapper" style={{ marginTop: "10px" }}>
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
                    {/* <TableCellLayout>{item.id.label}</TableCellLayout> */}
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("tanggal")}
                  >
                    <TableCellLayout>{formatDate(item.tanggal.label)}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("shift")}
                  >
                    <TableCellLayout truncate>
                      {item.shift.label}
                    </TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("unitNo")}
                  >
                    <TableCellLayout>{item.unitNo.label}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("operator")}
                  >
                    <TableCellLayout>{item.operator.label}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("tonnage")}
                  >
                    <TableCellLayout>{item.tonnage.label}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("loader")}
                  >
                    <TableCellLayout>{item.loader.label}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("pit")}
                  >
                    <TableCellLayout>{item.pit.label}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("seam")}
                  >
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
                      <Button
                        // value={item.id}
                        icon={<EditRegular />}
                        aria-label="Edit"
                        onClick={() => handleEdit(item.id)}
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

export default TableHauling;
