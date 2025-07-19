import { Box, TextField, MenuItem } from "@mui/material";
import { useEffect } from "react";
interface FilterOption {
  label: string;
  value: string;
}

interface SearchAndFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  filterLabel?: string;
  filterOptions: FilterOption[];
  storageKeys?: {
    search?: string;
    filter?: string;
  };
}

/**
 * Componente reutilizable para búsqueda y filtrado.
 * Proporciona un campo de texto para buscar y un selector para filtrar por opciones definidas.
 *
 * @component
 * @example
 * <SearchAndFilterBar
 *   searchValue={searchQuery}
 *   onSearchChange={setSearchQuery}
 *   filterValue={statusFilter}
 *   onFilterChange={setStatusFilter}
 *   filterLabel="Estado"
 *   filterOptions={[
 *     { label: "Todos", value: "" },
 *     { label: "Disponible", value: "Disponible" },
 *     { label: "Taller", value: "Taller" }
 *   ]}
 *   storageKeys={{
 *     search: "MY_SEARCH_KEY",
 *     filter: "MY_FILTER_KEY"
 *   }}
 * />
 *
 * @param {string} searchValue - Valor actual del campo de búsqueda.
 * @param {(value: string) => void} onSearchChange - Función para actualizar el valor de búsqueda.
 * @param {string} filterValue - Valor actual del filtro.
 * @param {(value: string) => void} onFilterChange - Función para actualizar el valor del filtro.
 * @param {string} [filterLabel="Filtrar por"] - Etiqueta del campo de filtro.
 * @param {Array<{ label: string, value: string }>} filterOptions - Opciones disponibles para el filtro.
 * @param {{ search?: string, filter?: string }} [storageKeys] - Claves opcionales para persistencia en localStorage.
 *
 * @returns {JSX.Element} Un conjunto de campos de búsqueda y filtrado.
 */

const SearchAndFilterBar = ({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterLabel = "Filtrar por",
  filterOptions,
  storageKeys,
}: SearchAndFilterBarProps) => {

  useEffect(() => {
    if (storageKeys?.search) {
      const saved = localStorage.getItem(storageKeys.search);
      if (saved) onSearchChange(saved);
    }
    if (storageKeys?.filter) {
      const saved = localStorage.getItem(storageKeys.filter);
      if (saved) onFilterChange(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onSearchChange(val);
    if (storageKeys?.search) {
      localStorage.setItem(storageKeys.search, val);
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onFilterChange(val);
    if (storageKeys?.filter) {
      localStorage.setItem(storageKeys.filter, val);
    }
  };

  return (
    <Box display="flex" gap={5} mb={2} flexWrap="wrap">
      <TextField
        label="Buscar"
        value={searchValue}
        onChange={handleSearch}
        variant="outlined"
        size="small"
      />

      <TextField
        label={filterLabel}
        value={filterValue}
        onChange={handleFilter}
        select
        variant="outlined"
        size="small"
        sx={{ minWidth: 180 }}
      >
        {filterOptions.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default SearchAndFilterBar;
