import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import CardDataHaulingVertical from "../components/Hauling/CardDataHaulingVertical";
import TableDetailHauling from "../components/Hauling/TableDetailHauling";
import { NavigateUrl } from "../utils/Navigation";
import { useParams } from "react-router-dom";
import { ButtonText } from "../utils/Wording";
import { useState, useEffect } from "react";

const DetailHauling = () => {
  const value = useParams();
  const [dateTitle, setDateTitke] = useState()

  useEffect(() => {
    const parseDate = () => {
      const splitDate = value.tanggal.split("+")
      setDateTitke(splitDate[1])
    }

    parseDate()

  }, [value.tanggal]);

  return (
    <>
      <HeaderPageForm
        title={`Detail Data Coal Hauling : ${dateTitle} `}
        urlCreate={NavigateUrl.COAL_HAULING_DATA_ENTRY_FORM}
        urlBack={NavigateUrl.COAL_HAULING_MAIN_TABLE}
        buttonText={ButtonText.FRM_COAL_HAULING}
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

