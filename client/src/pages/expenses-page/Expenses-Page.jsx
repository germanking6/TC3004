import React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CommentIcon from '@mui/icons-material/Comment';
import Autocomplete from '@mui/material/Autocomplete';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Card from '@mui/material/Card';
import HeaderComponent from '../../components/HeaderComponent';
import Alert from '@mui/material/Alert';

import DataTable from '../../components/DataGridComponent';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Container from '@mui/material/Container';

export default function ExpensesPage(){

  const columns = [
    {
      field: 'action', width:80, headerName: 'Actions',
      renderCell: (params) => (
      <div sx={{ mx: "auto"}}>
        <IconButton color="primary" aria-label="Edit" size="small" height="15" width="15"  onClick={() => { alert(params.id) }}>
            < EditRoundedIcon/>
        </IconButton>
        <IconButton color="error" aria-label="delete" size="small" height="15" width="15" onClick={() => { alert(params.id) }}>
          <DeleteIcon />
        </IconButton>
      </div>
      ),
    },
    { field: 'employeeMail', headerName: 'Employee Mail', width: 200 },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'cost', headerName: 'Cost', width: 100 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'ica', headerName: 'ICA', width: 100 },
    { field: 'icaManager', headerName: 'ICA Manager', width: 200 },
    { field: 'admin', headerName: 'Administrator', width: 200 },
    { field: 'comment', headerName: 'Comment', width: 400 }
  ];
    
  const rows = [
      { id: 8, employeeMail: "ivan.wielebaldo@ibm.com", type: 1, cost: 999, date: "09-06-2000", ica: 2, icaManager: "c", admin: "a", comment: "haolsd"},
      { id: 5, employeeMail: "hola5", type: 2, cost: 100, date: "09-06-2000", ica: 2, icaManager: "b", admin: "c", comment: "haolsd"},
      { id: 3, employeeMail: "hola3", type: 3, cost: 9234, date: "09-06-2000", ica: 2, icaManager: "a", admin: "b", comment: "haolsd"},
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
  const [idSelected, setIdSelected] = useState(-1);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(icaSelected && typeSelected){
      console.log(formState);
      fetch('http://127.0.0.1:5000/expensesPage',{
        method:'POST',
        headers : {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formState)
      })
    }else{
      setShowAlert(true);
    }
  }
  const handleChange = (event) => {
    const value = event.target.value;
    setFormState({
      ...formState,
      [event.target.id]: value
    });
  }
  const handleInputChange =(event, newInputValue) => {
    setFormState({
      ...formState,
      [event.target.id]: newInputValue
    });
  }

  //Hacer fetchs de los ica y de los type
  return (
    <Card variant="outlined" sx={{ margin:'1rem auto' }}>
      <HeaderComponent title="Expenses Page"/>
      {showAlert ? (<Alert severity="error">Selecciona ICA y Tipo</Alert>): null}
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
                    <ContactMailIcon />
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
                    <AttachMoneyIcon />
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
                    <CommentIcon />
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
            <Button variant="contained" endIcon={<SendIcon />} fullWidth={true} sx={{ mb:2}} type="submit">
              Submit                                            
            </Button>
          </Grid>
        </Grid>
      </Box>
      <DataTable 
        r = {rows}
        c = {columns}
      />
    </Card>
  );
}
