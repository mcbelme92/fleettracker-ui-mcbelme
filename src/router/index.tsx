import { BrowserRouter, Routes, Route } from "react-router-dom";
import VehicleListView from "../views/VehicleListView";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VehicleListView />} />
      </Routes>
    </BrowserRouter>
  );
}
