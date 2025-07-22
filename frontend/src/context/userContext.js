import { createContext, useState, useEffect, useContext } from "react";
import {  useNavigate } from "react-router-dom";

export const UserContext = createContext();

const defaultUser = null;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
    const token = localStorage.getItem("token");
    const navigate=useNavigate()
  const baseUrl = process.env.REACT_APP_BACKEND_URI;


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
   localStorage.clear();
    navigate("/home")
    setUser(null);
  };
    const isAuthenticated = !!user;


  return (
    <UserContext.Provider value={{ user,isAuthenticated, login, logout,baseUrl, isloggedin,token }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  return useContext(UserContext);
};