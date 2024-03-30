import { useState, useEffect, useCallback } from "react";
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
  const [haulData, setHaulData] = useState({
    total: 0,
    hopper: 0,
    overflow: 0,
    ecf: 0,
    middleStock: 0,
    sekurau: 0,
  });

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
    const { tonnageByPitAndDumpingPoint, totalTonnage } = await calculateTonnage(dataArray);

    setHaulData({
      total: totalTonnage,
      hopper: tonnageByPitAndDumpingPoint[dumpingEnum.HOPPER] ?? 0,
      overflow: tonnageByPitAndDumpingPoint[dumpingEnum.OVERFLOW] ?? 0,
      ecf: tonnageByPitAndDumpingPoint[dumpingEnum.ECF] ?? 0,
      middleStock: tonnageByPitAndDumpingPoint[dumpingEnum.MIDDLE] ?? 0,
      sekurau: tonnageByPitAndDumpingPoint[dumpingEnum.SEKURAU] ?? 0,
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, dataUpdated]);

  return (
    <div className="form-wrapper" style={{ marginBottom: "0", marginTop: "0" }}>
      <h3>Total Tonnage Stats</h3>
      <div className="card-base">
        {Object.entries(haulData).map(([key, value]) => (
          <Card key={key} style={{ marginBottom: "10px" }} className="card-data-full">
            <span className={styles.card}>Total {key.charAt(0).toUpperCase() + key.slice(1)}</span>
            <p className={styles.caption}>
              <b>
                {value} <small>Ton</small>
              </b>
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

CardDataHauling.propTypes = {
  dataUpdated: PropTypes.bool,
};

export default CardDataHauling;
