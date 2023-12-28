import * as React from "react";
import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";
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
  const [jde, setJde] = useState(""); 
  const [password, setPassword] = useState("");
  // const navigate = useNavigate(); 
  const styles = useStyles();

  const handleLogin = async () => {
    try {
      let response = await axios.post(`${import.meta.env.VITE_LINK_BACKEND}/auth/login`,{JDE:jde,password:password})
      
      if (response.status === 200) {
        Cookies.set('token', response.data.jwt, { expires: 1 });
        Cookies.set('user', JSON.stringify(response.data.user), { expires: 1 });
        
        window.location.reload()
      } else {
        console.error("Gagal Masuk");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <Image alt='Darma Henwa' src={Logo} height={30} width={130} />
        <div className={styles.label}>Sign In</div>
      </div>
      <div className={styles.field}>
        <Input
          appearance="underline"
          id={underlineId1}
          placeholder="Enter JDE"
          className={styles.input}
          value={jde}
          onChange={(e) => setJde(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <Input
          appearance="underline"
          id={underlineId2}
          placeholder="Password "
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button className={styles.signInButton} onClick={handleLogin}>
        Login
      </Button>
    </div>
      
  );
};
