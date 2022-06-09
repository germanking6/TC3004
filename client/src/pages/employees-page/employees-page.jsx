import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/IconButton';
import "./employees.css";
import { useState,useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Alert from "../../components/Alert";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as XLSX from "xlsx";
import { Autocomplete } from '@mui/material';
import HeaderComponent from '../../components/HeaderComponent';
import { countries } from './countries';



//https://v4.mui.com/es/components/buttons/?msclkid=40af928eb62411ecaf95a1a6c922508a
//https://materialui.co/icon/expand-more
const url = "http://127.0.0.1:5000/employeesPage";
const url2 = "http://127.0.0.1:5000/addEmployee";
const url3 = "http://127.0.0.1:5000/updateStateEmployee";
const EmployeesPage = () =>{
    //------TEMPORARY DATA FOR TESTING
    //table data titles to simulate database
    const columnTitles = [
        {
            id: 0,
            title: "ID"
        },
        {
            id: 1,
            title: "Mail"
        },
        {
            id: 2,
            title: "Country"
        },
        {
            id: 3,
            title: "Department"
        },
        {
            id: 4,
            title: "Department requester"
        },
        {
            id: 5,
            title: "Band"
        },
        {
            id: 6,
            title: "Type"
        },
        {
            id: 7,
            title: "Percentage recover"
        },
        {
            id: 8,
            title: "Date of Start"
        },
        {
            id: 9,
            title: "Date of finish"
        },
        {
            id: 10,
            title: "ICA Manager"
        },
        {
            id: 11,
            title: "ICA"
        },
        {
            id: 12,
            title: "Squad"
        }
    ];

    //------EMPLOYEES LIST USESTATE
    //modificating employees list
    const [employees, setEmployees] = useState([]);
    const [type, setType] = useState([{label: "", value: -1}])
    //fetch
    const cargarDatos = async () => {
        try{
            const res = await fetch(url);
            const datos = await res.json();
            setEmployees(await datos.data);
            console.log(datos.types)
            setType(await datos.types)
            
        } catch(err) {
            console.log(err);
        }
    };
    useEffect(async () => {
        await cargarDatos();
        console.log(type)
    }, []);

    //------INPUT ADD EMPLOYEES
    //Input State for adding employee
    const [inputField, setInputField] = useState("");
    //inputChange for adding employees        
    const handleChange = (event) =>{
        event.preventDefault();
        setInputField(event.target.value);
    };
    async function createEmployee(obj){
        await fetch(url2,{
            method:'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(obj)
        });
        await cargarDatos();
    }
    //Function: adding employee 
    const addEmployee = () =>{
        if (inputField != ""){
            //new employee object
            let obj = {
                id: -1,
                Mail: inputField,
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
                state: false
            }
            createEmployee(obj);
            
            //setting input to empty
            setInputField(""); 
        }  
        else{
            alert("No input!");
        }
    };

    //------EXCEL TABLE
    const updateExcel = (e) =>{
        e.preventDefault();
        const [file] = e.target.files;
        console.log(e.target.files);
        const reader = new FileReader();
        const fileEx = event.dataTransfer.files[0];
        convertExcelToObject(fileEx);
        console.log(fileEx);

        reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        console.log(data);
        //https://dev.to/emman1320/convert-your-excel-file-to-a-javascript-object-using-react-without-storing-the-static-file-in-your-database-24jk
    };
    reader.readAsBinaryString(file)
       //https://stackoverflow.com/questions/62408085/how-to-get-the-data-from-excel-in-json-format-in-reactjs

    }

    //------COLUMNS
   //hide columns function
   //variables
    //setting false to all columns
    const a = [false, false,false,false,false,false,false,false,false,false,false,false];
    //Hidding state
    const [open, setOpen] = useState(a);
    //Hidding function
    const hidding = (id, e) =>{
        //temporary array
        const temp = [...open];
        //edit variable for open/hide columns in temporary array
        temp.splice(id, 1, !open[id]);
        //edit state 
        setOpen(temp);
    };
    //sorting columns
    //variables
    const [sort,setSort] = useState(a);
    //function
    const sorting = (id) =>{
        //temporary array for employees
        const arr = [...employees];
        //sorting employees depending on id column for sorting task
        setEmployees(arr.sort(((a, b) => ('' + Object.values(a)[id]).localeCompare(Object.values(b)[id]))));
         //temporary array
        const temp = [...sort];
         //edit variable for open/hide columns in temporary array
        temp.splice(id, 1, !sort[id]);
         //edit sort state 
        setSort(temp);
    }

    //------ALERTS AND ACTIONS ICON BUTTONS OF EACH ROW

    //------DELETE EMPLOYEES
    //VARIABLES
    //dialog alert variables setStatus
    const [dialogDelete, setDialogDelete] = useState(false);
    //IdDeleteEmployee
    const [idDelete, setIdDelete] = useState();

    //opendialog delete 
    const openDialogDelete = (id) =>{
        setDialogDelete(true);
        setIdDelete(id);
    }
    
    //function delete
    const deleteEmployee = (id) =>{
        //temporary array
        let arreglo = [...employees];
        //filter/delete element
        setEmployees(arreglo.filter((item) => item.id != id));
        fetch(url,{
            method:'DELETE',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({"ID":id})
        });
        
    };

    //------EDIT EMPLOYEES
    //VARIABLES
    //----------------TEMPORARY DATA

    //Employee data for simulate data base 
    //data of select bar for edit option (simulation and testing)
    
    const country = countries;

    const department = [
        {
            value: 'Admin',
            label: 'ADMIN',
        },
        {
            value: 'SW',
            label: 'SW',
        }
    ];

    const band = [
        {
            value: '1',
            label: '1',
        },
        {
            value: '2',
            label: '2',
        }
    ];

    const icaM = [
        {
            value: 'Julio',
            label: 'Julio',
        },
        {
            value: 'Cesar',
            label: 'Cesar',
        }
    ];

    const ica = [
        {
            value: '124',
            label: 'Julio',
        },
        {
            value: '123',
            label: 'Cesar',
        }
    ];

    const squads = [
        {
            value: 'Varam',
            label: 'Varam',
        },
        {
            value: 'Squad1',
            label: 'Squad1',
        },
        {
            value: 'Squad2',
            label: 'Squad2',
        },
        {
            value: 'Squad3',
            label: 'Squad3',
        },
    ];
    
    //--TEMPORARYDATAEND
    //EDIT 
    const [selectMail, setSelectMail] = useState("");
    const handleChangeMailInput = (event) =>{
        setSelectMail(event.target.value);
    };
    //country handler
    const [selectCountry, setSelectCountry] = useState(country[0].value);
    const handleChangeCountryInput = (event) =>{
        setSelectCountry(event.target.value);
    };
    //department handler
    const [selectDepartment, setSelectDepartment] = useState(department[0].value);
    const handleChangeDepartmentInput = (event) =>{
        setSelectDepartment(event.target.value);
    };
    //department request handler
    const [selectDepartmentRequest, setSelectDepartmentRequest] = useState(department[0].value);
    const handleChangeDepartmentRequestInput = (event) =>{
        setSelectDepartmentRequest(event.target.value);
    };
    //band handler
    const [selectBand, setSelectBand] = useState(band[0].value);
    const handleChangeBandInput = (event) =>{
        setSelectBand(event.target.value);
    };
    //type handler
    const [selectType, setSelectType] = useState(type[0].value);
    //const [selectType, setSelectType] = useState();
    const handleChangeTypeInput = (event) =>{
        setSelectType(event.target.value);
    };
    //date start change handler
    const [selectDateS, setSelectDateS] = useState();
    const dateSChangeHandler = (event) =>{
        setSelectDateS(event.target.value);
    };
    //date end change handler
    const [selectDateE, setSelectDateE] = useState();
    const dateEChangeHandler = (event) =>{
        setSelectDateE(event.target.value);
    };
    //ica manager handler
    const [selectIcaM, setSelectIcaM] = useState(icaM[0].value);
    const handleChangeIcaMInput = (event) =>{
        setSelectIcaM(event.target.value);
    };
    //ica handler
    const [selectIca, setSelectIca] = useState(ica[0].value);
    const handleChangeIcaInput = (event) =>{
        setSelectIca(event.target.value);
    };
    //squad handler
    const [selectSquad, setSelectSquad] = useState(squads[0].value);
    const handleChangeSquadInput = (event) =>{
        setSelectSquad(event.target.value);
    };
    const [selectPR, setSelectPR] = useState(-1);
    const handleChangePRInput = (event) =>{
        setSelectPR(event.target.value);
    };
    //edit option or cancel task
    const [edit, setEdit] = useState(false);
    //id for delete option
    const [editId, setEditId] = useState();
    
    //closing edit window of inputs
    const closeEdit = (confirm) => {
        if(confirm){
            //temporary array
            let arreglo = [...employees];
            let pr;
            let st;
            //mapping array to change status of element id
            arreglo.map((item) => {
                if(item.id == editId){
                    item.Mail = selectMail;
                    item.Country = selectCountry;
                    item.EmployeeDepartment = selectDepartment;
                    item.DepartmentRequester = selectDepartmentRequest;
                    item.Band = selectBand;
                    item.Type = selectType;
                    item.DateStart = selectDateS;
                    item.DateFinish = selectDateE;
                    item.ICAManager = selectIcaM;
                    item.ica = selectIca;
                    item.Squad = selectSquad;
                    item.PercentageRecover = selectPR;
                    st = item.state;
                }
                
            });
            
            fetch(url+`?id=${editId}&country=${selectCountry}&EmployeeDepartment=${selectDepartment}&DepartmentRequester=${selectDepartmentRequest}&band=${selectBand}&kind=${selectType}&percentageRecover=${selectPR}&dateStart=${selectDateS}&dateFinish=${selectDateE}&icaManager=${selectIcaM}&ica=${selectIca}&squad=${selectSquad}&state=${st}&mail=${selectMail}`, {
                method: "POST",
                body: "id=1"
            })

            //change state of employees
            setEmployees(arreglo); 
        }
        setEdit(false); 
    };
    //function edit
    const editEmployee = (id) =>{
        setEdit(true);
        employees.map((item) => {
            if(item.id == id){
                setSelectMail(item.Mail); 
            }
        });
        setEditId(id);
    };

    //------ACTIVATE/DESACTIVATE EMPLOYEES
    //VARIABLES
    //open dialog activate/desactivate
    const [dialogActivate, setDialogActivate] = useState(false);
    //idStatus
    const [activateId, setActivateId] = useState();
    //openDialog
    const OpenActivateEmployee = (id) => {
        setDialogActivate(true);
        setActivateId(id);      
    };
    //function activate
    const activateEmployee = (id) =>{
        //temporary array
        let arreglo = [...employees];
        //mapping array to change status of element id
        arreglo.map((item) => {
            if(item.id == id){
                let newState = !item.state;
                item.state = newState;
                fetch(url3,{
                    method:'POST',
                    headers : {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({"ID":id, "State":newState})
                });
            }
        });
        
        

        //change state of employees
        setEmployees(arreglo);  
    };
    

    //---------COLUMNS TITLES + BUTTON TO HIDE AND SORT ELEMENTS
    const titleItems = columnTitles.map((item) =>
        <TableCell key={item.id}>
            {item.title}
            {open[item.id] ? <KeyboardArrowUpIcon size="small" key={item.id} onClick={(e) => hidding(item.id, e)}/> : <KeyboardArrowDownIcon key={item.id} onClick={(e) => hidding(item.id, e)}/>}   
            {sort[item.id] ? <KeyboardArrowUpIcon size="big" key={item.id*10+1} onClick={() => sorting(item.id)}/> : <KeyboardArrowDownIcon key={item.id*10+1} onClick={() => sorting(item.id)} />}   
                    
        </TableCell> 
        
    );
    //---------HTML
    return(
        
        <TableContainer className='table'>
                <HeaderComponent title="Employee Page"/>
            <form className='form' noValidate autoComplete="off">
                <Box m={1} pt={1}>
                    <TextField value ={inputField} id="outlined-basic" label="New Employee(s)" variant="outlined" onChange = {handleChange} />
                    <Button className='b' color="primary" onClick={addEmployee}>Submit</Button>
                </Box>
                <Box m={1} pt={1}>
                    <input type="file" onChange={updateExcel} />
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/></svg>
                </Box>
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
                                <TableCell>{open[1] ? null : item.Mail}</TableCell>
                                <TableCell>{open[2] ? null : item.Country}</TableCell>
                                <TableCell>{open[3] ? null : item.EmployeeDepartment}</TableCell>
                                <TableCell>{open[4] ? null : item.DepartmentRequester}</TableCell>
                                <TableCell>{open[5] ? null : item.Band}</TableCell>
                                <TableCell>{open[6] ? null : item.Type}</TableCell>
                                <TableCell>{open[7] ? null : item.PercentageRecover}</TableCell>
                                <TableCell>{open[8] ? null : item.DateStart}</TableCell>
                                <TableCell>{open[9] ? null : item.DateFinish}</TableCell>
                                <TableCell>{open[10] ? null : item.ICAManager}</TableCell>
                                <TableCell>{open[11] ? null : item.ica}</TableCell>
                                <TableCell>{open[12] ? null : item.Squad}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="delete" size="small" height="15" width="15" key={item.id} id={item.id} onClick={() => openDialogDelete(item.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Alert elementId ={idDelete} toDo= {deleteEmployee} dialog={dialogDelete} setDialog={setDialogDelete} ide= {item.id} message= {"Delete employee"} />
                                    
                                    <IconButton  size="small"  id={item.id} onClick={() => editEmployee(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 24 24" width="15"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" id={item.id} /></svg>
                                    </IconButton>
                                    
                                
                                    
                                    <IconButton color = "secondary" size="small" id={item.id} onClick={() => OpenActivateEmployee(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 24 24" width="15"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" id={item.id} /></svg>
                                    </IconButton>
                                    <Alert elementId ={activateId} dialog={dialogActivate} setDialog={setDialogActivate} toDo={activateEmployee} ide= {item.id} message= {"Change employee state (activat/desactivate)"} />
                                    
                                </TableCell>   
                            
                            </TableRow>    
                    ))     
                }
                    </TableBody>
                </Table>
                <Dialog
                open={edit}>
                    <DialogTitle>Edit Employee</DialogTitle>
                    <DialogContent>
                        
                        <Box sx={{ minWidth: 700 }}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                    
                            <TextField
                                required
                                id="select-mail"
                                value={selectMail}
                                onChange={handleChangeMailInput}
                                label="Mail"
                                variant="standard"
                                helperText="Please enter employee email"
                                type="email"
                            />
                            
                        </FormControl>

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                    
                            <InputLabel id="select-country">Country</InputLabel>
                            <Select
                            labelId="select-country-label"
                            id="select-country"
                            value={selectCountry}
                            label="Country"
                            onChange={handleChangeCountryInput}
                            >
                            {country.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <ListItemText inset>{option.label}</ListItemText>
                                </MenuItem>
                            
                            ))}
                            </Select>
                        </FormControl>

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="select-department">Department</InputLabel>
                            <Select
                            labelId="select-department-label"
                            id="select-department"
                            value={selectDepartment}
                            label="Department"
                            onChange={handleChangeDepartmentInput}
                            >
                            {department.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <ListItemText inset>{option.label}</ListItemText>
                                </MenuItem>
                                
                            ))}
                            </Select>
                        </FormControl>


                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400, border: 2 }}>
                            <InputLabel id="select-department-r">Department requester</InputLabel>
                            <Select
                            labelId="select-department-r-label"
                            id="select-department-r"
                            value={selectDepartmentRequest}
                            label="Department-r"
                            onChange={handleChangeDepartmentRequestInput}
                            >
                            {department.map((option) => (
                                <MenuItem sx={{minWidth: 200}} key={option.value} value={option.value}>
                                    <ListItemText inset>
                                        {option.label}
                                    </ListItemText>
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>


                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="select-band">Band</InputLabel>
                            <Select
                            labelId="select-band-label"
                            id="select-band"
                            value={selectBand}
                            label="band"
                            onChange={handleChangeBandInput}
                            >
                            {band.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <ListItemText inset>{option.label}</ListItemText>
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>


                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="select-type">Type</InputLabel>
                            <Select
                            labelId="select-type"
                            id="select-type"
                            value={selectType}
                            label="type"
                            onChange={handleChangeTypeInput}
                            >
                            {type.map((option) => (
                                <MenuItem key={option.value} value={option.value} >
                                    <ListItemText inset>{option.label}</ListItemText>
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <br></br>
                        <br></br>

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                    
                            <TextField
                                required
                                id="select-PR"
                                value={selectPR}
                                onChange={handleChangePRInput}
                                label="Percentage recover"
                                variant="standard"
                                helperText="Please enter percentage recover"
                                type="number"
                            />
                            
                        </FormControl>

                        <div>
                            <InputLabel id="select-date-s">Date start</InputLabel>
                            <input sx={{minHeight: 400, border: 4000 }}
                                type='date'
                                min='2019-01-01'
                                max='2022-12-31'
                                onChange={dateSChangeHandler}
                                >
                            </input>
                        </div>
                        <br></br>
                        <br></br>
                        <div>
                            <InputLabel id="select-date-e">Date end</InputLabel>
                            <input
                                type='date'
                                min='2019-01-01'
                                max='2022-12-31'
                                onChange={dateEChangeHandler}
                                >
                            </input>
                        </div>
                        <br></br>
                        <br></br>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="select-ica-m">ICA Manager</InputLabel>
                            <Select
                            labelId="select-ica-m"
                            id="select-ica-m"
                            value={selectIcaM}
                            label="type"
                            onChange={handleChangeIcaMInput}
                            >
                            {icaM.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <ListItemText inset>{option.label}</ListItemText>
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="select-ica">ICA</InputLabel>
                            <Select
                            labelId="select-ica"
                            id="select-ica"
                            value={selectIca}
                            label="type"
                            onChange={handleChangeIcaInput}
                            >
                            {ica.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <ListItemText inset>{option.label}</ListItemText>
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>


                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="select-squad">Squad</InputLabel>
                            <Select
                            labelId="select-squad"
                            id="select-squad"
                            value={selectSquad}
                            label="type"
                            onChange={handleChangeSquadInput}
                            >
                            {squads.map((option) => (
                                <MenuItem sx={{ m: 1, minWidth: 400 }} key={option.value} value={option.value}>     
                                    <ListItemText inset>{option.label}</ListItemText>    
                                </MenuItem>
                            
                            ))}
                            </Select>
                        </FormControl>
                        </Box>
                    
                    
                    </DialogContent>
                    <DialogActions>
                    <Button onClick= {() =>closeEdit(false)}> Cancel</Button>
                    <Button onClick= {() =>closeEdit(true)}>Confirm Changes</Button>
                    </DialogActions>
                </Dialog> 
            </TableContainer>

    )
}
export default EmployeesPage;
