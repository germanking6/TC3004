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
import Card from '@mui/material/Card';

export default function ExpensesPage(){
  const [ICA, setICA] = useState([{label:"ICA 1"},{label:"ICA 2"},{label:"ICA 3"},{label:"ICA 4"}]);
  const [typeOptions, setType] = useState([{label:"Type 1"},{label:"Type 2"},{label:"Type 3"},{label:"Type 4"},]);
  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
  }

  //Hacer fetchs de los ica y de los type
  return (
    <Card variant="outlined" sx={{ maxWidth:'70%', margin:'1rem auto' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': { m: 2, width:"35ch"},
        }}
        noValidate
        autoComplete="on"
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              required
              id="EmployeeMail"
              label="Employee Mail"
              variant="standard"
              helperText="Please enter employee email"
              type="text"
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
              renderInput={(params) => <TextField {...params} label="ICA" />}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              disablePortal
              id="Type"
              options={typeOptions}
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
    </Card>
  );
}
