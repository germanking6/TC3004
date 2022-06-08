import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";


const Alert = ({setDialog, dialog, message, toDo, elementId}) =>{
    const handleClose = (proceed) => {
        if (proceed){
            toDo(elementId);
        }
        setDialog(false);
    };
    return (
        <Dialog
        open={dialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {message}
            </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you wanna {message} ?
                    </DialogContentText>
                </DialogContent>
            <DialogActions>
                <Button onClick ={() => handleClose(false)}>Cancel</Button>
                <Button onClick={() => handleClose(true)}> Agree</Button>
            </DialogActions>
        </Dialog>

    )
}
export default Alert;