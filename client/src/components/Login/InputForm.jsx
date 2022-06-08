import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import userJson from "../../assets/data.json";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import InputFooter from "./InputFooter";
import { UserContext } from "../../context/AuthContext";

export default function InputForm(props) {
  const [successfulLogin, setSucessfulLogin] = useState();
  const AuthCtx = React.useContext(UserContext);


  const handleSubmit = (event) => {
    event.preventDefault();
    

    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let password = data.get("password");

    const userData = userJson.find((user) => user.email === email);
    if (userData) {
      if (userData.password === password) {
        console.log("Sucessful Login");
        setSucessfulLogin(true);
        AuthCtx.login();
      } else {
        console.log("Incorrect Password");
        setSucessfulLogin(false);
        props.setSuccess(successfulLogin);
      }
    } else {
      console.log("Incorrect Email");
      setSucessfulLogin(false);
    }
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            error={successfulLogin == false}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            error={successfulLogin == false}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <InputFooter />
        </Box>
      </Box>
    </Grid>
  );
}
