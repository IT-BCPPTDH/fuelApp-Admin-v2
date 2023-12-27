import * as React from "react";
import {
  makeStyles,
  Body1,
  shorthands,
} from "@fluentui/react-components";
import { Card, CardHeader } from "@fluentui/react-components";
import { InputForm } from "./Input";

const { margin } = shorthands;

const useStyles = makeStyles({
  fluentProvider: {
    marginTop: "200px",
  },
  card: {
    ...margin("auto"),
    marginLeft: "480px",
    width: "450px",
    backgroundColor: "#e3f3ff", 
    position: "absolute",
    justifyContent:"center",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)", 

  },
});
export const Loginpage = () => {
  const styles = useStyles();

  return (
    <>
        <div className={styles.fluentProvider}>
      <Card className={styles.card}>
        <CardHeader
          header={
            <Body1>
              <InputForm />
            
            </Body1>
          }
        />
      </Card>
   
    </div>
   
    </>

      
  );
};
