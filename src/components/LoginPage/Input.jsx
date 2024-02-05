import React, { useState, useRef, useEffect } from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  useId,
  Input,
  Image,
  Field,
  Button,
} from "@fluentui/react-components";
import Logo from "../../images/dewa.png";
import Cookies from "js-cookie";
import axios from "axios";

const {
  spacingVerticalXXS,
  spacingVerticalMNudge,
  spacingHorizontalMNudge,
  colorNeutralBackgroundInverted,
  colorNeutralForegroundInverted2,
} = tokens;

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
    color: "gray",
  },
  filledLighter: {
    backgroundColor: colorNeutralBackgroundInverted,
    "> label": {
      color: colorNeutralForegroundInverted2,
    },
  },
  filledError: {
    backgroundColor: "#ff9a9a",
    "> label": {
      color: "white",
    },
  },
  input: {
    width: "400px",
    "&::before": {
      borderBottomColor: "green",
    },
  },
  signInButton: {
    backgroundColor: "#7EBF56",
    color: "white",
    width: "88px",
    marginTop: "20px",
    justifyContent: "center",
    marginLeft: "318px",
  },
});

export const InputForm = () => {
  const underlineId1 = useId("input-underline1");
  const underlineId2 = useId("input-underline2");
  const [jde, setJde] = useState("");
  const [password, setPassword] = useState("");
  const [isJdeValid, setIsJdeValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const styles = useStyles();
  const passwordRef = useRef(null);
  const inputReference = useRef(null);

  const [state, setState] = useState({
    cursor: 0,
    result: [],
  });
  useEffect(() => {
    inputReference.current.focus();
  }, []);
  const handleLogin = async () => {
    try {
      if (!jde || !password) {
        setIsJdeValid(!!jde);
        setIsPasswordValid(!!password);
        return;
      }

      let response = await axios.post(
        `${import.meta.env.VITE_LINK_BACKEND}/auth/login`,
        { JDE: jde, password: password }
      );

      if (response.data.status === 200) {
        Cookies.set("token", response.data.jwt, { expires: 1 });
        Cookies.set("user", JSON.stringify(response.data.user), { expires: 1 });

        window.location.reload();
      } else {
        if (response.status === 401) {
          if (response.data.message === "Invalid Password") {
            setIsPasswordValid(false);
            setErrorMessage("Invalid password");
          } else {
            setErrorMessage("JDE or Password is Wrong");
          }
        } else {
          setErrorMessage("JDE  or Password is Wrong");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("JDE  or Password is Wrong");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleLogin();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      passwordRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.base}>
      <div className={styles.field}>
        <Image alt="Darma Henwa" src={Logo} height={30} width={130} />
        <div className={styles.label}>Sign In</div>
        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>
        )}
      </div>

      <div className={`${styles.field} ${isJdeValid ? "" : ""}`}>
        <Field validationMessage={isJdeValid ? "" : "JDE is required."}>
          <Input
            appearance="underline"
            id={underlineId1}
            placeholder="Enter JDE"
            className={styles.input}
            value={jde}
            ref={inputReference}
            onKeyPress={handleKeyPress}
            onChange={(e) => {
              const inputValue = e.target.value;
              const isValidInput = /^[a-zA-Z0-9]*$/.test(inputValue);

              if (isValidInput) {
                setJde(inputValue);
                setIsJdeValid(true);
                setErrorMessage(null);
              } else {
                setIsJdeValid(false);
                setErrorMessage("Invalid characters. Alphanumeric only.");
              }
            }}
          />
        </Field>
      </div>
      <div className={`${styles.field} ${isPasswordValid ? "" : ""}`}>
        <Field
          validationMessage={isPasswordValid ? "" : "Password is required."}
        >
          <Input
            appearance="underline"
            id={underlineId2}
            placeholder="Password"
            className={styles.input}
            type="password"
            value={password}
            ref={passwordRef}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordValid(true);
              setErrorMessage(null);
            }}
          />
        </Field>
      </div>

      <Button className={styles.signInButton} type="submit">
        Login
      </Button>
    </form>
  );
};
