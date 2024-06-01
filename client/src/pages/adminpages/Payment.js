import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Typography,
  Box,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";
import * as Yup from "yup";
import MuiAlert from "@mui/material/Alert";
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const API_URL = "https://wincrics.com:8443/payment";

const PaymentSchema = Yup.object().shape({
  user_id: Yup.number().required("User ID is required"),
  money: Yup.number().required("Amount is required"),
  payment_at: Yup.date().required("Payment Date is required"),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Payment() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPayment, setCurrentPayment] = useState({
    id: null,
    user_id: "",
    money: "",
    payment_at: "",
  });
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("admintoken");
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': token,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPayments(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setError("Error fetching payments.");
      setLoading(false);
    }
  };

  const handleAddPayment = () => {
    setCurrentPayment({
      id: null,
      user_id: "",
      money: "",
      payment_at: "",
    });
    setOpenDialog(true);
  };

  const handleEditPayment = (payment) => {
    setCurrentPayment(payment);
    setOpenDialog(true);
  };

  const handleDeletePayment = async (id) => {
    try {
      const token = localStorage.getItem("admintoken");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setPayments(payments.filter((payment) => payment.id !== id));
      setSnackbarMessage("Payment deleted successfully.");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting payment:", error);
      setError("Error deleting payment.");
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentPayment({
      id: null,
      user_id: "",
      money: "",
      payment_at: "",
    });
  };

  const handleDialogSave = async (values, { setSubmitting }) => {
    const method = values.id ? "PUT" : "POST";
    const url = values.id ? `${API_URL}/${values.id}` : API_URL;

    try {
      const token = localStorage.getItem("admintoken");
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${token}`
        },
        body: JSON.stringify({
          ...values,
          paymentAt: values.payment_at // Send paymentAt instead of payment_at
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (values.id) {
        setPayments(
          payments.map((payment) => (payment.id === values.id ? data : payment))
        );
      } else {
        setPayments([...payments, data]);
      }
      handleDialogClose();
      setSnackbarMessage(
        `Payment ${values.id ? "updated" : "added"} successfully.`
      );
      setSnackbarOpen(true);
    } catch (error) {
      console.error(`Error ${values.id ? "updating" : "adding"} payment:`, error);
      setError(`Error ${values.id ? "updating" : "adding"} payment.`);
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { field: "user_id", headerName: "User ID", width: 150 },
    { field: "money", headerName: "Amount", width: 150 },
    { field: "payment_at", headerName: "Payment Date", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditPayment(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeletePayment(params.row.id)}>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {error && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Payment Management</Typography>
        <Button variant="contained" onClick={handleAddPayment}>
          <AddIcon style={{ marginRight: 5 }} />
          Add Payment
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ height: 510, width: "100%" }}>
        <DataGrid rows={payments} columns={columns} pageSize={5} />
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {currentPayment.id ? "Edit Payment" : "Add Payment"}
        </DialogTitle>
        <FormikForm
          currentPayment={currentPayment}
          handleDialogSave={handleDialogSave}
          handleClose={handleDialogClose}
        />
      </Dialog>
    </Box>
  );
}

function FormikForm({ currentPayment, handleDialogSave, handleClose }) {
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Ensure dateString is not null
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formik = useFormik({
    initialValues: {
      ...currentPayment,
      payment_at: formatDate(currentPayment.payment_at),
    },
    validationSchema: PaymentSchema,
    onSubmit: handleDialogSave,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          variant="outlined"
          id="user_id"
          name="user_id"
          label="User ID"
          type="number"
          value={formik.values.user_id}
          onChange={formik.handleChange}
          error={formik.touched.user_id && Boolean(formik.errors.user_id)}
          helperText={formik.touched.user_id && formik.errors.user_id}
        />
        <TextField
          fullWidth
          margin="dense"
          variant="outlined"
          id="money"
          name="money"
          label="Amount"
          type="number"
          value={formik.values.money}
          onChange={formik.handleChange}
          error={formik.touched.money && Boolean(formik.errors.money)}
          helperText={formik.touched.money && formik.errors.money}
        />
        <TextField
          fullWidth
          margin="dense"
          variant="outlined"
          id="payment_at"
          name="payment_at"
          label=""
          type="date"
          value={formik.values.payment_at}
          onChange={formik.handleChange}
          error={
            formik.touched.payment_at && Boolean(formik.errors.payment_at)
          }
          helperText={formik.touched.payment_at && formik.errors.payment_at}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" disabled={formik.isSubmitting}>
          {currentPayment.id ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </form>
  );
}

export default Payment;
