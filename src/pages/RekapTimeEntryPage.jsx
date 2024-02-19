import { useRef, useEffect, useState } from 'react'
import jspreadsheet from 'jspreadsheet-ce'
import { HeaderPageForm } from '../components/FormComponent/HeaderPageForm'
import { FooterPageForm } from '../components/FormComponent/FooterPageForm'
import { DynamicTablistMenu } from '../components/Tablist'
import { colHelperTimesheet, colArrayHelper } from '../helpers/columnHelper'
import { getTimeSheetData } from '../helpers/arrayGroupHelper'
import { tabsRekapTimeEntry } from '../helpers/tabArrayHelper'
import '../../css/rekap.css'

export const RekapTimeEntryPage = () => {
  const jRef = useRef(null)
  // const [totalDuration, setTotalDuration] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const dataSpreaSheet = getTimeSheetData()
  const rowLength = dataSpreaSheet.length

  const handleSubmit = () => {}

  const updateCell = () => {
    const spreadSheet = jRef.current.jspreadsheet

    for (let index = 0; index < rowLength; index++) {
      /**
       * Total BD
       */
      let totalA = 0
      for (let a = 7; a <= 10; a++) {
        let valueA = spreadSheet.getValueFromCoords(a, index) || 0
        if (!isNaN(valueA)) {
          totalA += parseFloat(valueA, 2)
        }
      }
      if (totalA !== 0) {
        spreadSheet.updateCell(11, index, totalA.toFixed(2), true)
      }

      /**
       * Total Work
       */
      let totalB = 0
      for (let i = 12; i <= 64; i++) {
        let valueB = spreadSheet.getValueFromCoords(i, index) || 0

        if (!isNaN(valueB)) {
          totalB += parseFloat(valueB, 2)
        }
      }

      if (totalB !== 0) {
        spreadSheet.updateCell(65, index, totalB.toFixed(2), true)
      }

      /**
       * Total SPO
       */
      let totalC = 0
      for (let i = 66; i <= 79; i++) {
        let valueC = spreadSheet.getValueFromCoords(i, index) || 0

        if (!isNaN(valueC)) {
          totalC += parseFloat(valueC, 2)
        }
      }

      if (totalC !== 0) {
        spreadSheet.updateCell(80, index, totalC.toFixed(2), true)
      }

      /**
       * Total Non SPO
       */
      let totalD = 0
      for (let i = 81; i <= 103; i++) {
        let valueD = spreadSheet.getValueFromCoords(i, index) || 0

        if (!isNaN(valueD)) {
          totalD += parseFloat(valueD, 2)
        }
      }

      if (totalD !== 0) {
        spreadSheet.updateCell(104, index, totalD.toFixed(2), true)
      }

      let valueHM = spreadSheet.getValueFromCoords(107, index)
      
        valueHM = parseFloat(valueHM.replace(',', '.'),2) || 0
        const varianceHM = valueHM - totalB
        spreadSheet.updateCell(108, index, varianceHM.toFixed(2), true)
      

      let totalTime = totalA + totalC + totalD + valueHM
      let variance = totalTime - 12
      const valid = totalTime !== 12 ? 'FALSE' : 'TRUE'

      if(parseFloat(valueHM) === 0 && parseFloat(varianceHM) === 0){
        spreadSheet.updateCell(109, index, '-', true)
      } else {
        spreadSheet.updateCell(109, index, valid, true)
      }
      
      spreadSheet.updateCell(110, index, variance.toFixed(2), true)

      const cellElement = document.querySelector(`td[data-x="${109}"][data-y="${index}"]`);
      if(valid === 'FALSE'){
        spreadSheet.setStyle([cellElement], 'color', 'red', true, false);
      } else {
        spreadSheet.setStyle([cellElement], 'color', 'green', true, false);
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const width = screen.width
        const options = {
          data: dataSpreaSheet,
          columns: colHelperTimesheet.columnHeader,
          nestedHeaders: colHelperTimesheet.nestedHeader,
          minDimensions: [107, rowLength],
          tableHeight: '500px',
          tableWidth: `${(width * 87) / 100}px`,
          tableOverflow: true,
          lazyLoading: true,
          loadingSpin: true,
          onafterchanges: updateCell
        }

        if (!jRef.current.jspreadsheet) {
          jspreadsheet(jRef.current, options)
        }

        updateCell()
      } catch (error) {
        console.error('Error fetching data:', error)
        // Handle error as needed
      }
    }

    fetchData()

  }, [])

  // useEffect(() => {
  //   const disabled =
  //     parseFloat(totalDuration) > 12 || parseFloat(totalDuration) < 12
  //       ? true
  //       : false
  //   setButtonDisabled(disabled)
  // }, [totalDuration])

  useEffect(() => {
    const jsHeader = jRef.current.jspreadsheet
    const nestedHeader = jsHeader.thead.children[0].children
    const colHeader = jsHeader.thead.children[1].children

    nestedHeader[0].style.backgroundColor = '#f3f3f3'
    colHeader[0].style.backgroundColor = '#f3f3f3'

    for (let index = 1; index < 8; index++) {
      nestedHeader[index].style.backgroundColor = '#5a5a5a'
      nestedHeader[index].style.color = '#ffffff'
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

    function styleAndDisableCell (cell) {
      cell.style.backgroundColor = '#f7f7f7'
      cell.style.fontWeight = 'bold'
      cell.setAttribute('readonly', 'true')
      cell.addEventListener('keydown', function (event) {
        event.preventDefault()
      })
      cell.style.pointerEvents = 'none'
    }

    const tBody = jsHeader.table.children[2].children

    const cellsToStyle = [12, 66, 81, 105, 106, 107, 108, 109, 110, 111]

    for (let index = 0; index < rowLength; index++) {
      const element = tBody[index]

      cellsToStyle.forEach(cellIndex => {
        const currentCell = element.children[cellIndex]
        styleAndDisableCell(currentCell)
      })
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

        <FooterPageForm
          handleSubmit={handleSubmit}
          buttonDisabled={buttonDisabled}
        />
      </div>
    </>
  )
}
