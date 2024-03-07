import  { useState, useEffect } from 'react';
import "./CoalHauling.css";
import { makeStyles, Card } from "@fluentui/react-components";
import Transaksi from "../../services/inputCoalHauling";
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
  const [totalData, setTotalData] = useState(0);
  const [dataHopper, setDataHopper] = useState(0);
  const [dataOverflow, setDataOverflow] = useState(0);
  const [dataECF, setDataECF] = useState(0);
  const [dataMiddleStock, setDataMiddleStock] = useState(0);
  const [dataSekurau, setDataSekurau] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCard = await Transaksi.getDataTotal(value.tanggal);
        console.log(dataCard.result[0].total);

        const dataHopper = await Transaksi.getDataHopper(value.tanggal);
        

        const dataOverflow = await Transaksi.getDataOverflow(value.tanggal);
        // console.log(dataOverflow);

        const dataECF = await Transaksi.getDataECF(value.tanggal);
        // console.log(dataECF);

        const dataMiddleStock = await Transaksi.getDataMiddleStock(value.tanggal);
        // console.log(dataMiddleStock);

        const dataSekurau = await Transaksi.getDataSekurau(value.tanggal);
        // console.log(dataSekurau);

        setTotalData(dataCard.result[0].total ?? 0);
        setDataHopper(dataHopper.result[0].total ?? 0);
        setDataOverflow(dataOverflow.result[0].total ?? 0);
        setDataECF(dataECF.result[0].total ?? 0);
        setDataMiddleStock(dataMiddleStock.result[0].total ?? 0);
        setDataSekurau(dataSekurau.result[0].total ?? 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [value.tanggal]);


  return (
    <>
      <div className="form-wrapper" style={{ marginBottom: "0" }}>
        <div className="card-base">
          <Card style={{ marginBottom: "10px" }} className="card-data-full">
            <span className={styles.card}>Total Hauling</span>
            <p className={styles.caption}>
              <b>
                {totalData} <small>Ton</small>
              </b>
            </p>
          </Card>
          <div className="row">
            <div className="col-12">
              <Card className="card-data">
                <span className={styles.card}>Hauling To Hopper</span>
                <p className={styles.caption}>
                  <b>
                    {dataHopper} <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
            <div className="col-12">
              <Card className="card-data">
                <span className={styles.card}>Hauling To OverFlow</span>
                <p className={styles.caption}>
                  <b>
                    {dataOverflow} <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
            <div className="col-12">
              <Card className="card-data">
                <span className={styles.card}>Hauling To ECF</span>
                <p className={styles.caption}>
                  <b>
                    {dataECF} <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
            <div className="col-12">
              <Card className="card-data">
                <span className={styles.card}>Hauling To MiddleStock</span>
                <p className={styles.caption}>
                  <b>
                    {dataMiddleStock} <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
            <div className="col-12">
              <Card className="card-data">
                <span className={styles.card}>Hauling To Sekurau</span>
                <p className={styles.caption}>
                  <b>
                    {dataSekurau} <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDataHaulingVertical;
