import { FunctionComponent } from "react";
//import { TextField, InputAdornment, Icon, Button } from "@mui/material";
import styles from "./InicioSesion.module.css";
//
import { login } from '../api/auth';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
//
import { Box, Container, TextField, Button, CssBaseline, Typography } from '@mui/material';

const InicioSesion: FunctionComponent = () => {
  //
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Por favor, completa todos los campos.');
      return;
    }

    try {
      const userData = await login(email, password);
      console.log('Usuario autenticado:', userData);
      // Aquí puedes realizar acciones adicionales, como almacenar el token de autenticación en el estado global de la aplicación, redirigir a una página de inicio de sesión exitoso, etc.
      dispatch(setCredentials({ ...userData }));
      navigate('/home'); //home
      toast.info('Te has logeado exitosamente');
    
    } catch (err) {
      console.error('Error de inicio de sesión:', err);
      // Aquí puedes mostrar mensajes de error al usuario o manejar cualquier error específico de inicio de sesión
      
      const errorMessage = err as Error;
      // if (typeof err === 'string') {
      //   toast.error(err);  //dice toast.error!!
      // } else {
      //   // Handle other types or cases
      // }

      // const errorMessage = err as string;
      // toast.info(errorMessage); //se forzó info ver más adelante

      toast.error(errorMessage.message || errorMessage.message); // el segundo esta forzado
  
    }
  };
  //
  
  return (
    // <form onSubmit={handleLogin} className={styles.iniciosesion}>
    //   <div className={styles.iniciosesionChild} />
    //   <div className={styles.regbills}>RegBills</div>
    //   <div className={styles.iniciosesionItem} />
    //   <img
    //     className={styles.iniciosesionInner}
    //     alt=""
    //     src="/rectangle-31@2x.png"
    //   />
    //   {/* <div className={styles.regbills1}>RegBills</div> */}
    //   <div className={styles.rectangleDiv} />
    //   <b className={styles.inicioDeSesin}>Inicio de sesión</b>
    //   <div className={styles.inicioSesinConContainer}>
    //     <p className={styles.inicioSesinConTuCuentaDe}>
    //       <span>Inicio sesión con tu cuenta de</span>
    //       <b className={styles.regbills2}> RegBills</b>
    //     </p>
    //   </div>
    //   <div className={styles.noTienesCuentaContainer}>
    //     <span>¿No tienes cuenta? </span>
    //     {/* <b className={styles.registrate}> Registrate</b> */}
    //     <Link to="/registro" className={styles.registrate}>
    //       <b className={styles.registrate}>Registrate</b>
    //     </Link>
    //   </div>
    //   <b className={styles.email}>Email</b>
      
    //   <TextField
    //     className={styles.rectangleTextfield}
    //     sx={{ width: 300 }}
    //     color="primary"
    //     variant="outlined"
    //     type="text"
    //     name="email"
    //     id="idEmail"
    //     label="Email"
    //     placeholder="Ingrese su correo"
    //     size="medium"
    //     margin="none"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <b className={styles.contrasea}>Contraseña</b>
    //   <TextField
    //     className={styles.iniciosesionChild1}
    //     sx={{ width: 300 }}
    //     color="primary"
    //     variant="outlined"
    //     type="password"
    //     name="password"
    //     id="idPassword"
    //     label="Contraseña"
    //     placeholder="Ingresa tu contraseña"
    //     size="medium"
    //     margin="none"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <Button
    //     className={styles.rectangleButton}
    //     sx={{ width: 300 }}
    //     variant="contained"
    //     name="iniciar"
    //     id="idIniciar"
    //     color="primary"
    //     type="submit"
    //   >
    //     Iniciar sesión
    //   </Button>


    //   <img
    //     className={styles.checkProfileIcon}
    //     alt=""
    //     src="/check-profile@2x.png"
    //   />
    //   <div className={styles.preguntasFrecuentesParent}>
    //     <div className={styles.preguntasFrecuentes}>Preguntas frecuentes</div>
    //     <div className={styles.informacinCorporativa}>
    //       Información corporativa
    //     </div>
    //   </div>
    //   <div className={styles.centroDeAyudaParent}>
    //     <div className={styles.preguntasFrecuentes}>Centro de ayuda</div>
    //     <div className={styles.preguntasFrecuentes}>
    //       <p className={styles.inicioSesinConTuCuentaDe}>Privacidad</p>
    //     </div>
    //   </div>
    // </form>

    <Container component="main" maxWidth="xs" sx={{ marginTop: 10 }}>
      <CssBaseline />
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>

        <form onSubmit={handleLogin} className={styles.iniciosesion}>
              <TextField
                  color="primary"
                  variant="outlined"
                  type="text"
                  name="email"
                  id="email"
                  label="Correo electrónico"
                  placeholder="Ingrese su correo"
                  size="medium"
                  margin="normal"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  autoComplete="email"
            />      
            <TextField
                    color="primary"
                    variant="outlined"
                    type="password"
                    name="password"
                    id="password"
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    size="medium"
                    margin="normal"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
            />    
            <Button
                    variant="contained"
                    name="iniciar"
                    id="idIniciar"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ marginTop: 2 }}
            >
                    Iniciar sesión
            </Button>

            <div className={styles.noTienesCuentaContainer}>
            <span>¿No tienes cuenta? </span>
            <Link to="/registro" className={styles.registrate}>
              <b className={styles.registrate}>Registrate</b>
            </Link>
          </div>


        </form>

        
        
      </div>
    </Container>

    // <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    //      maxWidth="xs" component="main"
    // >
    //     <Typography variant="h5" align="center" gutterBottom>
    //       Iniciar Sesión
    //     </Typography>

    //     <form onSubmit={handleLogin} className={styles.iniciosesion}>
    //           <TextField
    //               color="primary"
    //               variant="outlined"
    //               type="text"
    //               name="email"
    //               id="email"
    //               label="Correo electrónico"
    //               placeholder="Ingrese su correo"
    //               size="medium"
    //               margin="normal"
    //               fullWidth
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               autoFocus
    //               autoComplete="email"
    //         />      
    //         <TextField
    //                 color="primary"
    //                 variant="outlined"
    //                 type="password"
    //                 name="password"
    //                 id="password"
    //                 label="Contraseña"
    //                 placeholder="Ingresa tu contraseña"
    //                 size="medium"
    //                 margin="normal"
    //                 fullWidth
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 autoComplete="current-password"
    //         />    
    //         <Button
    //                 variant="contained"
    //                 name="iniciar"
    //                 id="idIniciar"
    //                 color="primary"
    //                 type="submit"
    //                 fullWidth
    //                 sx={{ marginTop: 2 }}
    //         >
    //                 Iniciar sesión
    //         </Button>
    //     </form>

    // </Box>



        


  );
};

export default InicioSesion;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

