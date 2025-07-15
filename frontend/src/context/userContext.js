// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const defaultUser = null;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  const isloggedin = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("user");
        localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isloggedin }}>
      {children}
    </UserContext.Provider>
  );
};
