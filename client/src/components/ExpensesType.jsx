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
import CircularIndeterminate from './Loading';
function ExpensesType() {
    const url = "http://127.0.0.1:5000/expensesTypes";
    const columns = [
        {
            field: 'action',
            width:100,
            headerName: 'Action',
            renderCell: (params) => (
            <IconButton aria-label="delete" size="small" height="15" width="15"onClick={() => 
                {
                    console.log(params.id)
                    console.log(params.row)
                    deleteButton(params)
                }
            }>
                <DeleteIcon />
            </IconButton>
            
            ),
        },
        { field: 'Typeofexpense', headerName: 'Type of expense name', width: 450 },
        
    ];
    const [rows, setRows] = useState([]);
    const [InputField, setInputField] = useState("");
    const [load,setLoad]=useState(false);
    const deleteButton = (params) => {
        if(confirm("¿Está seguro que desea eliminar el registro " + params.row.Typeofexpense + "?")){
            setLoad(false);
            fetch(url+`?Type=${params.row.Typeofexpense}`,{
            method:'DELETE',
            headers : {
                'Content-Type':'application/json'
            },
            });
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if(InputField!=null){
            setLoad(false);
            fetch(url+`?Type=${InputField}`,{
            method:'POST',
            headers : {
                'Content-Type':'application/json'
            },
            });
        }else{
          setShowAlert(true);
        }
    }
    
    const handleChange = (event) =>{
        event.preventDefault();
        setInputField(event.target.value);
        console.log(event.target.value)
    };
    React.useEffect(()=>{
        if(!load){
            fetch(url,{
                method:'GET',
            })
            .then((res)=>res.json())
            .then((data)=>setRows(data)).then(()=>setLoad(true))
        }
        
    })
    return (
        <Card sx={{ 
            maxWidth:'95%', 
            margin:'1rem auto'}}>
            <HeaderComponent title="New Type of Expense"/>
            { !load && (<CircularIndeterminate/>)}
            <Container>
                <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Grid className='input'>
                    <TextField value ={InputField} id="outlined-basic" label="New Employee(s)" variant="outlined" onChange = {handleChange} />
                    </Grid>
                    <Grid>
                        <Button variant="outlined" size="small" onClick={handleSubmit} >SUBMIT</Button>
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
                                <IconButton aria-label="download" onClick={()=>console.log(rows)}>
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
