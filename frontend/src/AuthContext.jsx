import React, { createContext, useState, useContext } from "react";
import api from "./api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleUserData = async (email) => {
    const { data } = await api.post("/users/getIdByEmail", { email });
    localStorage.setItem("USER_DATA", data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER_DATA");
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, logout, handleUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
