import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import { DynamicTablistMenu } from "../components/Tablist";
import { tabsTimeEntry } from "../helpers/tabArrayHelper";
import { NavigateUrl } from "../utils/Navigation";
import Services from "../services/timeEntry";
import { Button } from "@fluentui/react-components";
import {ContentView24Regular} from '@fluentui/react-icons'
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom";
import { getURLPath } from "../helpers/commonHelper";
const TableList = lazy(() => import('../components/TableList'))
import { tabMenuTableTimeEntry } from "../utils/Enums";
import { HeaderTitle, ButtonText } from "../utils/Wording";

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
  const [formTitle, setFormTitle] = useState(HeaderTitle.TIME_ENTRY_COLLECTOR)
  const [activeTab, setActiveTab] = useState(getURLPath())
  const [typeTE, setTypeTE] = useState("")

  const handleAction = useCallback( async(type, param) => {
    navigate(`/time-entry-detail/${param}/${type}`)
  },[navigate])

  const fetchData = useCallback(async()=>{
    try {

      if(typeTE === "Collector"){
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
      } else {
        setItemsData([])
      }
      
    } catch (error) {
      console.log(error)
    }
  },[handleAction, typeTE])

  const handleTab = useCallback(()=>{
    const lastPart = getURLPath()
    switch (lastPart) {
      case tabMenuTableTimeEntry.TIMEENTY_FMS:
        setFormTitle(HeaderTitle.TIME_ENTRY_FMS);
        setActiveTab(tabMenuTableTimeEntry.TIMEENTY_FMS)
        setTypeTE("FMS")
        break;
      case tabMenuTableTimeEntry.TIMEENTY_COLLECTOR:
        setFormTitle(HeaderTitle.TIME_ENTRY_COLLECTOR)
        setActiveTab(tabMenuTableTimeEntry.TIMEENTY_COLLECTOR)
        setTypeTE("Collector")
        break;
      default:
        break;
    }
  },[])

  useEffect(() => {
    handleTab()
    fetchData()
  }, [fetchData, handleTab]);
  return (
    <>
      <HeaderPageForm 
        title={formTitle} 
        urlBack={NavigateUrl.HOME} 
        urlCreate={NavigateUrl.TIME_ENTRY_SUPPORT_FORM}
        buttonText={ButtonText.FRM_DATA_ENTRY}
      />
      <div className="form-wrapper">
        <div className='row'>
          <div className='col-6'>
            <DynamicTablistMenu
              tabs={tabsTimeEntry}
              active={activeTab}
              handleTab={handleTab}
            />
          </div>
        </div>
        <Suspense fallback={<></>}>
          <TableList columnsData={columnData} items={itemsData} backgroundColor={`#ffffff`} />
        </Suspense>
      </div>
    </>
  );
};

export default TimeEntryAll;

ActionButtons.propTypes={
  handleAction: PropTypes.func,
  param: PropTypes.string
}