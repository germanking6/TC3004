import React, { useState, useRef, useEffect } from "react";
import CircularIndeterminate from '../../components/Loading';

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

import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

function DelegatePage() {
  const userToLog = useRef("");
  const[status, setStatus] = useState("");
  const[manager, setManager] = useState("");
  const[profiles, setProfiles] = useState([]);
  const[rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const solicitud = async() => {
    setLoading(true);
    var respuesta = await fetch("http://127.0.0.1:5000/delegatePage");
    respuesta.status != 401 && setRows(await respuesta.json());
    setLoading(false);
  }

  const solicitudMails = async() => {
    setLoading(true);
    const response = await fetch('http://127.0.0.1:5000/admin');
    const data = await response.json();
    setProfiles(data);
    setLoading(false);
  }

  const addDelegate = async() => {
    setLoading(true);
    fetch('http://127.0.0.1:5000/delegatePage',{
        method:'POST',
        headers : {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({'user': userToLog.current.value,
              'id': rows.length + 1})
    })
    setLoading(false);
  }

  const updateStatus = async() => {
    setLoading(true);
    fetch('http://127.0.0.1:5000/delegatePage',{
        method:'PUT',
        headers : {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({'status' : status,
              'managerMail' : manager})
    })
    setLoading(false);
  }

  useEffect (() => {
    solicitudMails();
    solicitud();
  },[])

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
    
    { field: "adminMail", headerName: "Admin mail", width: 325 },
    { field: "managerMail", headerName: "Manager mail", width: 325 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      type: "singleSelect",
      valueOptions: ["Active", "Inactive"],
      editable: true,
    },
    {
      field: 'action',
      width:100,
      headerName: 'Action',
      renderCell: (params) => (
      <div>
        <IconButton aria-label="save" size="small" height="15" width="15"onClick={() => 
          {
              setStatus(params.row.status);
              setManager(params.row.managerMail);
              console.log(status);
              console.log(manager);
              updateStatus();
          }
      }>
          <SaveIcon />
        </IconButton>
        <IconButton aria-label="delete" size="small" height="15" width="15"onClick={() => 
          {
              setStatus(params.row.status);
              setManager(params.row.managerMail);
              console.log(status);
              console.log(manager);
              updateStatus();
          }
      }>  
          <DeleteIcon />
        </IconButton>
      </div>
      ),
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
      { loading ? (<CircularIndeterminate/>):
      (
        <div>
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
          experimentalFeatures={{ newEditingApi: true }}
          />
        </Card>
      </Box>
        </div>
      )}
      
    </Card>
  );
}

export default DelegatePage;
