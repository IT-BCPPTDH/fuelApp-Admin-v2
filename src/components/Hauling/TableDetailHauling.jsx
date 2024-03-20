import { useEffect, useRef } from "react";
import { Button } from "@fluentui/react-components";
import { ArrowDownload24Regular } from "@fluentui/react-icons";
import { useParams } from "react-router-dom";
import { URL_ENUMS } from "../../utils/Enums";
import { indonesianDate } from "../../helpers/convertDate";
import { colHelperDetailCoalHauling } from "../../helpers/columnHelper";
import jspreadsheet from 'jspreadsheet-ce'
import CoalHaulingMHA from "../../services/CoalHaulingMHA";

const TableDetailHauling = () => {

  const params = useParams();
  const jRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataAll = await CoalHaulingMHA.getDataHaulingByDate(params.tanggal);
        const dataTable = dataAll.data.map((item) => ([
          indonesianDate(new Date(item.tanggal)),
          item.shift,
          item.unit,
          item.operator,
          item.tonnage,
          item.loader,
          item.pit,
          item.seam,
          item.dumping,
          item.in_rom,
          item.time_hauling
        ]))
        jRef.current.jspreadsheet.setData(dataTable)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.tanggal]);

  const handleDownload = async () => {
    try {
      const downloadData = await CoalHaulingMHA.downloadExcel(params.tanggal);
      window.location.href = URL_ENUMS.downloadFile + downloadData.link;
    } catch (error) {
      console.error("Error downloading data:", error);
    }
  };

  useEffect(() => {
    const width = screen.width;
    const options = {
      lazyLoading: true,
      loadingSpin: true,
      columns: colHelperDetailCoalHauling,
      minDimensions: [5, 12],
      tableHeight: '500px',
      tableWidth: `${(width * 87) / 100}px`,
      tableOverflow: true,
      allowInsertColumn: false,
      editable: false
    };

    if (!jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options);
    }
  }, []);

  return (
    <>
      <div className="form-wrapper" style={{ marginTop: 0 }}>
        <div className="row">
          <div className="col-6 flex-row">
            <h3 className="mb-0">Detail Data</h3>
          </div>
          <div className="col-6">
            <div className="search-box">
              <Button
                icon={<ArrowDownload24Regular />}
                iconPosition="after"
                onClick={() => handleDownload()}
                style={{ backgroundColor: "#28499c", color: "#ffffff" }}>
                Download
              </Button>
            </div>
          </div>
        </div>

        <div ref={jRef} className='mt1em' />
      </div>
    </>
  );
};

export default TableDetailHauling;
