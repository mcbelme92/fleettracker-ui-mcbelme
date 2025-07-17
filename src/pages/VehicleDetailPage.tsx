import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useApiRequest } from "../hooks/useApiRequest";
import { VEHICLES_ENDPOINT } from "../constants/constants";
import { useEffect } from "react";
import type { Vehicle } from "../types/Vehicle";
import { useVehicleStore } from "../store/useVehicleStore";

export const VehicleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: vehicle, isLoading, error, request } = useApiRequest<Vehicle>();
  const { setShouldRefresh } = useVehicleStore();

  useEffect(() => {
    if (id) request({ url: `${VEHICLES_ENDPOINT}/${id}`, method: "GET" });
  }, [id, request]);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!vehicle) return <p>No se encontró el vehículo.</p>;

  const changeStatus = async (newStatus: string) => {
    await request({
      url: `${VEHICLES_ENDPOINT}/${id}`,
      method: "PATCH",
      data: { status: newStatus },
    });

    setShouldRefresh(true);
    useVehicleStore.getState().setVehicles([]);
    navigate("/vehicles");
  };

  const deleteVehicle = async () => {
    await request({ url: `${VEHICLES_ENDPOINT}/${id}`, method: "DELETE" });

    setShouldRefresh(true);
    useVehicleStore.getState().setVehicles([]);
    navigate("/vehicles");
  };

  return (
    <>
      <Typography variant="h5">Detalle de {vehicle.licensePlate}</Typography>
      <Typography>Estado actual: {vehicle.status}</Typography>
      <Button onClick={() => changeStatus("Disponible")}>Disponible</Button>
      <Button onClick={() => changeStatus("En servicio")}>En servicio</Button>
      <Button variant="outlined" color="error" onClick={deleteVehicle}>
        Eliminar
      </Button>
    </>
  );
};
