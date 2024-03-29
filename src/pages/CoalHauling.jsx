import { lazy, Suspense, useCallback, useState, useEffect } from 'react';
import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import { NavigateUrl } from "../utils/Navigation";
import { HeaderTitle, ButtonText } from '../utils/Wording';
import { useNavigate } from "react-router-dom";
import { ArrowSquareUpRight24Regular } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";
import { convertDateFormatTime } from '../helpers/convertDate';
import CoalHaulingMHA from '../services/CoalHaulingMHA';

const TableList = lazy(() => import('../components/TableList'))

export default function CoalHauling() {

  const [columnData] = useState([
    { columnId: "key", headerLabel: "ID", defaultWidth: 100 },
    { columnId: "entryDate", headerLabel: "Production Date", defaultWidth: 200 },
    { columnId: "totalTonnage", headerLabel: "Total Hauling(TON)", defaultWidth: 200 },
    { columnId: "ritage", headerLabel: "RITAGE", defaultWidth: 200 },
    { columnId: "lastUpdate", headerLabel: "Last Update", defaultWidth: 200 },
    { columnId: "actions", headerLabel: "Action:", defaultWidth: 400 },
  ])

  const Navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const handleDetail = useCallback(async (tanggal, sent_at) => {
    try {

      const sentAt = btoa(sent_at)
      Navigate(`/coalhauling-dataentry-detail/${tanggal}/${sentAt}`);

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
            onClick={() => handleDetail(itemFromDB.tanggal, convertDateFormatTime(itemFromDB.sent_at))}>
            View Detail Data
          </Button>
        }));

        setItems(updatedItems);
        setDataFetched(true)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (!dataFetched) {
      fetchData();
    }

  }, [dataFetched, handleDetail]);

  return (
    <>
      <HeaderPageForm
        title={HeaderTitle.COAL_HAULING}
        urlCreate={NavigateUrl.COAL_HAULING_DATA_ENTRY_FORM}
        urlBack={NavigateUrl.HOME}
        buttonText={ButtonText.FRM_COAL_HAULING}
      />
      <div className="row">
        <div className="col-12">
          <Suspense fallback={<></>}>
            {/* <TableCoalHauling items={items} /> */}
            <TableList columnsData={columnData} items={items} backgroundColor={`#ffffff`} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
