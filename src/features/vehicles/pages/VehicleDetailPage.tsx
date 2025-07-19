import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  type SelectChangeEvent,
} from "@mui/material";

import Grid from '@mui/material/Grid'


import { useApiRequest } from "../../../shared/hooks/useApiRequest";
import { VEHICLES_ENDPOINT } from "../../../shared/constants/constants";
import { useEffect, useState } from "react";
import type { Vehicle } from "../types/Vehicle";
import { useVehicleStore } from "../store/useVehicleStore";

const STATUS_OPTIONS = ["Disponible", "Taller", "En servicio"];

export const VehicleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: vehicle, isLoading, error, request } = useApiRequest<Vehicle>();
  const { setShouldRefresh } = useVehicleStore();
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    if (id) request({ url: `${VEHICLES_ENDPOINT}/${id}`, method: "GET" });
  }, [id, request]);

  useEffect(() => {
    if (vehicle?.status) {
      setNewStatus(vehicle.status);
    }
  }, [vehicle]);

  const handleStatusChange = (event: SelectChangeEvent) => {
    setNewStatus(event.target.value);
  };

  const updateStatus = async () => {
    if (!newStatus || newStatus === vehicle?.status) return;

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

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!vehicle) return <p>No se encontró el vehículo.</p>;

  return (
    <Box maxWidth="600px" mx="auto" mt={4}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Detalle del Vehículo - {vehicle.licensePlate}
          </Typography>

          <Grid container spacing={2} >
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography>
                <Typography component="span" fontWeight="bold">
                  Marca:
                </Typography>{" "}
                {vehicle.make}
              </Typography>
              <Typography>
                <Typography component="span" fontWeight="bold">
                  Modelo:
                </Typography>{" "}
                {vehicle.model}
              </Typography>
              <Typography>
                <Typography component="span" fontWeight="bold">
                  Año:
                </Typography>{" "}
                {vehicle.year}
              </Typography>
              <Typography>
                <Typography component="span" fontWeight="bold">
                  Kilometraje:
                </Typography>{" "}
                {vehicle.odometer} km
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography>
                <Typography component="span" fontWeight="bold">
                  Último servicio:
                </Typography>{" "}
                {vehicle.lastService || "N/A"}
              </Typography>
              <Typography>
                <Box component="span" fontWeight="bold" display="inline">
                  Estado del GPS:
                </Box>{" "}
                {vehicle.gpsActive === true ? "Activo" : "No disponible"}
              </Typography>
              <Typography>
                <Typography component="span" fontWeight="bold">
                  Ubicación:
                </Typography>{" "}
                {vehicle.location
                  ? `${vehicle.location.lat}, ${vehicle.location.lng}`
                  : "No disponible"}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={3}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Estado</InputLabel>
              <Select
                labelId="status-label"
                value={newStatus}
                onChange={handleStatusChange}
                label="Estado"
              >
                {STATUS_OPTIONS.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Stack direction="row" spacing={2} mt={3}>
            <Button
              variant="contained"
              color="primary"
              disabled={newStatus === vehicle.status}
              onClick={updateStatus}
            >
              Actualizar Estado
            </Button>
            <Button variant="outlined" color="error" onClick={deleteVehicle}>
              Eliminar Vehículo
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
