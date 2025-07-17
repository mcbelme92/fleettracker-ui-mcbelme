import { BrowserRouter, useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { appRoutes } from "./routes";
import FullPageLoader from "../components/FullPageLoader";


function RoutesWrapper() {
  const element = useRoutes(appRoutes);
  return (
    <Suspense
      fallback={
        <FullPageLoader  />
      }
    >
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
