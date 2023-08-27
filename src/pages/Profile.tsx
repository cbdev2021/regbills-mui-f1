import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Container, TextField, Button, CssBaseline, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import styles from './Profile.module.css';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

// Asumiendo que el tipo de userInfo es algo similar a esto:
type UserInfo = {
  email: string;
  name: string;
  password: string;
};

const Profile = () => {
  // Proporciona el tipo correcto para el estado userInfo
  const userInfo = useSelector((state: { auth: { userInfo: UserInfo } }) => state.auth.userInfo);

  const [email, setEmail] = useState(userInfo?.email || '');
  const [displayName, setDisplayName] = useState(userInfo?.name || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName) {
      toast.error('Por favor, completa el nombre de usuario.');
      return;
    }

    // Lógica para actualizar el perfil del usuario (puedes utilizar tu propia función aquí)

    toast.success('Perfil actualizado exitosamente');
  };


  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 10 }}>
      <CssBaseline />
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Perfil de Usuario
        </Typography>

        <form onSubmit={handleProfileUpdate} className={styles.profileContainer}>
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
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
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
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
