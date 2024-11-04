import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const login = (userData, tokens) => {
    setUser({
      ...userData,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });
    navigate("/generator/create");
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  const isAuthenticated = () => {
    return !!user?.accessToken;
  };

  const getAccessToken = () => {
    return user?.accessToken;
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}api/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken: user?.refreshToken })
      });

      if (response.ok) {
        const data = await response.json();
        setUser((prev) => ({
          ...prev,
          accessToken: data.accessToken
        }));
        return data.accessToken;
      }
      logout();
      return null;
    } catch (error) {
      console.error("Token refresh error:", error);
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        getAccessToken,
        refreshAccessToken
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
