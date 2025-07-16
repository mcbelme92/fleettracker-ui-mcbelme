import { useEffect, useState } from "react";
import VehicleTable from "../components/VehicleTable";
import { type GridColDef } from "@mui/x-data-grid";
import type { Vehicle } from "../types/Vehicle";


const mockVehicles: Vehicle[] = [
  {
    id: 1,
    licensePlate: "MXA1001",
    make: "Toyota",
    model: "Corolla",
    year: 2021,
    status: "Disponible",
    location: { lat: 19.4326, lng: -99.1332 },
    lastService: "2025-01-01",
    odometer: 58000,
    gpsActive: true,
  },
  {
    id: 2,
    licensePlate: "ZXC2002",
    make: "Nissan",
    model: "Sentra",
    year: 2020,
    status: "En taller",
    location: { lat: 20.6767, lng: -101.3500 },
    lastService: "2025-03-12",
    odometer: 62000,
    gpsActive: false,
  },
  {
    id: 3,
    licensePlate: "LMN3003",
    make: "Honda",
    model: "Civic",
    year: 2019,
    status: "Asignado",
    location: { lat: 21.1619, lng: -86.8515 },
    lastService: "2024-12-01",
    odometer: 73000,
    gpsActive: true,
  },
];

const columns: GridColDef[] = [
  { field: "licensePlate", headerName: "Placa", width: 120 },
  { field: "make", headerName: "Marca", width: 120 },
  { field: "model", headerName: "Modelo", width: 120 },
  { field: "year", headerName: "Año", width: 100 },
  { field: "status", headerName: "Estado", width: 130 },
  { field: "odometer", headerName: "Kilometraje", width: 130 },
  { field: "lastService", headerName: "Último Servicio", width: 160 },
];

const VehicleListPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    setVehicles(mockVehicles);
  }, []);

  return (
    <VehicleTable
      rows={vehicles}
      columns={columns}
      pageSize={5}
      getRowId={(row) => row.id}
    />
  );
};

export default VehicleListPage;
