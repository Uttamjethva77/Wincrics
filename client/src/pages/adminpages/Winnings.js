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
const API_URL = "http://localhost:3000/winnings";

// Validation schema for the winnings form
const WinningsSchema = Yup.object().shape({
  images: Yup.string().url("Invalid URL").required("Image URL is required"),
});

// Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Winnings() {
  const [winnings, setWinnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentWinnings, setCurrentWinnings] = useState({
    id: null,
    images: "",
  });
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchWinnings();
  }, []);

  const fetchWinnings = async () => {
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
      setWinnings(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching winnings:", error);
      setError("Error fetching winnings.");
      setLoading(false);
    }
  };

  const handleAddWinnings = () => {
    setCurrentWinnings({ id: null, images: "" });
    setOpenDialog(true);
  };

  const handleEditWinnings = (winnings) => {
    setCurrentWinnings(winnings);
    setOpenDialog(true);
  };

  const handleDeleteWinnings = async (id) => {
    try {
      const token = localStorage.getItem("admintoken");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': token,
        }
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setWinnings(winnings.filter((winnings) => winnings.id !== id));
      setSnackbarMessage("Winnings deleted successfully.");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting winnings:", error);
      setError("Error deleting winnings.");
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentWinnings({ id: null, images: "" });
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
        setWinnings(
          winnings.map((winning) => (winning.id === values.id ? data : winning))
        );
      } else {
        setWinnings([...winnings, data]);
      }
      handleDialogClose();
      setSnackbarMessage(
        `Winnings ${values.id ? "updated" : "added"} successfully.`
      );
      setSnackbarOpen(true);
    } catch (error) {
      console.error(
        `Error ${values.id ? "updating" : "adding"} winnings:`,
        error
      );
      setError(`Error ${values.id ? "updating" : "adding"} winnings.`);
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { field: "images", headerName: "Image", width: 400 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditWinnings(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteWinnings(params.row.id)}>
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
        <Typography variant="h6">Winnings Management</Typography>
        <Button variant="contained" onClick={handleAddWinnings}>
          <AddIcon style={{ marginRight: 5 }} />
          Add Winnings
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ height: 510, width: "100%" }}>
        <DataGrid rows={winnings} columns={columns} pageSize={5} />
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {currentWinnings.id ? "Edit Winnings" : "Add Winnings"}
        </DialogTitle>
        <FormikForm
          currentWinnings={currentWinnings}
          handleDialogSave={handleDialogSave}
          handleClose={handleDialogClose}
        />
      </Dialog>
    </Box>
  );
}

function FormikForm({ currentWinnings, handleDialogSave, handleClose }) {
  const formik = useFormik({
    initialValues: {
      id: currentWinnings.id || null,
      images: currentWinnings.images || "",
    },
    validationSchema: WinningsSchema,
    onSubmit: handleDialogSave,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          variant="outlined"
          id="images"
          name="images"
          label="Image"
          value={formik.values.images}
          onChange={formik.handleChange}
          error={formik.touched.images && Boolean(formik.errors.images)}
          helperText={formik.touched.images && formik.errors.images}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" disabled={formik.isSubmitting}>
          {currentWinnings.id ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </form>
  );
}

export default Winnings;
