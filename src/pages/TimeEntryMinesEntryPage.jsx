import { useRef, useEffect, useState } from 'react'
import jspreadsheet from 'jspreadsheet-ce'
import { HeaderPageForm } from '../components/FormComponent/HeaderPageForm'
import FormComponent from '../components/FormComponent'
import { InfoLabel } from '@fluentui/react-components'
import { calculateTotalTimeFromArray } from '../helpers/timeHelper'
import { FooterPageForm } from '../components/FormComponent/FooterPageForm'
import { DynamicTablistMenu } from '../components/Tablist'
import DataJson from '../data/test-data.json'
import { tabsRekapTimeEntry } from '../helpers/tabArrayHelper'

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
      columns: [
        { type: 'text', width: '100', title: 'Unit No' },
        { type: 'text', width: '200', title: 'Product Model' },
        { type: 'text', width: '150', title: 'Description' },
        { type: 'text', width: '100', title: 'Owner' },
        { type: 'text', width: '150', title: 'Production Date' },
        { type: 'text', width: '75', title: 'Shift' },
        { type: 'text', width: '120', title: 'Operator ID' },
        { type: 'text', width: '200', title: 'Operator Name' },
        { type: 'text', width: '100', title: 'SMU Start' },
        { type: 'text', width: '100', title: 'SMU Finish' },
        { type: 'text', width: '80', title: 'HM' },
        { type: 'text', width: '250', title: 'Activity' },
        { type: 'text', width: '100', title: 'Start Time' },
        { type: 'text', width: '100', title: 'End Time' },
        { type: 'text', width: '100', title: 'Duration' },
        { type: 'text', width: '150', title: 'Convert Duration' },
        { type: 'text', width: '100', title: 'BD Number' },
        { type: 'text', width: '150', title: 'From Equipment' },
        { type: 'text', width: '150', title: 'Material' },
        { type: 'text', width: '100', title: 'Mat Group' },
        { type: 'text', width: '100', title: 'Distance' },
        { type: 'text', width: '150', title: 'Loading Location' },
        { type: 'text', width: '150', title: 'Dumping Location' },
        { type: 'text', width: '100', title: 'Trip' },
        { type: 'text', width: '100', title: 'BCM' },
        { type: 'text', width: '200', title: 'Notes' },
        { type: 'text', width: '120', title: 'Cutoff Status' },
        { type: 'text', width: '100', title: 'LOC' }
      ],

      minDimensions: [5, 15],
      tableHeight: '500px',
      tableWidth: `${(width * 87) / 100}px`,
      tableOverflow: true,
      updateTable: function (instance, cell, col, row, val, label, cellName) {
        // isChange()
      }
    }

    if (!jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options)
    }

    return () => {
      jspreadsheet.destroy(jRef)
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
        <div className='row'>
          <div className='col-6'></div>
          <div className='col-6 flex-row'>
            <InfoLabel
              size='large'
              info="Jika nilai total < 12 atau > 12, status form menjadi 'INVALIDATED'"
            >
              Total Duration: {totalDuration}
            </InfoLabel>
            {/* <InfoLabel
              size='large'
              info="Jika nilai total < 12 atau > 12, status form menjadi 'INVALIDATED'"
              style={{ marginLeft: '20px' }}
            >
              Total Convert Duration: {totalConvertDuration}
            </InfoLabel> */}
            {parseFloat(totalDuration) > 12 ||
            parseFloat(totalDuration) < 12 ? (
              <div className='status-element status-invalidated'>
                INVALIDATED
              </div>
            ) : (
              <div className='status-element status-validated'>VALIDATED</div>
            )}
          </div>
        </div>
        <FooterPageForm
          handleSubmit={handleSubmit}
          buttonDisabled={buttonDisabled}
        />
      </div>
    </>
  )
}
