import { useRef, useEffect, useState } from 'react'
import jspreadsheet from 'jspreadsheet-ce'
import { HeaderPageForm } from '../components/FormComponent/HeaderPageForm'
import { FooterPageForm } from '../components/FormComponent/FooterPageForm'
import { DynamicTablistMenu } from '../components/Tablist'
import '../../css/rekap.css'
import { colHelperTimesheet, colArrayHelper } from '../helpers/columnHelper'
import { getTimeSheetData } from '../helpers/arrayGroupHelper'
import { tabsRekapTimeEntry } from '../helpers/tabArrayHelper'

export const RekapTimeEntryPage = () => {
  const jRef = useRef(null)
  // const [totalDuration, setTotalDuration] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  // const [dataSpreaSheet, setDataSpreadSheet] = useState([])

  const handleSubmit = () => {}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const width = screen.width
        const dataSpreaSheet = getTimeSheetData()
        const rowLength = dataSpreaSheet.length

        const B = Array.from({ length: 4 }, () => null)
        const C = Array.from({ length: 53 }, () => null)
        const D = Array.from({ length: 14 }, () => null)
        const E = Array.from({ length: 23 }, () => null)

        let val11 = null,
          val65 = null,
          val80 = null,
          val104 = null,
          val107 = null

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
          updateTable: function (instance, cell, col, row, val) {
            if (col >= 7 && col <= 10) {
              const index = col - 7;
              B[index] = cell.innerText !== '-' ? parseFloat(cell.innerText, 2) : null;
            }

            if (col == 11) {
              const sumB = B.reduce((acc, curr) => acc + (curr || 0), 0);
              val11 = sumB !== 0 ? parseFloat(sumB, 2) : null;
              cell.innerText = sumB !== 0 ? parseFloat(sumB, 2).toFixed(2) : '-';
              cell.style.fontWeight = sumB !== 0 ? 'bold' : 'normal';
            }

            if (col >= 12 && col <= 64) {
              const indexC = col - 12
              C[indexC] =
                cell.innerText !== '-' ? parseFloat(cell.innerText, 2) : null
            }

            if (col == 65) {
              const sumC = C.reduce((acc, curr) => acc + (curr || 0), 0)
              val65 = sumC !== 0 ? parseFloat(sumC, 2) : null
              cell.innerText = sumC !== 0 ? parseFloat(sumC, 2).toFixed(2) : '-'
              cell.style.fontWeight = sumC !== 0 ? 'bold' : 'normal'
            }

            if (col >= 66 && col <= 79) {
              const indexD = col - 66
              D[indexD] =
                cell.innerText !== '-' ? parseFloat(cell.innerText, 2) : null
            }

            if (col == 80) {
              const sumD = D.reduce((acc, curr) => acc + (curr || 0), 0)
              val80 = sumD !== 0 ? parseFloat(sumD, 2) : null
              cell.innerText = sumD !== 0 ? parseFloat(sumD, 2).toFixed(2) : '-'
              cell.style.fontWeight = sumD !== 0 ? 'bold' : 'normal'
            }

            if (col >= 81 && col <= 103) {
              const indexE = col - 81
              E[indexE] =
                cell.innerText !== '-' ? parseFloat(cell.innerText, 2) : null
            }

            if (col == 104) {
              const sumE = E.reduce((acc, curr) => acc + (curr || 0), 0)
              val104 = sumE !== 0 ? parseFloat(sumE, 2) : null
              cell.innerText = sumE !== 0 ? parseFloat(sumE, 2).toFixed(2) : '-'
              cell.style.fontWeight = sumE !== 0 ? 'bold' : 'normal'
            }

            if (col == 107) {
              val107 = parseFloat(cell.innerText.replace(',', '.'), 2)
            }

            if (col == 108) {
              const res108 = val107 - val65
              cell.innerText =
                res108 !== 0 ? parseFloat(res108, 2).toFixed(2) : '-'
              cell.style.fontWeight = res108 !== 0 ? 'bold' : 'normal'

              if (res108 < 0) {
                cell.style.color = 'red'
                cell.style.backgroundColor = '#ffd0d0'
              } else if (res108 > 0) {
                cell.style.color = '#c07600'
                cell.style.backgroundColor = '#fff3dc'
              } else {
                cell.style.color = 'green'
              }
            }

            if (col == 109 || col == 110) {
              const totalTime = val11 + val80 + val104 + val107
              const variance = totalTime - 12

              if (col == 109) {
                cell.innerText = totalTime !== 12 ? 'FALSE' : 'TRUE'
                cell.style.backgroundColor =
                  totalTime !== 12 ? '#ffd9d9' : 'transparent'
                cell.style.color = totalTime !== 12 ? 'red' : 'black'
              }

              if (col == 110) {
                cell.innerText = parseFloat(variance, 2).toFixed(2)
                cell.style.fontWeight = 'bold'
              }
            }
          }
        }

        if (!jRef.current.jspreadsheet) {
          jspreadsheet(jRef.current, options)
        }

        // const spreadSheet = jRef.current.jspreadsheet
        // let B7 = null, B8 = null, B9 = null, B10 = null;

        // for (let index = 0; index < rowLength; index++) {
        //    B7 = spreadSheet.getValueFromCoords(7, index)
        //    B8 = spreadSheet.getValueFromCoords(8, index)
        //    B9 = spreadSheet.getValueFromCoords(9, index)
        //    B10 = spreadSheet.getValueFromCoords(10, index)

        //   console.log(B7, B8, B9, B10)
        // }

        // const spreadSheet = jRef.current.jspreadsheet
        // let BD = Array.from({ length: 4 }, () => null)

        // for (let index = 0; index < rowLength; index++) {
        //   for (let col = 7; col <= 10; col++) {
        //     BD[col - 7] = spreadSheet.getValueFromCoords(col, index)
        //   }
        // }

        // const sumB = BD.reduce((acc, curr) => acc + (curr || 0), 0)
        // const value11 = sumB !== 0 ? parseFloat(sumB, 2) : null

        // spreadSheet.setValueFromCoords(
        //   11,
        //   index,
        //   sumB !== 0 ? value11.toFixed(2) : '-',
        //   true
        // )

        // spreadSheet.setStyle(11, index, {
        //   fontWeight: sumB !== 0 ? 'bold' : 'normal'
        // })

        //   console.log(sumB);
      } catch (error) {
        console.error('Error fetching data:', error)
        // Handle error as needed
      }
    }

    fetchData()

    // return () => {
    //   jspreadsheet.destroy(jRef);
    // };
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
