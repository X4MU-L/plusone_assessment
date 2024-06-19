import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import PublicRoutes from "./public-routes";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>{PublicRoutes}</Routes>
  </BrowserRouter>
);

export default AppRoutes;
