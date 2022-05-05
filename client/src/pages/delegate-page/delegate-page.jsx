import React from 'react';

// Styles
import './delegate-page.css';

// Local components
import HeaderComponent from '../../components/HeaderComponent';
import DataTable from '../../components/DataGridComponent';

// MUI components
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

function DelegatePage() {
    const columns = [
        { field: 'adminMail', headerName: 'Admin mail', width: 400 },
        { field: 'managerMail', headerName: 'Manager mail', width: 450 },
        { field: 'status', headerName: 'Status', width: 100 }
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

    return (
        <Card sx={{ 
            maxWidth:'95%', 
            margin:'1rem auto'}}>
            <HeaderComponent title="Delegate Page"/>
            <Container>
                <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Grid className='input'>
                        <Autocomplete
                            id="clear-on-escape"
                            clearOnEscape
                            options={profiles}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} id="outlined-basic" label="Select the profile you want to log in" variant="standard"/>}
                        />
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
                            <h3 style={{ flex: "1 1 auto" }}> Delegates: </h3>
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
                    <DataTable 
                        r = {rows}
                        c = {columns}
                    />
                </Card>
            </Box>
        </Card>
    )
}


const profiles = [
    'Alex', 'German', 'Sauce', 'Ariana', 'Marisol', 'Victor'
]

export default DelegatePage;
