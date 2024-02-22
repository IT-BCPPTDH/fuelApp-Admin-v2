import { useState, useEffect } from "react";
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
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Link,
  makeStyles,
} from "@fluentui/react-components";
import {
  EditRegular,
  DeleteRegular,
  ArrowDownload24Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  messageContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000, // Adjust the z-index as needed
  },
});

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

const TableHauling = ({ handleEdit }) => {
  const classes = useStyles();
  const [columns] = useState(columnsDef);
  const [message, setMessage] = useState(null);

  const [columnSizingOptions] = useState({
    id: {
      idealWidth: 20,
      minWidth: 20,
    },
    operator: {
      minWidth: 80,
      defaultWidth: 50,
    },
    shift: {
      idealWidth: 80,
      minWidth: 50,
    },
    seam: {
      idealWidth: 90,
      minWidth: 50,
    },
    pit: {
      idealWidth: 100,
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

  const rows = getRows();

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dts = await Transaksi.getAllTransaction();

        const updatedItems = dts.data.map((itemFromDB, index) => ({
          id: { label: itemFromDB.id},
          // id: { label: ( index + 1).toString() },
          tanggal: { label: itemFromDB.tanggal },
          shift: { label: itemFromDB.shift },
          unitNo: { label: itemFromDB.unitNo },
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

  const handleDelete = async (id) => {
    console.log(id.label);
    try {
      const updatedData = await Transaksi.getDeteleTransaction(id.label);
      console.log(updatedData);
      setMessage({
        type: "success",
        content: "Data derhasil dihapus",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error deleting data:", error);
      setMessage({
        type: "error",
        content: "Gagal menghapus data. Silahkan coba kembali",
      });
    }
  };

  const handleDownload = async () => {
    try {
      const downloadData = await Transaksi.getDownload();
      console.log(downloadData);
      // const link = document.createElement('a');
    }catch (error) {
      console.error('Error downloading data:', error);
    }
  };

  return (
    <>
      <div className="form-wrapper" style={{ marginTop: "10px" }}>
        <div className="search-box">
          <Button
            icon={<ArrowDownload24Regular />}
            iconPosition="after"
            onClick={() => handleDownload()}
            style={{ backgroundColor: "#28499c", color: "#ffffff" }}>
            Download
          
          </Button>
          {/* <SearchBox placeholder="Search" /> */}
        </div>
        <div style={{ overflowX: "auto" }}>
          <Table
            sortable
            aria-label="Table with sort"
            ref={tableRef}
            {...columnSizing_unstable.getTableProps()}>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <Menu openOnContext key={column.columnId}>
                    <MenuTrigger>
                      <TableHeaderCell
                        key={column.columnId}
                        {...columnSizing_unstable.getTableHeaderCellProps(
                          column.columnId
                        )}>
                        {column.renderHeaderCell()}
                      </TableHeaderCell>
                    </MenuTrigger>
                    <MenuPopover>
                      <MenuList>
                        <MenuItem
                          onClick={columnSizing_unstable.enableKeyboardMode(
                            column.columnId
                          )}>
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
                <TableRow key={item}>
                  <TableCell {...columnSizing_unstable.getTableCellProps("id")}>
                    {/* <TableCellLayout>{item.id.label}</TableCellLayout> */}
                    {/* <TableCellLayout>{item.id.label || (index + 1).toString()}</TableCellLayout> */}
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("tanggal")}>
                    <TableCellLayout>
                      {formatDate(item.tanggal.label)}
                    </TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("shift")}>
                    <TableCellLayout truncate>
                      {item.shift.label}
                    </TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("unitNo")}>
                    <TableCellLayout>{item.unitNo.label}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("operator")}>
                    <TableCellLayout>{item.operator.label}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("tonnage")}>
                    <TableCellLayout>{item.tonnage.label}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("loader")}>
                    <TableCellLayout>{item.loader.label}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("pit")}>
                    <TableCellLayout>{item.pit.label}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("seam")}>
                    <TableCellLayout>{item.seam.label}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps(
                      "dumpingpoint"
                    )}>
                    <TableCellLayout>{item.dumpingpoint.label}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("inrom")}>
                    <TableCellLayout>{item.inrom.label}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("outrom")}>
                    <TableCellLayout>{item.outrom.label}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("action")}>
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
                              <Button
                                appearance="secondary"
                                onClick={() => handleDelete(item.id)}>
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
      <div className={classes.messageContainer}>
        {message && (
          <MessageBar intent={message.type}>
            <MessageBarBody>
              <MessageBarTitle>{message.content}</MessageBarTitle>
              {message.type === "error" && (
                <Link onClick={() => setMessage(null)}>Dismiss</Link>
              )}
            </MessageBarBody>
          </MessageBar>
        )}
      </div>
    </>
  );
};

export default TableHauling;
