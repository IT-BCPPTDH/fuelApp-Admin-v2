import { createContext } from "react";

 const AuthContext = createContext({
  isLogged: false,
  login: () => { },
  logout: () => { },
});

export default AuthContext