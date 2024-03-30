import { useEffect, useRef, useState } from "react"
import jspreadsheet from 'jspreadsheet-ce'
import { colHelperMonitoringDB } from "../helpers/columnHelper"
import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm"
import { Label, Button, useId, Input } from "@fluentui/react-components"
import { Save24Regular, ArrowReset24Regular } from "@fluentui/react-icons";
import { useSocket } from "../context/SocketProvider"
import { read, utils } from 'xlsx';

const MonitoringBDPage = () => {
    const jRef = useRef(null)
    const inputId = useId()
    const [fileValue, setFileValue] = useState('')
    const [disableButton, setDisableButton] = useState(false)
    const { isConnected } = useSocket();
    const [ dataSheet, setDataSheet ] = useState([])

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
            editable: true
        };

        if (!jRef.current.jspreadsheet) {
            jspreadsheet(jRef.current, options);
        }
    }, []);

    useEffect(() => {
        const jsHeader = jRef.current.jspreadsheet
        const header = jsHeader.thead.children[0].children
        jsHeader.thead.children[0].style.height = "50px"
        // console.log(jsHeader.thead.children)

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

    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result, { dateNF: true });
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]], { raw: false });
                    const keysToExtract = ["Sip Gaess", "PIT CONTROL DAILY REPORT", "__EMPTY", "__EMPTY_1","__EMPTY_2", "0_1", "__EMPTY_3", "__EMPTY_4", "__EMPTY_5", "__EMPTY_6", "__EMPTY_7", "__EMPTY_8", "__EMPTY_9", "__EMPTY_10", "__EMPTY_11", "__EMPTY_12", "Sacares"];
                    const valuesArray = rows.map(entry => keysToExtract.map(key => entry[key] ?? ""));
                    let newArray = []
                    for (let index = 0; index < valuesArray.length; index++) {
                        const element = valuesArray[index];
                        if(element[0] !== "" && element[0] !== '1' && element[0] !== 'No Unit' && element[0] !== 'PITC'){
                        
                            newArray.push(element)
                        }
                        
                    }
              
                   setDataSheet(newArray)
                   jRef.current.jspreadsheet.setData(newArray)
                //   console.log(resultArray)
                }
            }
            reader.readAsArrayBuffer(file);
            setDisableButton(false)
        }
    }

    const handleReset = () => {

    }

    const handleSaveDraft = () => {

    }

    const handleSubmitToServer = () => {

    }

    return (
        <>
            <HeaderPageForm
                title={`Monitoring Breakdown Sheet`}
                urlCreate={'/'}
                urlBack={'/'}
            />
            <div className="row ">
                <div className="col-4">
                    <Label htmlFor={inputId} >
                        Upload File Excel
                    </Label>
                    <Input
                        type="file"
                        name="file"
                        id={inputId}
                        required
                        value={fileValue}
                        onChange={handleImport}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                </div>
                <div className="col-8 is-right">
                    <Button
                        icon={<ArrowReset24Regular />}
                        iconPosition="after"
                        style={{ backgroundColor: "#ff5722", color: "#ffffff", marginRight: "10px" }}
                        onClick={handleReset}
                        disabled={disableButton}
                    >Reset Form</Button>
                    <Button
                        icon={<Save24Regular />}
                        iconPosition="after"
                        style={{ backgroundColor: "blue", color: "#ffffff", marginRight: "10px" }}
                        onClick={handleSaveDraft}
                        disabled={disableButton}
                    >Save as Draft</Button>
                    <Button
                        className="is-right"
                        icon={<Save24Regular />}
                        iconPosition="after"
                        style={{ backgroundColor: "#6aa146", color: "#ffffff" }}
                        onClick={handleSubmitToServer}
                        disabled={!isConnected || disableButton}
                    >Save to PTDH server</Button>
                </div>
            </div>
            <div ref={jRef} className='mt1em' />
        </>
    )
}

export default MonitoringBDPage