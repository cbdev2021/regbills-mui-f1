import React, { FunctionComponent, useState } from "react";
import { Container, CssBaseline, Typography, Dialog, DialogTitle, DialogContent, Button, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
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
  const [selectedFilter, setSelectedFilter] = useState("all");

  // function groupRecordsByMonth(records: any[]) {
  //   const monthlyData: Record<string, { month: string, total: number }> = {};

  //   records.forEach((record) => {
  //     const fecha = new Date(record.fecha);
  //     const month = fecha.toLocaleString('default', { month: 'long' });

  //     if (!monthlyData[month]) {
  //       monthlyData[month] = {
  //         month,
  //         total: 0,
  //       };
  //     }

  //     monthlyData[month].total += record.monto;
  //   });

  //   return Object.values(monthlyData);
  // }

  function renameFields(records: any[]) {
    return records.map((record) => {
      return { ...record, fecha_case: record.fecha, total: record.monto };
    });
  }




  function groupRecordsByMonth(records: any[]) {
    const monthlyData: Record<string, { fecha_case: string, total: number }> = {};

    records.forEach((record) => {
      const fecha = new Date(record.fecha);
      const year = fecha.getFullYear(); // Obtiene el año de la fecha
      const month = fecha.toLocaleString('default', { month: 'long' });

      // Combina el año y el mes con un guion
      const monthYear = `${month} - ${year}`;

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {
          fecha_case: monthYear,
          total: 0,
        };
      }

      monthlyData[monthYear].total += record.monto;
    });

    return Object.values(monthlyData);
  }

  function groupRecordsByYear(records: any[]) {
    const yearlyData: Record<string, { fecha_case: string, total: number }> = {};

    records.forEach((record) => {
      const fecha = new Date(record.fecha);
      const fecha_case = fecha.getFullYear().toString(); // Obtiene el año de la fecha como una cadena

      if (!yearlyData[fecha_case]) {
        //yearlyData[year] = {
        yearlyData[fecha_case] = {    //month es el alias temp
          fecha_case,
          total: 0,
        };
      }

      yearlyData[fecha_case].total += record.monto;
    });

    return Object.values(yearlyData);
  }


  // const filteredDepositosRecords = dataResponseRegisters
  //   ? dataResponseRegisters
  //     .filter((item: Registro) => selectedItem ? item.descRegistro === selectedItem.descRegistro : true)
  //   : [];

  //es muy importante ya que una desventaja de mongo es devuelve desordenada la data
  const filteredDepositosRecords = dataResponseRegisters
  ? dataResponseRegisters
      .filter((item: { descRegistro: string; }) => selectedItem ? item.descRegistro === selectedItem.descRegistro : true)
      .sort((record1: { fecha: string | number | Date; }, record2: { fecha: string | number | Date; }) => {
        const date1 = typeof record1.fecha === 'string' ? new Date(record1.fecha).getTime() : record1.fecha;
        const date2 = typeof record2.fecha === 'string' ? new Date(record2.fecha).getTime() : record2.fecha;

        return (date1 as number) - (date2 as number);
      })
  : [];


 // console.log(filteredDepositosRecords);



  // const filteredDepositosRecords = dataResponseRegisters
  //   ? dataResponseRegisters.filter((record: { descRegistro: string; }) => selectedItem ? record.descRegistro === selectedItem.descRegistro : true)
  //   : [];

  //const filteredDataResponseRegisters = filteredDepositosRecords;
  const filteredDataResponseRegisters = renameFields(filteredDepositosRecords);


  const filteredDataResponseRegistersMonth = groupRecordsByMonth(filteredDepositosRecords);
  const filteredDataResponseRegistersYear = groupRecordsByYear(filteredDepositosRecords);

  const calculateSumForSelectedItem = (descRegistro: string) => {
    if (dataResponseRegisters) {
      const sum = dataResponseRegisters
        .filter((item: Registro) => item.descRegistro === descRegistro)
        .reduce((total: number, item: Registro) => total + item.monto, 0);
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

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue === "all") {
      console.log("Filtro seleccionado: All");
    } else if (selectedValue === "month") {
      console.log("Filtro seleccionado: Month");
    } else if (selectedValue === "year") {
      console.log("Filtro seleccionado: Year");
    }

    setSelectedFilter(selectedValue);
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

  const getDataForSelectedFilter = () => {
    if (selectedFilter === 'all') {
      //return filteredDepositosRecords;
      return filteredDataResponseRegisters;

    } else if (selectedFilter === 'month') {
      return filteredDataResponseRegistersMonth;
    } else if (selectedFilter === 'year') {
      return filteredDataResponseRegistersYear;
    } else {
      // Si selectedFilter no coincide con 'all', 'month' ni 'year', puedes manejarlo de la manera que desees.
      return [];
    }
  };


  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 10, height: "883px" }}>
      <CssBaseline />
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Home
        </Typography>

        <FormControl component="fieldset">
          <RadioGroup
            aria-label="filter"
            name="filter"
            value={selectedFilter}
            onChange={handleFilterChange}
            row
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="month" control={<Radio />} label="Month" />
            <FormControlLabel value="year" control={<Radio />} label="Year" />
          </RadioGroup>
        </FormControl>

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
                  <BarChart width={400} height={300}
                    // data={filteredDataResponseRegistersMonth}>
                    data={getDataForSelectedFilter()}>
                    {/* //<XAxis dataKey="month" /> */}
                    <XAxis dataKey="fecha_case" />
                    <YAxis dataKey="total" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" />
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
