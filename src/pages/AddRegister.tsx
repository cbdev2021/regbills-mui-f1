import React, { FunctionComponent, useState, useEffect } from "react";
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
  TextField,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaidIcon from "@mui/icons-material/Paid";
import { useGetTypeValuesByUserIdQuery } from '../slices/typeValuesApiSlice';
import { useSelector } from "react-redux";
import TableAddRegister from "./TableAddRegister";

import { Box, IconButton, Tab, Tabs } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

//tabla registros
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useGetRegistersByCriteriaQuery } from '../slices/registerApiSlice'; // Import the hook
import { useAddRegisterMutation, useDeleteRegisterMutation } from '../slices/registerApiSlice';
import { CircularProgress } from "@mui/material";

function filterRecordsByMonthAndYear(records: any[], targetMonth: number, targetYear: number) {
  return records.filter((record: { fecha: string | number | Date; }) => {
    const recordDate = new Date(record.fecha);
    const recordMonth = recordDate.getMonth();
    const recordYear = recordDate.getFullYear();
    return recordMonth === targetMonth && recordYear === targetYear;
  });
}

type Record = {
  _id: string;
  tipoRegistro: string;
  descRegistro: string;
  fecha: string;
  monto: number;
  // Otros campos de tus registros
};



const AddRegister: FunctionComponent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [spentData, setSpentData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [numericValue, setNumericValue] = useState("");
  const [addTypeValueMutation] = useAddRegisterMutation();
  const [deleteTypeValueMutation] = useDeleteRegisterMutation();
  const [rowId, setrowId] = useState("");
  const [dataEdit, setDataEdit] = useState([]);
  const [itemToUpdate, setItemToUpdate] = useState("");
  //const [filteredRecords, setFilteredRecords] = useState([]);
  //const [filtered, setFiltered] = useState<Record[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<Record[]>([]);


  useEffect(() => {
    //console.log("itemToUpdate ha cambiado:", itemToUpdate);  
  }, [itemToUpdate]);


  const userId = useSelector((state: any) => state.auth.userInfo._id);
  const token = useSelector((state: any) => state.auth.token);
  const { data: dataResponse } = useGetTypeValuesByUserIdQuery({
    idUsuario: userId,
    token: token,
  });

  const { data: dataResponseRegisters, isLoading, refetch } = useGetRegistersByCriteriaQuery({
    data: {
      idUsuario: userId,
    },
    token: token,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataResponse) {
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

      setSpentData(spentDataMapped);
      setIncomeData(incomeDataMapped);
    }
  }, [dataResponse]);

  const handleClickOpen = (title: string) => {
    setDialogTitle(title);
    setOpenDialog(true);
    setNumericValue("");
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

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const years = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);

  const allDates = years.map((year) => months.map((month) => `${month} ${year}`)).flat();

  const handleNextDate = () => {
    const currentIndex = allDates.indexOf(`${months[currentMonth]} ${currentYear}`);
    if (currentIndex < allDates.length - 1) {
      const [selectedMonth, selectedYear] = allDates[currentIndex + 1].split(" ");
      setCurrentMonth(months.indexOf(selectedMonth));
      setCurrentYear(Number(selectedYear));
    }
  };

  const handlePreviousDate = () => {
    const currentIndex = allDates.indexOf(`${months[currentMonth]} ${currentYear}`);
    if (currentIndex > 0) {
      const [selectedMonth, selectedYear] = allDates[currentIndex - 1].split(" ");
      setCurrentMonth(months.indexOf(selectedMonth));
      setCurrentYear(Number(selectedYear));
    }
  };

  const handleTabClick = (event: React.SyntheticEvent, newValue: number) => {
    const [selectedMonth, selectedYear] = allDates[newValue].split(" ");
    setCurrentMonth(months.indexOf(selectedMonth));
    setCurrentYear(Number(selectedYear));
  };

  //dialog tabla regs
  const [open, setOpen] = useState(false);

  const handleClickOpenRegisters = () => {
    refetch();
    setOpen(true);
  };

  const handleCloseRegisters = () => {
    setOpen(false);
    refetch();
  };

  // const data = [
  //   {
  //     _id: "6512787e3f7ccdc752cdd070",
  //     tipoRegistro: "Ingreso",
  //     descRegistro: "Pago de Moneas",
  //     fecha: "2023-09-30T00:00:00.000Z",
  //     monto: 25000,
  //   },
  //   {
  //     _id: "651281c7eb514a26123f9ed3",
  //     tipoRegistro: "Ingreso",
  //     descRegistro: "Pago de Moneas",
  //     fecha: "2023-09-30T00:00:00.000Z",
  //     monto: 100,
  //   },
  //   {
  //     _id: "651281c7eb514a26123f9ed3",
  //     tipoRegistro: "Ingreso",
  //     descRegistro: "Pago de Moneas",
  //     fecha: "2023-09-30T00:00:00.000Z",
  //     monto: 100,
  //   },
  //   {
  //     _id: "651281c7eb514a26123f9ed3",
  //     tipoRegistro: "Ingreso",
  //     descRegistro: "Pago de Moneas",
  //     fecha: "2023-09-30T00:00:00.000Z",
  //     monto: 100,
  //   },
  //   {
  //     _id: "651281c7eb514a26123f9ed3",
  //     tipoRegistro: "Ingreso",
  //     descRegistro: "Pago de Moneas",
  //     fecha: "2023-09-30T00:00:00.000Z",
  //     monto: 100,
  //   },
  //   {
  //     _id: "651281c7eb514a26123f9ed3",
  //     tipoRegistro: "Ingreso",
  //     descRegistro: "Pago de Moneas",
  //     fecha: "2023-09-30T00:00:00.000Z",
  //     monto: 100,
  //   },
  //   {
  //     _id: "651281c7eb514a26123f9ed3",
  //     tipoRegistro: "Ingreso",
  //     descRegistro: "Pago de Moneas",
  //     fecha: "2023-09-30T00:00:00.000Z",
  //     monto: 100,
  //   }
  //   // Agrega el resto de los datos aquí
  // ];
  const handleDelete = async (id: string) => {
    try {
      //await deleteTypeValueMutation(id);
      await deleteTypeValueMutation(
        {
          registro: {
            id: id
          },
          token: token
        }
      );

      //const updatedData = data.filter((item) => item._id !== id);
      // updateData(updatedData, typevalue); // Actualizar los datos en Config
      refetch(); // Refrescar los datos desde la consulta
    } catch (error) {
      console.error("Error al eliminar el valor:", error);
    }
  };

  // const handleEdit = (title: string, rowId: string) => {
  //   setDialogTitle(title);
  //   setOpenDialog(true);
  //   setrowId(rowId);
  //   //setNumericValue("");    
  // };

  const handleEdit = (title: string, rowId: string) => {
    setDialogTitle(title);
    setOpenDialog(true);
    setrowId(rowId);

    // Agregar la lógica para determinar dataEdit
    const itemToUpdate = dataResponseRegisters.find((item: { _id: string; }) => item._id === rowId);
    console.log("Add register itemToUpdate: ");
    console.log(itemToUpdate);

    setItemToUpdate(itemToUpdate);

    const dataEdit =
      itemToUpdate.tipoRegistro === "Spent" ? spentData :
        itemToUpdate.tipoRegistro === "Income" ? incomeData :
          [];
    // if(itemToUpdate.tipoRegistro == "Spent"){
    //   console.log("spentData");
    //   console.log(spentData);
    // }
    // else if(itemToUpdate.tipoRegistro == "Income"){
    //   console.log("incomeData");
    //   console.log(incomeData);
    // }
    // Almacenar dataEdit en el estado
    refetch();

    console.log("dataEdit: ");
    console.log(dataEdit);
    setDataEdit(dataEdit);
  };

  useEffect(() => {
    if (dataResponseRegisters) {
      const filtered = filterRecordsByMonthAndYear(dataResponseRegisters, currentMonth, currentYear);
      setFilteredRecords(filtered);
    }
  }, [dataResponseRegisters, currentMonth, currentYear]);

  return (
    //<Container component="main" maxWidth="xs" sx={{ marginTop: 10, height: '540.5px' }}>
    <Container component="main" maxWidth="xs" className="common-styles">
      <CssBaseline />
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Add Register
        </Typography>

        <form className={"form"}>
          <div className={"buttonsContainer"}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClickOpen("Spent")}
              startIcon={<ShoppingCartIcon />}
            >
              New Spent
            </Button>
            <Button
              variant="contained"
              color="secondary"
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
                <TableAddRegister
                  userId={userId}
                  title={dialogTitle}
                  typevalue="Spent"
                  data={spentData}
                  addTypeValueMutation={addTypeValueMutation}
                  token={token}
                  updateData={updateData}
                  refetch={refetch}
                  // itemToUpdate={
                  //   {
                  //     monto:"",
                  //     fecha: "",
                  //     descRegistro:""
                  //   }
                  // }
                  itemToUpdate={null}
                />
              )}
              {dialogTitle === "Income" && (
                <TableAddRegister
                  userId={userId}
                  title={dialogTitle}
                  typevalue="Income"
                  data={incomeData}
                  addTypeValueMutation={addTypeValueMutation}
                  token={token}
                  updateData={updateData}
                  refetch={refetch}
                  // itemToUpdate={
                  //   {
                  //     monto:"",
                  //     fecha: "",
                  //     descRegistro:""
                  //   }
                  // }
                  itemToUpdate={null}
                />
              )}

              {dialogTitle === "Edit Register" && (
                <TableAddRegister
                  userId={userId}
                  title={dialogTitle}
                  typevalue="Edit Register"
                  data={dataEdit || []}
                  //dataRegisters= {dataResponseRegisters}
                  addTypeValueMutation={addTypeValueMutation}
                  token={token}
                  updateData={updateData}
                  refetch={refetch}
                  itemToUpdate={itemToUpdate}
                //rowId={rowId}

                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>

          <Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <IconButton onClick={handlePreviousDate}>
                <ArrowBackIcon />
              </IconButton>
              <Tabs
                value={allDates.indexOf(`${months[currentMonth]} ${currentYear}`)}
                onChange={handleTabClick}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"  // Show scroll buttons
              >
                {allDates.map((date, index) => (
                  <Tab key={date} label={date} value={index} style={{ width: "100%" }}
                    onClick={() => handleClickOpenRegisters()}
                  />
                ))}
              </Tabs>
              <IconButton onClick={handleNextDate}>
                <ArrowForwardIcon />
              </IconButton>
            </Box>
            {/* <Typography align="center">Selected Date: {months[currentMonth]} - {currentYear}</Typography> */}

          </Box>
        </form>

        <div>
          <Dialog open={open} onClose={handleCloseRegisters} maxWidth="md" scroll="paper">
            <DialogContent dividers>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <TableContainer component={Paper} style={{ maxHeight: "70vh", width: "100%" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {/* <TableCell>ID</TableCell> */}
                        <TableCell>Tipo de Registro</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Monto</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filteredRecords.length > 0 ? (
                        filteredRecords.map((row: any) => (
                          <TableRow key={row._id}>
                            <TableCell>{row.tipoRegistro}</TableCell>
                            <TableCell>{row.descRegistro}</TableCell>
                            <TableCell>{row.fecha}</TableCell>
                            <TableCell>{row.monto}</TableCell>
                            <TableCell>
                              <IconButton
                                aria-label="edit"
                                onClick={() => {
                                  handleCloseRegisters();
                                  handleEdit("Edit Register", row._id);
                                }}
                              >
                                <EditIcon color="primary" />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleDelete(row._id)}
                              >
                                <DeleteIcon color="secondary" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5}>No data available</TableCell>
                        </TableRow>
                      )}
                    </TableBody>


                  </Table>
                </TableContainer>

              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRegisters}>Accept</Button>
            </DialogActions>
          </Dialog>


        </div>
      </div>
    </Container>
  );
};

export default AddRegister;
