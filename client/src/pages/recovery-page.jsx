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
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Alert from "../components/Alert";
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

//import { CSVLink } from 'react-csv';
//const axios = require('axios');




//https://v4.mui.com/es/components/buttons/?msclkid=40af928eb62411ecaf95a1a6c922508a
//https://materialui.co/icon/expand-more

const RecoveryPage = () =>{
    //------TEMPORARY DATA FOR TESTING
    //table data titles to simulate database
    const columnTitles = [
        {
            id: 0,
            title: "Date of Start"
        },
        {
            id: 1,
            title: "Date of end"
        },
        {
            id: 2,
            title: "January"
        },
        {
            id: 3,
            title: "February"
        },
        {
            id: 4,
            title: "March"
        },
        {
            id: 5,
            title: "Quarter1"
        },
        {
            id: 6,
            title: "April"
        },
        {
            id: 7,
            title: "May"
        },
        {
            id: 8,
            title: "June"
        },
        {
            id: 9,
            title: "Quarter2"
        },
        {
            id: 10,
            title: "Total"
        },
        {
            id: 11,
            title: "Total of billing"
        },
        {
            id: 12,
            title: "Total plus taxes"
        },
        {
            id: 13,
            title: "Pending to recover"
        },
        {
            id: 14,
            title: "Status"
        }

    ];
    const contentRows = [
        {
            id: "1234",
            DateStart: "11/03",
            DateFinish:"12/03",
            Quarters: [[100,200,300],[200,100,300]],
            taxes: 100,
            recover: 30,
            state: true

        },
        {
            id: "1235",
            DateStart: "11/03",
            DateFinish:"12/03",
            Quarters: [[100,200,300],[200,100,300]],
            taxes: 100,
            recover: 10,
            state: true

        }
    ];
  
    //------EMPLOYEES LIST USESTATE
    //modificating employees list
    const [ica, setIca] = useState(contentRows);


  
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
    //---------COLUMNS TITLES + BUTTON TO HIDE AND SORT ELEMENTS
    /*
    const quarters = columnTitles.map((item) =>
        <TableCell key={item.id}>
            columnTitles.Quarters.map((quarter) =>{
                <TableCell>{open[4] ? null : item.Quarters[0][2]}</TableCell>
                
            }
            
        </TableCell> 
        
    );*/



    

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

         
                <Table sx={{ minWidth: 30}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            
                            {titleItems}    
                        </TableRow>
                       
                    </TableHead>
                    <TableBody>    
                        {ica
                            .map((item) =>(
                            <TableRow key={item.id} sx={!item.state ? {bgcolor: '#ddd'} : {bgcolor: '#fff'}} >
                                
                                <TableCell >{open[0] ? null : item.DateStart}</TableCell>
                                <TableCell>{open[1] ? null : item.DateFinish}</TableCell>
                                <TableCell>{open[2] ? null : item.Quarters[0][0]}</TableCell>
                                <TableCell>{open[3] ? null : item.Quarters[0][1]}</TableCell>
                                <TableCell>{open[4] ? null : item.Quarters[0][2]}</TableCell>
                                <TableCell>{open[5] ? null : item.Quarters[0][0]+item.Quarters[0][1]+item.Quarters[0][2]}</TableCell>
                                <TableCell>{open[6] ? null : item.Quarters[1][0]}</TableCell>
                                <TableCell>{open[7] ? null : item.Quarters[1][1]}</TableCell>
                                <TableCell>{open[8] ? null : item.Quarters[1][2]}</TableCell>
                                <TableCell>{open[9] ? null : item.Quarters[1][0]+item.Quarters[1][1]+item.Quarters[1][2]}</TableCell>
                                <TableCell>{open[10] ? null : item.Quarters[0][0]+item.Quarters[0][1]+item.Quarters[0][2] + item.Quarters[1][0]+item.Quarters[1][1]+item.Quarters[1][2] }</TableCell>
                                <TableCell>{open[1] ? null : "0"}</TableCell>
                                <TableCell>{open[11] ? null : item.Quarters[0][0]+item.Quarters[0][1]+item.Quarters[0][2] + item.Quarters[1][0]+item.Quarters[1][1]+item.Quarters[1][2] + item.taxes}</TableCell>
                                <TableCell>{open[11] ? null : item.Quarters[0][0]+item.Quarters[0][1]+item.Quarters[0][2] + item.Quarters[1][0]+item.Quarters[1][1]+item.Quarters[1][2] + item.taxes -item.recover}</TableCell>
                                <TableCell>{open[1] ? null : item.state? "Activate": "Desactivate"}</TableCell>     
                            </TableRow>    
                    ))     
                }
                    </TableBody>
                 </Table>
               
            </TableContainer>

    )
}
export default RecoveryPage;