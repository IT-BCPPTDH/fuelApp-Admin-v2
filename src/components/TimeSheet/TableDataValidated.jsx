import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import { getTimeEntryByformTitle } from "../../helpers/indexedDB/getData";
import PropTypes from "prop-types";
import { indonesianDate } from "../../helpers/convertDate";
import { TableButtonDialog } from "../TableButtonDialog";
import { Button } from '@fluentui/react-components'
import { SaveArrowRight24Regular } from '@fluentui/react-icons'
import { deleteTimeEntries } from "../../helpers/indexedDB/deteleData";
import { DialogComponent } from "../Dialog";
import { tableLocalStoredData } from "../../helpers/tableHelper";
import { useSocket } from "../../context/useSocket"; 

const TableList = lazy(() => import('../TableList'))

const TableDataValidated = ({ formTitle, loaded, setLoaded, handleEdit, handleSubmitToServer, sendingData }) => {
    const [columnData] = useState(tableLocalStoredData);
    const [itemsData, setItemData] = useState([]);
    const [open, setOpen] = useState(false);
    const [button2Disabled, setButton2Disabled] = useState()
    const [localData, setLocalData] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [showButton, setShowButton] = useState(true)
    const { isConnected } = useSocket();

    useEffect(() => {
        if(isConnected){
            setButton2Disabled(false)
        } else {
            setButton2Disabled(true)
        }
    }, [isConnected]);
    
    const handleDelete = async (itemId) => {
        await deleteTimeEntries(itemId)
        setOpen(false)
    }

    const fetchData = useCallback(async () => {
        const data = await getTimeEntryByformTitle(formTitle);
        if (data.length > 0) {
            const dataTable = data.map((val) => ({
                id: val.id,
                unitNo: val.unitNo,
                tanggal: indonesianDate(val.tanggal),
                shift: val.shift,
                hmAwal: val.hmAwal,
                hmAkhir: val.hmAkhir,
                totalHM: val.hm,
                totalDuration: val.totalDuration,
                actions: <TableButtonDialog handleEdit={handleEdit} handleDelete={handleDelete} open={open} setOpen={setOpen} itemId={val.id} type={1}/>
            }));
            setButton2Disabled(false)
            setItemData(dataTable);
            setLocalData(data)
        } else {
            setButton2Disabled(true)
        }
    }, [open, handleEdit, formTitle]);

    const handleAction = useCallback(() => {
        handleSubmitToServer(localData)

    }, [handleSubmitToServer, localData])

    useEffect(() => {
        setItemData([])
        if (loaded) {
            fetchData();
            setLoaded(false);
        } else {
            fetchData();
        }
    }, [fetchData, loaded, setLoaded]);

    useEffect(() => {
        if (sendingData) {
            setShowButton(false)
        } else {
            setShowButton(true)
            setOpenDialog(false)
        }
    }, [sendingData]);



    return <>
        <div className="row">
            <div className="col-6 flex-row">
                <h4 className="text-primary">Time Entry Data Validated (Local DB)</h4>
            </div>
            <div className="col-6">
                <Button
                    onClick={() => setOpenDialog(true)}
                    icon={<SaveArrowRight24Regular primaryFill='#ffffff' />}
                    iconPosition='after'
                    size='small'
                    style={{
                        float: 'right',
                        marginRight: '0',
                        marginBottom: '1em',
                        padding: '8px 1.5em',
                        backgroundColor: '#5c9c3e',
                        color: '#fff',
                        fontSize: '14px'
                    }}
                    disabled={button2Disabled}
                >
                    Submit data to server
                </Button>

            </div>
        </div>

        <Suspense fallback={<></>}>
            <TableList columnsData={columnData} items={itemsData} backgroundColor={`#ffffff`} />
        </Suspense>

        <DialogComponent
            open={openDialog}
            setOpen={setOpenDialog}
            title={'Konfirmasi simpan data'}
            message={`Apakah kamu yakin data sudah valid semua?`}
            handleAction={handleAction}
            buttonText={'Iya, Simpan Sekarang.'}
            showButton={showButton}
            sendingData={sendingData}
        />
    </>
};

export default TableDataValidated

TableDataValidated.propTypes = {
    formTitle: PropTypes.string,
    loaded: PropTypes.bool,
    setLoaded: PropTypes.any,
    handleEdit: PropTypes.any,
    handleSubmitToServer: PropTypes.func,
    sendingData: PropTypes.bool
};
