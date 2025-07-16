// src/router/app.routes.tsx
import { lazy } from "react";
import { type RouteObject } from "react-router-dom";

const VehicleListView = lazy(() => import("../views/VehicleListView"));


export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <VehicleListView />,
  },
  
];
