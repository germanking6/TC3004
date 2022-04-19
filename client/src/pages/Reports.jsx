import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export default function Reports() {
    const [from, setFrom] = React.useState(null);
    const [to, setTo] = React.useState(null);

    function submitHandler() {
        console.log(from);
        console.log(to);
    }

    return (
        <Box 
            sx={{
            display: "flex",
            justifyContent: "center",
            p: 5,
            gap: 2,
        }}>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Date Start"
                    value={from}
                    onChange={(newValue) => {
                        setFrom(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    label="Date Finish"
                    value={to}
                    onChange={(newValue) => {
                        setTo(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            <Button variant="contained" onClick={submitHandler}>Submit</Button>



        </Box>




    );
}