import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("portfolioUser");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (storedUser && accessToken) {
      setUser({
        ...JSON.parse(storedUser),
        accessToken,
        refreshToken,
      });
    }
  }, []);

  const login = (userData, tokens) => {
    setUser({
      ...userData,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
    localStorage.setItem("portfolioUser", JSON.stringify(userData));
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);

    navigate("/generator/create");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("portfolioUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/login");
  };

  const isAuthenticated = () => {
    return !!user?.accessToken || localStorage.getItem("accessToken") !== null;
  };

  const getAccessToken = () => {
    return user?.accessToken || localStorage.getItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const contextAuth = useContext(AuthContext);
  if (!contextAuth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return contextAuth;
};
