import React, { useState, useRef, useEffect } from "react";

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
  const[statusChanged, setStatusChanged] = useState("");
  const[profiles, setProfiles] = useState([]);
  const[rows, setRows] = useState([]);

  const solicitud = async() => {
    var respuesta = await fetch("https://apilertlogin-friendly-turtle-cq.mybluemix.net/delegatePage");
    respuesta.status != 401 && setRows(await respuesta.json());
  }

  const solicitudMails = async() => {
    const response = await fetch('https://apilertlogin-friendly-turtle-cq.mybluemix.net/admin');
    const data = await response.json();
    setProfiles(data);
  }

  const addDelegate = async() => {
    fetch('https://apilertlogin-friendly-turtle-cq.mybluemix.net/delegatePage',{
        method:'POST',
        headers : {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({'user': userToLog.current.value,
              'id': rows.length + 1})
    })
  }

  // const updateStatus = async() => {
  //   fetch('http://127.0.0.1:5000/delegatePage',{
  //       method:'PUT',
  //       headers : {
  //         'Content-Type':'application/json'
  //       },
  //       body: {"status" : "Inactive",
  //             "managerMail" : "a@ibm.com"}
  //   })
  // }

  useEffect (() => {
    solicitudMails();
    solicitud();
  },[])

  // function getStatus(params) {

  //   return params.row.status
  // };

  // function setStatus(params) {
  //   setStatusChanged(params.row.status)
  //   return params.row.status
  // };

 function inDelegates(user) {
   for (const item in rows) {
    console.log(user);
    console.log(rows[item]['adminMail']);
     if (rows[item]['adminMail'] == user) {
       return true
     }
   }
   return false
 }

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
      // valueGetter: getStatus,
      // valueSetter: setStatus,
    },
  ];

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
                if (inDelegates(user) == false) {
                  addDelegate();
                  solicitud();
                } else {
                  alert("This profile is already in your team");
                }
                console.log(rows);
                console.log(profiles);
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
          <DataTable 
          r={rows} 
          c={columns}
          onCellClick={() => {
            console.log("hola");
            }
          }/> 
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
