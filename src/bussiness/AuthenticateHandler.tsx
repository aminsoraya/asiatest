import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthenticateHandler() {
  let token = localStorage.getItem("asia_token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
