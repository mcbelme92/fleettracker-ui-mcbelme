import { useVehicleStore } from "../store/useVehicleStore";

export const useVehicleSelectors = () => {
  return {
    vehicles: useVehicleStore((state) => state.vehicles),
    page: useVehicleStore((state) => state.page),
    limit: useVehicleStore((state) => state.limit),
    totalVehicles: useVehicleStore((state) => state.totalVehicles),
    searchQuery: useVehicleStore((state) => state.searchQuery),
    statusFilter: useVehicleStore((state) => state.statusFilter),
    setVehicles: useVehicleStore((state) => state.setVehicles),
    setPage: useVehicleStore((state) => state.setPage),
    setLimit: useVehicleStore((state) => state.setLimit),
    setTotalVehicles: useVehicleStore((state) => state.setTotalVehicles),
  };
};