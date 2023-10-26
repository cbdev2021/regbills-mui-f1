import React, { FunctionComponent, useState, useEffect } from "react";
import { Container, CssBaseline, Typography, Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { useGetRegistersByCriteriaQuery } from '../slices/registerApiSlice';
import { useSelector } from "react-redux";
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

const Home: FunctionComponent = () => {
  const userId = useSelector((state: any) => state.auth.userInfo._id);
  const token = useSelector((state: any) => state.auth.token);
  const { data: dataResponseRegisters } = useGetRegistersByCriteriaQuery({
    data: {
      idUsuario: userId,
    },
    token: token,
  });

  const getRandomColor = () => {
    const colors = ['#00796B', '#3F51B5', '#795548', '#2196F3', '#673AB7'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const [selectedItem, setSelectedItem] = useState<Registro | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  type Registro = {
    descRegistro: string;
    _id: string;
    tipoRegistro: string;
    fecha: string;
    monto: number;
  };

  const [selectedItemAmountSum, setSelectedItemAmountSum] = useState<number | null>(null);

  const calculateSumForSelectedItem = (descRegistro: string) => {
    if (dataResponseRegisters) {
      const sum = dataResponseRegisters
        ? dataResponseRegisters
            .filter((item: Registro) => item.descRegistro === descRegistro)
            .reduce((total: number, item: Registro) => total + item.monto, 0)
        : 0;
      setSelectedItemAmountSum(sum);
    }
  };

  const handleItemClick = (item: Registro) => {
    setSelectedItem(item);
    setOpenDialog(true);
    calculateSumForSelectedItem(item.descRegistro);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
    setOpenDialog(false);
  };

  const createList = (title: string, data: any[] | undefined) => {
    if (!data) {
      return null;
    }

    const filteredData = filterUniqueByType(title, data);
    return (
      <div style={{ flex: '50%', paddingRight: '10px' }}>
        <Typography variant="h6" style={{ textAlign: 'left' }}>
          {title}
          <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
            {filteredData.map((item: any, index: number) => (
              <li
                key={index}
                style={{ color: getRandomColor(), cursor: 'pointer' }}
                onClick={() => handleItemClick(item)}
              >
                {item.descRegistro}
              </li>
            ))}
          </ul>
        </Typography>
      </div>
    );
  };

  const filterUniqueByType = (type: string, data: any[] | undefined) => {
    if (!data) {
      return [];
    }

    const typeSet = new Set();
    return data.reduce((uniqueRecords: any[], registro: any) => {
      if (registro.tipoRegistro === type && !typeSet.has(registro.descRegistro)) {
        typeSet.add(registro.descRegistro);
        uniqueRecords.push(registro);
      }
      return uniqueRecords;
    }, []);
  };

  const filteredDataResponseRegisters = dataResponseRegisters
    ? dataResponseRegisters
        .filter((item: Registro) => selectedItem ? item.descRegistro === selectedItem.descRegistro : true)
    : [];

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 10, height: "883px" }}>
      <CssBaseline />
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Data
        </Typography>
        <div style={{ display: 'flex' }}>
          {createList('Spent', dataResponseRegisters)}
          {createList('Income', dataResponseRegisters)}
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {selectedItem && (
          <div>
            <DialogTitle>{selectedItem.descRegistro} History</DialogTitle>
            <DialogContent>
              {selectedItemAmountSum !== null && (
                <div>
                  <Typography variant="h6">Total Amount: {selectedItemAmountSum}</Typography>
                  <BarChart width={400} height={300} data={filteredDataResponseRegisters}>
                    <XAxis dataKey="fecha" />
                    <YAxis dataKey="monto" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="monto" fill="#8884d8" />
                  </BarChart>
                </div>
              )}
            </DialogContent>
          </div>
        )}
        <Button onClick={handleCloseDialog}>Cerrar</Button>
      </Dialog>
    </Container>
  );
};

export default Home;
