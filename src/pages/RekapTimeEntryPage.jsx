import { useRef, useEffect, useState } from 'react'
import jspreadsheet from 'jspreadsheet-ce'
import { HeaderPageForm } from '../components/FormComponent/HeaderPageForm'
// import FormComponent from '../components/FormComponent'
// import { InfoLabel, arrowHeights } from '@fluentui/react-components'
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
    const rowLength = dataSpreaSheet.length

    let B = Array.from({ length: 4 }, () => null)
    let C = Array.from({ length: 53 }, () => null)
    let D = Array.from({ length: 14 }, () => null)
    let E = Array.from({ length: 23 }, () => null)

    let val11=null,val65 = null,val80 = null, val104 = null, val107 = null

    const options = {
      data: dataSpreaSheet,
      columns: colHelperTimesheet.columnHeader,
      nestedHeaders: colHelperTimesheet.nestedHeader,
      minDimensions: [107, rowLength],
      tableHeight: '500px',
      tableWidth: `${(width * 87) / 100}px`,
      tableOverflow: true,
      updateTable: function (instance, cell, col, row, val, label, cellName) {
        if (col >= 7 && col <= 10) {
          const index = col - 7
          if (cell.innerText !== '-') {
            B[index] = parseFloat(cell.innerText, 2)
          } else {
            B[index] = null
          }
        }

        if (col == 11) {
          const sumB = B.reduce((acc, curr) => acc + (curr || 0), 0)
          if (sumB !== 0) {
            cell.innerText = parseFloat(sumB, 2).toFixed(2)
            cell.style.fontWeight = 'bold'
            val11 = parseFloat(sumB, 2)
          } else {
            cell.innerText = '-'
            val11 = null
          }
        }

        if (col >= 12 && col <= 64) {
          const indexC = col - 12
          if (cell.innerText !== '-') {
            C[indexC] = parseFloat(cell.innerText, 2)
          } else {
            C[indexC] = null
          }
        }

        if (col == 65) {
          const sumC = C.reduce((acc, curr) => acc + (curr || 0), 0)
          if (sumC !== 0) {
            cell.innerText = parseFloat(sumC, 2).toFixed(2)
            cell.style.fontWeight = 'bold'
            val65 = parseFloat(sumC, 2)
          } else {
            cell.innerText = '-'
            val65 = null
          }
        }

        if (col >= 66 && col <= 79) {
          const indexD = col - 66
          if (cell.innerText !== '-') {
            D[indexD] = parseFloat(cell.innerText, 2)
          } else {
            D[indexD] = null
          }
        }

        if (col == 80) {
          const sumD = D.reduce((acc, curr) => acc + (curr || 0), 0)
          if (sumD !== 0) {
            cell.innerText = parseFloat(sumD, 2).toFixed(2)
            cell.style.fontWeight = 'bold'
            val80 = parseFloat(sumD, 2)
          } else {
            cell.innerText = '-'
            val80 = null
          }
        }

        if (col >= 81 && col <= 103) {
          const indexE = col - 81
          if (cell.innerText !== '-') {
            E[indexE] = parseFloat(cell.innerText, 2)
          } else {
            E[indexE] = null
          }
        }

        if (col == 104) {
          const sumE = E.reduce((acc, curr) => acc + (curr || 0), 0)
          if (sumE !== 0) {
            cell.innerText = parseFloat(sumE, 2).toFixed(2)
            cell.style.fontWeight = 'bold'
            val104 = parseFloat(sumE, 2)
          } else {
            cell.innerText = '-'
            val104 = null
          }
        }

        if (col == 107) {
          val107 = parseFloat(cell.innerText.replace(',', '.'), 2)
        }

        if (col == 108) {
          const res108 = val107 - val65
          if (res108 != 0) {
            cell.innerText = parseFloat(res108, 2).toFixed(2)
          } else {
            cell.innerText = '-'
          }

          if (res108 < 0) {
            cell.style.color = 'red'
            cell.style.backgroundColor = '#ffd0d0'
          } else if (res108 > 0) {
            cell.style.color = '#c07600'
            cell.style.backgroundColor = '#fff3dc'
          } else {
            cell.style.color = 'green'
          }

          cell.style.fontWeight = 'bold'
        }

        if(col == 109){
            const totalTime = val11 + val80 + val104 + val107

            if(totalTime > 12 || totalTime < 12){
                cell.style.backgroundColor = '#ffd9d9'
                cell.style.color = "red"
                cell.innerText = "FALSE"
            } else {
                cell.style.backgroundColor = 'transparent'
                cell.style.color = "black"
                cell.innerText = "TRUE"
            }

            cell.style.fontWeight = 'bold'
        }

        if(col == 110){
            const totalTime = val11 + val80 + val104 + val107
            const variance = totalTime - 12
            cell.innerText = parseFloat(variance,2).toFixed(2)
            cell.style.fontWeight = 'bold'
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
    
    nestedHeader[0].style.backgroundColor = '#f3f3f3'
    colHeader[0].style.backgroundColor = '#f3f3f3'

    for (let index = 1; index < 8; index++) {
        nestedHeader[index].style.backgroundColor = '#5a5a5a'
        nestedHeader[index].style.color = "#ffffff"
        colHeader[index].style.backgroundColor = '#5a5a5a'
        colHeader[index].style.color = '#ffffff'
    }
   
    nestedHeader[107].style.backgroundColor = 'red'
    nestedHeader[108].style.backgroundColor = 'red'
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

      if (colArrayHelper.arrHM.includes(element.innerText)) {
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

      if (colArrayHelper.arrCodeHM.includes(element.innerText)) {
        element.style.backgroundColor = '#333'
        element.style.color = '#ffffff'
      }

      if (colArrayHelper.arrCheck.includes(element.innerText)) {
        element.style.backgroundColor = 'red'
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
