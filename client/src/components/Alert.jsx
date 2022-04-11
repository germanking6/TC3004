import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const Alert = ({setDialog, dialog, message, agree, setAgree}) =>{
    const handleClose = (proceed) => {
        if (proceed){
            setAgree(true);
        }
        setDialog(false);
    };
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    
    return (
        <Dialog
        fullScreen={fullScreen}
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