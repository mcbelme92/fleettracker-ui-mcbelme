// src/router/index.tsx
import { BrowserRouter, useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { appRoutes } from "./routes";

function RoutesWrapper() {
  const element = useRoutes(appRoutes);
  return (
    <Suspense fallback={<div>Cargando vista...</div>}>
      {element}
    </Suspense>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <RoutesWrapper />
    </BrowserRouter>
  );
}
