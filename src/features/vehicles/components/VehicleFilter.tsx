import SearchAndFilterBar from "../../../shared/components/SearchAndFilterBar";
import { VEHICLE_SEARCH_QUERY, VEHICLE_STATUS_FILTER } from "../../../shared/constants/constants";
import { useVehicleSelectors } from "../hooks/useVehicleSelectors";

export const VehicleFilter = () => {
  const { searchQuery, statusFilter, setSearchQuery, setStatusFilter } = useVehicleSelectors();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    localStorage.setItem("VEHICLE_SEARCH_QUERY", query);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    localStorage.setItem("VEHICLE_STATUS_FILTER", status);
  };

  return (
    <SearchAndFilterBar
      searchValue={searchQuery}
      onSearchChange={handleSearchChange}
      filterValue={statusFilter}
      onFilterChange={handleStatusChange}
      filterLabel="Estado"
      filterOptions={[
        { label: "Todos", value: "" },
        { label: "Disponible", value: "Disponible" },
        { label: "En servicio", value: "En servicio" },
        { label: "Taller", value: "Taller" },
      ]}
      storageKeys={{
        search: VEHICLE_SEARCH_QUERY,
        filter: VEHICLE_STATUS_FILTER,
      }}
    />
  );
};
