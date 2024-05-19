import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Divider, Button, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

const Payment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tok, settok] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    settok(token);
  }, []);

  useEffect(() => {
    if (tok) {
      fetchData(selectedDate);
    }
  }, [selectedDate, tok]);

  const fetchData = async (date) => {
    setLoading(true);
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const response = await fetch(`http://localhost:3000/payment?date=${formattedDate}`, {
        headers: {
          'Authorization': `${tok}`
        }
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'user_id', headerName: 'User ID', width: 100 },
    { field: 'money', headerName: 'Amount', width: 150 },
    { field: 'payment_at', headerName: 'Payment Date', width: 250 },
  ];

  const exportToCSV = () => {
    const currentDate = format(new Date(), 'yyyyMMdd');
    const fileName = `payments_${currentDate}.csv`;

    const csvContent = "data:text/csv;charset=utf-8," 
      + columns.map(column => column.headerName).join(",") + "\n"
      + data.map(row => columns.map(column => row[column.field]).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Box sx={{ height: '90%', padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box />
        <Button variant="contained" onClick={exportToCSV}>Export CSV</Button>
      </Box>
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          loading={loading}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Payment;
