import React from "react";
import "./CoalHauling.css";
import {
  useId,
  makeStyles,
  Card,
  CardHeader,
} from "@fluentui/react-components";
import FormComponent from "../FormComponent";

const useStyles = makeStyles({
  card: {
    // width: "160px",
    // height: "30px",
    marginTop: "-7px",
  },
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

  return (
    <>
      <p>
        <small>View Data</small>
      </p>
      {/* <div className="form-wrapper">
        <div className={styles.card}>
          {datacard.map((v, i) => (
            <Card style={{ marginBottom: "5px" }}>
              <div className={styles.caption}>
                <FormComponent components={[v]} />
              </div>
            </Card>
          ))}
        </div>
      </div> */}
      <div className="form-wrapper">
        <div className="card-base">
          {/* {datacard.map((v, i) => (
            <Card style={{ marginBottom: "5px", grid:"auto-flow / 1fr 1fr 1fr;" }} className={styles.card}>
              <div className={styles.caption}>
                <FormComponent components={[v]} />
              </div>
            </Card>
          ))} */}
          <Card style={{ marginBottom: "3px" }} className="card-data-full">
            <span className={styles.card}>Total Hauling</span>
            <p className={styles.caption}>
              <b>
                747 <small>Ton</small>
              </b>
            </p>
          </Card>
          <div className="row">
            <div className="col-6">
              <Card className="card-data">
                <span className={styles.card}>Total Hauling</span>
                <p className={styles.caption}>
                  <b>
                    747 <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
            <div className="col-6">
              <Card className="card-data">
                <span className={styles.card}>Total Hauling</span>
                <p className={styles.caption}>
                  <b>
                    747 <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
            <div className="col-6">
              <Card className="card-data">
                <span className={styles.card}>Total Hauling</span>
                <p className={styles.caption}>
                  <b>
                    747 <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
            <div className="col-6">
              <Card className="card-data">
                <span className={styles.card}>Total Hauling</span>
                <p className={styles.caption}>
                  <b>
                    747 <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
            <div className="col-6">
              <Card className="card-data">
                <span className={styles.card}>Total Hauling</span>
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
