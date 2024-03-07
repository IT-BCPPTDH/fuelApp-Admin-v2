import { useState, useEffect, useCallback } from "react";
import "./CoalHauling.css";
import { makeStyles, Card } from "@fluentui/react-components";
import { getDataTableHauling } from "../../helpers/indexedDB/getData";
import { dumpingEnum } from "../../utils/Enums";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  caption: {
    fontSize: "16px",
    textAlign: "center",
  },
});

const CardDataHauling = ({ dataUpdated }) => {
  const styles = useStyles();

  const [totalData, setTotalData] = useState(0);
  const [dataHopper, setDataHopper] = useState(0);
  // const [dataOverflow, setDataOverflow] = useState(0);
  const [dataECF, setDataECF] = useState(0);
  const [dataMiddleStock, setDataMiddleStock] = useState(0);
  const [dataSekurau, setDataSekurau] = useState(0);

  const calculateTonnage = async (data) => {
    const tonnageByPitAndDumpingPoint = {};
    let totalTonnage = 0;

    data.forEach((entry) => {
      const { dumpingpoint, tonnage } = entry;

      const key = `${dumpingpoint}`;
      tonnageByPitAndDumpingPoint[key] =
        (tonnageByPitAndDumpingPoint[key] || 0) + parseInt(tonnage, 10);

      totalTonnage += parseInt(tonnage, 10);
    });

    return { tonnageByPitAndDumpingPoint, totalTonnage };
  };


  const fetchData = useCallback(async () => {

    const dataArray = await getDataTableHauling();
    const { tonnageByPitAndDumpingPoint, totalTonnage } =
      await calculateTonnage(dataArray);

    setTotalData(totalTonnage);
    setDataHopper(tonnageByPitAndDumpingPoint[dumpingEnum.HOPPER] ?? 0);
    // setDataOverflow(tonnageByPitAndDumpingPoint[dumpingEnum.OVERFLOW] ?? 0);
    setDataECF(tonnageByPitAndDumpingPoint[dumpingEnum.ECF] ?? 0);
    setDataMiddleStock(tonnageByPitAndDumpingPoint[dumpingEnum.MIDDLE] ?? 0);
    setDataSekurau(tonnageByPitAndDumpingPoint[dumpingEnum.SEKURAU] ?? 0);
  }, []);

  useEffect(() => {
    if (dataUpdated) {
      fetchData();
    }

    fetchData();
  }, [fetchData, dataUpdated]);

  
  return (
    <>
      <div
        className="form-wrapper"
        style={{ marginBottom: "0", marginTop: "0" }}>
        <div className="card-base">
          <Card style={{ marginBottom: "10px" }} className="card-data-full">
            <span className={styles.card}>Total Hauling</span>
            <p className={styles.caption}>
              <b>
                {totalData} <small>Ton</small>
              </b>
            </p>
          </Card>
          <Card style={{ marginBottom: "10px" }} className="card-data-full">
            <span className={styles.card}>Total Hopper</span>
            <p className={styles.caption}>
              <b>
                {dataHopper} <small>Ton</small>
              </b>
            </p>
          </Card>
          <Card style={{ marginBottom: "10px" }} className="card-data-full">
            <span className={styles.card}>Hauling To ECF</span>
            <p className={styles.caption}>
              <b>
                {dataECF} <small>Ton</small>
              </b>
            </p>
          </Card>
          <Card style={{ marginBottom: "10px" }} className="card-data-full">
            <span className={styles.card}>Hauling To MiddleStock</span>
            <p className={styles.caption}>
              <b>
                {dataMiddleStock} <small>Ton</small>
              </b>
            </p>
          </Card>
          <Card style={{ marginBottom: "10px" }} className="card-data-full">
            <span className={styles.card}>Hauling To Sekurau</span>
            <p className={styles.caption}>
              <b>
                {dataSekurau} <small>Ton</small>
              </b>
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CardDataHauling;

CardDataHauling.propTypes = {
  dataUpdated: PropTypes.bool,
};
