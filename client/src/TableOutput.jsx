import React from 'react';
import "./TableOutput.css";
import Table_Data from './TableData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const TableOutput = (props) =>{
    const data = Table_Data;
    
    return(
        <TableContainer className='table'>
            <Table sx={{ minWidth: 50 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell >Id</TableCell>
                    <TableCell >Name</TableCell>
                    <TableCell >Amount</TableCell>
                    <TableCell >Id</TableCell>
                    <TableCell >Name</TableCell>
                    <TableCell >Amount</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data.map((data) => (
                    <TableRow key={data.id}>
                        <TableCell >{data.id}</TableCell>
                        <TableCell >{data.title}</TableCell>
                        <TableCell >{data.amount}</TableCell>
                        <TableCell >{data.id}</TableCell>
                        <TableCell >{data.title}</TableCell>
                        <TableCell >{data.amount}</TableCell>   
                    </TableRow>
                ))}
                </TableBody>
        </Table>
        </TableContainer>

    )
}
export default TableOutput;