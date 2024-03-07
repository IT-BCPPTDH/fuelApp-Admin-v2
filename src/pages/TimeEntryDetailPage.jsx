import { useRef, useEffect, useState, useCallback } from 'react'
import jspreadsheet from 'jspreadsheet-ce'
import { HeaderPageForm } from '../components/FormComponent/HeaderPageForm'
// import { DynamicTablistMenu } from '../components/Tablist'
// import { tabsRekapTimeEntry } from '../helpers/tabArrayHelper'
import { colHelperTimesheetMines } from '../helpers/columnHelper'
import Services from '../services/timeEntry'
import { useParams } from 'react-router-dom'
import { NavigateUrl } from '../utils/Navigation'

const TimeEntryMinesDetailPage = () => {
  const jRef = useRef(null)
  const params = useParams()
  const [formTitle, setFormTitle] = useState('')

  const fetchData = useCallback(async () => {

    try {

      const result = await Services.getTimeEntryDetailData(params.tanggal, params.type)
      if (result.status === 200) {
        jRef.current.jspreadsheet.setData(result.data)
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [params])

  const setTitle = useCallback(() => {
    switch (params.type) {
      case 'all':
        setFormTitle(`Time Entry Detail All Unit, Tanggal: ${params.tanggal}`)
        break;
      case 'digger':
        setFormTitle(`Time Entry Detail Unit Digger, Tanggal: ${params.tanggal}`)
        break;
      case 'hauler':
        setFormTitle(`Time Entry Detail Unit Hauler, Tanggal: ${params.tanggal}`)
        break;
      case 'support':
        setFormTitle(`Time Entry Detail Unit Support, Tanggal: ${params.tanggal}`)
        break;
      default:
        break;
    }
  }, [params])

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
        title={formTitle}
        urlCreate={NavigateUrl.TIME_ENTRY_DIGGER_FORM}
        urlBack={NavigateUrl.TIME_ENTRY_MAIN_TABLE}
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