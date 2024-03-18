import { useRef, useEffect, useState, useCallback } from 'react'
import jspreadsheet from 'jspreadsheet-ce'
import { HeaderPageForm } from '../components/FormComponent/HeaderPageForm'
import { colHelperTimesheetMines } from '../helpers/columnHelper'
import Services from '../services/timeEntry'
import { useParams } from 'react-router-dom'
import { NavigateUrl } from '../utils/Navigation'
import {Button} from "@fluentui/react-components";
import { ArrowDownload24Regular } from "@fluentui/react-icons";
import { URL_ENUMS } from '../utils/Enums'
import { ButtonText } from '../utils/Wording'

const TimeEntryMinesDetailPage = () => {
  const jRef = useRef(null)
  const params = useParams()
  const [formTitle, setFormTitle] = useState('')
  const [file, setFile] = useState("")

  const fetchData = useCallback(async () => {
    try {
      const result = await Services.getTimeEntryDetailData(params.tanggal, params.type)
      if (result.status === 200) {
        jRef.current.jspreadsheet.setData(result.data)
        setFile(result.fileName)
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
      columns: colHelperTimesheetMines,
      minDimensions: [5, 15],
      tableHeight: '500px',
      tableWidth: `${(width * 87) / 100}px`,
      tableOverflow: true,
      allowInsertColumn: false,
      editable: false
    };

    if (!jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options);
    }
  }, []);

  const handleDownload = () => {
    window.location.href = URL_ENUMS.downloadFile+file
  }

  return (
    <>
      <HeaderPageForm
        title={formTitle}
        urlCreate={NavigateUrl.TIME_ENTRY_SUPPORT_FORM}
        urlBack={NavigateUrl.TIME_ENTRY_MAIN_TABLE}
        buttonText={ButtonText.FRM_DATA_ENTRY}
      />

      <div className='form-wrapper'>
        <div className='row'>
          <div className="col-6 flex-row">
            <h4 className='mb-0'>Detail Data Time Entry</h4>
          </div>
          <div className='col-6'>
          <Button
            icon={<ArrowDownload24Regular />}
            iconPosition="after"
            onClick={() => handleDownload()}
            className='pull-right'
            style={{ backgroundColor: "#28499c", color: "#ffffff" }}>
            Download
          </Button>
          </div>
        </div>

        <div ref={jRef} className='mt1em' />

      </div>
    </>
  )
}

export default TimeEntryMinesDetailPage