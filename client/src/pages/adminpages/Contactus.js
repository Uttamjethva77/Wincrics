import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Snackbar,
  IconButton,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as Yup from "yup";
import MuiAlert from "@mui/material/Alert";

// Define a base URL for the API
const API_URL = "http://194.238.18.76:3000/contactus";

// Validation schema for the contactus form
const ContactUsSchema = Yup.object().shape({
  full_name: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone_number: Yup.string().required("Phone Number is required"),
  message: Yup.string().max(1000, "Message must be at most 1000 characters"),
});

// Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ContactUs() {
  const [contactUsItems, setContactUsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentContactUs, setCurrentContactUs] = useState({
    id: null,
    full_name: "",
    email: "",
    phone_number: "",
    message: "",
  });
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchContactUsItems();
  }, []);

  const fetchContactUsItems = async () => {
    try {
      const token = localStorage.getItem("admintoken");
      const response = await fetch(API_URL, {
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setContactUsItems(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contact us items:", error);
      setError("Error fetching contact us items.");
      setLoading(false);
    }
  };

  const handleAddContactUs = () => {
    setCurrentContactUs({
      id: null,
      full_name: "",
      email: "",
      phone_number: "",
      message: "",
    });
    setOpenDialog(true);
  };

  const handleEditContactUs = (contactUsItem) => {
    setCurrentContactUs(contactUsItem);
    setOpenDialog(true);
  };

  const handleDeleteContactUs = async (id) => {
    try {
      const token = localStorage.getItem("admintoken");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setContactUsItems(contactUsItems.filter((item) => item.id !== id));
      setSnackbarMessage("Contact Us item deleted successfully.");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting contact us item:", error);
      setError("Error deleting contact us item.");
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentContactUs({
      id: null,
      full_name: "",
      email: "",
      phone_number: "",
      message: "",
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
          Authorization: token,
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (values.id) {
        setContactUsItems(
          contactUsItems.map((item) => (item.id === values.id ? data : item))
        );
      } else {
        setContactUsItems([...contactUsItems, data]);
      }
      handleDialogClose();
      setSnackbarMessage(
        `Contact Us item ${values.id ? "updated" : "added"} successfully.`
      );
      setSnackbarOpen(true);
    } catch (error) {
      console.error(
        `Error ${values.id ? "updating" : "adding"} contact us item:`,
        error
      );
      setError(`Error ${values.id ? "updating" : "adding"} contact us item.`);
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { field: "full_name", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone_number", headerName: "Phone Number", width: 150 },
    { field: "message", headerName: "Message", width: 400 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditContactUs(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteContactUs(params.row.id)}>
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
        <Typography variant="h6">Contact Us Management</Typography>
        <Button variant="contained" onClick={handleAddContactUs}>
          <AddIcon style={{ marginRight: 5 }} />
          Add Contact Us Item
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ height: 510, width: "100%" }}>
        <DataGrid rows={contactUsItems} columns={columns} pageSize={5} />
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {currentContactUs.id ? "Edit Contact Us Item" : "Add Contact Us Item"}
        </DialogTitle>
        <FormikForm
          currentContactUs={currentContactUs}
          handleDialogSave={handleDialogSave}
          handleClose={handleDialogClose}
        />
      </Dialog>
    </Box>
  );
}

function FormikForm({ currentContactUs, handleDialogSave, handleClose }) {
  const formik = useFormik({
    initialValues: {
      id: currentContactUs.id || null,
      full_name: currentContactUs.full_name || "",
      email: currentContactUs.email || "",
      phone_number: currentContactUs.phone_number || "",
      message: currentContactUs.message || "",
    },
    validationSchema: ContactUsSchema,
    onSubmit: handleDialogSave,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          variant="outlined"
          id="full_name"
          name="full_name"
          label="Full Name"
          value={formik.values.full_name}
          onChange={formik.handleChange}
          error={formik.touched.full_name && Boolean(formik.errors.full_name)}
          helperText={formik.touched.full_name && formik.errors.full_name}
        />
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
          id="phone_number"
          name="phone_number"
          label="Phone Number"
          value={formik.values.phone_number}
          onChange={formik.handleChange}
          error={
            formik.touched.phone_number &&
            Boolean(formik.errors.phone_number)
          }
          helperText={
            formik.touched.phone_number && formik.errors.phone_number
          }
        />
        <TextField
          fullWidth
          margin="dense"
          variant="outlined"
          id="message"
          name="message"
          label="Message"
          multiline
          rows={4}
          value={formik.values.message}
          onChange={formik.handleChange}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" disabled={formik.isSubmitting}>
          {currentContactUs.id ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </form>
  );
}

export default ContactUs;
