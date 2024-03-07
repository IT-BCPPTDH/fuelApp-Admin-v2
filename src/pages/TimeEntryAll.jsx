import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import { DynamicTablistMenu } from "../components/Tablist";
import { tabsTimeEntry } from "../helpers/tabArrayHelper";
import { NavigateUrl } from "../utils/Navigation";
import { TableList } from "../components/TableList";
import { useState, useEffect, useCallback } from "react";
import Services from "../services/timeEntry";
import { Button } from "@fluentui/react-components";
import {ContentView24Regular} from '@fluentui/react-icons'
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom";

const ActionButtons = ({handleAction, param}) =>{
  return(
    <>
    <Button icon={<ContentView24Regular/>} className="mr-5 font-button-sm" onClick={()=>handleAction('digger', param)}>Digger</Button>
    <Button icon={<ContentView24Regular/>} className="mr-5 font-button-sm" onClick={()=>handleAction('hauler', param)}>Hauler</Button>
    <Button icon={<ContentView24Regular/>} className="mr-5 font-button-sm"onClick={()=>handleAction('support', param)}>Support</Button>
    <Button icon={<ContentView24Regular/>} className="font-button-sm" onClick={()=>handleAction('all', param)}>All</Button>
    </>
  )
}

const TimeEntryAll = () => {
  const [columnData] = useState([
    { columnId: "key", headerLabel: "ID", defaultWidth: 100 },
    { columnId: "entryDate", headerLabel: "Entry Date", defaultWidth: 200 },
    { columnId: "totalUnit", headerLabel: "Total Unit", defaultWidth: 200 },
    { columnId: "totalOperator", headerLabel: "Total Operator", defaultWidth: 200 },
    { columnId: "actions", headerLabel: "Action View By:", defaultWidth: 400 },
  ])

  const navigate = useNavigate()

  const [itemsData, setItemsData] = useState([])

  const handleAction = useCallback( async(type, param) => {
    // console.log(type, param)
    navigate(`/time-entry-detail/${param}/${type}`)
  },[navigate])

  const fetchData = useCallback(async()=>{
    try {
        const data = await Services.getAllTimeEntryData()
        if(data.status === 200){
          const dataRes = data.data
          const dataItems = dataRes.map((val) => ({
            key: val.key,
            entryDate: val.date,
            totalUnit: val.totalUnits,
            totalOperator: val.totalOperators,
            actions: <ActionButtons handleAction={handleAction} param={val.date}/>
          }))
          setItemsData(dataItems)
        }
        // console.log(data)
    } catch (error) {
      console.log(error)
    }
  },[handleAction])

  useEffect(() => {
    fetchData()
  }, [fetchData]);
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

ActionButtons.propTypes={
  handleAction: PropTypes.func,
  param: PropTypes.string
}