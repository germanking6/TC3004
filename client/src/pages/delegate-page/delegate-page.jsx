import React, { useState, useRef } from "react";

// Styles
import "./delegate-page.css";

// Local components
import HeaderComponent from "../../components/HeaderComponent";
import DataTable from "../../components/DataGridComponent";

// MUI components
import {
  Card,
  Grid,
  Autocomplete,
  TextField,
  Button,
  Container,
  IconButton,
  Box,
} from "@mui/material";

import DownloadIcon from '@mui/icons-material/Download';

function DelegatePage() {
  const userToLog = useRef("");

  const columns = [
    { field: "adminMail", headerName: "Admin mail", width: 400 },
    { field: "managerMail", headerName: "Manager mail", width: 450 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      type: "singleSelect",
      valueOptions: ["Active", "Unactive"],
      editable: true,
    },
  ];

  const rows = [
    {
      id: 1,
      adminMail: "marisol@ibm.com",
      managerMail: "alexhdz@ibm.com",
      status: "Active",
    },
    {
      id: 2,
      adminMail: "ari@ibm.com",
      managerMail: "alexhdz@ibm.com",
      status: "Active",
    },
    {
      id: 3,
      adminMail: "sauce@ibm.com",
      managerMail: "alexhdz@ibm.com",
      status: "Active",
    },
    {
      id: 4,
      adminMail: "viktor@ibm.com",
      managerMail: "lalo@ibm.com",
      status: "Active",
    },
    {
      id: 5,
      adminMail: "german@ibm.com",
      managerMail: "lalo@ibm.com",
      status: "Active",
    },
  ];

  rows.sort(function (a, b) {
    if (a.status > b.status) {
      return 1;
    }
    if (a.status < b.status) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  return (
    <Card
      sx={{
        maxWidth: "95%",
        margin: "1rem auto",
      }}
    >
      <HeaderComponent title="Delegate Page" />
      <Container>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid className="input">
            <Autocomplete
              id="clear-on-escape"
              clearOnEscape
              options={profiles}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="outlined-basic"
                  label="Select the profile you want to log in"
                  variant="standard"
                  inputRef={userToLog}
                />
              )}
            />
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                // Si el usuario no está en la tabla agregarlo y si está en la tabla
                // verificar que esté activo. Si no está activo activarlo
                var user = userToLog.current.value;
                if (profiles.includes(user) == false) {
                  profiles.push();
                } else {
                  alert("This profile is already in your team");
                }
              }}
            >
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Box>
        <Card
          className="table"
          sx={{
            margin: "1rem 1rem 0 1rem",
          }}
        >
          <Box>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <h3 style={{ flex: "1 1 auto" }}> Delegates: </h3>
              <div>
                <IconButton aria-label="download">
                  <DownloadIcon />
                </IconButton>
              </div>
            </div>
          </Box>
        </Card>
        <Card
          className="table"
          sx={{
            margin: "0 1rem 1rem 1rem",
          }}
        >
          <DataTable r={rows} c={columns} />
        </Card>
      </Box>
    </Card>
  );
}

const profiles = [
  "alexhdz@ibm.com",
  "german@ibm.com",
  "sauce@ibm.com",
  "ari@ibm.com",
  "marisol@ibm.com",
  "viktor@ibm.com",
];

export default DelegatePage;
