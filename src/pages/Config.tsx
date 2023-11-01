import React, { FunctionComponent, useState, useEffect } from "react";
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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaidIcon from "@mui/icons-material/Paid";
import TableConfig from "./TableConfig";
import {
  useGetTypeValuesByUserIdQuery,
  useDeleteTypeValueMutation,
  useUpdateTypeValueMutation,
  useAddTypeValueMutation,
} from '../slices/typeValuesApiSlice';
import { useSelector } from "react-redux";

const Config: FunctionComponent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [spentData, setSpentData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [deleteTypeValue] = useDeleteTypeValueMutation();
  const [updateTypeValue] = useUpdateTypeValueMutation();
  const [addTypeValueMutation] = useAddTypeValueMutation();
  //const userId = '650d32f96386db0b70d0945e';

  const userId = useSelector((state: any) => state.auth.userInfo._id);
  const token = useSelector((state: any) => state.auth.token);
  //const stateauth = useSelector((state: any) => state.auth);

  // const param = {
  //   idUsuario: userId,
  //   token: token,
  // };

  //1
  const { data: dataResponse, refetch } = useGetTypeValuesByUserIdQuery({
    idUsuario: userId,
    token: token,
  });

  //2 not
  //const { data: dataResponse, refetch } = useGetTypeValuesByUserIdQuery(userId, token   );


  //console.log("config : stateauth");
  //console.log(stateauth);


  useEffect(() => {
    if (dataResponse) {
      const spentDataMapped = dataResponse.filter((item: { typevalue: string; }) => item.typevalue === 'Spent').map((item: { _id: any; subtype: any; description: any; typevalue: any; }) => ({
        _id: item._id,
        subtype: item.subtype,
        description: item.description,
        typevalue: item.typevalue
      }));

      const incomeDataMapped = dataResponse.filter((item: { typevalue: string; }) => item.typevalue === 'Income').map((item: { _id: any; subtype: any; description: any; typevalue: any; }) => ({
        _id: item._id,
        subtype: item.subtype,
        description: item.description,
        typevalue: item.typevalue
      }));

      setSpentData(spentDataMapped);
      setIncomeData(incomeDataMapped);
    }
  }, [dataResponse]);

  const handleClickOpen = (title: string) => {
    // console.log("token ::");
    // console.log(token);

    setDialogTitle(title);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const updateData = (newData: any, dataType: any) => {
    if (dataType === "Spent") {
      setSpentData(newData);
    } else if (dataType === "Income") {
      setIncomeData(newData);
    }
  };

  return (
      // <Container component="main" maxWidth="xs" sx={{ marginTop: 10, height: '540.5px' }}>
        <Container component="main" maxWidth="xs" className="common-styles">
          <CssBaseline />
          <div>
            <Typography variant="h5" align="center" gutterBottom>
              Settings
            </Typography>

            <form className={styles.config}>
              <div className={styles.buttonsContainer}>
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
                      userId={userId}
                      title={dialogTitle}
                      typevalue="Spent"
                      data={spentData}
                      updateTypeValue={updateTypeValue}
                      addTypeValueMutation={addTypeValueMutation}
                      deleteTypeValueMutation={deleteTypeValue}
                      token={token}
                      updateData={updateData}
                      refetch={refetch}
                    />
                  )}
                  {dialogTitle === "Income" && (
                    <TableConfig
                      userId={userId}
                      title={dialogTitle}
                      typevalue="Income"
                      data={incomeData}
                      updateTypeValue={updateTypeValue}
                      addTypeValueMutation={addTypeValueMutation}
                      deleteTypeValueMutation={deleteTypeValue}
                      token={token}
                      updateData={updateData}
                      refetch={refetch}
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
