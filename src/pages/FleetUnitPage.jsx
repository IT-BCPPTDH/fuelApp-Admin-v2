import { lazy, Suspense, useCallback, useState, useEffect } from 'react';
import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import { NavigateUrl } from "../utils/Navigation";
import { HeaderTitle, ButtonText } from '../utils/Wording';
import { useNavigate } from "react-router-dom";

const TableList = lazy(() => import('../components/TableList'))

const FleetUniPage = () => {

    const Navigate = useNavigate();
    const [items, setItems] = useState([]);

    const [columnData] = useState([
        { columnId: "key", headerLabel: "#", defaultWidth: 100 },
        { columnId: "entryDate", headerLabel: "Production Date", defaultWidth: 200 },
        { columnId: "shiftDay", headerLabel: "Shift Day", defaultWidth: 200 },
        { columnId: "shiftNight", headerLabel: "Shift Night", defaultWidth: 200 },
        { columnId: "lastUpdate", headerLabel: "Last Update", defaultWidth: 200 },
        { columnId: "actions", headerLabel: "Action:", defaultWidth: 400 },
      ])

    return(<>
        <HeaderPageForm
          title={HeaderTitle.FLEET_UNIT}
          urlCreate={NavigateUrl.FLEET_UNIT_DATA_ENTRY}
          urlBack={NavigateUrl.HOME}
          buttonText={ButtonText.FRM_FLEET_UNIT}
        />
        <div className="row">
          <div className="col-12">
            <Suspense fallback={<></>}>
              <TableList columnsData={columnData} items={items} backgroundColor={`#ffffff`} />
            </Suspense>
          </div>
        </div>
      </>)
}

export default FleetUniPage