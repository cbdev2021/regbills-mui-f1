import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, TextField, Button, CssBaseline, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import styles from './Profile.module.css';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

type UserInfo = {
  _id: string;
  email: string;
  name: string;
  password: string;
};

const Profile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  //const { userInfo } = useSelector((state: { auth: any; }) => state.auth);
  
  //const userInfo = useSelector((state: { auth: { userInfo: UserInfo } }) => state.auth);
  //const userInfo = useSelector((state: any ) => state);

  const userInfo = useSelector((state: { auth: any }) => state.auth);
  

  //const { userInfo } = useSelector((state) => state.auth); 
  //const userInfo = useSelector((state:  any) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  // useEffect(() => {
  //   setName(userInfo.name);
  //   setEmail(userInfo.email);
  // }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e: { preventDefault: () => void; }) => {
    console.log(" en profile ");

    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
    } else {
      try {

        console.log("userinfo en profile");
        console.log(userInfo);
       // console.log(email,password);

        dispatch(setCredentials(userInfo));
       

        const response = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password         
        }).unwrap();

        console.log( 'response');

        if(response){

          console.log( response);


          //toast.success('Perfil actualizado correctamente');
        }
        else{
          toast.success('Perfil NO actualizado correctamente');

        }

        

        

        if (!userInfo) {
          // El usuario no está autenticado, muestra un mensaje de error o redirige a iniciar sesión.
          toast.error('Debe iniciar sesión para actualizar su perfil.');
          // Puedes redirigir al usuario a la página de inicio de sesión aquí.
          return;
        }

      
          console.log(response); 
          dispatch(setCredentials(response));
          
       
      } catch (err) {
        console.error("err:");
        console.error(err);
        toast.error('Hubo un error al actualizar el perfil.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 10 }}>
      <CssBaseline />
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Perfil de Usuario
        </Typography>

        <form onSubmit={submitHandler} className={styles.profileContainer}>
          <TextField
            color="primary"
            variant="outlined"
            type="text"
            name="displayName"
            id="displayName"
            label="Nombre de Usuario"
            placeholder="Ingrese su nombre de usuario"
            size="medium"
            margin="normal"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
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
            name="newPassword"
            id="newPassword"
            label="Nueva Contraseña"
            placeholder="Ingrese su nueva contraseña"
            size="medium"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            color="primary"
            variant="outlined"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            label="Confirmar Contraseña"
            placeholder="Confirme su nueva contraseña"
            size="medium"
            margin="normal"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Actualizar Perfil
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Profile;
