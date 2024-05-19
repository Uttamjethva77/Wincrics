import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Divider, Button } from '@mui/material';
import { format } from 'date-fns';

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tok, settok] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    settok(token);
  }, []);

  useEffect(() => {
    if (tok) {
      fetchData();
    }
  }, [tok]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/users', {
        headers: {
          'Authorization': `${tok}`
        }
      });
      const result = await response.json();
      setUserData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Full Name', width: 200 },
    { field: 'mobile', headerName: 'Mobile', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    // Add more user fields as needed
  ];

  const exportToCSV = () => {
    const currentDate = format(new Date(), 'yyyyMMdd');
    const fileName = `users_${currentDate}.csv`;

    const csvContent = "data:text/csv;charset=utf-8," 
      + columns.map(column => column.headerName).join(",") + "\n"
      + userData.map(row => columns.map(column => row[column.field]).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Box sx={{ height: '90%', padding: 2 }}>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box />
        <Button variant="contained" onClick={exportToCSV} sx={{ ml: 2 }}>Export CSV</Button>
      </Box>
      <Box sx={{ height: 500, width: '100%', mt: 2 }}>
        <DataGrid
          rows={userData}
          columns={columns}
          pageSize={10}  // Adjust page size as needed
          loading={loading}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Users;
