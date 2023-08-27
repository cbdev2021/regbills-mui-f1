import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { AccountCircle, ExitToApp } from '@mui/icons-material';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(false);

  //const [logoutApiCall] = useLogoutMutation();

  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(!anchorEl);
  };

  const handleLogout = async () => {
    try {
      // await logoutApiCall().unwrap();
      // dispatch(logout());
      //
      await logoutApi();
      dispatch(logout());
      //
      navigate('/login');
    } catch (err) {
      console.error(err);
      console.error('Error al cerrar sesión:', error);
    }
  };

  //console.log('anchorEl:', anchorEl); // Agrega esta línea para hacer un console.log de anchorEl

  return (
    <header>
      <AppBar position="static" color="primary" 
        // sx={{ borderRadius: '8px 8px 8px 8px' }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              RegBills
            </Link>
          </Typography>
          {userInfo ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={!anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>              
              <Button color="inherit" component={Link} to="/registro">
                Registro
              </Button>

              <Button color="inherit" component={Link} to="/iniciosesion">
                Iniciar sesión
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
