import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import TableDetailHauling from "../components/Hauling/TableDetailHauling";
import { NavigateUrl } from "../utils/Navigation";

const DetailHauling = () => {
  return (
    <>
      <HeaderPageForm 
        title={`Detail Tanggal 12/01/2024`} 
        urlCreate={NavigateUrl.COAL_HAULING_DATA_ENTRY_FORM} 
        urlBack={NavigateUrl.COAL_HAULING_MAIN_TABLE} 
      />
      <div className="row">
        <div className="col-12">
            <TableDetailHauling/>
        </div>
      </div>
    </>
  );
};

export default DetailHauling;
