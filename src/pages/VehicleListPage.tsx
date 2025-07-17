import { useEffect } from "react";
import { type GridColDef, type GridPaginationModel } from "@mui/x-data-grid";
import type { Vehicle } from "../types/Vehicle";
import { useApiRequest } from "../hook/useApiRequest";
import { useVehicleStore } from "../store/useVehicleStore";
import {
  VEHICLES_ENDPOINT,
} from "../constants/api";
import CustomDataGrid from "../components/CustomDataGrid";

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
  const vehicles = useVehicleStore((state) => state.vehicles);
  const searchQuery = useVehicleStore((state) => state.searchQuery);
  const statusFilter = useVehicleStore((state) => state.statusFilter);
  const page = useVehicleStore((state) => state.page);
  const limit = useVehicleStore((state) => state.limit);
  const totalVehicles = useVehicleStore((state) => state.totalVehicles);

  const setVehicles = useVehicleStore((state) => state.setVehicles);
  const setTotalVehicles = useVehicleStore((state) => state.setTotalVehicles);
  const setPage = useVehicleStore((state) => state.setPage);
  const setLimit = useVehicleStore((state) => state.setLimit);

  const { request, isLoading, error } = useApiRequest<Vehicle[]>();

  console.log("🔥 useEffect ejecutado con:", { page, limit });

  useEffect(() => {
    const fetchData = async () => {
      const response = await request({
        url: VEHICLES_ENDPOINT,
        method: "GET",
        params: {
          _page: page,
          _limit: limit,
          q: searchQuery || undefined,
          status: statusFilter || undefined,
        },
      });

      if (response?.data) {
        setVehicles(response.data);
      }

      const totalCountHeader = response?.headers["x-total-count"];
      if (totalCountHeader) {
        setTotalVehicles(parseInt(totalCountHeader, 10));
      }
    };

    fetchData();
  }, [page, limit, searchQuery, statusFilter, request, setVehicles, setTotalVehicles]);

  const handlePaginationChange = (model: GridPaginationModel) => {
    console.log("📥 Cambio paginación:", model);

    setPage(model.page + 1); // DataGrid usa base 0, json-server base 1
    setLimit(model.pageSize);
  };


return (
    error ? (
      <p>Error al cargar: {error.message}</p>
  
  ) : (
      <CustomDataGrid
      rows={vehicles}
      columns={columns}
      pageSize={limit}
      page={page - 1}
      getRowId={(row) => row.id}
      restProps={{
        paginationModel: {
          page: page - 1,
          pageSize: limit,
        },
        onPaginationModelChange: handlePaginationChange,
        paginationMode: "server",
        rowCount: totalVehicles,
        loading: isLoading,
      }}
    />
  )
  );
};

export default VehicleListPage;
