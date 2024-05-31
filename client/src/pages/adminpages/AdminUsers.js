import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Divider,
  Button,
  Typography,
  Snackbar,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { format } from 'date-fns';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MuiAlert from '@mui/material/Alert';

// Define a base URL for the API
const API_URL = 'https://wincrics.com:8443/admin';

// Validation schema for the admin user form
const AdminUserSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobile: Yup.string().required('Mobile is required'),
  password: Yup.string().required('Password is required'),
  role: Yup.string().required('Role is required'),
});

// Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AdminUsers() {
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAdminUser, setCurrentAdminUser] = useState({
    id: null,
    email: '',
    mobile: '',
    password: '',
    role: '',
  });
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      const token = localStorage.getItem('admintoken');
      const response = await fetch(API_URL, {
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAdminUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin users:', error);
      setError('Error fetching admin users.');
      setLoading(false);
    }
  };

  const handleAddAdminUser = () => {
    setCurrentAdminUser({ id: null, email: '', mobile: '', password: '', role: '' });
    setOpenDialog(true);
  };

  const handleEditAdminUser = (adminUser) => {
    setCurrentAdminUser(adminUser);
    setOpenDialog(true);
  };

  const handleDeleteAdminUser = async (id) => {
    try {
      const token = localStorage.getItem('admintoken');
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setAdminUsers(adminUsers.filter((adminUser) => adminUser.id !== id));
      setSnackbarMessage('Admin user deleted successfully.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting admin user:', error);
      setError('Error deleting admin user.');
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentAdminUser({ id: null, email: '', mobile: '', password: '', role: '' });
  };

  const handleDialogSave = async (values, { setSubmitting }) => {
    const method = values.id ? 'PUT' : 'POST';
    const url = values.id ? `${API_URL}/${values.id}` : API_URL;

    try {
      const token = localStorage.getItem('admintoken');
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (values.id) {
        setAdminUsers(adminUsers.map((adminUser) => (adminUser.id === values.id ? data : adminUser)));
      } else {
        setAdminUsers([...adminUsers, data]);
      }
      handleDialogClose();
      setSnackbarMessage(`Admin user ${values.id ? 'updated' : 'added'} successfully.`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error(`Error ${values.id ? 'updating' : 'adding'} admin user:`, error);
      setError(`Error ${values.id ? 'updating' : 'adding'} admin user.`);
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'mobile', headerName: 'Mobile', width: 200 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditAdminUser(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteAdminUser(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {error && (
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Admin Users Management</Typography>
        <Button variant="contained" onClick={handleAddAdminUser}>
          <AddIcon style={{ marginRight: 5 }} />
          Add Admin User
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ height: 510, width: '100%' }}>
        <DataGrid rows={adminUsers} columns={columns} pageSize={5} />
      </Box>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{currentAdminUser.id ? 'Edit Admin User' : 'Add Admin User'}</DialogTitle>
        <AdminUserForm
          currentAdminUser={currentAdminUser}
          handleDialogSave={handleDialogSave}
          handleClose={handleDialogClose}
        />
      </Dialog>
    </Box>
  );
}

function AdminUserForm({ currentAdminUser, handleDialogSave, handleClose }) {
  const formik = useFormik({
    initialValues: {
      id: currentAdminUser.id || null,
      email: currentAdminUser.email || '',
      mobile: currentAdminUser.mobile || '',
      password: currentAdminUser.password || '',
      role: currentAdminUser.role || '',
    },
    validationSchema: AdminUserSchema,
    onSubmit: handleDialogSave,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          variant="outlined"
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          margin="dense"
          variant="outlined"
          id="mobile"
          name="mobile"
          label="Mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
        />
        <TextField
          fullWidth
          margin="dense"
          variant="outlined"
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          fullWidth
          margin="dense"
          variant="outlined"
          id="role"
          name="role"
          label="Role"
          value={formik.values.role}
          onChange={formik.handleChange}
          error={formik.touched.role && Boolean(formik.errors.role)}
          helperText={formik.touched.role && formik.errors.role}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" disabled={formik.isSubmitting}>
          {currentAdminUser.id ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </form>
  );
}

export default AdminUsers;
