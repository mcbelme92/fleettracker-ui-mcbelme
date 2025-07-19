import { lazy, Suspense } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import FullPageLoader from "../shared/components/FullPageLoader";
const VehicleDetailView = lazy(() => import("../features/vehicles/views/VehicleDetailView"));
const VehicleListView = lazy(() => import("../features/vehicles/views/VehicleListView"));

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/vehicles" replace />,
  },
  {
    path: "/vehicles",
    element: (
      <Suspense fallback={<FullPageLoader text="Cargando lista de vehiculos" />}>
        <VehicleListView />
      </Suspense>
    ),
  },
  {
    path: "/vehicles/:id",
    element: (
      <Suspense fallback={<FullPageLoader text="Cargando detalle del vehículo..." />}>
        <VehicleDetailView />
      </Suspense>
    ),
  },
];
