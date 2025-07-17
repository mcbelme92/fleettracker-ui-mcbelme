// src/router/app.routes.tsx
import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import VehicleDetailView from "../views/VehicleDetailView";

const VehicleListView = lazy(() => import("../views/VehicleListView"));


export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/vehicles" replace />,
  },
  {
    path: "/vehicles",
    element: <VehicleListView />,
  },
  {
  path: "/vehicles/:id",
  element: <VehicleDetailView />,
}
  
];
