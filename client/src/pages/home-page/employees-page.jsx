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
//https://v4.mui.com/es/components/buttons/?msclkid=40af928eb62411ecaf95a1a6c922508a
//https://materialui.co/icon/expand-more

const EmployeesPage = (props) =>{
    const a = [false, false,false,false,false,false,false,false,false,false,false,false];
    const [open, setOpen] = useState(a);
    const columnTitles = ["Serial", "Country","Department","Department requester","Band","Type","Percentage recover","Date of start","Date of finish","ICA Manager","ICA","Squad"];
    const contentRows = [
        {
            id: "1234",
            Country: "GDL",
            EmployeeDepartment: "SW",
            DepartmentRequester: "sw",
            Band:2,
            Type: 1,
            PercentageRecover:50,
            DateStart: "11/03",
            DateFinish:"12/03",
            ICAManager: "nnn",
            ica: 123,
            Squad: "varam",
            state: true

        },
        {
            id: "1235",
            Country: "GDL",
            EmployeeDepartment: "SW",
            DepartmentRequester: "sw",
            Band:2,
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
   /* const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
        
    };*/
    const hidding = (event) =>{
        const temp = [...open];
        temp.splice(event.target.id, 1, !open[event.target.id]);
        setOpen(temp);
    };
   

    const titleItems = columnTitles.map((title) =>
        <><TableCell key={columnTitles.indexOf(title)} id={columnTitles.indexOf(title)}  onClick={hidding}>
            {title}
            {open[columnTitles.indexOf(title)] ? <KeyboardArrowUpIcon size="big" id={columnTitles.indexOf(title)}/> : <KeyboardArrowDownIcon id={columnTitles.indexOf(title)} />}   
        </TableCell></>
        
    );

    const listItems = contentRows.map((item) =>
        <TableRow key={item.id} >
                <TableCell>{open[0] ? null : item.id}</TableCell>
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
                <IconButton aria-label="delete" size="small" height="15" width="15">
                    <DeleteIcon />
                </IconButton>
                <IconButton  size="small">
                    <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 24 24" width="15"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                </IconButton>
                <IconButton size="small">
                    <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 24 24" width="15"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg>
                </IconButton>
                
        </TableRow>
    );

    return(
        <><form className='form' noValidate autoComplete="off">
        <TextField id="outlined-basic" label="New Employee(s)" variant="outlined" />
        <Button className='b' color="primary">Submit</Button>
        <IconButton className='b' size="small">
            Import xsv
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/></svg>
        </IconButton>
      </form>
        <TableContainer className='table'>
            <Table sx={{ minWidth: 30 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {titleItems}    
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listItems}
                </TableBody>
            </Table>
        </TableContainer></>

    )
}
export default EmployeesPage;