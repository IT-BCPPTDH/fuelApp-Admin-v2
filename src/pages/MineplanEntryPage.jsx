import { useRef, useEffect } from 'react'
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

const MineplanEntryPage=()=>{

    const jRef = useRef(null)

    const handleChange = (ev, data) => {
        const { name, value } = data
    }

    useEffect(() => {
        const sideLabel = ["Distance", "Budg. Rit/Hr", "Average", "DT  Actual"]
        let width = screen.width;
        
        const options = {
            data:[],
            columns:[
                
                { type: 'text', width: '100', title: 'Unit' },
                { type: 'text', width: '200', title: 'Name' },
                { type: 'text', width: '150', title: 'Fleet' },
                { type: 'text', width: '100', title: 'Kode' },
                { type: 'text', width: '150', title: 'Status' },
                

            ],
            minDimensions: [5, 15],
            tableHeight: '500px',
            // tableWidth: `${width*87/100}px`,
            tableOverflow: true,
            updateTable: function (instance, cell, col, row, val, label, cellName) {

 
                
              
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
     <HeaderPageForm title={`Form Mine Plan - Data Entry`} />
      <div className='form-wrapper'>
        {/* <FormComponent handleChange={handleChange} components={components} /> */}
        <div ref={jRef} className='mt1em' />
        </div>
    </>)
}

export default MineplanEntryPage