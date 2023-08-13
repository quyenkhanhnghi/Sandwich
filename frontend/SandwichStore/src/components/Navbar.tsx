import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Logo from "../icons/logo.svg";
import { Button, Menu, MenuItem, SxProps, Theme } from '@mui/material';
import { StoreContext } from '../context/StoreProvider';
import { Cookies } from 'typescript-cookie';
import { Link } from 'react-router-dom';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const LoginButtonStyle : SxProps<Theme> = {
  color : "white",
  fontSize: "15px",
  ml: "auto",
  mr: 2,
  backgroundColor : "black",
  "&:hover": {
    backgroundColor : "black",
    textDecoration: "underline #FFFFFF"
  }
}
export default function Navbar() {
  const { state, dispatch } = React.useContext(StoreContext);
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onLogout = () : void => {
    Cookies.remove('accessToken');
    dispatch({ type : "set-user", payload: null });
    handleClose();
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10
  });

  const handleLogin = () => dispatch({type: "open-login"});

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar sx={{ backgroundColor: trigger ? "rgba(255,255,255,0.7)" : "transparent"}}>
          <Toolbar>
            <Link to={"/"}>
              <img src={Logo} style={{ width: "200px" }} ></img>
            </Link>
            {
              state.user
              ? <>
                  <Button sx={LoginButtonStyle}
                    onClick={handleClick}
                  >
                    Hi, {state.user.name}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleClose}><Link to={"/orders"}>My orders</Link></MenuItem>
                    <MenuItem onClick={onLogout}>Logout</MenuItem>
                  </Menu>
                </>
              : <Button sx={LoginButtonStyle} onClick={handleLogin}>Login</Button>
            }
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}