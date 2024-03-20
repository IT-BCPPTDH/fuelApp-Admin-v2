import { useState, useEffect, useCallback } from "react";
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
  MessageBarActions,
  Link,
  Body1Stronger,
  makeStyles,
} from "@fluentui/react-components";
import {
  EditRegular,
  DeleteRegular,
  DismissRegular,
} from "@fluentui/react-icons";
import { getDataTableHauling } from "../../helpers/indexedDB/getData";
import { deleteByIdDataHauling, deleteFormDataHauling } from "../../helpers/indexedDB/deteleData";
import PropTypes from "prop-types";
import Transaksi from "../../services/inputCoalHauling";
import { pingServer } from "../../helpers/pingServer";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";
import { indonesianDate } from "../../helpers/convertDate";

const useStyles = makeStyles({
  messageContainer: {
    width: "300px",
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000, 
  },
});

const columnsDef = [
  createTableColumn({
    columnId: "id",
    renderHeaderCell: () => <>No</>,
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
    columnId: "unitno",
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

const TableHauling = ({ handleEdit, dataUpdated, setDataupdated }) => {
  const classes = useStyles();
  const [columns] = useState(columnsDef);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [isServerAvailable, setServerAvailable] = useState(true);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const navigate = useNavigate();
  const {isConnected} = useSocket()

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

  const formatDate = (date) => {
    return indonesianDate(date)
  };

  const getTodayDateString = useCallback(() => {
    const today = new Date();
    return formatDate(today);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const dateToday = getTodayDateString();
      const dts = await getDataTableHauling(dateToday);

      const updatedItems = dts.map((itemFromDB, index) => ({
        number: index + 1,
        id: itemFromDB.id,
        tanggal: itemFromDB.tanggal,
        shift: itemFromDB.shift,
        unitno: itemFromDB.unitno,
        operator: itemFromDB.operator,
        tonnage: itemFromDB.tonnage,
        loader: itemFromDB.loader,
        pit: itemFromDB.pit,
        seam: itemFromDB.seam,
        dumpingpoint: itemFromDB.dumpingpoint,
        rom: itemFromDB.rom,
        inrom: itemFromDB.inrom,
        outrom: itemFromDB.outrom,
        action: itemFromDB.action,
      }));

      setItems(updatedItems);
      setDataupdated(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [getTodayDateString, setDataupdated]);

  useEffect(() => {
    if (dataUpdated) {
      fetchData();
    }

    fetchData();
  }, [getTodayDateString, fetchData, dataUpdated]);

  const handleDelete = async (id) => {
    try {
      const deleted = await deleteByIdDataHauling(id);
      if (deleted) {
        fetchData();
        setMessage({
          type: "success",
          content: "Data berhasil dihapus",
        });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      setMessage({
        type: "error",
        content: "Gagal menghapus data. Silahkan coba kembali",
      });
    }
  };

  const handleConfirmDialog = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmSend = () => {
    setConfirmationOpen(false);
    handleSubmitServer();
  };

  const handleTutupClick = () => {
    setDialogOpen(false);
    window.location.reload();
    window.history.back();
  };

  const handleCancelSend = () => {
    setConfirmationOpen(false);
  };

  const pingServerWithRetry = async () => {
    const maxAttempts = 5;
    let attempts = 0;

    return new Promise((resolve) => {
      const intervalId = setInterval(async () => {
        const isServerAvailable = await pingServer();
        attempts++;

        if (isServerAvailable || attempts >= maxAttempts) {
          clearInterval(intervalId);
          resolve(isServerAvailable);
        }
      }, 200);
    });
  };

  const handleSubmitServer = async () => {
    try {
      const serverStatus = await pingServerWithRetry();
      setServerAvailable(serverStatus.status === 200);

      if (serverStatus.status === 200) {
        const send = await Transaksi.postCreateTransaction(items);

        if (send.status === 200) {
          setDialogOpen(true);

          const deleted = items.map(async () => {
            return await deleteFormDataHauling();
          });

          if (deleted) {
            navigate("/coalhauling");
          }
        } else {
          console.log("gagal");
        }
      } else {
        console.log("Server is not reachable after retries.");
      }
    } catch (error) {
      console.error("Error in handleSubmitServer:", error);
    }
  };

  const editData = (id) => {
    const dataEdit = items.find((val) => val.id === id);
    handleEdit(dataEdit);
  };

  const dismissMessage = () => {
    setMessage(null);
  };

  return (
    <>
      <div className="form-wrapper" style={{ marginTop: "10px" }}>
        <div className={classes.messageContainer}>
          {message && (
            <MessageBar intent={message.type}>
              <MessageBarBody>
                <MessageBarTitle>{message.content}</MessageBarTitle>
                {message.type === "error" && (
                  <Link onClick={() => setMessage(null)}>Dismiss</Link>
                )}
              </MessageBarBody>
              <MessageBarActions
                containerAction={
                  <Button
                    onClick={dismissMessage}
                    aria-label="dismiss"
                    appearance="transparent"
                    icon={<DismissRegular />}
                  />
                }></MessageBarActions>
            </MessageBar>
          )}
        </div>
        <div className="search-box">
          <Button
            onClick={() => handleConfirmDialog()}
            disabled={!isConnected}
            style={{ backgroundColor: "#28499c", color: "#ffffff" }}>
            Submit Data to Server
          </Button>
          <Dialog
            modalType="alert"
            open={isConfirmationOpen}
            onClose={() => setConfirmationOpen(false)}>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>Data Akan Disimpan</DialogTitle>
                <DialogContent>
                  Apakah Anda yakin ingin menyimpan data ini ke server?
                </DialogContent>
                <DialogActions>
                  <Button
                    style={{ backgroundColor: "#28499c", color: "#ffffff" }}
                    onClick={handleConfirmSend}>
                    Ya
                  </Button>
                  <Button appearance="secondary" onClick={handleCancelSend}>
                    Batal
                  </Button>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
          <Dialog
            modalType="alert"
            open={isDialogOpen}
            onClose={() => setDialogOpen(false)}>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>
                  {isServerAvailable
                    ? "Data Berhasil Disimpan"
                    : "Data Gagal Disimpan"}
                </DialogTitle>
                <DialogContent>
                  {isServerAvailable
                    ? "Data berhasil disimpan ke server."
                    : "Tidak dapat menghubungi server setelah beberapa percobaan."}
                </DialogContent>
                <DialogActions>
                  <Button
                    appearance="second"
                    onClick={() => handleTutupClick()}>
                    Tutup
                  </Button>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
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
                        <Body1Stronger>
                          {column.renderHeaderCell()}
                        </Body1Stronger>
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
                <TableRow key={item.number}>
                  <TableCell {...columnSizing_unstable.getTableCellProps("id")}>
                    <TableCellLayout>{item.number}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("tanggal")}>
                    <TableCellLayout>
                      {formatDate(item.tanggal)}
                    </TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("shift")}>
                    <TableCellLayout truncate>{item.shift}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("unitno")}>
                    <TableCellLayout>{item.unitno}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("operator")}>
                    <TableCellLayout>{item.operator}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("tonnage")}>
                    <TableCellLayout>{item.tonnage}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("loader")}>
                    <TableCellLayout>{item.loader}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("pit")}>
                    <TableCellLayout>{item.pit}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("seam")}>
                    <TableCellLayout>{item.seam}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps(
                      "dumpingpoint"
                    )}>
                    <TableCellLayout>{item.dumpingpoint}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("inrom")}>
                    <TableCellLayout>{item.inrom}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("outrom")}>
                    <TableCellLayout>{item.outrom}</TableCellLayout>
                  </TableCell>
                  <TableCell
                    {...columnSizing_unstable.getTableCellProps("action")}>
                    <TableCellLayout>
                      <Button
                        icon={<EditRegular />}
                        aria-label="Edit"
                        onClick={() => editData(item.id)}
                      />
                      <Dialog
                        open={open}
                        onOpenChange={(event, data) => setOpen(data.open)}>
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
    </>
  );
};

export default TableHauling;

TableHauling.propTypes = {
  handleEdit: PropTypes.any,
  dataUpdated: PropTypes.any,
  setDataupdated: PropTypes.any,
};
