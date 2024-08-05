import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children, restricted }) => {
  const token = localStorage.getItem("TOKEN");
  return token && restricted ? <Navigate to="/" /> : children;
};

export default PublicRoute;
