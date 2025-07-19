import { BrowserRouter, useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";

function RoutesWrapper() {
  const element = useRoutes(appRoutes);
  return element;
}

export default function AppRouter() {
  return (
    <BrowserRouter  future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
  }}>
      <RoutesWrapper />
    </BrowserRouter>
  );
}
