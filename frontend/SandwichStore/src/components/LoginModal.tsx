import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StoreContext } from '../context/StoreProvider';
import service from '../services/login';
import { AxiosError } from 'axios';
import { decodeToken } from '../utils/login';
import { Cookies } from 'typescript-cookie';

const theme = createTheme();

const LoginButtonStyle = {
  color : "white",
  backgroundColor : "black",
  mt: 3, 
  mb: 2,
  "&:hover": {
    backgroundColor : "black",
    textDecoration: "underline #FFFFFF"
  }
}

interface SignInProps {
  handleSubmit: React.FormEventHandler;
  handleSignup: React.MouseEventHandler<HTMLAnchorElement>
  message: string | null;
}

const SignIn: React.FC<SignInProps> = ({handleSubmit, handleSignup, message}) => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography sx={{fontFamily: 'Futura', }} component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {
              message
              ? <Typography>
                  {message}
                </Typography>
              : null
            }

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={LoginButtonStyle}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link sx={{ cursor: "pointer" }} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link sx={{ cursor: "pointer" }} onClick={handleSignup} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  bgcolor: 'background.paper',
  p: 4,
};

const LoginModal = () => {

  const { state, dispatch } = React.useContext(StoreContext);

  const handleSubmit = (e : React.SyntheticEvent) => {  
    e.preventDefault();

    dispatch({ type : "clear-login-message" });

    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const name = target.username.value;
    const password = target.password.value;

    service
      .login({name, password})
      .then(({accessToken}) => {
        Cookies.set('accessToken', accessToken);
        
        const user = decodeToken(accessToken);
        
        dispatch({ type : "set-user", payload : user});
        dispatch({ type : "close-login" });
        dispatch({ type : "set-snackbar-message", payload : `Welcome back, ${user.name}!`})
      })
      .catch((err : AxiosError) => {
        dispatch({type : "login-failed", payload : "Username or password is incorrect!"})
      })
    
  };

  const handleSignup = (e : React.SyntheticEvent ) => {
    dispatch({ type : "togle-register" });
  }

  return (
    <div>
      <Modal
        open={state.openLogin}
        onClose={() => dispatch({ type: "close-login"})}
      >
        <Fade in={state.openLogin}>
          <Box sx={style}>
            <SignIn handleSubmit={handleSubmit} message={state.loginMessage} handleSignup={handleSignup}/>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}



export default LoginModal;
