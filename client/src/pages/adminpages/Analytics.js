import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box, Divider } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

const Analytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  const fetchData = async (date) => {
    setLoading(true);
    try {
      const formattedDate = format(date, 'MM/dd/yyyy');
      const response = await fetch(`http://localhost:3000/analytics?page=1&filters[date]=${formattedDate}`);
      const result = await response.json();
      const filteredData = result.map((item, index) => ({
        id: index + 1,  
        url: item.url,
        path: item.path,
        time: item.time,
        date: item.date,
        ip: item.ip,
      }));
      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'url', headerName: 'URL', width: 300 },
    { field: 'path', headerName: 'Path', width: 100 },
    { field: 'time', headerName: 'Time', width: 150 },
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'ip', headerName: 'IP Address', width: 150 },
  ];

  return (
    <Box sx={{ height: '90%', padding: 2}}>
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
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={1}
          loading={loading}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Analytics;
