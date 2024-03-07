import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import { DynamicTablistMenu } from "../components/Tablist";
import { tabsTimeEntry } from "../helpers/tabArrayHelper";
import { NavigateUrl } from "../utils/Navigation";
import { TableList } from "../components/TableList";
import { useState, useEffect } from "react";
import Services from "../services/timeEntry";


const TimeEntryAll = () => {
  const [columnData] = useState([
    { columnId: "key", headerLabel: "ID", defaultWidth: 100 },
    { columnId: "entryDate", headerLabel: "Entry Date", defaultWidth: 200 },
    { columnId: "totalUnit", headerLabel: "Total Unit", defaultWidth: 200 },
    { columnId: "totalOperator", headerLabel: "Total Operator", defaultWidth: 200 },
    { columnId: "entryBy", headerLabel: "Entry By", defaultWidth: 200 },
  ])

  const [itemsData, setItemsData] = useState([])

  const fetchData = async()=>{
    try {
        const data = await Services.getAllTimeEntryData()
        if(data.status === 200){
          setItemsData(data.data)
        }
        console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);
  return (
    <>
      <HeaderPageForm 
        title={`Time Entry From Collector`} 
        urlBack={NavigateUrl.HOME} 
        urlCreate={NavigateUrl.TIME_ENTRY_DIGGER_FORM}
      />
      <div className="form-wrapper">
        <div className='row'>
          <div className='col-6'>
            <DynamicTablistMenu
              tabs={tabsTimeEntry}
              active='time-entry-from-collector'
            />
          </div>
        </div>
        <TableList columnsData={columnData} items={itemsData} backgroundColor={`#ffffff`} />
      </div>
    </>
  );
};

export default TimeEntryAll;
