import React from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { type Vehicle } from "../types/Vehicle";

interface VehicleTableProps {
  vehicles: Vehicle[];
}

const columns: GridColDef[] = [
  { field: "plate", headerName: "Placa", width: 130 },
  { field: "brand", headerName: "Marca", width: 130 },
  { field: "model", headerName: "Modelo", width: 130 },
  { field: "year", headerName: "Año", width: 100, type: "number" },
  { field: "status", headerName: "Estado", width: 140 },
];

const VehicleTable: React.FC<VehicleTableProps> = ({ vehicles }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={vehicles}
        columns={columns}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default VehicleTable;
