import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Divider, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

const Payment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tok, settok] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ id: null, user_id: '', money: '', payment_at: new Date() });
  const [editMode, setEditMode] = useState(false);

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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ id: null, user_id: '', money: '', payment_at: new Date() });
    setEditMode(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, payment_at: date });
  };

  const handleCreatePayment = async () => {
    try {
      const response = await fetch(`http://localhost:3000/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${tok}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchData(selectedDate);
        handleCloseDialog();
      } else {
        throw new Error('Failed to create payment');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  const handleEditPayment = async () => {
    try {
      const response = await fetch(`http://localhost:3000/payment/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${tok}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchData(selectedDate);
        handleCloseDialog();
      } else {
        throw new Error('Failed to edit payment');
      }
    } catch (error) {
      console.error('Error editing payment:', error);
    }
  };

  const handleDeletePayment = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/payment/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${tok}`
        }
      });
      if (response.ok) {
        fetchData(selectedDate);
      } else {
        throw new Error('Failed to delete payment');
      }
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  const handleEditButtonClick = (rowData) => {
    setFormData({ id: rowData.id, user_id: rowData.user_id, money: rowData.money, payment_at: new Date(rowData.payment_at) });
    setEditMode(true);
    setOpenDialog(true);
  };

  const columns = [
    { field: 'user_id', headerName: 'User ID', width: 100 },
    { field: 'money', headerName: 'Amount', width: 150 },
    { field: 'payment_at', headerName: 'Payment Date', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => handleEditButtonClick(params.row)}>Edit</Button>
      ),
    },
  ];

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
        <Button variant="contained" onClick={handleOpenDialog}>Add Payment</Button>
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Edit Payment' : 'Add Payment'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            id="user_id"
            name="user_id"
            label="User ID"
            value={formData.user_id}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            id="money"
            name="money"
            label="Amount"
            value={formData.money}
            onChange={handleFormChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Payment Date"
              value={formData.payment_at}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {editMode ? (
            <Button onClick={handleEditPayment} color="primary">Save</Button>
          ) : (
            <Button onClick={handleCreatePayment} color="primary">Create</Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Payment;
