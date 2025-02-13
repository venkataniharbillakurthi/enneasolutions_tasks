import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) login(token);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = parseJwt(token);
    if (decoded && (!decoded.exp || decoded.exp * 1000 > Date.now())) {
      setUserRole(decoded.role);
      setUserId(decoded.sub || decoded.id);
      setIsAuthenticated(true);
    } else logout();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null);
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) return logout(), false;

    const decoded = parseJwt(token);
    if (!decoded || (decoded.exp && decoded.exp * 1000 < Date.now())) return logout(), false;

    setUserRole(decoded.role);
    setUserId(decoded.sub || decoded.id);
    setIsAuthenticated(true);
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userId, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
