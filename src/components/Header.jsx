import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';
import styles from './Header.module.css';
import { AppBar as MuiAppBar, Button, CssBaseline, Toolbar, Typography } from '@mui/material';



const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logout());
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // return (
  //   <div className={styles.header}>
  //     <div className={styles.logo}>RegBills</div>
  //     <div className={styles.buttons}>
  //       {userInfo ? (
  //         <button onClick={handleLogout} disabled={isLoggingOut}>
  //           {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
  //         </button>
  //       ) : (
  //         <Link to="/iniciosesion">
  //           <button>Iniciar sesión</button>
  //         </Link>
  //       )}
  //     </div>
  //   </div>
  // );

  return (
    <CssBaseline>
      <MuiAppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6">RegBills</Typography>
          
          {/* <div style={{ marginLeft: 'auto' }}> */}

            {userInfo ? (          
              // <button onClick={handleLogout} disabled={isLoggingOut}>
              //   {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
              // </button>
              <Button onClick={handleLogout} disabled={isLoggingOut}
              color="inherit"
              variant="contained"
              sx={{
                backgroundColor: 'primary.dark',
                '&:hover': {
                  backgroundColor: 'primary.main',
                },
              }}
              >
              {/* Iniciar Sesión */}
              {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}           

              </Button>
            ) : (
              <Link to="/iniciosesion">
                {/* <button>Iniciar sesión</button> */}
                <Button onClick={handleLogout} disabled={isLoggingOut}
                color="inherit"
                variant="contained"
                sx={{
                  backgroundColor: 'primary.dark',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                }}
                >
                {/* Iniciar Sesión */}
                 Iniciar sesión
                </Button>
              
              
              </Link>
            )}            
          
          {/* </div> */}

        </Toolbar>
      </MuiAppBar>
    </CssBaseline>
  );

};

export default Header;
