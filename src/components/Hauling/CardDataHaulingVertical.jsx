import { useState, useEffect } from 'react';
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
    totalHaulong: 0,
    totalHopper: 0,
    totalOverflow: 0,
    totalECF: 0,
    totalMiddlestock: 0,
    totalSekurau: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataTypes = [
          "getTotalHauling",
          "getTotalHopper",
          "getTotalOverflow",
          "getTotalECF",
          "getTotalMiddlestock",
          "getTotalSekurau"
        ];

        const fetchedData = await Promise.all(
          dataTypes.map(type => CoalHaulingMHA[type](value.tanggal))
        );

        const newData = Object.fromEntries(
          fetchedData.map((result, index) => [
            dataTypes[index].replace('getTotal', '').toLowerCase(),
            result.result[0].total ?? 0,
          ])
        );

        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [value.tanggal]);

  return (
    <div className="form-wrapper" style={{ marginBottom: 0, marginTop: 0 }}>
      <div className="card-base">
        {Object.keys(data).map((type, index) => (
          <div key={index} className='tes'>
            <Card className="card-data">
              <span className={styles.card}>{type === 'hauling' ? 'Total Hauling' : type === 'hopper' ? `Total ${type}` : `Hauling To ${type}`}</span>
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