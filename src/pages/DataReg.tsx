import React, { FunctionComponent, useState } from "react";
import { Container, CssBaseline, Typography, IconButton, Box, Tab, Tabs } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";
import { useGetRegistersByCriteriaQuery } from "../slices/registerApiSlice";
import Switch from '@mui/material/Switch';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';

const DataReg: FunctionComponent = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [filterByType, setFilterByType] = useState('All');

  const userId = useSelector((state: any) => state.auth.userInfo._id);
  const token = useSelector((state: any) => state.auth.token);

  const { data: dataResponseRegisters } = useGetRegistersByCriteriaQuery({
    data: {
      idUsuario: userId,
    },
    token: token,
  });

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

  type Record = {
    _id: string;
    tipoRegistro: string;
    descRegistro: string;
    fecha: string;
    monto: number;
  };

  function filterRecordsByMonthAndYear(records: any[], targetMonth: number, targetYear: number) {
    if (!records) {
      return [];
    }
  
    return records.filter((record) => {
      const recordDate = new Date(record.fecha);
      const recordMonth = recordDate.getMonth();
      const recordYear = recordDate.getFullYear();
      return recordMonth === targetMonth && recordYear === targetYear;
    });
  }

  const handleTabClick = (event: React.SyntheticEvent, newValue: number) => {
    const [selectedMonth, selectedYear] = allDates[newValue].split(" ");
    setCurrentMonth(months.indexOf(selectedMonth));
    setCurrentYear(Number(selectedYear));
  };

  let sumaDeValores = 0;
  if (dataResponseRegisters) {
    sumaDeValores = dataResponseRegisters.reduce((total: any, item: { monto: any; }) => total + item.monto, 0);
  }

  const registrosDelMesSeleccionado = filterRecordsByMonthAndYear(dataResponseRegisters, currentMonth, currentYear);

  let sumaDeValoresDelMes = 0;
  if (registrosDelMesSeleccionado) {
    sumaDeValoresDelMes = registrosDelMesSeleccionado.reduce((total: any, item: { monto: any; }) => total + item.monto, 0);
  }

  const pieChartData = registrosDelMesSeleccionado.map((item: { monto: any; descRegistro: any }) => ({
    value: item.monto,
    descRegistro: item.descRegistro,
  }));

  const registrosFiltrados = filterByType === 'All' ? registrosDelMesSeleccionado : registrosDelMesSeleccionado.filter((registro) => registro.tipoRegistro === filterByType);

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 10, height: "883px" }}>
      <CssBaseline />
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Data
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="center">
        <ShoppingCartIcon />
          <Switch
            checked={filterByType === 'Income'}
            onChange={(event) => setFilterByType(event.target.checked ? 'Income' : 'Spent')}
            color="primary"
            inputProps={{ 'aria-label': 'toggle type filter' }}
          />          
          <PaidIcon />
        </Box>

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
            scrollButtons="auto"
          >
            {allDates.map((date, index) => (
              <Tab key={date} label={date} value={index} style={{ width: "100%" }} />
            ))}
          </Tabs>
          <IconButton onClick={handleNextDate}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>

        <Typography variant="h6">
          Total Mes: {sumaDeValoresDelMes}
        </Typography>

        {registrosFiltrados.length > 0 && (
          <PieChart
            series={[
              {
                data: registrosFiltrados.map((item, index) => ({
                  id: index,
                  value: item.monto,
                  label: item.descRegistro,
                })),
              },
            ]}
            width={400}
            height={200}
          />
        )}

        <form></form>
      </div>
    </Container>
  );
};

export default DataReg;
