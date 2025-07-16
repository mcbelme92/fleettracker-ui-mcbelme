import { useEffect, useState } from "react";
import VehicleTable from "../components/VehicleTable";
import { type GridColDef } from "@mui/x-data-grid";
import type { Vehicle } from "../types/Vehicle";
import { getVehicles } from "../service/vehicleService";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getVehicles(1, 10).then((data) => {
      setVehicles(data);
      setLoading(true);
    });
  }, []);

  if (!loading) return <p>Cargando...</p>;

  return <VehicleTable rows={vehicles} columns={columns} pageSize={10} getRowId={(row) => row.id} />;
};

export default VehicleListPage;
