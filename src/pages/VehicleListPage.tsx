import { useEffect, useRef, useState } from "react";
import { type GridColDef, type GridPaginationModel } from "@mui/x-data-grid";
import type { Vehicle } from "../types/Vehicle";
import { useApiRequest } from "../hook/useApiRequest";
import { useVehicleStore } from "../store/useVehicleStore";
import {
  VEHICLE_LIMIT_KEY,
  VEHICLE_PAGE_KEY,
  VEHICLE_STORAGE_KEY,
  VEHICLE_TOTAL_KEY,
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

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const rPage = localStorage.getItem(VEHICLE_PAGE_KEY);
    const rLimit = localStorage.getItem(VEHICLE_LIMIT_KEY);
    const rVeh = localStorage.getItem(VEHICLE_STORAGE_KEY);
    const rTotal = localStorage.getItem(VEHICLE_TOTAL_KEY);

    if (rPage) setPage(JSON.parse(rPage));
    if (rLimit) setLimit(JSON.parse(rLimit));
    if (rVeh) setVehicles(JSON.parse(rVeh));
    if (rTotal) setTotalVehicles(JSON.parse(rTotal));

    setHydrated(true); // ya estás listo
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skipFirstFetch = useRef(true);

  // 2. Fetch solo **después** de hidratar y al cambiar page/limit/search
  useEffect(() => {
    if (!hydrated) return;

    // Evita que se ejecute en el primer render tras la hidratación
    if (skipFirstFetch.current) {
      skipFirstFetch.current = false;
      return;
    }

    const fetchData = async () => {
      const res = await request({
        url: VEHICLES_ENDPOINT,
        method: "GET",
        params: { _page: page, _limit: limit, q: searchQuery || undefined, status: statusFilter || undefined }
      });
      if (!res) return;

      if (res.data) {
        setVehicles(res.data);
        localStorage.setItem(VEHICLE_STORAGE_KEY, JSON.stringify(res.data));
      }

      const total = res.headers["x-total-count"];
      if (total !== undefined) {
        setTotalVehicles(Number(total));
        localStorage.setItem("VEHICLE_TOTAL_KEY", total);
      }

      localStorage.setItem(VEHICLE_PAGE_KEY, JSON.stringify(page));
      localStorage.setItem(VEHICLE_LIMIT_KEY, JSON.stringify(limit));
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, page, limit, searchQuery, statusFilter]);

  const handlePage = (m: GridPaginationModel) => {
    setPage(m.page + 1);
    setLimit(m.pageSize);
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
        onPaginationModelChange: handlePage,
        paginationMode: "server",
        rowCount: totalVehicles,
        loading: isLoading,
      }}
    />
  )
  );
};

export default VehicleListPage;
