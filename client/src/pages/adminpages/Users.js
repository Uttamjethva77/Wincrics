import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Divider, Button } from '@mui/material';
import { format } from 'date-fns';

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tok, settok] = useState("");
  const [showUsers, setShowUsers] = useState(true); // State to manage which section to show

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    settok(token);
  }, []);

  useEffect(() => {
    if (tok && showUsers) {
      fetchData('http://localhost:3000/users');
    } else if (tok && !showUsers) {
      fetchData('http://localhost:3000/otp');
    }
  }, [tok, showUsers]);

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
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

  const columnsUsers = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Full Name', width: 200 },
    { field: 'mobile', headerName: 'Mobile', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    // Add more user fields as needed
  ];

  const columnsOTP = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'user_id', headerName: 'User ID', width: 150 },
    { field: 'otp_number', headerName: 'OTP Number', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone_number', headerName: 'Phone Number', width: 200 },
    // Add more OTP fields as needed
  ];

  const exportToCSV = () => {
    const currentDate = format(new Date(), 'yyyyMMdd');
    let fileName = '';
  
    if (showUsers) {
      fileName = `users_${currentDate}.csv`;
    } else {
      fileName = `otp_${currentDate}.csv`;
    }
  
    const csvContent = "data:text/csv;charset=utf-8," 
      + (showUsers ? columnsUsers : columnsOTP).map(column => column.headerName).join(",") + "\n"
      + userData.map(row => (showUsers ? columnsUsers : columnsOTP).map(column => row[column.field]).join(",")).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Box sx={{ height: '90%', padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Button variant="contained" onClick={() => setShowUsers(true)} sx={{ mr: 2 }}>Users</Button>
          <Button variant="contained" onClick={() => setShowUsers(false)}>OTP</Button>
        </Box>
        <Button variant="contained" onClick={exportToCSV} sx={{ ml: 2 }}>Export CSV</Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ height: 500, width: '100%', mt: 2 }}>
        <DataGrid
          rows={userData}
          columns={showUsers ? columnsUsers : columnsOTP}
          pageSize={10}
          loading={loading}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Users;
