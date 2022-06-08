import React, { useEffect } from 'react';
import { useState } from 'react';
import {Grid, TextField, Box, InputAdornment, Autocomplete, Button, IconButton, Card, Alert} from '@mui/material';
import {ContactMail, AttachMoney, Comment, Send, Delete, EditRounded} from '@mui/icons-material';
import HeaderComponent from '../../components/HeaderComponent';
import DataTable from '../../components/DataGridComponent';
import CircularIndeterminate from '../../components/Loading';

export default function ExpensesPage(){
  const url = "http://127.0.0.1:5000/expensesPage";
  const columns = [
    {
      field: 'action', width:80, headerName: 'Actions',
      renderCell: (params) => (
      <div sx={{ mx: "auto"}}>
        <IconButton color="primary" aria-label="Edit" size="small" height="15" width="15"  onClick={() => {editButton(params)}}>
            < EditRounded/>
        </IconButton>
        <IconButton color="error" aria-label="delete" size="small" height="15" width="15" onClick={() => {deleteButton(params)}}>
          <Delete />
        </IconButton>
      </div>
      ),
    },
    { field: 'id', headerName: "ID", width:70 },
    { field: 'employeeMail', headerName: 'Employee Mail', width: 200 },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'cost', headerName: 'Cost', width: 100 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'ica', headerName: 'ICA', width: 100 },
    { field: 'icaManager', headerName: 'ICA Manager', width: 200 },
    { field: 'admin', headerName: 'Administrator', width: 200 },
    { field: 'comment', headerName: 'Comment', width: 400 }
  ];

  const [ICA, setICA] = useState([{label:"ICA 1"},{label:"ICA 2"},{label:"ICA 3"},{label:"ICA 4"}]);
  const [typeOptions, setType] = useState([{label:"Type 1"},{label:"Type 2"},{label:"Type 3"},{label:"Type 4"},]);

  const [formState, setFormState] = React.useState({
    "EmployeeMail": "",
    "Date": "",
    "Amount": "",
    "Comment": "",
    "ICA": "",
    "Type": ""
  });
  const [icaSelected, setICASelected] = useState(false);
  const [typeSelected, setTypeSelected] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchExpenses();
  },[reload])

  const handleSubmit = (event) => {
    event.preventDefault();
    if(icaSelected && typeSelected){
      setLoading(true);
      fetch(url,{
        method:'POST',
        headers : {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formState)
      }).then(fetchExpenses()).then(setFormState({
        "EmployeeMail": "",
        "Date": "",
        "Amount": "",
        "Comment": "",
        "ICA": "",
        "Type": ""
      }));
      
    }else{
      setShowAlert(true);
    }
  }

  const editButton = (params) => {

  }

  const deleteButton = (params) => {
    if(confirm("¿Está seguro que desea eliminar el registro " + params.id + "?")){
      fetch(url,{
        method:'DELETE',
        headers : {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({"ID":params.id})
      }).then(fetchExpenses());
    }
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setFormState({
      ...formState,
      [event.target.id]: value
    });
  }

  const handleInputChange = (event, newInputValue) => {
    setFormState({
      ...formState,
      [event.target.id]: newInputValue
    });
  }

  async function fetchExpenses() {
    console.log("FETCH")
    setLoading(true);
    const data = await fetch(url,{
      method:'GET'
    })
    let info = await data.json()
    setLoading(false);
    setRows(info);
  }

  //Hacer fetchs de los ica y de los type
  return (
    
    <Card variant="outlined" sx={{ margin:'1rem auto' }}>
      <HeaderComponent title="Expenses Page"/>
      {showAlert ? (<Alert severity="error">Selecciona ICA y Tipo</Alert>): null}
      { loading ? (<CircularIndeterminate/>):
      (
      <div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& .MuiTextField-root': { m: 2, width:"35ch"},
          }}
          Validate
          autoComplete="on"
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                required
                id="EmployeeMail"
                value={formState.EmployeeMail}
                onChange={handleChange}
                label="Employee Mail"
                variant="standard"
                helperText="Please enter employee email"
                type="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactMail />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                id="Date"
                value={formState.Date}
                onChange={handleChange}
                label="Date"
                variant="standard"
                type="date"
                helperText="Please select a date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                id="Amount"
                value={formState.Amount}
                onChange={handleChange}
                label="USD Cost"
                variant="standard"
                helperText="Please enter the amount"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                id="Comment"
                value={formState.Comment}
                onChange={handleChange}
                label="Comment"
                variant="standard"
                helperText="Please enter the comment"
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Comment />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                disablePortal
                id="ICA"
                options={ICA}
                onInputChange={(event, newInputValue) => {
                  if(newInputValue != ""){
                    setICASelected(true);
                    setFormState({
                      ...formState,
                      ["ICA"]: newInputValue
                    });
                  }else{
                    setICASelected(false);
                  }
                }}
                renderInput={(params) => <TextField {...params} label="ICA" />}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                disablePortal
                id="Type"
                options={typeOptions}
                onInputChange={(event, newInputValue) => {
                  if(newInputValue != ""){
                    setTypeSelected(true);
                    setFormState({
                      ...formState,
                      ["Type"]: newInputValue
                    });
                  }else{
                    setTypeSelected(false);
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Type" />}
              />
            </Grid>
            <Grid item xs={4} container sx={{ mx: "auto"}}>
              <Button variant="contained" endIcon={<Send />} fullWidth={true} sx={{ mb:2}} type="submit">
                Submit                                            
              </Button>
            </Grid>
          </Grid>
        </Box>
        <DataTable 
          r = {rows}
          c = {columns}
        />
      </div>
      )}
      
    </Card>
  );
}
