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
                <Card className="table" sx={{  
                            margin:'0 1rem 1rem 1rem'}}>
                    <DataTable />
                </Card>
            </Box>
        </Card>
    )
}


const profiles = [
    'Alex', 'German', 'Sauce', 'Ariana', 'Marisol', 'Victor'
]

export default DelegatePage;
