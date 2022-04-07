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
//https://v4.mui.com/es/components/buttons/?msclkid=40af928eb62411ecaf95a1a6c922508a
//https://materialui.co/icon/expand-more

const EmployeesPage = (props) =>{
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
            Squad: "varam"

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
            Squad: "varam"

        }
    ];
    const titleItems = columnTitles.map((title) =>
        <><TableCell key={title.toString()}>
            {title}
            <TableRow>
            <IconButton size="small">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
            </IconButton>
        </TableRow>
        </TableCell></>
        
    );

    const listItems = contentRows.map((item) =>
        <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
                <TableCell>{item.Country}</TableCell>
                <TableCell>{item.EmployeeDepartment}</TableCell>
                <TableCell>{item.DepartmentRequester}</TableCell>
                <TableCell>{item.Band}</TableCell>
                <TableCell>{item.Type}</TableCell>
                <TableCell>{item.PercentageRecover}</TableCell>
                <TableCell>{item.DateStart}</TableCell>
                <TableCell>{item.DateFinish}</TableCell>
                <TableCell>{item.ICAManager}</TableCell>
                <TableCell>{item.ica}</TableCell>
                <TableCell>{item.Squad}</TableCell>
                <IconButton aria-label="delete" size="small">
                    <DeleteIcon />
                </IconButton>
                <IconButton  size="small">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                </IconButton>
                <IconButton size="small">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg>
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