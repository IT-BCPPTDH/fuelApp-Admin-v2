import { lazy, Suspense } from 'react';
import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import { NavigateUrl } from "../utils/Navigation";
import { HeaderTitle, ButtonText } from '../utils/Wording';
const TableCoalHauling = lazy(() => import('../components/Hauling/TableCoalHauling'))

export default function CoalHauling() {
  return (
    <>
     <HeaderPageForm
        title={HeaderTitle.COAL_HAULING}
        urlCreate={NavigateUrl.COAL_HAULING_DATA_ENTRY_FORM}
        urlBack={NavigateUrl.HOME} 
        buttonText={ButtonText.FRM_COAL_HAULING}
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
