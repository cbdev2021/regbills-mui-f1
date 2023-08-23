import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        //target: 'https://mern-b1.onrender.com/', // funciona react local hacia render
        target: 'https://mern-b1-vrcl.vercel.app/', // funciona react local hacia vercel
        //target: 'http://localhost:5000',       // aputando a server local
        //target: process.env.REACT_APP_API_URL, // no funciona en local
        changeOrigin: true,
      },
    },
  },
});
