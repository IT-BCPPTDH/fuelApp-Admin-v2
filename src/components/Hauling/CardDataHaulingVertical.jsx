import { useState, useEffect, useCallback } from 'react';
import "./CoalHauling.css";
import { makeStyles, Card } from "@fluentui/react-components";
import CoalHaulingMHA from '../../services/CoalHaulingMHA';
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  caption: {
    fontSize: "16px",
    textAlign: "center",
  },
});

const CardDataHaulingVertical = () => {
  const value = useParams();
  const styles = useStyles();

  const [data, setData] = useState({
    totalHauling: 0,
    totalHopper: 0,
    totalOverflow: 0,
    totalECF: 0,
    totalMiddlestock: 0,
    totalSekurau: 0,
  });

  const fetchData = useCallback(async () => {
    try {
    
      const fetchDataTotal = await CoalHaulingMHA.getTotalStatistic(value.tanggal, value.sentAt);

      const newData = {
        totalHauling: fetchDataTotal.data.totalHauling.total ?? 0,
        totalHopper: fetchDataTotal.data.totalHopper.total ?? 0,
        totalOverflow: fetchDataTotal.data.totalOverflow.total ?? 0,
        totalECF: fetchDataTotal.data.totalECF.total ?? 0,
        totalMiddlestock: fetchDataTotal.data.totalMiddlestock.total ?? 0,
        totalSekurau: fetchDataTotal.data.totalSekurau.total ?? 0,
      };

      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [value]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="form-wrapper" style={{ marginBottom: 0, marginTop: 0 }}>
      <div className="card-base">
        {Object.keys(data).map((type, index) => (
          <div key={index} className='tes'>
            <Card className="card-data">
            <span className={styles.card}>{type === 'totalHauling' ? 'Total Hauling' : type === 'totalHopper' ? 'Total Hopper' : type === 'totalOverflow' ? 'Total Overflow' : type === 'totalECF' ? 'Total ECF' : type === 'totalMiddlestock' ? 'Total Middlestock' : 'Total Sekurau'}</span>
              <p className={styles.caption}>
                <b>
                  {data[type]} <small>Ton</small>
                </b>
              </p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDataHaulingVertical;
