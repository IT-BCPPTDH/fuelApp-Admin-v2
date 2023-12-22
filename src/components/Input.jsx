import * as React from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  useId,
  Input,
  Image
} from "@fluentui/react-components";
import { Button } from "@fluentui/react-components";
import Logo from '../images/dewa.png';

const { spacingVerticalXXS, spacingVerticalMNudge, spacingHorizontalMNudge, colorNeutralBackgroundInverted, colorNeutralForegroundInverted2 } = tokens;

const useStyles = makeStyles({
  base: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "450px",
    width: "100%",
  },
  field: {
    position: "relative",
    display: "grid",
    color: "green",
    gridRowGap: spacingVerticalXXS,
    marginTop: spacingVerticalMNudge,
    marginBottom: "0px", 
    ...shorthands.padding(spacingHorizontalMNudge),
  },
  label: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: spacingVerticalXXS, 
    color: "gray"
  },
  filledLighter: {
    backgroundColor: colorNeutralBackgroundInverted,
    "> label": {
      color: colorNeutralForegroundInverted2,
    },
  },
  filledDarker: {
    backgroundColor: colorNeutralBackgroundInverted,
    "> label": {
      color: colorNeutralForegroundInverted2,
    },
  },
  input: {
    width: "400px",
    "&::before": {
      borderBottomColor: "green", // Set the border-bottom color to green
    },
  },
  signInButton: {
    backgroundColor: "#7EBF56",
    color: "white",
    width: "88px",
    marginTop: "20px",
    justifyContent: "center",
    marginLeft: "318px"
  },
});

export const InputForm = () => {
  const underlineId1 = useId("input-underline1");
  const underlineId2 = useId("input-underline2");

  const styles = useStyles();
  
  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <Image alt='Darma Henwa' src={Logo} height={30} width={130} />
        <div className={styles.label}>Sign In</div>
      </div>
      <div className={styles.field}>
        <Input appearance="underline" id={underlineId1} placeholder="Username" className={styles.input} />
      </div>
      <div className={styles.field}>
        <Input appearance="underline" id={underlineId2} placeholder="Password" className={styles.input} />
      </div>
      <Button className={styles.signInButton}>Login</Button>
    </div>
      
  );
};
