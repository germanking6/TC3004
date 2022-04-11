import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./employees.css";
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Alert from "../../components/Alert";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
//https://v4.mui.com/es/components/buttons/?msclkid=40af928eb62411ecaf95a1a6c922508a
//https://materialui.co/icon/expand-more

const EmployeesPage = () =>{
    const [inputField, setInputField] = useState("");
     
    const columnTitles = [
        {
            id: 0,
            title: "Serial"
        },
        {
            id: 1,
            title: "Country"
        },
        {
            id: 2,
            title: "Department"
        },
        {
            id: 3,
            title: "Department requester"
        },
        {
            id: 4,
            title: "Band"
        },
        {
            id: 5,
            title: "Type"
        },
        {
            id: 6,
            title: "Percentage recover"
        },
        {
            id: 7,
            title: "Date of Start"
        },
        {
            id: 8,
            title: "Date of finish"
        },
        {
            id: 9,
            title: "ICA Manager"
        },
        {
            id: 10,
            title: "ICA"
        },
        {
            id: 11,
            title: "Squad"
        }
    ]
    //const columnTitles = ["Serial", "Country","Department","Department requester","Band","Type","Percentage recover","Date of start","Date of finish","ICA Manager","ICA","Squad"];
    const contentRows = [
        {
            id: "1234",
            Country: "GDL",
            EmployeeDepartment: "SW",
            DepartmentRequester: "admin",
            Band:2,
            Type: 2,
            PercentageRecover:20,
            DateStart: "11/03",
            DateFinish:"12/03",
            ICAManager: "nnn",
            ica: 555,
            Squad: "varam",
            state: true

        },
        {
            id: "1235",
            Country: "GDL",
            EmployeeDepartment: "SW",
            DepartmentRequester: "sw",
            Band:1,
            Type: 1,
            PercentageRecover:50,
            DateStart: "11/03",
            DateFinish:"12/03",
            ICAManager: "nnn",
            ica: 123,
            Squad: "varam",
            state: true

        }
    ];
    const squads = [
    {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
    ];
    const [squad, setSquad] = useState('EUR');

    //------COLUMNS
    
   //hide columns function
   //variables
    const a = [false, false,false,false,false,false,false,false,false,false,false,false];
    const [open, setOpen] = useState(a);
    //function
    const hidding = (id, e) =>{
        const temp = [...open];
        temp.splice(id, 1, !open[id]);
        setOpen(temp);
    };
    //sorting columns
    //variables
    const [sort,setSort] = useState(a);
    //function
    const sorting = (id) =>{
        const keyObj = (Object.keys(employees[0])[id]);
        const arr = [...employees];
        console.log(keyObj);
        setEmployees(arr.sort(((a, b) => (Object.values(a)[id]) -Object.values(b)[id])));
        /*
        for (let value of Object.values(employees[0])){
            console.log(value);
            setEmployees(arr.sort(((a, b) => (Object.values(a)) -Object.values(b))));
        }*/
    }

    //------EMPLOYEES LIST USESTATE
    //modificating employees list
    const [employees, setEmployees] = useState(contentRows);

    //------ALERTS AND ACTIONS ICON BUTTONS OF EACH ROW

    //dialog alert variables setStatus
    const [dialogDelete, setDialogDelete] = useState(false);
    const [dialogEdit, setDialogEdit] = useState(false);
    const [dialogActivate, setDialogActivate] = useState(false);
    //for delete option
    const [agree, setAgree] = useState(false);
    //function delete
    const deleteEmployee = (id) =>{
        setDialogDelete(true);
        
        console.log(agree);
        //setDialogDelete(false); 
        //handleClose();
        console.log(id);

        let arreglo = [...employees];
        console.log(arreglo.filter((item) => item.id != id));
        setEmployees(arreglo.filter((item) => item.id != id));
        console.log(employees);
        console.log(agree);
        //setDialogDelete(false);
    };
    //for edit option
    const [edit, setEdit] = useState(false);
    const closeEdit = () => {
        setEdit(false);
        //setDialogEdit(true);
        
    };
    //function edit
    const editEmployee = (id) =>{
        setEdit(true);
        console.log("edit");
    };
    //for activate option
    const handleOpenActivate = () => {
        setDialogActivate(true);
        
    };
    //function activate
    const activateEmployee = (id) =>{
        let arreglo = [...employees];
        
        arreglo.map((item) => {
            if(item.id == id){
                item.state = !item.state;
            }
            
        });
        setEmployees(arreglo);
        
    };
    
    //------ADD EMPLOYEES

     //inputChange for adding employees        
     const handleChange = (event) =>{
        //console.log(event.target.value);
        setInputField(event.target.value);

    };
  
    const addEmployee = () =>{
        console.log(employees);
        console.log(contentRows);
        console.log(inputField);
        let obj = {
            id: inputField,
            Country: "",
            EmployeeDepartment: "",
            DepartmentRequester: "",
            Band:2,
            Type: 1,
            PercentageRecover:50,
            DateStart: "",
            DateFinish:"",
            ICAManager: "",
            ica: 123,
            Squad: "",
            state: true
        }
        const arr = [...employees,obj];
        setEmployees(arr);
        setInputField("");   
       
    };

 
   
    const titleItems = columnTitles.map((item) =>
        <TableCell key={item.id}>
            {item.title}
            {open[item.id] ? <KeyboardArrowUpIcon size="small" key={item.id} onClick={(e) => hidding(item.id, e)}/> : <KeyboardArrowDownIcon key={item.id} onClick={(e) => hidding(item.id, e)}/>}   
            {sort[item.id] ? <KeyboardArrowUpIcon size="big" key={item.id*10+1} onClick={() => sorting(item.id)}/> : <KeyboardArrowDownIcon key={item.id*10+1} onClick={() => sorting(item.id)} />}   
                    
        </TableCell> 
        
    );
    return(
   
            <TableContainer className='table'>

            <form className='form' noValidate autoComplete="off">
                <TextField value ={inputField} id="outlined-basic" label="New Employee(s)" variant="outlined" onChange = {handleChange} />
                <Button className='b' color="primary" onClick={addEmployee}>Submit</Button>
                <IconButton className='b' size="small">
                    Import xsv
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/></svg>
                </IconButton>
             </form>
                <Table sx={{ minWidth: 30}} aria-label="simple table">
                    <TableHead>
                    
                        <TableRow>
                            
                            {titleItems}    
                        </TableRow>
                         
                    </TableHead>
                    <TableBody>    
                        {employees
                            .map((item) =>(
                            <TableRow key={item.id} sx={!item.state ? {bgcolor: '#ddd'} : {bgcolor: '#fff'}} >
                                
                                <TableCell >{open[0] ? null : item.id}</TableCell>
                                <TableCell>{open[1] ? null : item.Country}</TableCell>
                                <TableCell>{open[2] ? null : item.EmployeeDepartment}</TableCell>
                                <TableCell>{open[3] ? null : item.DepartmentRequester}</TableCell>
                                <TableCell>{open[4] ? null : item.Band}</TableCell>
                                <TableCell>{open[5] ? null : item.Type}</TableCell>
                                <TableCell>{open[6] ? null : item.PercentageRecover}</TableCell>
                                <TableCell>{open[7] ? null : item.DateStart}</TableCell>
                                <TableCell>{open[8] ? null : item.DateFinish}</TableCell>
                                <TableCell>{open[9] ? null : item.ICAManager}</TableCell>
                                <TableCell>{open[10] ? null : item.ica}</TableCell>
                                <TableCell>{open[11] ? null : item.Squad}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="delete" size="small" height="15" width="15" key={item.id} id={item.id} onClick={() => deleteEmployee(item.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Alert agree={agree} setAgree ={setAgree} dialog={dialogDelete} setDialog={setDialogDelete} message= {"Delete employee"} />
                                    
                                    
                                    <IconButton  size="small"  id={item.id} onClick={() => editEmployee(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 24 24" width="15"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" id={item.id} /></svg>
                                    </IconButton>
                                    <Alert agree={agree} setAgree ={setAgree} dialog={dialogEdit} setDialog={setDialogEdit} toDo={editEmployee} ide= {item.id} message= {"Edit employee"} />
                                  
                                    
                                    <IconButton color = "secondary" size="small" id={item.id} onClick={() => activateEmployee(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 24 24" width="15"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" id={item.id} /></svg>
                                    </IconButton>
                                    <Alert agree={agree} setAgree ={setAgree} dialog={dialogActivate} setDialog={setDialogActivate} toDo={activateEmployee} ide= {item.id} message= {"Activate employee"} />

                                    
                                </TableCell>   
                                         
                            </TableRow>    
                    ))     
                }
                    </TableBody>
                 </Table>
                <Dialog
                open={edit}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Type:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Type"
                        variant="standard"
                    />
                    <DialogContentText>
                        Band
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Band"
                        variant="standard"
                    />
                     <DialogContentText>
                        ICA:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="ICA"
                        variant="standard"
                    />
                     <DialogContentText>
                        Squad:
                    </DialogContentText>
                    <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
    >
                    <div>
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        value={squad}
                        
                        helperText="Please select your squad"
                        >
                        {squads.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                        </div>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick= {closeEdit}> Cancel</Button>
                    <Button onClick= {closeEdit}>Subscribe</Button>
                    </DialogActions>
                </Dialog> 
            </TableContainer>

    )
}
export default EmployeesPage;