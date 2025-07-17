import {
  DataGrid,
  type DataGridProps,
  type GridColDef,
  type GridRowIdGetter,
  type GridValidRowModel,
} from "@mui/x-data-grid";

interface ReusableTableProps<T extends GridValidRowModel> {
  rows: T[];
  columns: GridColDef[];
  pageSize?: number;
  page?: number;
  getRowId?: GridRowIdGetter<T>;
  restProps?: Partial<DataGridProps>;
}


function VehicleTable<T extends GridValidRowModel>({
  rows,
  columns,
  pageSize = 10,
  page = 1,
  getRowId = (row) => row.id,
  restProps = {},
}: Readonly<ReusableTableProps<T>>) {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
              page,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        disableRowSelectionOnClick
        {...restProps}
      />
    </div>
  );
}

export default VehicleTable;
