import { useEffect, useState, useCallback } from "react";
import { TableList } from "../TableList";
import { getTimeEntryByformTitle } from "../../helpers/indexedDB/getData";
import PropTypes from "prop-types";
import { indonesianDate } from "../../helpers/convertDate";
import { TableButtonDialog } from "../TableButtonDialog";

export const TableDataInputed = ({ formTitle, loaded, setLoaded, handleEdit }) => {
    const [columnData] = useState([
        { columnId: "id", headerLabel: "ID", defaultWidth: 50 },
        { columnId: "unitNo", headerLabel: "Unit No", defaultWidth: 200 },
        { columnId: "tanggal", headerLabel: "Tanggal", defaultWidth: 200 },
        { columnId: "shift", headerLabel: "Shift", defaultWidth: 200 },
        { columnId: "hmAwal", headerLabel: "HM Awal", defaultWidth: 200 },
        { columnId: "hmAkhir", headerLabel: "HM Akhir", defaultWidth: 200 },
        { columnId: "action", headerLabel: "Actions", defaultWidth: 200 },
    ]);

    const [itemsData, setItemData] = useState([]);
    const [open, setOpen] = useState(false);


    const handleDelete = (itemId) => {
        console.log(itemId)
    }

    const fetchData = useCallback(async (title) => {
        const data = await getTimeEntryByformTitle(title);

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
    }, [open, handleEdit]);

    useEffect(() => {
        setItemData([])
        if (loaded) {
            fetchData();
            setLoaded(false);
        } else {
            fetchData(formTitle);
        }
    }, [fetchData, loaded, setLoaded, formTitle]);

    return <TableList columnsData={columnData} items={itemsData} backgroundColor={`#ffffff`} />;
};

TableDataInputed.propTypes = {
    formTitle: PropTypes.string,
    loaded: PropTypes.bool,
    setLoaded: PropTypes.any,
    handleEdit: PropTypes.any
};
