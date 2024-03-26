import { useEffect, useRef, useState, useCallback } from "react"
import jspreadsheet from 'jspreadsheet-ce'
import { colHelperHaulingMHA } from "../../helpers/columnHelper"
import { read, utils } from 'xlsx';
import { Input, Label, useId, Button, Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogBody, Field,
    DialogActions
} from "@fluentui/react-components";
import { Save24Regular, ArrowReset24Regular } from "@fluentui/react-icons";
import Cookies from 'js-cookie'
import { useSocket } from "../../context/useSocket";
import PropTypes from 'prop-types'
import { insertCoalHaulingDraft } from "../../helpers/indexedDB/insert";
import TableCoalHaulingMHADraft from "../TableCoalhaulingMHADraft";
import { generateID, generateIDByDate } from "../../helpers/commonHelper";
import { getCoalHaulingMHAById } from "../../helpers/indexedDB/getData";
import { deleteAllCoalHaulingDraft } from "../../helpers/indexedDB/deteleData";
import Worker from '../../worker/workerCoalHauling'
import WorkerBuilder from "../../worker/worker-builder";

const FormUploadMHA = () => {
    const jRef = useRef(null)
    const [dataSheet, setDataSheet] = useState([])
    const inputId = useId()
    const {isConnected } = useSocket();
    // const [progress, setProgress] = useState(0);
    const [disableButton, setDisableButton] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const [disableClose, setDisableCLose] = useState(true)
    // const [valueChecking, setValueChecking] = useState(0)
    const [valueStoring, setValueStoring] = useState(0)
    const [fileValue, setFileValue] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [timestamp] = useState(generateIDByDate())
    const [batchNo] = useState(generateID())
    const [sendingData, setSendingData] = useState(false)
    const [instanceWorker, setInstanceWorker] = useState()

    const handlePaste = () => {
        const spreadSheet = jRef.current.jspreadsheet
        const dataPasted = spreadSheet.getData()
        setDataSheet(dataPasted)
        setDisableButton(false)
    }

    useEffect(() => {
        const width = screen.width;
        const options = {
            lazyLoading: true,
            loadingSpin: true,
            columns: colHelperHaulingMHA,
            minDimensions: [5, 15],
            tableHeight: '400px',
            tableWidth: `${(width * 90) / 100}px`,
            tableOverflow: true,
            allowInsertColumn: false,
            editable: true,
            onpaste: handlePaste
        };

        if (!jRef.current.jspreadsheet) {
            jspreadsheet(jRef.current, options);
        }


    }, []);

    useEffect(() => {
        const workerInstance = new WorkerBuilder(Worker);
        setInstanceWorker(workerInstance);

        return () => {
            workerInstance.terminate();
        };
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
                    const keysToExtract = ["HAULING DATA ENTRY", "__EMPTY", "__EMPTY_1", "__EMPTY_2", "__EMPTY_3", "__EMPTY_4", "__EMPTY_5", "__EMPTY_6", "__EMPTY_7", "__EMPTY_8", "__EMPTY_9", "__EMPTY_10", "__EMPTY_11"];
                    const valuesArray = rows.map(entry => keysToExtract.map(key => entry[key] ?? ""));
                    const resultArray = valuesArray.slice(1);
                    setDataSheet(resultArray)
                    jRef.current.jspreadsheet.setData(resultArray)
                }
            }
            reader.readAsArrayBuffer(file);
            setDisableButton(false)
        }
    }

    const handleReset = useCallback(() => {
        jRef.current.jspreadsheet.setData([])
        setDataSheet([])
        setFileValue("")
        setDisableButton(true)
    }, [])

    const handleSuccess = useCallback(async (res) => {
        if (res.status === 200) {
            setDisableCLose(false)
            await deleteAllCoalHaulingDraft()
        }
    }, [])

    const handleWorkerSubmitToServer = useCallback(async (datanya) => {

        const user = JSON.parse(Cookies.get('user'));
        const dataToSave = dataSheet.length > 0 ? dataSheet : datanya

        instanceWorker.postMessage({ data: dataToSave, user });

        const handleMessageFromWorker = (event) => {
            const { eventName, eventData } = event.data;
            switch (eventName) {
                case 'emitSocket':
                    if (sendingData) setSendingData(false)
                    break;
                case 'openDialog':
                    setOpenDialog(eventData);
                    break;
                case 'savingProgress':
                    setValueStoring(Math.round(eventData))
                    break
                case 'dataReceived':
                    handleSuccess(eventData)
                    break;
                case 'disconnected':
                    console.log('disconnected')
                    break;
                case 'data-inserted':
                    console.log('data-inserted')
                break;
                default:
                    break;
            }
        };

        instanceWorker.onmessage = handleMessageFromWorker;

    }, [dataSheet, handleSuccess, sendingData, instanceWorker])

    const handleCloseDialog = useCallback(() => {
        // setProgress(0)
        setDisableButton(true)
        handleReset()
        setValueStoring(0)
    }, [handleReset])

    const handleSaveDraft = useCallback(async () => {
        if (dataSheet.length > 0) {

            const numericDate = parseInt(timestamp.replace(/-/g, ''));

            const inserted = await insertCoalHaulingDraft({
                timestamp: numericDate,
                batch: String(batchNo),
                dataSheet
            })

            if (inserted) {
                setLoaded(true)
                jRef.current.jspreadsheet.setData([])
                setDataSheet([])
                setFileValue("")
                setDisableButton(true)
            }

        }
    }, [dataSheet, timestamp, batchNo])

    const handleEditData = async (itemId) => {
        const spreadSheet = jRef.current.jspreadsheet
        const dataDetail = await getCoalHaulingMHAById(itemId)
        spreadSheet.setData(dataDetail.dataSheet)
        setDisableButton(false)
        setDataSheet(dataDetail.dataSheet)
    }

    return (<>
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
                    onClick={handleWorkerSubmitToServer}
                    disabled={!isConnected || disableButton}
                >Save to PTDH server</Button>
            </div>
        </div>

        <div ref={jRef} className='mt1em' />

        <div className="row flex-row">
            <div className="col-8">
                <p className="mt1em text-error text-italic">Note: *Pilih file excel, jika data sudah tampil di dalam tabel, klik tombol {`'Save data to server'`} untuk mengirim data ke server PTDH.</p>
            </div>
            <div className="col-4 is-right">
            
            </div>
        </div>

        <div className="form-wrapper">
            <TableCoalHaulingMHADraft
                timestamp={parseInt(timestamp.replace(/-/g, ''))}
                loaded={loaded}
                setLoaded={setLoaded}
                handleEdit={handleEditData}
                handleSubmitToServer={handleWorkerSubmitToServer}
                sendingData={sendingData}
            />
        </div>
        <DialogProgress
            open={openDialog}
            setOpen={setOpenDialog}
            disableButton={disableClose}
            // valueChecking={valueChecking}
            valueStoring={valueStoring}
            closeDialog={handleCloseDialog}
        />
    </>)
}

export default FormUploadMHA

const DialogProgress = ({ open, setOpen, disableButton, valueChecking, valueStoring, closeDialog }) => {

    // const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);

    useEffect(() => {
        // setValue1(valueChecking);
        setValue2(valueStoring);

        return () => { };
    }, [valueChecking, valueStoring]);
    return (
        <Dialog modalType="alert" open={open} onOpenChange={(event, data) => setOpen(data.open)}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle action={<Button onClick={closeDialog}>X</Button>}>Saving Data Progress..</DialogTitle>
                    <DialogContent>
                   
                        {/* <p>CHecking Duplicate Data...</p>
                        <Field
                            validationMessage={`There have been ${valueChecking}% data checked`}
                            validationState="none"
                        >
                            <CustomProgressBar progress={value1} />
                        </Field> */}

                        <p className="mt1em">Saving Data...</p>
                        <Field
                            validationMessage={`There have been ${valueStoring}% data saved`}
                            validationState="none"
                        >
                            <CustomProgressBar progress={value2} />
                        </Field>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary" disabled={disableButton} onClick={closeDialog}>Done & Close</Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};

DialogProgress.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.any,
    disableButton: PropTypes.bool,
    valueChecking: PropTypes.number,
    valueStoring: PropTypes.number,
    closeDialog: PropTypes.func
}

const CustomProgressBar = ({ progress }) => {
    return (
        <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
    );
};

CustomProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
};