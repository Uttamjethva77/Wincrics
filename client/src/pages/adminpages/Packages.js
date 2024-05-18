import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as Yup from "yup";

// Define a base URL for the API
const API_URL = "http://localhost:3000/packagess";

// Validation schema for the package form
const PackageSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    price: Yup.number().required("Price is required"),
    benefit: Yup.array().required("Benefits are required"),
    time: Yup.string().required("Time is required"),
});

function Packages() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [currentPackage, setCurrentPackage] = useState({
        id: null,
        title: "",
        price: "",
        benefit: [],
        time: "",
    });

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Failed to fetch packages");
            const data = await response.json();
            setPackages(data);
        } catch (error) {
            console.error("Error fetching packages:", error);
            setSnackbar({ open: true, message: "Error fetching packages", severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleAddPackage = () => {
        setCurrentPackage({ id: null, title: "", price: "", benefit: [], time: "" });
        setOpenDialog(true);
    };

    const handleEditPackage = (pack) => {
        setCurrentPackage(pack);
        setOpenDialog(true);
    };

    const handleDeletePackage = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete package");
            setPackages(packages.filter((pack) => pack.id !== id));
            setSnackbar({ open: true, message: "Package deleted successfully", severity: "success" });
        } catch (error) {
            console.error("Error deleting package:", error);
            setSnackbar({ open: true, message: "Error deleting package", severity: "error" });
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setCurrentPackage({ id: null, title: "", price: "", benefit: [], time: "" });
    };

    const handleDialogSave = async (values, { setSubmitting }) => {
        const method = values.id ? "PUT" : "POST";
        const url = values.id ? `${API_URL}/${values.id}` : API_URL;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            if (!response.ok) throw new Error(`Failed to ${values.id ? "update" : "add"} package`);
            const data = await response.json();

            if (values.id) {
                setPackages(packages.map((pack) => (pack.id === values.id ? data : pack)));
                setSnackbar({ open: true, message: "Package updated successfully", severity: "success" });
            } else {
                setPackages([...packages, data]);
                setSnackbar({ open: true, message: "Package added successfully", severity: "success" });
            }
            handleDialogClose();
        } catch (error) {
            console.error(`Error ${values.id ? "updating" : "adding"} package:`, error);
            setSnackbar({ open: true, message: `Error ${values.id ? "updating" : "adding"} package`, severity: "error" });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px' }}>
                <Button
                    variant="contained"
                    onClick={handleAddPackage}
                    startIcon={<AddIcon />}
                >
                    Add Package
                </Button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ marginBottom: "20px", width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {packages.map((pack) => (
                        <Card key={pack.id} style={{ margin: "10px", width: "300px" }}>
                            <CardContent>
                                <Typography variant="h6">{pack.title}</Typography>
                                <Typography variant="body2" color="textSecondary">Price: {pack.price}</Typography>
                                <Typography variant="body2" color="textSecondary">Time: {pack.time}</Typography>
                                <Typography variant="body2" color="textSecondary">Benefits: {pack.benefit.join(", ")}</Typography>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                    <IconButton onClick={() => handleEditPackage(pack)}><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleDeletePackage(pack.id)}><DeleteIcon /></IconButton>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Dialog for Adding/Editing Package */}
                <Dialog open={openDialog} onClose={handleDialogClose}>
                    <DialogTitle>{currentPackage.id ? "Edit Package" : "Add Package"}</DialogTitle>
                    <PackageForm currentPackage={currentPackage} handleDialogSave={handleDialogSave} handleClose={handleDialogClose} />
                </Dialog>
            </div>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}

function PackageForm({ currentPackage, handleDialogSave, handleClose }) {
    const formik = useFormik({
        initialValues: {
            id: currentPackage.id || null,
            title: currentPackage.title || "",
            price: currentPackage.price || "",
            benefit: currentPackage.benefit || [],
            time: currentPackage.time || "",
        },
        validationSchema: PackageSchema,
        onSubmit: handleDialogSave,
    });

    const handleBenefitsChange = (event) => {
        const benefits = event.target.value.split(",").map((benefit) => benefit.trim());
        formik.setFieldValue("benefit", benefits);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    id="title"
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    id="price"
                    name="price"
                    label="Price"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    id="time"
                    name="time"
                    label="Time"
                    value={formik.values.time}
                    onChange={formik.handleChange}
                    error={formik.touched.time && Boolean(formik.errors.time)}
                    helperText={formik.touched.time && formik.errors.time}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    id="benefit"
                    name="benefit"
                    label="Benefits (comma separated)"
                    value={formik.values.benefit.join(", ")}
                    onChange={handleBenefitsChange}
                    error={formik.touched.benefit && Boolean(formik.errors.benefit)}
                    helperText={formik.touched.benefit && formik.errors.benefit}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" disabled={formik.isSubmitting}>
                    {currentPackage.id ? "Save" : "Add"}
                </Button>
            </DialogActions>
        </form>
    );
}

export default Packages;
