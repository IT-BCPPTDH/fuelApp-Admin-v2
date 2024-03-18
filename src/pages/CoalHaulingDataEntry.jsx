import { lazy, 
  // useCallback, 
  // useState, 
  // useEffect, 
  Suspense } from "react";
// import InputHauling from "../components/Hauling/InputHauling";
// import CardDataHauling from "../components/Hauling/CardDataHauling";
// import TableHauling from "../components/Hauling/TableHauling";
import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import { NavigateUrl } from "../utils/Navigation";
import {FormMultiple28Regular} from "@fluentui/react-icons"
const FormUploadMHA = lazy(() => import("../components/Hauling/FormUploadMHA"))

export default function CoalHaulingDataEntry() {
  // const [dataEdit, setDataEdit] = useState();
  // const [postData, setPostData] = useState(true);
  // const [dataUpdated, setDataupdated] = useState(false)
  // const [dataId, setDataId] = useState()

  // const handleEdit = useCallback((data) => {
  //   try {
  //     setDataId(data.id)
  //     setDataEdit(data);
  //     setPostData(false);
  //   } catch (error) {
  //     console.error("Error handling edit:", error);
  //   }
  // }, [])

  // useEffect(() => {
  //   if (postData) {
  //     setDataEdit(null)
  //   }
  // }, [postData]);

  return (
    <>
      <HeaderPageForm
        title={`Import Data Coal Hauling MHA`}
        urlCreate={''}
        urlBack={NavigateUrl.COAL_HAULING_MAIN_TABLE}
        icon={<FormMultiple28Regular/>}
      />
      <div className="row">
        <div className="col-12">
          {/* <InputHauling
            dataId={dataId}
            dataEdit={dataEdit}
            postData={postData}
            setPostData={setPostData}
            setDataupdated={setDataupdated}
          /> */}
          <Suspense fallback={<></>}>
          <FormUploadMHA />
          </Suspense>
        </div>
        {/* <div className="col-5">
          <CardDataHauling dataUpdated={dataUpdated}/>
        </div>
        <div className="col-12">
          <TableHauling handleEdit={handleEdit} dataUpdated={dataUpdated} setDataupdated={setDataupdated} />
        </div> */}
      </div>
    </>
  );
}
