import React, { createContext, useCallback, useMemo, useRef } from "react";
import { token } from "../lib/auth/authAPI";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState(null);
  const [authError, setAuthError] = React.useState(null);
  const inFlightRefresh = useRef(null);

  const refreshToken = useCallback(() => {
    if (inFlightRefresh.current) return inFlightRefresh.current;

    const promise = (async () => {
      try {
        const response = await token();
        if (response && response.data.accessToken) {
          const decoded = jwtDecode(response.data.accessToken);
          setAccessToken(response.data.accessToken);
          setUser(decoded);
          setAuthError(null);
        } else {
          setAccessToken(null);
          setUser(null);
        }
      } catch (error) {
        // A failed refresh means the session is no longer valid - clear any
        // stale token/user instead of leaving them looking authenticated.
        setAccessToken(null);
        setUser(null);
        setAuthError(error?.message || "Sesi berakhir, silakan masuk kembali");
        throw error;
      } finally {
        inFlightRefresh.current = null;
      }
    })();

    inFlightRefresh.current = promise;
    return promise;
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      accessToken,
      setAccessToken,
      refreshToken,
      authError,
    }),
    [user, accessToken, refreshToken, authError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
