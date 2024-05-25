import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Modal,
  CircularProgress,
  Checkbox,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const REGISTER_API_URL = "http://localhost:3000/users";
  const OTP_API_URL = "http://localhost:3000/otpemail";
  const DELETE_USER_API_URL = "http://localhost:3000/users";
  const SAVE_OTP_API_URL = "http://localhost:3000/otp";

  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [otpSent, setOtpSent] = useState("");
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [load, setload] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      mobile: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Fullname is required"),
      mobile: Yup.string()
        .matches(/^[0-9]+$/, "Mobile number is not valid")
        .min(10, "Mobile number must be at least 10 characters")
        .required("Mobile number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      setLoading(true);
      try {
        const registerResponse = await fetch(REGISTER_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!registerResponse.ok) {
          const errorData = await registerResponse.json();
          throw new Error(errorData.error);
        }

        const registeredUser = await registerResponse.json();
        console.log("User registered:", registeredUser);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const otpResponse = await fetch(OTP_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email, otp }),
        });

        if (!otpResponse.ok) {
          await fetch(`${DELETE_USER_API_URL}/${registeredUser.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const otpErrorData = await otpResponse.json();
          throw new Error(
            otpErrorData.message || "OTP sending failed and user deleted"
          );
        }

        const otpData = {
          user_id: registeredUser.id,
          email: values.email,
          otp_number: otp,
          phone_number: values.mobile,
        };

        const saveOtpResponse = await fetch(SAVE_OTP_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(otpData),
        });

        if (!saveOtpResponse.ok) {
          await fetch(`${DELETE_USER_API_URL}/${registeredUser.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const saveOtpErrorData = await saveOtpResponse.json();
          throw new Error(
            saveOtpErrorData.message || "Saving OTP failed and user deleted"
          );
        }

        setUserId(registeredUser.id);
        setOtpSent(otp);
        setOpenOtpModal(true);
        setSnackbarMessage("OTP sent to your email. Please check your inbox.");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        resetForm();
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

  const otpFormik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .length(6, "OTP must be 6 characters")
        .required("OTP is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setLoading(true);
      try {
        const otpResponse = await fetch(`${SAVE_OTP_API_URL}/${values.otp}`, {
          method: "GET",
        });

        if (!otpResponse.ok) {
          const errorData = await otpResponse.json();
          throw new Error(errorData.message || "OTP verification failed");
        }

        console.log("OTP verified successfully");
        setOpenOtpModal(false);
        otpFormik.resetForm();

        const otppost = await fetch(`${SAVE_OTP_API_URL}/${values.otp}`, {
          method: "POST",
        }).then(()=>{
          navigate("/login");
        });

        if (!otppost.ok) {
          throw new Error("OTP post-verification failed");
        }

       
      } catch (error) {
        console.error("Error:", error);
        setOtpError("OTP verification failed, please try again");
        setErrors({ api: error.message });
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
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <img src={Logo} alt="Logo" style={{ marginBottom: 20, width: 100, height: 100 }} /> */}
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="fullname"
            label="Full Name"
            name="fullname"
            autoComplete="fullname"
            autoFocus
            value={formik.values.fullname}
            onChange={formik.handleChange}
            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
            helperText={formik.touched.fullname && formik.errors.fullname}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="mobile"
            label="Mobile Number"
            name="mobile"
            autoComplete="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
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
            </Box>
            <Checkbox
              defaultChecked
              onChange={() => {
                setload(!load);
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography>Allready have an account?</Typography>{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Typography color="primary" sx={{ ml: 1, cursor: "pointer" }}>
                Login
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
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </form>
      </Box>
      {load && (
        <Typography sx={{ color: "red" }}>
          Please accept Terms and Policy
        </Typography>
      )}

      <Modal
        open={openOtpModal}
        onClose={() => setOpenOtpModal(false)}
        aria-labelledby="otp-modal-title"
        aria-describedby="otp-modal-description"
        BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.85)" } }}
        disableBackdropClick
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "80%", sm: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="otp-modal-title" variant="h6" component="h2">
            Enter OTP
          </Typography>
          <Typography id="otp-modal-description" sx={{ mb: 2 }}>
            An OTP has been sent to your email. Please enter it below.
          </Typography>
          <form onSubmit={otpFormik.handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="otp"
              label="OTP"
              name="otp"
              autoComplete="otp"
              value={otpFormik.values.otp}
              onChange={otpFormik.handleChange}
              error={otpFormik.touched.otp && Boolean(otpFormik.errors.otp)}
              helperText={otpFormik.touched.otp && otpFormik.errors.otp}
            />
            {otpError && (
              <Typography color="error" variant="body2">
                {otpError}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={otpFormik.isSubmitting || loading}
            >
              {loading ? <CircularProgress size={24} /> : "Verify OTP"}
            </Button>
          </form>
        </Box>
      </Modal>

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

export default Register;
