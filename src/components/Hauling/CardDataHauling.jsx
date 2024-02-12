import React, {useState, useEffect } from "react";
import "./CoalHauling.css";
import {
  useId,
  makeStyles,
  Card,
} from "@fluentui/react-components";
import Transaksi from "../../services/inputCoalHauling";


const useStyles = makeStyles({
  caption: {
    fontSize: "16px",
    textAlign: "center",
  },
});

const CardDataHauling = () => {
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

  const [totalData, setTotalData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dts = await Transaksi.getDataTotal();
        console.log(dts);
     
        // setTotalData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <>
      <div className="form-wrapper" style={{marginBottom: '0'}}>
        <div className="card-base">
          <Card style={{ marginBottom: "10px" }} className="card-data-full">
            <span className={styles.card}>Total Hauling</span>
            <p className={styles.caption}>
              <b>
                {/* {totalData} <small>Ton</small> */}
              </b>
            </p>
          </Card>
          <div className="row">
            <div className="col-6">
              <Card className="card-data">
                <span className={styles.card}>Hauling To Hopper</span>
                <p className={styles.caption}>
                  <b>
                    747 <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
            <div className="col-6">
              <Card className="card-data">
                <span className={styles.card}>Hauling To OverFlow</span>
                <p className={styles.caption}>
                  <b>
                    747 <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
            <div className="col-6">
              <Card className="card-data">
                <span className={styles.card}>Hauling To ECF</span>
                <p className={styles.caption}>
                  <b>
                    747 <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
            <div className="col-6">
              <Card className="card-data">
                <span className={styles.card}>Hauling To MiddleStock</span>
                <p className={styles.caption}>
                  <b>
                    747 <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
            <div className="col-6">
              <Card className="card-data">
                <span className={styles.card}>Hauling To Sekurau</span>
                <p className={styles.caption}>
                  <b>
                    747 <small>Ton</small>
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
