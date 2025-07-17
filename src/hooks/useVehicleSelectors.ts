import { useVehicleStore } from "../store/useVehicleStore";

export const useVehicleSelectors = () => {
  return {
    vehicles: useVehicleStore((state) => state.vehicles),
    page: useVehicleStore((state) => state.page),
    limit: useVehicleStore((state) => state.limit),
    totalVehicles: useVehicleStore((state) => state.totalVehicles),
    searchQuery: useVehicleStore((state) => state.searchQuery),
    statusFilter: useVehicleStore((state) => state.statusFilter),
    shouldRefresh: useVehicleStore((state) => state.shouldRefresh),
    setVehicles: useVehicleStore((state) => state.setVehicles),
    setPage: useVehicleStore((state) => state.setPage),
    setLimit: useVehicleStore((state) => state.setLimit),
    setTotalVehicles: useVehicleStore((state) => state.setTotalVehicles),
    setSearchQuery: useVehicleStore((state) => state.setSearchQuery),
    setStatusFilter: useVehicleStore((state) => state.setStatusFilter),
    setShouldRefresh: useVehicleStore((state) => state.setShouldRefresh),
  };
};
