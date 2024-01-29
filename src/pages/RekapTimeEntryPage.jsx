import { useRef, useEffect, useState } from 'react'
import jspreadsheet from 'jspreadsheet-ce'
import { HeaderPageForm } from '../components/FormComponent/HeaderPageForm'
// import FormComponent from '../components/FormComponent'
import { InfoLabel, arrowHeights } from '@fluentui/react-components'
// import { calculateTotalTimeFromArray } from '../helpers/timeHelper'
import { FooterPageForm } from '../components/FormComponent/FooterPageForm'
import { DynamicTablistMenu } from '../components/Tablist'
// import DataJson from '../data/test-data.json'
import '../../css/rekap.css'
import { colHelperTimesheet, colArrayHelper } from '../helpers/columnHelper'
import { getTimeSheetData } from '../helpers/arrayGroupHelper'
import { tabsRekapTimeEntry } from '../helpers/tabArrayHelper'

export const RekapTimeEntryPage = () => {
  const jRef = useRef(null)
  const [totalDuration, setTotalDuration] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const handleSubmit = () => {}

  useEffect(() => {
    let width = screen.width
    let dataSpreaSheet = getTimeSheetData()

    let totalBD = 0
    const options = {
      data: dataSpreaSheet,
      columns: colHelperTimesheet.columnHeader,
      nestedHeaders: colHelperTimesheet.nestedHeader,
      minDimensions: [107, dataSpreaSheet.length],
      tableHeight: '500px',
      tableWidth: `${(width * 87) / 100}px`,
      tableOverflow: true,
      updateTable: function (instance, cell, col, row, val, label, cellName) {
            
            if(col == 7){
                console.log(val)
            }

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

  useEffect(() => {
    const jsHeader = jRef.current.jspreadsheet
    const nestedHeader = jsHeader.thead.children[0].children
    const colHeader = jsHeader.thead.children[1].children

    for (let index = 0; index < nestedHeader.length; index++) {
      const element = nestedHeader[index]

      if (colArrayHelper.arrBD.includes(element.innerText)) {
        element.style.backgroundColor = '#8B0000'
        element.style.color = '#ffffff'
      }

      if (colArrayHelper.arrWork.includes(element.innerText)) {
        element.style.backgroundColor = 'green'
        element.style.color = '#ffffff'
      }

      if (colArrayHelper.arrSpo.includes(element.innerText)) {
        element.style.backgroundColor = '#1E2F45'
        element.style.color = '#ffffff'
      }

      if (colArrayHelper.arrNonSpo.includes(element.innerText)) {
        element.style.backgroundColor = '#c05610'
        element.style.color = '#ffffff'
      }

      if(colArrayHelper.arrHM.includes(element.innerText)){
        element.style.backgroundColor = '#333'
        element.style.color = '#ffffff'
      }
    }

    for (let index = 0; index < colHeader.length; index++) {
      const element = colHeader[index]
      if (colArrayHelper.arrCodeBD.includes(element.innerText)) {
        element.style.backgroundColor = '#8B0000'
        element.style.color = '#ffffff'
      }
      if (colArrayHelper.arrCodeWork.includes(element.innerText)) {
        element.style.backgroundColor = 'green'
        element.style.color = '#ffffff'
      }
      if (colArrayHelper.arrCodeSpo.includes(element.innerText)) {
        element.style.backgroundColor = '#1E2F45'
        element.style.color = '#ffffff'
      }
      if (colArrayHelper.arrCodeNonSpo.includes(element.innerText)) {
        element.style.backgroundColor = '#c05610'
        element.style.color = '#ffffff'
      }

      if(colArrayHelper.arrCodeHM.includes(element.innerText)){
        element.style.backgroundColor = '#333'
        element.style.color = '#ffffff'
      }
    }
  }, [])

  return (
    <>
      <HeaderPageForm title={`Time Entry BCP - 11 Januari 2024`} />

      <div className='form-wrapper'>
        <div className='row'>
          <div className='col-6'>
            <DynamicTablistMenu
              tabs={tabsRekapTimeEntry}
              active='time-entry-production'
            />
          </div>
        </div>
        {/* <FormComponent handleChange={handleChange} components={components} /> */}
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
        <FooterPageForm
          handleSubmit={handleSubmit}
          buttonDisabled={buttonDisabled}
        />
      </div>
    </>
  )
}
