import { lazy, Suspense, useCallback, useState, useEffect } from 'react';
import { NavigateUrl } from "../utils/Navigation";
import { HeaderTitle, ButtonText } from '../utils/Wording';
import { useNavigate } from "react-router-dom";
import { ArrowSquareUpRight24Regular } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";
import { convertDateFormatTime } from '../helpers/convertDate';
// import CoalHaulingMHA from '../services/CoalHaulingMHA';
import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
const TableList = lazy(() => import('../components/TableList'))
import WorkerBuilder from '../worker/worker-builder';
import workerCoalHaulingTable from '../worker/workerCoalHaulingTable';
import { getAllDataTable, insertAllDataTable } from '../helpers/indexedDB/coalHaulingData';
import { URL_ENUMS } from '../utils/Enums';

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

  const handleDetail = useCallback(async (tanggal, sent_at) => {
    try {

      const convertSentAt = sent_at.replace(' ', '+')
      Navigate(`/coalhauling-dataentry-detail/${tanggal}/${convertSentAt}`);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [Navigate])

  const updateTableItem = useCallback((data) => {
    const updatedItems = data.map((itemFromDB, key) => ({
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
  },[handleDetail])

  const fetchData = useCallback(async () => {
    const allDataTable = await getAllDataTable() 
   
    const handleMessageFromWorker = async(event) => {
      const datanya = event.data.data.data
      updateTableItem(datanya)
      await insertAllDataTable(datanya)
    }

    if(allDataTable.length === 0){
      // console.log(allDataTable)
      const apiUrl = URL_ENUMS.getAllDataHauling
      const workerInstance = new WorkerBuilder(workerCoalHaulingTable);
      workerInstance.postMessage({name: 'fetch-api', apiUrl: apiUrl})
      workerInstance.onmessage = handleMessageFromWorker
      
    } else {
      updateTableItem(allDataTable)
    }
   
  },[updateTableItem])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
            <TableList columnsData={columnData} items={items} backgroundColor={`#ffffff`} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
