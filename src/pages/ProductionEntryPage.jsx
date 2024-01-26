import { useRef, useEffect, useCallback, useState } from 'react'
import jspreadsheet from 'jspreadsheet-ce'
// import 'jspreadsheet-ce/dist/jspreadsheet.css'
import { HeaderPageForm } from '../components/FormComponent/HeaderPageForm'
// import Title from '../components/Title'
// import {
//   CompoundButton,
//   useId,
//   Button,
//   InfoLabel
// } from '@fluentui/react-components'
// import {
//   SaveArrowRight24Regular,
//   ArrowCircleLeft24Regular
// } from '@fluentui/react-icons'
// import { DynamicTablistMenu } from '../components/Tablist'
// import FormComponent from '../components/FormComponent'

export const ProductionEntryPage=()=>{

    const jRef = useRef(null)

    const handleChange = (ev, data) => {
        const { name, value } = data
    }

    useEffect(() => {
        const sideLabel = ["Distance", "Budg. Rit/Hr", "Average", "DT  Actual"]
        let width = screen.width;
        console.log(width*70/100)
        const options = {
            data:[],
            columns:[
                { type: 'text', width: '100', title: '-', readOnly: true },
                { type: 'text', width: '75', title: '18-19' },
                { type: 'text', width: '75', title: '19-20' },
                { type: 'text', width: '75', title: '20-21' },
                { type: 'text', width: '75', title: '21-22' },
                { type: 'text', width: '75', title: '22-23' },
                { type: 'text', width: '75', title: '23-24' },
                { type: 'text', width: '75', title: '24-01' },
                { type: 'text', width: '75', title: '01-02' },
                { type: 'text', width: '75', title: '02-03' },
                { type: 'text', width: '75', title: '03-04' },
                { type: 'text', width: '75', title: '04-05' },
                { type: 'text', width: '75', title: '05-06' },
                { type: 'text', width: '100', title: 'TOTAL' },
                { type: 'text', width: '200', title: 'Operator Name' },
                { type: 'text', width: '200', title: 'Remarks' },

            ],
            minDimensions: [14, 19],
            tableHeight: '500px',
            tableWidth: `${width*87/100}px`,
            tableOverflow: true,
            updateTable: function (instance, cell, col, row, val, label, cellName) {

                for (let index = 0; index < 4; index++) {
                    if(row == index && col == 0){
                        cell.innerText = sideLabel[index]
                        cell.style.backgroundColor = "#83f1ff"
                        cell.style.color = "#333"
                        cell.style.textAlign = "left"
                    }
                    
                }
              
            }
        }

        if (!jRef.current.jspreadsheet) {
            jspreadsheet(jRef.current, options)
          }
      
          return () => {
            jspreadsheet.destroy(jRef)
          }
    }, []);

    return(<>
     <HeaderPageForm title={`Form Production - Data Entry`} />
      <div className='form-wrapper'>
        {/* <FormComponent handleChange={handleChange} components={components} /> */}
        <div ref={jRef} className='mt1em' />
        </div>
    </>)
}