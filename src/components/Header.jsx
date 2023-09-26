import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SettingsIcon from '@mui/icons-material/Settings';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(false);

  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(!anchorEl);
  };

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
      console.error('Error al cerrar sesión:', err);
    }
  };

  return (
    <header>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              RegBills
            </Link>
          </Typography>
          {userInfo ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={3} sm={3}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton
                      size="large"
                      aria-label="Home"
                      color="inherit"
                      component={Link}
                      to="/home"
                    >
                      <HomeIcon />
                    </IconButton>
                    <Typography variant="caption" align="center">
                      Home
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton
                      size="large"
                      aria-label="Edit Note"
                      color="inherit"
                      component={Link}
                      to="/addregister"
                    >
                      <FormatListNumberedRtlIcon />
                    </IconButton>
                    <Typography variant="caption" align="center">
                      Data
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton
                      size="large"
                      aria-label="Edit Note"
                      color="inherit"
                      component={Link}
                      to="/addregister"
                    >
                      <PlaylistAddIcon />
                    </IconButton>
                    <Typography variant="caption" align="center">
                      Add
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton
                      size="large"
                      aria-label="Edit Note"
                      color="inherit"
                      component={Link}
                      to="/addregister"
                    >
                      <SettingsIcon />
                    </IconButton>
                    <Typography variant="caption" align="center">
                      Conf
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Box>
          ) : null}
          {userInfo ? (
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
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                color="inherit"
                component={Link}
                to="/registro"
                sx={{ marginRight: '10px' }}
              >
                Registro
              </Button>
              <Button color="inherit" component={Link} to="/iniciosesion">
                Iniciar sesión
              </Button>
            </Box>
          )}
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
        </Toolbar>
      </AppBar>
    </header>
  );
}; 

export default Header;
