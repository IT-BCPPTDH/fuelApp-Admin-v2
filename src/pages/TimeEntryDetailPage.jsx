import { useRef, useEffect, useState, useCallback } from 'react'
import jspreadsheet from 'jspreadsheet-ce'
import { HeaderPageForm } from '../components/FormComponent/HeaderPageForm'
// import { DynamicTablistMenu } from '../components/Tablist'
// import { tabsRekapTimeEntry } from '../helpers/tabArrayHelper'
import { colHelperTimesheetMines } from '../helpers/columnHelper'
import Services from '../services/timeEntry'
import { useParams } from 'react-router-dom'

const TimeEntryMinesDetailPage = () => {
  const jRef = useRef(null)
  const params = useParams()
  const [formTitle, setFormTitle] = useState('')
  
  const fetchData = useCallback(async () => {
    
    try {



        console.log(params)
        const result = await Services.getTimeEntryDetailData(params.tanggal,params.type)
        console.log(result)
    //   jRef.current.jspreadsheet.setData([])
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },[params])

  const setTitle = useCallback(() => {
    switch (params.type) {
        case 'all':
            setFormTitle(`Time Entry Detail-${params.date}-All Unit`)
            break;
            case 'digger':
                setFormTitle(`Time Entry Detail-${params.date}-Unit Digger`)
                break;

                case 'hauler':
            setFormTitle(`Time Entry Detail-${params.date}- Unit Hauler`)
            break;
            case 'support':
            setFormTitle(`Time Entry Detail-${params.date}-Unit Support`)
            break;
    
        default:
            break;
    }
  },[params])

  useEffect(() => {
    fetchData();
    setTitle()
  }, [fetchData, setTitle]);

  useEffect(() => {
      const width = screen.width;
      const options = {
        lazyLoading: true,
        loadingSpin: true,
        columns: colHelperTimesheetMines.columnHeader,
        minDimensions: [5, 15],
        tableHeight: '500px',
        tableWidth: `${(width * 87) / 100}px`,
        tableOverflow: true
      };

     if (!jRef.current.jspreadsheet) {
        jspreadsheet(jRef.current, options);
     }
  }, []);

  return (
    <>
      <HeaderPageForm 
        title={`Time Entry Detail - `} 
        urlCreate={''}
        urlBack={'/'}
      />

      <div className='form-wrapper'>
        <div className='row'>
          <div className='col-6'>
            {/* <DynamicTablistMenu tabs={tabsRekapTimeEntry} active={secName === 'mines'?`time-sheet-mines`:`time-sheet-fms`}/> */}
          </div>
        </div>

          <div ref={jRef} className='mt1em' />
        
      </div>
    </>
  )
}

export default TimeEntryMinesDetailPage