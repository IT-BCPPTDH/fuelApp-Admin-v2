import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowSquareUpRight24Regular } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";
import CoalHaulingMHA from "../../services/CoalHaulingMHA";
import {convertDateFormatTime} from "../../helpers/convertDate"
const TableList = lazy(() => import('../TableList'))

const TableCoalHauling = () => {

  const [columnData] = useState([
    { columnId: "key", headerLabel: "ID", defaultWidth: 100 },
    { columnId: "entryDate", headerLabel: "Production Date", defaultWidth: 200 },
    { columnId: "totalTonnage", headerLabel: "Total Hauling(TON)", defaultWidth: 200 },
    { columnId: "ritage", headerLabel: "RITAGE", defaultWidth: 200 },
    { columnId: "lastUpdate", headerLabel: "Last Update", defaultWidth: 200 },
    { columnId: "actions", headerLabel: "Action:", defaultWidth: 400 },
  ])

  const [items, setItems] = useState([]);
  const Navigate = useNavigate();
  const handleDetail = useCallback(async (tanggal) => {
    try {
      Navigate(`/coalhauling-dataentry-detail/${tanggal}`);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [Navigate])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datamain = await CoalHaulingMHA.getAllDataHauling();
        const updatedItems = datamain.data.map((itemFromDB, key) => ({
          key: key + 1,
          entryDate: itemFromDB.tanggal,
          totalTonnage: itemFromDB.totalTonnage,
          ritage: itemFromDB.ritage,
          lastUpdate: convertDateFormatTime(itemFromDB.sent_at) ?? '-',
          actions: <Button
            icon={<ArrowSquareUpRight24Regular />}
            iconPosition="after"
            onClick={() => handleDetail(itemFromDB.tanggal)}>
            View Detail Data
          </Button>
        }));

        setItems(updatedItems);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [handleDetail]);

  return (
    <div className="form-wrapper" style={{marginTop: 0}}>
      <Suspense fallback={<></>}>
        <TableList columnsData={columnData} items={items} backgroundColor={`#ffffff`} />
      </Suspense>
    </div>
  );
};

export default TableCoalHauling;
