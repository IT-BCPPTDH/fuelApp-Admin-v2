import { useCallback, useState, useEffect } from "react";
import InputHauling from "../components/Hauling/InputHauling";
import CardDataHauling from "../components/Hauling/CardDataHauling";
import TableHauling from "../components/Hauling/TableHauling";
import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import { NavigateUrl } from "../utils/Navigation";

export default function CoalHaulingDataEntry() {
  const [dataEdit, setDataEdit] = useState();
  const [postData, setPostData] = useState(true);
  const [dataUpdated, setDataupdated] = useState(false)
  const [dataId, setDataId] = useState()

  const handleEdit = useCallback((data) => {
    try {
      setDataId(data.id)
      setDataEdit(data);
      setPostData(false);
    } catch (error) {
      console.error("Error handling edit:", error);
    }
  }, [])

  useEffect(() => {
    if (postData) {
      setDataEdit(null)
    }
  }, [postData]);

  return (
    <>
      <HeaderPageForm
        title={`Data Entry Coal Hauling`}
        urlCreate={''}
        urlBack={NavigateUrl.COAL_HAULING_MAIN_TABLE}
      />
      <div className="row">
        <div className="col-7">
          <InputHauling
            dataId={dataId}
            dataEdit={dataEdit}
            postData={postData}
            setPostData={setPostData}
            setDataupdated={setDataupdated}
          />
        </div>
        <div className="col-5">
          <CardDataHauling dataUpdated={dataUpdated}/>
        </div>
        <div className="col-12">
          <TableHauling handleEdit={handleEdit} dataUpdated={dataUpdated} setDataupdated={setDataupdated} />
        </div>
      </div>
    </>
  );
}
