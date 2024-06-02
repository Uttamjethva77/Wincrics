import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Checkbox,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Loginuser = () => {
  const LOGIN_API_URL = "https://wincrics.com:8443/userlogin";

  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [load, setload] = useState(false);

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      emailOrMobile: "",
      password: "",
    },
    validationSchema: Yup.object({
      emailOrMobile: Yup.string().required("Email or Mobile number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setLoading(true);
      try {
        const response = await fetch(LOGIN_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed");
        }

        const user = await response.json();
        console.log("User logged in:", user);
        
        localStorage.setItem("userdata",JSON.stringify(user))

        setSnackbarMessage("Login successful");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        navigate("/")
        window.location.reload();
      } catch (error) {
        console.error("Error:", error);
        setErrors({ api: error.message });
        setSnackbarMessage(error.message);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="emailOrMobile"
            label="Email or Mobile"
            name="emailOrMobile"
            autoComplete="emailOrMobile"
            autoFocus
            value={formik.values.emailOrMobile}
            onChange={formik.handleChange}
            error={
              formik.touched.emailOrMobile && Boolean(formik.errors.emailOrMobile)
            }
            helperText={formik.touched.emailOrMobile && formik.errors.emailOrMobile}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          {formik.errors.api && (
            <Typography color="error" variant="body2">
              {formik.errors.api}
            </Typography>
          )}
          <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>Accept</Typography>
              <Link to="/terms" style={{ textDecoration: "none" }}>
                <Typography color="primary" sx={{ ml: 1, cursor: "pointer" }}>
                  {" terms  "}
                </Typography>
              </Link>
              <Typography sx={{ ml: 1 }}> {" And"} </Typography>
              <Link to="/policy" style={{ textDecoration: "none" }}>
                <Typography color="primary" sx={{ ml: 1, cursor: "pointer" }}>
                  policy
                </Typography>
              </Link>
              
              <Checkbox
              defaultChecked
              onChange={() => {
                setload(!load);
              }}
            />
            </Box>
           
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
  <Typography>
    Don't have an account?
  </Typography>{" "}
  <Link to="/register" style={{ textDecoration: "none" }}>
    <Typography color="primary" sx={{ ml: 1, cursor: "pointer" }}>
      Register
    </Typography>
  </Link>
</Box>

<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
  <Typography>
    Forgot password?
  </Typography>{" "}
  <Link to="/Forgetpassword" style={{ textDecoration: "none" }}>
    <Typography color="primary" sx={{ ml: 1, cursor: "pointer" }}>
      Click here
    </Typography>
  </Link>
</Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting || load}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
          {load && (
        <Typography sx={{ color: "red" }}>
          Please accept Terms and Policy
        </Typography>
      )}
        </form>
        
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Loginuser;
