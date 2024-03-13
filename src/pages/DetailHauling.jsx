import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import CardDataHaulingVertical from "../components/Hauling/CardDataHaulingVertical";
import TableDetailHauling from "../components/Hauling/TableDetailHauling";
import { NavigateUrl } from "../utils/Navigation";
import { useParams } from "react-router-dom";

const DetailHauling = () => {
  const value = useParams();
  return (
    <>
      <HeaderPageForm
        title={`Detail Data Coal Hauling : ${value.tanggal}`}
        urlCreate={NavigateUrl.COAL_HAULING_DATA_ENTRY_FORM}
        urlBack={NavigateUrl.COAL_HAULING_MAIN_TABLE}
      />
      <div className="row">
        <div className="col-12">
          <CardDataHaulingVertical />
        </div>
        <div className="col-12">
          <TableDetailHauling />
        </div>
      </div>
    </>
  );
};

export default DetailHauling;

