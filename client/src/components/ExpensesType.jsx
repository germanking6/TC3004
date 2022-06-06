import React from 'react';
// Local components
import HeaderComponent from './HeaderComponent';
import DataTable from './DataGridComponent';
// MUI components
import { useState } from 'react';
import { DataGrid  } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import Box from '@mui/material/Box';
import { ButtonBase } from '@mui/material';

function ExpensesType() {
    const columns = [
        {
            field: 'action',
            width:100,
            headerName: 'Action',
            renderCell: (params) => (
            <IconButton aria-label="delete" size="small" height="15" width="15"onClick={() => 
                {
                    console.log(params.id)
                }
            }>
                <DeleteIcon />
            </IconButton>
            
            ),
        },
        { field: 'Typeofexpense', headerName: 'Type of expense name', width: 450 },
        
    ];
    const rows = [
        { id: 1, Typeofexpense: 'Trip' },
        { id: 2, Typeofexpense: 'Course' },
    ];
    const [InputField, setEmployees] = useState();
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
    
    const handleChange = (event) =>{
        event.preventDefault();
        setInputField(event.target.value);

    };

    return (
        <Card sx={{ 
            maxWidth:'95%', 
            margin:'1rem auto'}}>
            <HeaderComponent title="New Type of Expense"/>
            <Container>
                <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Grid className='input'>
                    <TextField value ={InputField} id="outlined-basic" label="New Employee(s)" variant="outlined" onChange = {handleChange} />
                    </Grid>
                    <Grid>
                        <Button variant="outlined" size="small">SUBMIT</Button>
                    </Grid>
                </Grid>
            </Container>
            <Box>
                <Card className="table" sx={{  
                            margin:'1rem 1rem 0 1rem'}}>
                    <Box>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            padding: "20px",
                        }}>
                            <h3 style={{ flex: "1 1 auto" }}> All Expenses Types: </h3>
                            <div>
                                <IconButton aria-label="download">
                                    <DownloadIcon />
                                </IconButton>
                            </div>
                        </div>
                    </Box>
                </Card>
                <Card sx={{  
                            margin:'0 1rem 1rem 1rem'}}>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        
                        />
                    </div>
                </Card>
            </Box>
        </Card>
    )
}


export default ExpensesType;
