import { useRef, useEffect, useState } from 'react'
import jspreadsheet from 'jspreadsheet-ce'
import { HeaderPageForm } from '../components/FormComponent/HeaderPageForm'
import FormComponent from '../components/FormComponent'
import { calculateTotalTimeFromArray } from '../helpers/timeHelper'
// import { FooterPageForm } from '../components/FormComponent/FooterPageForm'
import { DynamicTablistMenu } from '../components/Tablist'
import DataJson from '../data/test-data.json'
import { tabsRekapTimeEntry } from '../helpers/tabArrayHelper'
import { colHelperTimesheetMines } from '../helpers/columnHelper'

export const TimeEntryMinesEntryPage = () => {
  const jRef = useRef(null)
  const [totalDuration, setTotalDuration] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const handleChange = (ev, data) => {
    const { name, value } = data
  }

  const handleSubmit = () => {}


  const isChange = () => {
    const data = jRef.current.jspreadsheet.getData()

    const arrayDuration = data.map(k => k[14])
    const totalTimeDuration = calculateTotalTimeFromArray(arrayDuration)
    if (totalTimeDuration !== 'NaN.NaN') {
      setTotalDuration(totalTimeDuration)
    }
  }

  const components = [
    // {
    //   inputId: useId('formID'),
    //   grid: 'col-2',
    //   label: 'Form ID',
    //   value: 'Time Entry Operator',
    //   type: 'StaticInfo'
    // },
    // {
    //   inputId: useId('tanggal'),
    //   name: 'tanggal',
    //   grid: 'col-2',
    //   label: 'Tanggal',
    //   value: '',
    //   readOnly: false,
    //   disabled: false,
    //   type: 'DatePicker'
    // }
  ]

  useEffect(() => {
    let width = screen.width

    const options = {
      data: DataJson,
      lazyLoading:true,
      loadingSpin:true,
      columns: colHelperTimesheetMines.columnHeader,
      minDimensions: [5, 15],
      tableHeight: '500px',
      tableWidth: `${(width * 87) / 100}px`,
      tableOverflow: true
    }

    if (!jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options)
    }

  }, [])

  useEffect(() => {
    const disabled =
      parseFloat(totalDuration) > 12 || parseFloat(totalDuration) < 12
        ? true
        : false
    setButtonDisabled(disabled)
  }, [totalDuration])

  return (
    <>
      <HeaderPageForm title={`Time Entry BCP - 11 Januari 2024`} />

      <div className='form-wrapper'>
        <div className='row'>
          <div className='col-6'>
            <DynamicTablistMenu tabs={tabsRekapTimeEntry} active="time-sheet-mines"/>
          </div>
        </div>
        <FormComponent handleChange={handleChange} components={components} />
        <div ref={jRef} className='mt1em' />
        {/* <div className='row'>
          <div className='col-6'></div>
          <div className='col-6 flex-row'>
            <InfoLabel
              size='large'
              info="Jika nilai total < 12 atau > 12, status form menjadi 'INVALIDATED'"
            >
              Total Duration: {totalDuration}
            </InfoLabel>
            <InfoLabel
              size='large'
              info="Jika nilai total < 12 atau > 12, status form menjadi 'INVALIDATED'"
              style={{ marginLeft: '20px' }}
            >
              Total Convert Duration: {totalConvertDuration}
            </InfoLabel> 
            {parseFloat(totalDuration) > 12 ||
            parseFloat(totalDuration) < 12 ? (
              <div className='status-element status-invalidated'>
                INVALIDATED
              </div>
            ) : (
              <div className='status-element status-validated'>VALIDATED</div>
            )}
          </div>
        </div> */}
        {/* <FooterPageForm
          handleSubmit={handleSubmit}
          buttonDisabled={buttonDisabled}
        /> */}
      </div>
    </>
  )
}
