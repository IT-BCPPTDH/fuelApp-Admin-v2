import { useEffect, useState, useCallback } from "react";
import { TableList } from "../TableList";
import { getTimeEntryByformTitle } from "../../helpers/indexedDB/getData";
import PropTypes from "prop-types";
import { indonesianDate } from "../../helpers/convertDate";
import { TableButtonDialog } from "../TableButtonDialog";
import { CompoundButton } from '@fluentui/react-components'
import { SaveArrowRight24Regular } from '@fluentui/react-icons'
import { deleteTimeEntries } from "../../helpers/indexedDB/deteleData";
import { DialogComponent } from "../Dialog";

export const TableDataInputed = ({ formTitle, loaded, setLoaded, handleEdit, handleSubmitToServer, sendingData}) => {
    const [columnData] = useState([
        { columnId: "id", headerLabel: "ID", defaultWidth: 50 },
        { columnId: "unitno", headerLabel: "Unit No", defaultWidth: 200 },
        { columnId: "tanggal", headerLabel: "Tanggal", defaultWidth: 200 },
        { columnId: "shift", headerLabel: "Shift", defaultWidth: 200 },
        { columnId: "hmAwal", headerLabel: "HM Awal", defaultWidth: 200 },
        { columnId: "hmAkhir", headerLabel: "HM Akhir", defaultWidth: 200 },
        { columnId: "action", headerLabel: "Actions", defaultWidth: 200 },
    ]);

    const [itemsData, setItemData] = useState([]);
    const [open, setOpen] = useState(false);
    const [button2Disabled, setButton2Disabled] = useState(true)
    const [localData, setLocalData] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [showButton, setShowButton] = useState(true)

    const handleDelete = async (itemId) => {
        await deleteTimeEntries(itemId)
        setOpen(false)
    }

    const fetchData = useCallback(async () => {
        const data = await getTimeEntryByformTitle(formTitle);
      
        if (data.length > 0) {
            const dataTable = data.map((val) => ({
                id: val.id,
                unitno: val.unitNo,
                tanggal: indonesianDate(val.tanggal),
                shift: val.shift,
                hmAwal: val.hmAwal,
                hmAkhir: val.hmAkhir,
                actions: <TableButtonDialog handleEdit={handleEdit} handleDelete={handleDelete} open={open} setOpen={setOpen} itemId={val.id} />
            }));
       
            setItemData(dataTable);
            setButton2Disabled(false)
            setLocalData(data)
        }
    }, [open, handleEdit, formTitle]);

    const handleAction = useCallback(()=>{
        handleSubmitToServer(localData)
        
    },[handleSubmitToServer, localData])

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
        if(sendingData){
            setShowButton(false)
        } else {
            setShowButton(true)
            setOpenDialog(false)
        }
    }, [sendingData]);

    return <>
      <CompoundButton
          onClick={() => setOpenDialog(true)}
          icon={<SaveArrowRight24Regular primaryFill='#ffffff' />}
          iconPosition='after'
          size='small'
          style={{
            float: 'right',
            marginRight: '0',
            marginBottom: '1em',
            padding: '0 1.5em',
            backgroundColor: '#035bb6',
            color: '#fff'
          }}
          disabled={button2Disabled}
        >
          Submit data to server
        </CompoundButton>
        <TableList columnsData={columnData} items={itemsData} backgroundColor={`#ffffff`} />
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

TableDataInputed.propTypes = {
    formTitle: PropTypes.string,
    loaded: PropTypes.bool,
    setLoaded: PropTypes.any,
    handleEdit: PropTypes.any,
    handleSubmitToServer: PropTypes.func,
    sendingData: PropTypes.bool
};
