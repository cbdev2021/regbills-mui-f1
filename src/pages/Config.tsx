import { FunctionComponent } from "react";
import styles from "./Config.module.css";
import { Container, CssBaseline, Typography } from "@mui/material";


const Config: FunctionComponent = () => {
  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 10, height: '883 px' }}>
        <CssBaseline />
        <div>
          <Typography variant="h5" align="center" gutterBottom>
          Settings
          </Typography>   

          <form className={styles.config}>
             
          </form>
        </div>
  </Container>
  );
};

export default Config;
