import { useState, useEffect, lazy, Suspense } from "react";
import Transaksi from "../../services/inputCoalHauling";
import { Button, MessageBar, MessageBarBody, MessageBarTitle, Link, makeStyles } from "@fluentui/react-components";
import { ArrowDownload24Regular } from "@fluentui/react-icons";
import { useParams } from "react-router-dom";
import { URL_ENUMS } from "../../utils/Enums";
import { indonesianDate } from "../../helpers/convertDate";
const TableList = lazy(() => import('../TableList'))

const useStyles = makeStyles({
  messageContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
  },
});

const TableDetailHauling = () => {
  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const params = useParams();

  const [columnData] = useState([
    { columnId: "id", headerLabel: "ID", defaultWidth: 30 },
    { columnId: "date", headerLabel: "Date", defaultWidth: 50 },
    { columnId: "shift", headerLabel: "Shift", defaultWidth: 50 },
    { columnId: "unitno", headerLabel: "Unit No", defaultWidth: 50 },
    { columnId: "operator", headerLabel: "Operator", defaultWidth: 100 },
    { columnId: "tonnage", headerLabel: "Tonnage", defaultWidth: 50 },
    { columnId: "loader", headerLabel: "Loader", defaultWidth: 100 },
    { columnId: "pit", headerLabel: "Pit", defaultWidth: 100 },
    { columnId: "seam", headerLabel: "Seam", defaultWidth: 100 },
    { columnId: "dumpingpoint", headerLabel: "Dumping Point", defaultWidth: 150 },
    { columnId: "inrom", headerLabel: "In-Rom", defaultWidth: 50 },
    { columnId: "outrom", headerLabel: "Out-Rom", defaultWidth: 50 },
  ])

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dts = await Transaksi.getAllTransaction(params.tanggal);
        const updatedItems = dts.data.map((itemFromDB, index) => ({
          id: index + 1,
          tanggal: indonesianDate(new Date(itemFromDB.tanggal)),
          shift: itemFromDB.shift,
          unitno: itemFromDB.unitno,
          operator: itemFromDB.operator,
          tonnage: itemFromDB.tonnage,
          loader: itemFromDB.loader,
          pit: itemFromDB.pit,
          seam: itemFromDB.seam,
          dumpingpoint: itemFromDB.dumpingpoint,
          inrom: itemFromDB.inrom,
          outrom: itemFromDB.outrom,
        }));

        setItems(updatedItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.tanggal]);

  const handleDownload = async () => {
    try {
      const downloadData = await Transaksi.getDownload(params.tanggal);
      window.location.href = URL_ENUMS.downloadFile + downloadData.link;
    } catch (error) {
      console.error("Error downloading data:", error);
    }
  };

  return (
    <>
      <div className="form-wrapper" style={{marginTop: 0}}>
        <div className="search-box">
          <Button
            icon={<ArrowDownload24Regular />}
            iconPosition="after"
            onClick={() => handleDownload()}
            style={{ backgroundColor: "#28499c", color: "#ffffff" }}>
            Download
          </Button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <Suspense fallback={<></>}>
            <TableList columnsData={columnData} items={items} backgroundColor={`#ffffff`} />
          </Suspense>
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

export default TableDetailHauling;
