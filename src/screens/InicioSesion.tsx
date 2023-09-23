import { FunctionComponent, useEffect } from "react";
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
import { useLoginMutation } from "../slices/usersApiSlice";

type UserInfo = {
  _id: string;
  email: string;
  name: string;
  password: string;
};

const InicioSesion: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  //const userInfo = useSelector((state: { auth: { userInfo: UserInfo } }) => state.auth.userInfo);
  
  //const { userInfo } = useSelector((state: { auth: any; }) => state.auth);
  
  //const userInfo = useSelector((state: { auth: { userInfo: UserInfo } }) => state.auth.userInfo);

  const userInfo = useSelector((state: { auth: any }) => state.auth);
  

  useEffect(() => {
    if (userInfo) {
      navigate('/profile');
    }
  }, [navigate, userInfo]);

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      console.error("login setCredentials");
      
      //navigate('/');
    } catch (err) {
      console.error("err:");
      console.error(err);
      toast.error('Hubo un error al logear');
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
              <b className={styles.registrate}>Registro</b>
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

