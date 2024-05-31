import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Avatar, CssBaseline, Grid, Link, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';

const theme = createTheme();

const API_URL = "https://wincrics.com:8443/adminlogin";

function Login() {

  const [tok, settok] = useState("");


  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate()

  
  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    settok(token);
    if (token) {
      navigate("/admin/videos");
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrMobile, password }), // Ensure body is JSON string
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('admintoken', data.token);
        // Redirect to another page or update the UI as needed
        navigate('/admin/videos')
        console.log('Login successful');
      } else {
        setError(data.message || 'Invalid response from server');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="emailOrMobile"
                label="Email or Mobile"
                name="emailOrMobile"
                autoComplete="emailOrMobile"
                autoFocus
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
