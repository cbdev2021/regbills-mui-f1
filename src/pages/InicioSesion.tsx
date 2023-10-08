import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./InicioSesion.module.css";
import { login } from '../api/auth';
import { toast } from 'react-toastify';
import { setCredentials, setToken } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, CssBaseline, Typography } from '@mui/material';
import { useLoginMutation } from "../slices/usersApiSlice";

const InicioSesion: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginMutation, { isLoading }] = useLoginMutation();

  //const { userInfo } = useSelector((state: any) => state.auth);
  const userInfo = useSelector((state: any) => state);


  //loop de recarga!!

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate('/home');
  //   }
  // }, [navigate, userInfo]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await loginMutation({ email, password }).unwrap();
      // console.log("res");
      // console.log(res);

      dispatch(setCredentials({ userInfo: {
                                            _id: res._id, 
                                            name: res.name, 
                                            email: res.email, 
                                            token: res.token
                                          }, 
                                token: res.token }));
    
    console.log("inicio - userInfo.token:");    
    console.log(userInfo);                         
      
    console.log("inicio - res.token:", res.token); // Agregar un console.log aquí                                    

      navigate('/home');
    } catch (err) {
      console.error(err);
      toast.error('Hubo un error al iniciar sesión');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 10 }}>
      <CssBaseline />
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>
        <form onSubmit={submitHandler} className={styles.iniciosesion}>
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
  );
};

export default InicioSesion;
