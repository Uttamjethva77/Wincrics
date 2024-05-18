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
const API_URL = "http://localhost:3000/videos";

// Validation schema for the video form
const VideoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  link: Yup.string().required("Link is required"),
});

// Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Video() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({
    id: null,
    title: "",
    link: "",
  });
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setVideos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Error fetching videos.");
      setLoading(false);
    }
  };

  const handleAddVideo = () => {
    setCurrentVideo({ id: null, title: "", link: "" });
    setOpenDialog(true);
  };

  const handleEditVideo = (video) => {
    setCurrentVideo(video);
    setOpenDialog(true);
  };

  const handleDeleteVideo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setVideos(videos.filter((video) => video.id !== id));
      setSnackbarMessage("Video deleted successfully.");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting video:", error);
      setError("Error deleting video.");
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentVideo({ id: null, title: "", link: "" });
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
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (values.id) {
        setVideos(
          videos.map((video) => (video.id === values.id ? data : video))
        );
      } else {
        setVideos([...videos, data]);
      }
      handleDialogClose();
      setSnackbarMessage(
        `Video ${values.id ? "updated" : "added"} successfully.`
      );
      setSnackbarOpen(true);
    } catch (error) {
      console.error(`Error ${values.id ? "updating" : "adding"} video:`, error);
      setError(`Error ${values.id ? "updating" : "adding"} video.`);
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { field: "title", headerName: "Title", width: 300 },
    { field: "link", headerName: "Link", width: 400 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditVideo(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteVideo(params.row.id)}>
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
        <Typography variant="h6">Video Management</Typography>
        <Button variant="contained" onClick={handleAddVideo}>
          <AddIcon style={{ marginRight: 5 }} />
          Add Video
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ height: 510, width: "100%" }}>
        <DataGrid rows={videos} columns={columns} pageSize={5} />
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {currentVideo.id ? "Edit Video" : "Add Video"}
        </DialogTitle>
        <FormikForm
          currentVideo={currentVideo}
          handleDialogSave={handleDialogSave}
          handleClose={handleDialogClose}
        />
      </Dialog>
    </Box>
  );
}

function FormikForm({ currentVideo, handleDialogSave, handleClose }) {
  const formik = useFormik({
    initialValues: {
      id: currentVideo.id || null,
      title: currentVideo.title || "",
      link: currentVideo.link || "",
    },
    validationSchema: VideoSchema,
    onSubmit: handleDialogSave,
  });

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
          id="link"
          name="link"
          label="Link"
          value={formik.values.link}
          onChange={formik.handleChange}
          error={formik.touched.link && Boolean(formik.errors.link)}
          helperText={formik.touched.link && formik.errors.link}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" disabled={formik.isSubmitting}>
          {currentVideo.id ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </form>
  );
}

export default Video;
