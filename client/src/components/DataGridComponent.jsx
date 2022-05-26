import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable(props) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={props.r}
        columns={props.c}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}
