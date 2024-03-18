import { useEffect, useRef, useState, useCallback } from "react"
import jspreadsheet from 'jspreadsheet-ce'
import { colHelperHaulingMHA } from "../../helpers/columnHelper"
import { read, utils } from 'xlsx';
import {
    Input, Label, useId, Button, Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogBody, Field,
    DialogActions
} from "@fluentui/react-components";
import { Save24Regular, ArrowReset24Regular } from "@fluentui/react-icons";
import Cookies from 'js-cookie'
import { useSocket } from "../../context/SocketProvider";
import PropTypes from 'prop-types'

const FormUploadMHA = () => {
    const jRef = useRef(null)
    const [dataSheet, setDataSheet] = useState([])
    const inputId = useId()
    const { socket, isConnected } = useSocket();
    const [progress, setProgress] = useState(0);
    const [chunkSize] = useState(1000);
    const [disableButton, setDisableButton] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const [disableClose, setDisableCLose] = useState(true)
    const [valueChecking, setValueChecking] = useState(0)
    const [valueStoring, setValueStoring] = useState(0)
    const [fileValue, setFileValue] = useState("")

    useEffect(() => {
        const width = screen.width;
        const options = {
            lazyLoading: true,
            loadingSpin: true,
            columns: colHelperHaulingMHA,
            minDimensions: [5, 15],
            tableHeight: '500px',
            tableWidth: `${(width * 90) / 100}px`,
            tableOverflow: true,
            allowInsertColumn: false,
            editable: false
        };

        if (!jRef.current.jspreadsheet) {
            jspreadsheet(jRef.current, options);
        }
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
    }, [])

    const handleSuccess = useCallback((res) => {
        if (res.status === 200) {
            setDisableCLose(false)
        }
    }, [])

    const handleSubmitToServer = useCallback(async () => {

        const user = JSON.parse(Cookies.get('user'))

        if (dataSheet.length > 0) {
            const transformedData = dataSheet.map((val) => (
                {
                    tanggal: val[0],
                    shift: val[1],
                    unit: val[2],
                    operator: val[3],
                    tonnage: val[4],
                    loader: val[5],
                    pit: val[6],
                    seam: val[7],
                    in_rom: val[8],
                    dump_time: val[9],
                    time_hauling: val[10],
                    dumping: val[11],
                    remark: val[12],
                    sentBy: user.fullname
                }
            ));

            if (!socket || transformedData.length === 0) return;

            const chunks = [];
            for (let i = 0; i < transformedData.length; i += chunkSize) {
                const chunk = transformedData.slice(i, i + chunkSize);
                chunks.push({ data: chunk, isLast: i + chunkSize >= transformedData.length });
            }

            chunks.forEach((chunk, index) => {
                setTimeout(() => {
                    socket.emit('data-hauling-mha', chunk);
                    setProgress((index + 1) / chunks.length * 100);
                }, index * 100);
            });

            setOpenDialog(true)
            socket.on('checking_progress', (res) => setValueChecking(res))
            socket.on('insert_progress', (res) => setValueStoring(res))
            socket.on("data_received", (res) => handleSuccess(res))
        }
    }, [dataSheet, chunkSize, socket, handleSuccess])

    const handleCloseDialog = useCallback(() => {
        setProgress(0)
        setDisableButton(true)
        
        handleReset()
    },[handleReset])

    return (<>
        <div className="row ">
            <div className="col-4">
                <Label htmlFor={inputId} >
                    Upload File Excel
                </Label>
                <Input type="file"
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
                    className="is-right"
                    icon={<Save24Regular />}
                    iconPosition="after"
                    style={{ backgroundColor: "#6aa146", color: "#ffffff" }}
                    onClick={handleSubmitToServer}
                    disabled={!isConnected || disableButton}
                >Save data to server</Button>
            </div>
        </div>

        <div ref={jRef} className='mt1em' />
        <div className="row flex-row">
            <div className="col-8">
                <p className="mt1em text-error text-italic">Note: *Pilih file excel, jika data sudah tampil di dalam tabel, klik tombol {`'Save data to server'`} untuk mengirim data ke server PTDH.</p>
            </div>
            <div className="col-4 is-right">
                {progress > 0 && <p className="is-right">Send data to server: {progress.toFixed(2)}%</p>}
            </div>
        </div>
        <DialogProgress 
            open={openDialog}   
            setOpen={setOpenDialog} 
            disableButton={disableClose} 
            valueChecking={valueChecking} 
            valueStoring={valueStoring}
            closeDialog={handleCloseDialog}
        />
    </>)
}

export default FormUploadMHA


export const DialogProgress = ({ open, setOpen, disableButton, valueChecking, valueStoring, closeDialog }) => {

    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);

  useEffect(() => {
    setValue1(valueChecking);
    setValue2(valueStoring);

    return () => {};
  },[valueChecking, valueStoring]);
    return (
        <Dialog modalType="alert" open={open} onOpenChange={(event, data) => setOpen(data.open)}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Saving Data Progress..</DialogTitle>
                    <DialogContent>
                        <p>CHecking Duplicate Data...</p>
                        <Field
                            validationMessage={`There have been ${valueChecking}% data checked`}
                            validationState="none"
                        >
                            <ProgressBar progress={value1} />
                        </Field>

                        <p className="mt1em">Saving Data...</p>
                        <Field
                            validationMessage={`There have been ${valueStoring}% data saved`}
                            validationState="none"
                        >
                            <ProgressBar progress={value2} />
                        </Field>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary" disabled={disableButton} onClick={closeDialog}>Done</Button>
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

const ProgressBar = ({ progress }) => {
    return (
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    );
  };
  
  ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
  };