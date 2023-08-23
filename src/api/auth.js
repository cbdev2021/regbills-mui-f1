// api/auth.js
import axios from 'axios';

const BASE_URL = 'https://mern-b1-vrcl.vercel.app'; // Reemplaza con la URL de tu API

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/auth`, { email, password });
    console.log("response login");
    return response.data; // Suponiendo que la respuesta contiene un token de autenticación u otra información relevante
  } catch (error) {
    console.log("error login");
    throw error.response.data; // Si hay un error, se lanza la respuesta de error de la API
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/logout`, {  });
    return response.data; // Suponiendo que la respuesta contiene un token de autenticación u otra información relevante
  } catch (error) {
    throw error.response.data; // Si hay un error, se lanza la respuesta de error de la API
  }
};

// export const register = async (name, email, password ) => {
//   try {

//     const response = await axios.post(`${BASE_URL}/api/users`, { name, email, password });
//     console.log("response register");
//     return response.data; // Suponiendo que la respuesta contiene un token de autenticación u otra información relevante
//   } catch (error) {
//     console.log("error register");
//     throw error.response.data; // Si hay un error, se lanza la respuesta de error de la API
//   }
// };

export const register = async (userData) => {
  const { name, email, password } = userData; // Desestructurar el objeto para obtener las propiedades

  try {
    const response = await axios.post(`${BASE_URL}/api/users`, { name, email, password });
    console.log("response register");
    return response.data; // Suponiendo que la respuesta contiene un token de autenticación u otra información relevante
  } catch (error) {
    console.log("error register");
    throw error.response.data; // Si hay un error, se lanza la respuesta de error de la API
  }
};