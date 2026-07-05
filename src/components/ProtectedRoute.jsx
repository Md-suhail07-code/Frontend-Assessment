import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("jwt_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const { exp } = jwtDecode(token);
    const isExpired = Date.now() >= exp * 1000;

    if (isExpired) {
      Cookies.remove("token");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    Cookies.remove("token");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;