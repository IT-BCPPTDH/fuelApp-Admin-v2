import TableCoalHauling from "../components/Hauling/TableCoalHauling";
import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import { NavigateUrl } from "../utils/Navigation";

export default function CoalHauling() {
  return (
    <>
      <HeaderPageForm
        title={`Coal Hauling`}
        urlCreate={NavigateUrl.COAL_HAULING_DATA_ENTRY_FORM}
        urlBack={NavigateUrl.HOME} 
      />
      <div className="row">
        <div className="col-12">
          <TableCoalHauling />
        </div>
      </div>
    </>
  );
}
