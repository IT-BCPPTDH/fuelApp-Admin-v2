import { lazy, Suspense } from 'react';
import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import { NavigateUrl } from "../utils/Navigation";
const TableCoalHauling = lazy(() => import('../components/Hauling/TableCoalHauling'))

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
          <Suspense fallback={<></>}>
            <TableCoalHauling />
          </Suspense>
        </div>
      </div>
    </>
  );
}
