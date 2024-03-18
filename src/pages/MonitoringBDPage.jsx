import { useEffect, useRef } from "react"
import jspreadsheet from 'jspreadsheet-ce'
import { colHelperMonitoringDB } from "../helpers/columnHelper"
import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm"

const MonitoringBDPage = () => {
    const jRef = useRef(null)


    useEffect(() => {
        const width = screen.width;
        const options = {
            lazyLoading: true,
            loadingSpin: true,
            columns: colHelperMonitoringDB,
            minDimensions: [5, 15],
            tableHeight: '550px',
            tableWidth: `${(width * 90) / 100}px`,
            tableOverflow: true,
            allowInsertColumn: false,
            editable: false
        };

        if (!jRef.current.jspreadsheet) {
            jspreadsheet(jRef.current, options);
        }
    }, []);

    useEffect(() => {
        const jsHeader = jRef.current.jspreadsheet
        const header = jsHeader.thead.children[0].children
        jsHeader.thead.children[0].style.height = "50px"
        console.log(jsHeader.thead.children)

        for (let index = 0; index < header.length; index++) {
            const element = header[index];
            element.style.backgroundColor = "#666699"
            element.style.color = "#ffffff"
            element.style.fontSize = "12px"
            element.style.fontWeight = "400"
            element.style.textWrap = "balance"
            element.style.lineHeight = "16px"


        }

        const tBody = jsHeader.table.children[2].children[0].children[0]
        tBody.style.fontSize = "10px"
        console.log(tBody)
    }, []);

    return (
        <>
            <HeaderPageForm
                title={`Monitoring Breakdown Sheet`}
                urlCreate={'/'}
                urlBack={'/'}
            />
            <div ref={jRef} className='mt1em' />
        </>
    )
}

export default MonitoringBDPage