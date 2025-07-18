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

function CustomDataGrid<T extends GridValidRowModel>({
  rows,
  columns,
  pageSize = 10,
  page = 1,
  getRowId = (row) => row.id,
  restProps = {},
}: Readonly<ReusableTableProps<T>>) {
  return (
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
  );
}

export default CustomDataGrid;
