import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { TableButtonDialog } from "./TableButtonDialog";
import { deleteCoalHaulingDRAFT } from "../helpers/indexedDB/deteleData";
import { tableDraftCoalhaulig } from "../helpers/tableHelper";
import { Divider, Button } from '@fluentui/react-components'
import { getCoalHaulingMHAByTimestamp } from "../helpers/indexedDB/getData";
import { SaveArrowRight24Regular } from '@fluentui/react-icons'
import { useSocket } from "../context/SocketProvider";
import { DialogComponent } from "./Dialog";
const TableList = lazy(() => import('./TableList'))

const TableCoalHaulingMHADraft = ({ timestamp, loaded, setLoaded, handleEdit, handleSubmitToServer, sendingData }) => {
    const [columnData] = useState(tableDraftCoalhaulig);
    const [itemsData, setItemData] = useState([]);
    const [open, setOpen] = useState(false);
    const [button2Disabled, setButton2Disabled] = useState()
    const { isConnected } = useSocket();
    const [openDialog, setOpenDialog] = useState(false)
    const [showButton, setShowButton] = useState(true)
    const [localData, setLocalData] = useState([])

    useEffect(() => {
        if(isConnected){
            setButton2Disabled(false)
        } else {
            setButton2Disabled(true)
        }
    }, [isConnected]);

    const handleDelete = async (itemId) => {
        await deleteCoalHaulingDRAFT(itemId)
        setOpen(false)
    }

    const fetchData = useCallback(async () => {
      
        const data = await getCoalHaulingMHAByTimestamp(timestamp);
        
        if (data.length > 0) {
            const dataTable = data.map((val) => ({
                id: val.id,
                batchNo: val.batch, 
                totalData: val.dataSheet ? val.dataSheet.length : 0,
                actions: <TableButtonDialog handleEdit={handleEdit} handleDelete={handleDelete} open={open} setOpen={setOpen} itemId={val.id} type={2} />
            }));
            setItemData(dataTable);
            setButton2Disabled(false)
            console.log(data[0])
            setLocalData(data[0].dataSheet)
        } else {
            setButton2Disabled(true)
        }
    }, [open, handleEdit, timestamp]);


    useEffect(() => {
        setItemData([])
        if (loaded) {
            fetchData();
            setLoaded(false);
        } else {
            fetchData();
        }
    }, [fetchData, loaded, setLoaded]);

    const handleAction = useCallback(() => {
        handleSubmitToServer(localData)
        setOpenDialog(false)
    }, [handleSubmitToServer, localData])

    useEffect(() => {
        if (sendingData) {
            setShowButton(false)
        } else {
            setShowButton(true)
            setOpenDialog(false)
        }
    }, [sendingData]);


    return <>
        <div className={`divider`}>
            <Divider />
        </div>
        <div className="row">
            <div className="col-6 flex-row">
                <h4 className="text-blue">Coal Hauling MHA Data DRAFT (Local DB)</h4>
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

export default TableCoalHaulingMHADraft

TableCoalHaulingMHADraft.propTypes = {
    timestamp: PropTypes.any,
    loaded: PropTypes.bool,
    setLoaded: PropTypes.any,
    handleEdit: PropTypes.any,
    handleSubmitToServer: PropTypes.any,
    sendingData: PropTypes.any
};
