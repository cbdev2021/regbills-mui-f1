import { FunctionComponent } from "react";
import styles from "./Home.module.css";
import { Container, CssBaseline, Typography } from "@mui/material";


const Home: FunctionComponent = () => {
  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 10, height: '883 px' }}>
        <CssBaseline />
        <div>
          <Typography variant="h5" align="center" gutterBottom>
            Home
          </Typography>   

          <form className={styles.home}>
             
          </form>
        </div>
  </Container>
  );
};

export default Home;
