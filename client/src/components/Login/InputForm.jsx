import { Box, flexbox } from "@mui/system";
import Grid from "@mui/material/Grid";
import {
  Paper,
  CssBaseline,
  Typography,
  Avatar,
  FormControlLabel,
  TextField,
  Checkbox,
  Button,
  Link,
} from "@mui/material";

const InputForm = (props) => {
  const { sx, ...other } = props;
  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid />
      <Grid component={Paper} elevation={6} square>
        <div>
          <Avatar>
            <p>a</p>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form noValidate>
            <TextField
              variant="outlined"
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
              variant="outlined"
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
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default InputForm;
