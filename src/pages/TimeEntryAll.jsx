import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import { DynamicTablistMenu } from "../components/Tablist";
import { tabsTimeEntry } from "../helpers/tabArrayHelper";
import { NavigateUrl } from "../utils/Navigation";
import { TableList } from "../components/TableList";
import { useState } from "react";

const TimeEntryAll = () => {
  const [columnData] = useState([
    { columnId: "id", headerLabel: "ID", defaultWidth: 100 },
    { columnId: "entryDate", headerLabel: "Entry Date", defaultWidth: 200 },
    { columnId: "unitType", headerLabel: "Unit Type", defaultWidth: 200 },
    { columnId: "totalUnit", headerLabel: "Total Unit", defaultWidth: 200 },
    { columnId: "entryBy", headerLabel: "Entry By", defaultWidth: 200 },
  ])

  const [itemsData] = useState([
    {
      id: "01",
      entryDate: "01-01-2024",
      unitType: "Production",
      totalUnit: "100",
      entryBy: "DataEntry-123456"
    },
    {
      id: "02",
      entryDate: "03-01-2024",
      unitType: "Production",
      totalUnit: "102",
      entryBy: "DataEntry-12348"
    },
    {
      id: "03",
      entryDate: "04-01-2024",
      unitType: "Production",
      totalUnit: "105",
      entryBy: "DataEntry-12344"
    }
  ])

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
