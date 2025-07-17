import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

const defaultUser = null;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
    const token = localStorage.getItem("token");


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const profilepic=()=>{
    
  }

  const isloggedin = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return true;
    }
    return false;
  };

  const logout = () => {
   localStorage.clear();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isloggedin,token }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  return useContext(UserContext);
};