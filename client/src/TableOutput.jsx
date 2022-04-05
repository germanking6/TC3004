import React from 'react';
import "./TableOutput.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const TableOutput = (props) =>{
    //const columnTitles = ["id", "title","amount"];
    //const contentRows = [[1,"ariana",33],[2,"canela",5]];
    
    const titleItems = props.columnTitles.map((title) =>
        <TableCell key={title.toString()}>
            {title}
        </TableCell>
   
    );

    const listItems = props.contentRows.map((item) =>
        <TableRow key={item[0].toString()}>
        {
            item.map((element) => 
            <TableCell key= {element.toString()} >
                    {element}
            </TableCell>
            )
        }
        </TableRow>
    );

    return(
        <TableContainer className='table'>
            <Table sx={{ minWidth: 50 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {titleItems}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listItems}               
                </TableBody>
        </Table>
        </TableContainer>

    )
}
export default TableOutput;