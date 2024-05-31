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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as Yup from "yup";
import MuiAlert from "@mui/material/Alert";

const API_URL = "https://wincrics.com:8443/blogs";

const BlogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  blogimage: Yup.string().required("Blog image URL is required"),
  match_news: Yup.string().required("Match news is required"),
  date: Yup.date().required("Date is required"),
  time: Yup.string().required("Time is required"),
  venue: Yup.string().required("Venue is required"),
  squad_team1: Yup.array().required("Team 1 squad is required"),
  squad_team2: Yup.array().required("Team 2 squad is required"),
  imp_player: Yup.array().required("Important players are required"),
  captain: Yup.array().required("Captain is required"),
  fantasy_team: Yup.array().required("Fantasy team is required"),
  vice_captain: Yup.array().required("Vice captain is required"),
  upload_by: Yup.number().required("Uploader ID is required"),
  tags: Yup.array().required("Tags are required"),
  metadata: Yup.string().required("Metadata is required"),
  description: Yup.string().required("Description is required"),
  images: Yup.array().required("Images are required"),
  playing_11_team1: Yup.array().required("Team 1 playing 11 is required"),
  playing_11_team2: Yup.array().required("Team 2 playing 11 is required"),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    id: null,
    title: "",
    blogimage: "",
    match_news: "",
    date: "",
    time: "",
    venue: "",
    squad_team1: [],
    squad_team2: [],
    imp_player: [],
    captain: [],
    fantasy_team: [],
    vice_captain: [],
    upload_by: 0,
    tags: [],
    metadata: "",
    description: "",
    images: [],
    playing_11_team1: [],
    playing_11_team2: [],
    deleted_by: "null",
  });
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
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
      setBlogs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Error fetching blogs.");
      setLoading(false);
    }
  };

  const handleAddBlog = () => {
    setCurrentBlog({
      id: null,
      title: "",
      blogimage: "",
      match_news: "",
      date: "",
      time: "",
      venue: "",
      squad_team1: [],
      squad_team2: [],
      imp_player: [],
      captain: [],
      fantasy_team: [],
      vice_captain: [],
      upload_by: 0,
      tags: [],
      metadata: "",
      description: "",
      images: [],
      playing_11_team1: [],
      playing_11_team2: [],
    });
    setOpenDialog(true);
  };

  const handleEditBlog = (blog) => {
    setCurrentBlog(blog);
    setOpenDialog(true);
  };

  const handleDeleteBlog = async (id) => {
    try {
      const token = localStorage.getItem("admintoken")
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setSnackbarMessage("Blog deleted successfully.");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting blog:", error);
      setError("Error deleting blog.");
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentBlog({
      id: null,
      title: "",
      blogimage: "",
      match_news: "",
      date: "",
      time: "",
      venue: "",
      squad_team1: [],
      squad_team2: [],
      imp_player: [],
      captain: [],
      fantasy_team: [],
      vice_captain: [],
      upload_by: 1,
      tags: [],
      metadata: "",
      description: "",
      images: [],
      playing_11_team1: [],
      playing_11_team2: [],
    });
  };

  const handleDialogSave = async (values, { setSubmitting }) => {
    const method = values.id ? "PUT" : "POST";
    const url = values.id ? `${API_URL}/${values.id}` : API_URL;

    try {
      const token = localStorage.getItem("admintoken")
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${token}`
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (values.id) {
        setBlogs(
          blogs.map((blog) => (blog.id === values.id ? data : blog))
        );
      } else {
        setBlogs([...blogs, data]);
      }
      handleDialogClose();
      setSnackbarMessage(
        `Blog ${values.id ? "updated" : "added"} successfully.`
      );
      setSnackbarOpen(true);
    } catch (error) {
      console.error(`Error ${values.id ? "updating" : "adding"} blog:`, error);
      setError(`Error ${values.id ? "updating" : "adding"} blog.`);
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { field: "title", headerName: "Title", width: 300 },
    { field: "date", headerName: "Date", width: 120 },
    { field: "time", headerName: "Time", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditBlog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteBlog(params.row.id)}>
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
        <Typography variant="h6">Blog Management</Typography>
        <Button variant="contained" onClick={handleAddBlog}>
          <AddIcon style={{ marginRight: 5 }} />
          Add Blog
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ height: 510, width: "100%" }}>
        <DataGrid rows={blogs} columns={columns} pageSize={5} />
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {currentBlog.id ? "Edit Blog" : "Add Blog"}
        </DialogTitle>
        <FormikForm
          currentBlog={currentBlog}
          handleDialogSave={handleDialogSave}
          handleClose={handleDialogClose}
        />
      </Dialog>
    </Box>
  );
}

function FormikForm({ currentBlog, handleDialogSave, handleClose }) {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
  
    const formik = useFormik({
      initialValues: {
        ...currentBlog,
        date: currentBlog.date ? formatDate(currentBlog.date) : "",
      },
      validationSchema: BlogSchema,
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
            id="blogimage"
            name="blogimage"
            label="Blog Image URL"
            value={formik.values.blogimage}
            onChange={formik.handleChange}
            error={formik.touched.blogimage && Boolean(formik.errors.blogimage)}
            helperText={formik.touched.blogimage && formik.errors.blogimage}
          />
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            id="match_news"
            name="match_news"
            label="Match News"
            value={formik.values.match_news}
            onChange={formik.handleChange}
            error={formik.touched.match_news && Boolean(formik.errors.match_news)}
            helperText={formik.touched.match_news && formik.errors.match_news}
          />
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            id="date"
            name="date"
            label=""
            type="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            id="time"
            name="time"
            label=""
            type="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            error={formik.touched.time && Boolean(formik.errors.time)}
            helperText={formik.touched.time && formik.errors.time}
          />
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            id="venue"
            name="venue"
            label="Venue"
            value={formik.values.venue}
            onChange={formik.handleChange}
            error={formik.touched.venue && Boolean(formik.errors.venue)}
            helperText={formik.touched.venue && formik.errors.venue}
          />
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            id="squad_team1"
            name="squad_team1"
            label="Squad Team 1 (comma separated)"
            value={formik.values.squad_team1.join(", ")}
            onChange={(event) =>
              formik.setFieldValue(
                "squad_team1",
                event.target.value.split(",").map((item) => item.trim())
              )
            }
            error={formik.touched.squad_team1 && Boolean(formik.errors.squad_team1)}
            helperText={formik.touched.squad_team1 && formik.errors.squad_team1}
          />
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            id="squad_team2"
            name="squad_team2"
            label="Squad Team 2 (comma separated)"
            value={formik.values.squad_team2.join(", ")}
            onChange={(event) =>
              formik.setFieldValue(
                "squad_team2",
                event.target.value.split(",").map((item) => item.trim())
              )
            }
            error={formik.touched.squad_team2 && Boolean(formik.errors.squad_team2)}
            helperText={formik.touched.squad_team2 && formik.errors.squad_team2}
          />
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            id="imp_player"
            name="imp_player"
            label="Important Players (comma separated)"
            value={formik.values.imp_player.join(", ")}
            onChange={(event) =>
              formik.setFieldValue(
                "imp_player",
                event.target.value.split(",").map((item) => item.trim())
              )
            }
            error={formik.touched.imp_player && Boolean(formik.errors.imp_player)}
            helperText={formik.touched.imp_player && formik.errors.imp_player}
          />
          <TextField
  fullWidth
  margin="dense"
  variant="outlined"
  id="captain"
  name="captain"
  label="Captain (comma separated)"
  value={formik.values.captain.join(", ")}
  onChange={(event) =>
    formik.setFieldValue(
      "captain",
      event.target.value.split(",").map((item) => item.trim())
    )
  }
  error={formik.touched.captain && Boolean(formik.errors.captain)}
  helperText={formik.touched.captain && formik.errors.captain}
/>

<TextField
  fullWidth
  margin="dense"
  variant="outlined"
  id="fantasy_team"
  name="fantasy_team"
  label="Fantasy Team (comma separated)"
  value={formik.values.fantasy_team.join(", ")}
  onChange={(event) =>
    formik.setFieldValue(
      "fantasy_team",
      event.target.value.split(",").map((item) => item.trim())
    )
  }
  error={formik.touched.fantasy_team && Boolean(formik.errors.fantasy_team)}
  helperText={formik.touched.fantasy_team && formik.errors.fantasy_team}
/>

<TextField
  fullWidth
  margin="dense"
  variant="outlined"
  id="vice_captain"
  name="vice_captain"
  label="Vice Captain (comma separated)"
  value={formik.values.vice_captain.join(", ")}
  onChange={(event) =>
    formik.setFieldValue(
      "vice_captain",
      event.target.value.split(",").map((item) => item.trim())
    )
  }
  error={formik.touched.vice_captain && Boolean(formik.errors.vice_captain)}
  helperText={formik.touched.vice_captain && formik.errors.vice_captain}
/>

<TextField
  fullWidth
  margin="dense"
  variant="outlined"
  id="upload_by"
  name="upload_by"
  label="Uploader ID"
  type="number"
  value={formik.values.upload_by}
  onChange={formik.handleChange}
  error={formik.touched.upload_by && Boolean(formik.errors.upload_by)}
  helperText={formik.touched.upload_by && formik.errors.upload_by}
/>

<TextField
  fullWidth
  margin="dense"
  variant="outlined"
  id="tags"
  name="tags"
  label="Tags (comma separated)"
  value={formik.values.tags.join(", ")}
  onChange={(event) =>
    formik.setFieldValue(
      "tags",
      event.target.value.split(",").map((item) => item.trim())
    )
  }
  error={formik.touched.tags && Boolean(formik.errors.tags)}
  helperText={formik.touched.tags && formik.errors.tags}
/>

<TextField
  fullWidth
  margin="dense"
  variant="outlined"
  id="metadata"
  name="metadata"
  label="Metadata"
  value={formik.values.metadata}
  onChange={formik.handleChange}
  error={formik.touched.metadata && Boolean(formik.errors.metadata)}
  helperText={formik.touched.metadata && formik.errors.metadata}
/>

<TextField
  fullWidth
  margin="dense"
  variant="outlined"
  id="description"
  name="description"
  label="Description"
  multiline
  rows={4}
  value={formik.values.description}
  onChange={formik.handleChange}
  error={formik.touched.description && Boolean(formik.errors.description)}
  helperText={formik.touched.description && formik.errors.description}
/>

<TextField
  fullWidth
  margin="dense"
  variant="outlined"
  id="images"
  name="images"
  label="Images (comma separated URLs)"
  value={formik.values.images.join(", ")}
  onChange={(event) =>
    formik.setFieldValue(
      "images",
      event.target.value.split(",").map((item) => item.trim())
    )
  }
  error={formik.touched.images && Boolean(formik.errors.images)}
  helperText={formik.touched.images && formik.errors.images}
/>

<TextField
  fullWidth
  margin="dense"
  variant="outlined"
  id="playing_11_team1"
  name="playing_11_team1"
  label="Playing 11 Team 1 (comma separated)"
  value={formik.values.playing_11_team1.join(", ")}
  onChange={(event) =>
    formik.setFieldValue(
      "playing_11_team1",
      event.target.value.split(",").map((item) => item.trim())
    )
  }
  error={formik.touched.playing_11_team1 && Boolean(formik.errors.playing_11_team1)}
  helperText={formik.touched.playing_11_team1 && formik.errors.playing_11_team1}
/>

<TextField
  fullWidth
  margin="dense"
  variant="outlined"
  id="playing_11_team2"
  name="playing_11_team2"
  label="Playing 11 Team 2 (comma separated)"
  value={formik.values.playing_11_team2.join(", ")}
  onChange={(event) =>
    formik.setFieldValue(
      "playing_11_team2",
      event.target.value.split(",").map((item) => item.trim())
    )
  }
  error={formik.touched.playing_11_team2 && Boolean(formik.errors.playing_11_team2)}
  helperText={formik.touched.playing_11_team2 && formik.errors.playing_11_team2}
/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={formik.isSubmitting}>
            {currentBlog.id ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </form>
    );
  }
  

export default Blogs;
