import { useState } from "react";
import InputHauling from "../components/Hauling/InputHauling";
import CardDataHauling from "../components/Hauling/CardDataHauling";
import TableHauling from "../components/Hauling/TableHauling";
import Transaksi from "../services/inputCoalHauling";
import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import { NavigateUrl } from "../utils/Navigation";
import { updateFormDataHauling } from "../helpers/indexedDB/editData";

export default function CoalHaulingDataEntry() {
  const [dataEdit, setDataEdit] = useState();
  const [postData, setPostData] = useState(true);
  const [tid, setTid] = useState();

  const handleEdit = async (data) => {
    try {
      // setTid(id.label);
      console.log(data)
      
   
      setDataEdit(data);
      setPostData(false);
    } catch (error) {
      console.error("Error handling edit:", error);
  
     
    }
  };
  
  

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
            tid={tid}
            dataEdit={dataEdit}
            postData={postData}
            setPostData={setPostData}
          />
        </div>
        <div className="col-5">
          <CardDataHauling />
        </div>
        <div className="col-12">
          <TableHauling handleEdit={handleEdit} />
        </div>
      </div>
    </>
  );
}
