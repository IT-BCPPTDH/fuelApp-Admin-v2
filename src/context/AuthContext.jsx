import { createContext, useMemo, useState, useEffect, createElement } from "react";
import { useCookie } from "../hooks/useCookie";
import useLocalStorage from "../hooks/useLocalStorage";
import PropTypes from 'prop-types'

export const AuthContext = createContext({
  profile: {
    username: "...",
    avatar: "https://avatars.dicebear.com/api/jdenticon/formshet.svg?background=%230000ff",
  },
  isLogged: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useCookie("db_token");
  const [localProfile, setLocalProfile] = useLocalStorage("db_profile", null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (localProfile) {
      setProfile({
        username: localProfile?.username,
        avatar: `https://api.dicebear.com/5.x/fun-emoji/svg?seed=${localProfile?.username}`,
      });
    }
  }, [localProfile]);

  const login = async (data, profile) => {
    setUserToken(data);
    setLocalProfile(profile);
  };

  const logout = () => {
    setUserToken(null);
  };

  const value = useMemo(
    () => ({
      isLogged: !!userToken,
      profile,
      login,
      logout,
    }),
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userToken, profile]
  );
  
  return createElement(AuthContext.Provider, { value: value }, children);
};

AuthProvider.propTypes = {
    children: PropTypes.any
}
