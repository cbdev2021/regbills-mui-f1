import { FunctionComponent } from "react";
import styles from "./AddRegister.module.css";
import { Container, CssBaseline, Typography } from "@mui/material";


const AddRegister: FunctionComponent = () => {
  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 10, height: '883 px' }}>
        <CssBaseline />
        <div>
          <Typography variant="h5" align="center" gutterBottom>
          AddRegister
          </Typography>   

          <form className={styles.addregister}>
             
          </form>
        </div>
  </Container>
  );
};

export default AddRegister;
