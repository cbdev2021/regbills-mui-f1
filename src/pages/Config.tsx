import React, { FunctionComponent, useState } from "react";
import styles from "./Config.module.css";
import {
  Container,
  CssBaseline,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import TableConfig from "./TableConfig";

const Config: FunctionComponent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  const handleClickOpen = (title: string) => {
    setDialogTitle(title);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const [spentData, setSpentData] = useState([
    { id: 1, subtipo: "Tipo 1" },
    { id: 2, subtipo: "Tipo 2" },
  ]);

  const [incomeData, setIncomeData] = useState([
    { id: 1, subtipo: "Income 1" },
    { id: 2, subtipo: "Income 2" },
  ]);

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 10, height: '540.5px' }}>
      <CssBaseline />
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Settings
        </Typography>

        <form className={styles.config}>
          <div className={styles.buttonsContainer }>
            <Button
              variant="contained"
              color="primary"
              className={styles.button}
              onClick={() => handleClickOpen("Spent")}
              startIcon={<ShoppingCartIcon />} 
            >
              New Spent
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={styles.button}
              onClick={() => handleClickOpen("Income")}
              startIcon={<PaidIcon />} 
            >
              New Income
            </Button>
          </div>
         

          <Dialog
            open={openDialog}
            TransitionComponent={Slide}
            keepMounted
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent style={{ maxHeight: 400, overflowY: 'scroll' }}>
              {dialogTitle === "Spent" && (
                <TableConfig
                  title={dialogTitle}
                  data={spentData}
                  updateData={setSpentData}
                />
              )}
              {dialogTitle === "Income" && (
                <TableConfig
                  title={dialogTitle}
                  data={incomeData}
                  updateData={setIncomeData}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
    </Container>
  );
};

export default Config;
