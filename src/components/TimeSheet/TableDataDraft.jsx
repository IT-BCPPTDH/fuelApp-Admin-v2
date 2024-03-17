import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import { getTimeEntryDraftByformTitle } from "../../helpers/indexedDB/getData";
import PropTypes from "prop-types";
import { indonesianDate } from "../../helpers/convertDate";
import { TableButtonDialog } from "../TableButtonDialog";
import { deleteTimeEntriesDRAFT } from "../../helpers/indexedDB/deteleData";
import { tableLocalStoredData } from "../../helpers/tableHelper";
import { Divider } from '@fluentui/react-components'
const TableList = lazy(() => import('../TableList'))

const TableDataDraft = ({ formTitle, loaded, setLoaded, handleEdit }) => {
    const [columnData] = useState(tableLocalStoredData);
    const [itemsData, setItemData] = useState([]);
    const [open, setOpen] = useState(false);

    const handleDelete = async (itemId) => {
        await deleteTimeEntriesDRAFT(itemId)
        setOpen(false)
    }

    const fetchData = useCallback(async () => {
        const data = await getTimeEntryDraftByformTitle(formTitle);
        if (data.length > 0) {
            const dataTable = data.map((val) => ({
                id: val.id,
                unitNo: val.unitNo,
                tanggal: indonesianDate(val.tanggal),
                shift: val.shift,
                hmAwal: val.hmAwal,
                hmAkhir: val.hmAkhir,
                
                actions: <TableButtonDialog handleEdit={handleEdit} handleDelete={handleDelete} open={open} setOpen={setOpen} itemId={val.id} />
            }));
            setItemData(dataTable);
        }
    }, [open, handleEdit, formTitle]);


    useEffect(() => {
        setItemData([])
        if (loaded) {
            fetchData();
            setLoaded(false);
        } else {
            fetchData();
        }
    }, [fetchData, loaded, setLoaded]);


    return <>
        <div className={`divider`}>
            <Divider />
        </div>
        <div className="row">
            <div className="col-6 flex-row">
                <h4 className="text-blue">Time Entry Data DRAFT (Local DB)</h4>
            </div>
            <div className="col-6">
            </div>
        </div>

        <Suspense fallback={<></>}>
            <TableList columnsData={columnData} items={itemsData} backgroundColor={`#ffffff`} />
        </Suspense>

    </>
};

export default TableDataDraft

TableDataDraft.propTypes = {
    formTitle: PropTypes.string,
    loaded: PropTypes.bool,
    setLoaded: PropTypes.any,
    handleEdit: PropTypes.any
};
