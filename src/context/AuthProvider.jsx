import { useMemo, useState, useEffect, createElement } from "react";
import Cookies from 'js-cookie';
import PropTypes from 'prop-types'
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {

  const [authen, setAuthen] = useState(() => {
    const userCookie = Cookies.get('token');
    return Boolean(userCookie);
  });

  useEffect(() => {
    const userCookie = Cookies.get('token');
    if (userCookie) {
      setAuthen(true);
    }
  }, []);

  const login = async (session_token, rdata) => {
    
    Cookies.set("token", session_token, { expires: 1 });
    Cookies.set("user", JSON.stringify(rdata), { expires: 1 });
  };

  const logout = () => {
    const cookieNames = Cookies.get();

    for (const cookieName in cookieNames) {
      Cookies.remove(cookieName);
    }

    localStorage.clear();
  };

  const value = useMemo(
    () => ({
      isLogged: !!authen,
      login,
      logout,
    }),
    
    [authen]
  );
  
  return createElement(AuthContext.Provider, { value: value }, children);
};

AuthProvider.propTypes = {
    children: PropTypes.any
}
