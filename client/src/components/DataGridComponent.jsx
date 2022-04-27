import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'adminMail', headerName: 'Admin mail', width: 130 },
  { field: 'managerMail', headerName: 'Manager mail', width: 130 },
  { field: 'status', headerName: 'Status', width: 70 }
];

const rows = [
  { id: 1, adminMail: 'marisol@ibm.com', managerMail: 'alexhdz@ibm.com', status: 'Active' },
  { id: 2, adminMail: 'ari@ibm.com', managerMail: 'alexhdz@ibm.com', status: 'Active' },
  { id: 3, adminMail: 'sauce@ibm.com', managerMail: 'alexhdz@ibm.com', status: 'Active' },
  { id: 4, adminMail: 'viktor@ibm.com', managerMail: 'lalo@ibm.com', status: 'Active' },
  { id: 5, adminMail: 'german@ibm.com', managerMail: 'lalo@ibm.com', status: 'Active' },
];

rows.sort(function (a, b) {
    if (a.adminMail > b.adminMail) {
      return 1;
    }
    if (a.adminMail < b.adminMail) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={[{ field: 'adminMail', minWidth: 450 }, { field: 'managerMail', headerName: 'Manager Mail', minWidth: 450 }, { field: 'status', headerName: 'Status', minWidth: 100 }]}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}