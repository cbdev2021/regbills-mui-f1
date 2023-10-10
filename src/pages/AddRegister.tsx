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
  TextField, // Importamos TextField
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaidIcon from "@mui/icons-material/Paid";
import TableConfig from "./TableConfig";
import {
  useGetTypeValuesByUserIdQuery,
} from '../slices/typeValuesApiSlice';
import {
  // useDeleteTypeValueMutation,
  // useUpdateTypeValueMutation,
  // useAddTypeValueMutation,
  useAddRegisterMutation, // En lugar de useAddUserMutation
 // useUpdateRegisterMutation, // En lugar de useUpdateUserMutation
 // useDeleteRegisterMutation, // En lugar de useDeleteUserMutation
  //useGetRegisterByIdQuery, // En lugar de useGetUserByIdQuery
  //useGetRegistersByCriteriaQuery, // En lugar de useGetUsersByCriteriaQuery
} from '../slices/registerApiSlice';
import { useSelector } from "react-redux";
import TableAddRegister from "./TableAddRegister";

const AddRegister: FunctionComponent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [spentData, setSpentData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [numericValue, setNumericValue] = useState(""); // Estado para el valor numérico
  //const [deleteTypeValue] = useDeleteRegisterMutation();
 // const [updateTypeValue] = useUpdateRegisterMutation();
  const [addTypeValueMutation] = useAddRegisterMutation();
  //const [numericKey, setNumericKey] = useState(""); 

  const userId = useSelector((state: any) => state.auth.userInfo._id);
  const token = useSelector((state: any) => state.auth.token);

  const { data: dataResponse, refetch } = useGetTypeValuesByUserIdQuery({
    idUsuario: userId,
    token: token,
  });

  // useEffect(() => {
  //   if (dataResponse) {
  //     const spentDataMapped = dataResponse.filter((item: { typevalue: string; }) => item.typevalue === 'Spent').map((item: { _id: any; subtype: any; description: any; typevalue: any; }) => ({
  //       _id: item._id,
  //       subtype: item.subtype,
  //       description: item.description,
  //       typevalue: item.typevalue
  //     }));

  //     const incomeDataMapped = dataResponse.filter((item: { typevalue: string; }) => item.typevalue === 'Income').map((item: { _id: any; subtype: any; description: any; typevalue: any; }) => ({
  //       _id: item._id,
  //       subtype: item.subtype,
  //       description: item.description,
  //       typevalue: item.typevalue
  //     }));

  //     setSpentData(spentDataMapped);
  //     setIncomeData(incomeDataMapped);
  //   }
  // }, [dataResponse]);
  useEffect(() => {
    if (dataResponse) {
      // const spentDataMapped = dataResponse
      //   .filter((item: { typevalue: string; }) => item.typevalue === 'Spent')
      //   .map((item: { subtype: any; }) => item.subtype); // Aquí solo seleccionamos el campo "subtype"

      // const incomeDataMapped = dataResponse
      //   .filter((item: { typevalue: string; }) => item.typevalue === 'Income')
      //   .map((item: { subtype: any; }) => item.subtype); // Aquí solo seleccionamos el campo "subtype"

      const spentDataMapped = dataResponse
        .filter((item: { typevalue: string; }) => item.typevalue === 'Spent')
        .map((item: { _id: string; subtype: any; }) => ({
          _id: item._id,
          subtype: item.subtype
        }));

      const incomeDataMapped = dataResponse
        .filter((item: { typevalue: string; }) => item.typevalue === 'Income')
        .map((item: { _id: string; subtype: any; }) => ({
          _id: item._id,
          subtype: item.subtype
        }));




      console.log('spentDataMapped');
      console.log(spentDataMapped);
      console.log('incomeDataMapped');
      console.log(incomeDataMapped);



      setSpentData(spentDataMapped);
      setIncomeData(incomeDataMapped);
    }
  }, [dataResponse]);




  const handleClickOpen = (title: string) => {
    setDialogTitle(title);
    setOpenDialog(true);
    setNumericValue(""); // Establecer el valor inicial en blanco cuando se abre el diálogo.
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
    <Container component="main" maxWidth="xs" sx={{ marginTop: 10, height: '540.5px' }}>
      <CssBaseline />
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Add Register
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
                <>

                  <TableAddRegister
                    userId={userId}
                    title={dialogTitle}
                    typevalue="Spent"
                    data={spentData}
                    //updateTypeValue={updateTypeValue}
                    addTypeValueMutation={addTypeValueMutation}
                    //deleteTypeTypevalueMutation={deleteTypeValue}
                    token={token}
                    updateData={updateData}
                    refetch={refetch}
                  />
                </>
              )}
              {dialogTitle === "Income" && (
                <>

                  <TableAddRegister
                    userId={userId}
                    title={dialogTitle}
                    typevalue="Income"
                    data={incomeData}
                    //updateTypeValue={updateTypeValue}
                    addTypeValueMutation={addTypeValueMutation}
                    //deleteTypeTypevalueMutation={deleteTypeValue}
                    token={token}
                    updateData={updateData}
                    refetch={refetch}
                  />
                </>
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

export default AddRegister;
