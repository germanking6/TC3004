import * as React from "react";

import { CssBaseline, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ibmImage from "../../assets/tom-podmore-bjeNCu8Lzsw-unsplash_ccexpress.jpeg";
import "./Login.css";
import InputForm from "./InputForm";

const theme = createTheme();

export default function Login() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <InputForm />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{
            backgroundImage: `url(${ibmImage})`,
          }}
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
