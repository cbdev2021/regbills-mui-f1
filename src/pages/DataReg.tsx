import { FunctionComponent } from "react";
import styles from "./DataReg.module.css";
import { Container, CssBaseline, Typography } from "@mui/material";


const DataReg: FunctionComponent = () => {
  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 10, height: '883 px' }}>
        <CssBaseline />
        <div>
          <Typography variant="h5" align="center" gutterBottom>
          Data
          </Typography>   

          <form className={styles.dataReg}>
             
          </form>
        </div>
  </Container>
  );
};

export default DataReg;
