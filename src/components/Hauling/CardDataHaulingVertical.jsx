import React, { useState, useEffect } from 'react';
import "./CoalHauling.css";
import { useId, makeStyles, Card } from "@fluentui/react-components";
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
  const datacard = [
    {
      InputId: useId("totalhauling"),
      grid: "col-12",
      label: "Total Hauling",
      value: 451,
      type: "TextDataView",
      grid: "col-12",
    },
    {
      InputId: useId("haulingtohopper"),
      grid: "col-6",
      label: "Hauling To Hopper",
      value: 451,
      type: "TextDataView",
      grid: "col-6",
    },
    {
      InputId: useId("haulingtooverflow"),
      grid: "col-6",
      label: "Hauling To OverFlow",
      value: 451,
      type: "TextDataView",
      grid: "col-6",
    },
    {
      InputId: useId("haulingtoecf"),
      grid: "col-6",
      label: "Hauling To ECF",
      value: 451,
      type: "TextDataView",
      grid: "col-12",
    },
    {
      InputId: useId("haulingtomiddlestock"),
      grid: "col-6",
      label: "Hauling To MiddleStock",
      value: 451,
      type: "TextDataView",
      grid: "col-12",
    },
    {
      InputId: useId("haulingtosekurau"),
      grid: "col-6",
      label: "Hauling To Sekurau",
      value: 451,
      type: "TextDataView",
      grid: "col-12",
    },
  ];

  const styles = useStyles();
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const [totalData, setTotalData] = useState();
  const [dataHopper, setDataHopper] = useState();
  const [dataOverflow, setDataOverflow] = useState();
  const [dataECF, setDataECF] = useState();
  const [dataMiddleStock, setDataMiddleStock] = useState();
  const [dataSekurau, setDataSekurau] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCard = await Transaksi.getDataTotal(value.tanggal);
        console.log(dataCard.result[0].total);

        const dataHopper = await Transaksi.getDataHopper(value.tanggal);
        console.log(dataHopper);

        const dataOverflow = await Transaksi.getDataOverflow(value.tanggal);
        console.log(dataOverflow);

        const dataECF = await Transaksi.getDataECF(value.tanggal);
        console.log(dataECF);

        const dataMiddleStock = await Transaksi.getDataMiddleStock(value.tanggal);
        console.log(dataMiddleStock);

        const dataSekurau = await Transaksi.getDataSekurau(value.tanggal);
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
  }, []);


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

export default CardDataHaulingVertical;
