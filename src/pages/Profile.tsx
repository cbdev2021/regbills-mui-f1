import React, { useState } from 'react';
import { Box, Container, TextField, Button, CssBaseline, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import styles from './Profile.module.css';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const { userInfo, token} = useSelector((state: any) => state.auth); //auth es como el alias del state? 

   console.log("profile userInfo");
   console.log(userInfo);



  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const [email, setEmail] = useState(userInfo.email);
  const [name, setName] = useState(userInfo.name);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const submitHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        // const res = await updateProfile(
        //   {
        //     _id: userInfo._id,
        //     name,
        //     email,
        //     password,
        //   },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // ).unwrap();

        // const res = await updateProfile(
        //   {
        //     _id: userInfo._id,
        //     name,
        //     email,
        //     password,
        //   },
        //   token
        // ).unwrap();


        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          token: token, // Agrega el token como una propiedad en el objeto de datos
        }).unwrap();



        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        console.error('err:');
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
            name="name"
            id="name"
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
