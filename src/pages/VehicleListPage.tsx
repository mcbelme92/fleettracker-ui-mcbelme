import { useEffect, useRef, useState } from "react";
import { type GridColDef, type GridPaginationModel } from "@mui/x-data-grid";
import type { Vehicle } from "../types/Vehicle";
import { useApiRequest } from "../hooks/useApiRequest";
import {
  VEHICLE_LIMIT_KEY,
  VEHICLE_PAGE_KEY,
  VEHICLE_STORAGE_KEY,
  VEHICLE_TOTAL_KEY,
  VEHICLES_ENDPOINT,
} from "../constants/constants";
import CustomDataGrid from "../components/CustomDataGrid";
import { useVehicleSelectors } from "../hooks/useVehicleSelectors";
import { VehicleFilter } from "./components/VehicleFilter";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  
  const [hydrated, setHydrated] = useState(false);
  const {
    vehicles,
    page,
    limit,
    totalVehicles,
    searchQuery,
    statusFilter,
    setVehicles,
    setPage,
    setLimit,
    setTotalVehicles,
    setSearchQuery,
    setStatusFilter,
    shouldRefresh,
    setShouldRefresh
  } = useVehicleSelectors();

  const { request, isLoading, error } = useApiRequest<Vehicle[]>();

useEffect(() => {
  if (shouldRefresh) {
    skipFirstFetch.current = false;
    setShouldRefresh(false);
  }

  const rPage = localStorage.getItem(VEHICLE_PAGE_KEY);
  const rLimit = localStorage.getItem(VEHICLE_LIMIT_KEY);
  const rVeh = localStorage.getItem(VEHICLE_STORAGE_KEY);
  const rTotal = localStorage.getItem(VEHICLE_TOTAL_KEY);
  const rSearchQuery = localStorage.getItem("VEHICLE_SEARCH_QUERY");
  const rStatusFilter = localStorage.getItem("VEHICLE_STATUS_FILTER");

  if (rPage) setPage(JSON.parse(rPage));
  if (rLimit) setLimit(JSON.parse(rLimit));
  if (rVeh) {
    setVehicles(JSON.parse(rVeh));
  } else {
    skipFirstFetch.current = false; // <-- Forzar fetch si no hay vehículos
  }
  if (rTotal) setTotalVehicles(JSON.parse(rTotal));
  if (rSearchQuery) setSearchQuery(rSearchQuery);
  if (rStatusFilter) setStatusFilter(rStatusFilter);

  setHydrated(true);
}, [shouldRefresh]);

  const skipFirstFetch = useRef(true);

  useEffect(() => {
    if (!hydrated) return;

    if (skipFirstFetch.current) {
      skipFirstFetch.current = false;
      return;
    }

    const fetchData = async () => {
      const res = await request({
        url: VEHICLES_ENDPOINT,
        method: "GET",
        params: {
          _page: page,
          _limit: limit,
          q: searchQuery || undefined,
          status: statusFilter || undefined,
        },
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

  const handleRowClick = (params: { id: number | string }) => {
  navigate(`/vehicles/${params.id}`);
  };

  return error ? (
    <p>Error al cargar: {error.message}</p>
  ) : (
    <>
      <VehicleFilter />
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
          onRowClick: handleRowClick,
        }}
      />
    </>
  );
};

export default VehicleListPage;
