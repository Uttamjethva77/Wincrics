import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Modal,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const OTP_API_URL = "http://194.238.18.76:3000/otpemail";
  const UPDATE_PASSWORD_API_URL = "http://194.238.18.76:3000/updatepassword";

  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [generatedOTP, setGeneratedOTP] = useState(""); // State variable to store generated OTP
  const [userEmail, setUserEmail] = useState(""); // State variable to store user's email
  const [passwordUpdated, setPasswordUpdated] = useState(false); // State variable to track if password is updated
  const navigate = useNavigate();

  // Function to generate a random 6-digit OTP
  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number
    return otp.toString(); // Convert the number to a string
  };

  const formik = useFormik({
    initialValues: {
      emailOrMobile: "",
    },
    validationSchema: Yup.object({
      emailOrMobile: Yup.string().required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setLoading(true);
      try {
        const otp = generateOTP(); // Generate OTP
        setGeneratedOTP(otp); // Store generated OTP in state variable
        setUserEmail(values.emailOrMobile); // Store user's email
        // Call the API to send OTP to the user's email or mobile along with email and OTP
        const otpResponse = await fetch(OTP_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.emailOrMobile, otp }), // Sending email and generated OTP in the request body
        });

        if (!otpResponse.ok) {
          const errorData = await otpResponse.json();
          throw new Error(errorData.message || "OTP sending failed");
        }

        setOpenOtpModal(true);
        setSnackbarMessage("OTP sent to your email. Please check your inbox.");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
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
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .length(6, "OTP must be 6 characters")
        .required("OTP is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setLoading(true);
      try {
        if (values.otp !== generatedOTP) { // Compare entered OTP with generated OTP
          throw new Error("Incorrect OTP"); // Throw error if OTPs don't match
        }
        // Call the API to update the password
        const updatePasswordResponse = await fetch(UPDATE_PASSWORD_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail, // Include user's email
            newPassword: values.newPassword
          }),
        });

        if (!updatePasswordResponse.ok) {
          const errorData = await updatePasswordResponse.json();
          throw new Error(errorData.message || "Password update failed");
        }

        // Set passwordUpdated state to true
        setPasswordUpdated(true);
        // Show success message
        setSnackbarMessage("Password updated successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        // Password updated successfully, redirect to login page
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect after 2 seconds

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
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Forgot Password
        </Typography>
        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="emailOrMobile"
            label="Email"
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
          {formik.errors.api && (
            <Typography color="error" variant="body2">
              {formik.errors.api}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting}
          >
            {loading ? <CircularProgress size={24} /> : "Send OTP"}
          </Button>
        </form>
      </Box>

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
            {/* OTP entry form */}
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
            {/* New password entry */}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="newPassword"
              label="New Password"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              value={otpFormik.values.newPassword}
              onChange={otpFormik.handleChange}
              error={otpFormik.touched.newPassword && Boolean(otpFormik.errors.newPassword)}
              helperText={otpFormik.touched.newPassword && otpFormik.errors.newPassword}
            />
            {/* Confirm password entry */}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              autoComplete="confirm-password"
              value={otpFormik.values.confirmPassword}
              onChange={otpFormik.handleChange}
              error={otpFormik.touched.confirmPassword && Boolean(otpFormik.errors.confirmPassword)}
              helperText={otpFormik.touched.confirmPassword && otpFormik.errors.confirmPassword}
            />
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
      {/* Snackbar for password updated successfully */}
      <Snackbar
        open={passwordUpdated}
        autoHideDuration={2000}
        onClose={() => setPasswordUpdated(false)}
      >
        <Alert
          onClose={() => setPasswordUpdated(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Password updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ForgotPassword;
