import  { useState, useEffect, useCallback } from 'react';
import "./CoalHauling.css";
import { makeStyles, Card } from "@fluentui/react-components";
import Transaksi from "../../services/inputCoalHauling";

const useStyles = makeStyles({
  caption: {
    fontSize: "16px",
    textAlign: "center",
  },
});

const CardDataHauling = () => {

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getTodayDateString = useCallback(() => {
    const today = new Date();
    return formatDate(today);
  },[]);

  const styles = useStyles();

  const [totalData, setTotalData] = useState();
  const [dataHopper, setDataHopper] = useState();
  const [dataOverflow, setDataOverflow] = useState();
  const [dataECF, setDataECF] = useState();
  const [dataMiddleStock, setDataMiddleStock] = useState();
  const [dataSekurau, setDataSekurau] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dateToday = getTodayDateString();
        const dataCard = await Transaksi.getDataTotal(dateToday);
        console.log(11,dataCard)
        console.log(dataCard.result[0].total);

        const dataHopper = await Transaksi.getDataHopper(dateToday);
        console.log(dataHopper);

        const dataOverflow = await Transaksi.getDataOverflow(dateToday);
        console.log(dataOverflow);

        const dataECF = await Transaksi.getDataECF(dateToday);
        console.log(dataECF);

        const dataMiddleStock = await Transaksi.getDataMiddleStock(dateToday);
        console.log(dataMiddleStock);

        const dataSekurau = await Transaksi.getDataSekurau(dateToday);
        console.log(dataSekurau);

        setTotalData(dataCard.result[0].total);
        setDataHopper(dataHopper);
        setDataOverflow(dataOverflow);
        setDataECF(dataECF);
        setDataMiddleStock(dataMiddleStock);
        setDataSekurau(dataSekurau);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getTodayDateString]);


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
            <div className="col-6">
              <Card className="card-data">
                <span className={styles.card}>Hauling To OverFlow</span>
                <p className={styles.caption}>
                  <b>
                    {dataOverflow} <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
            <div className="col-6">
              <Card className="card-data">
                <span className={styles.card}>Hauling To ECF</span>
                <p className={styles.caption}>
                  <b>
                    {dataECF} <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
            <div className="col-6">
              <Card className="card-data">
                <span className={styles.card}>Hauling To MiddleStock</span>
                <p className={styles.caption}>
                  <b>
                    {dataMiddleStock} <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
            <div className="col-6">
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

export default CardDataHauling;
