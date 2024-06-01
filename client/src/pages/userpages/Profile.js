import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, Avatar, Button, CircularProgress } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [otpEntry, setOtpEntry] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storedUserData = JSON.parse(localStorage.getItem('userdata'));

      if (storedUserData) {
        try {
          const userLoginResponse = await fetch('https://wincrics.com:8443/userlogin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              emailOrMobile: storedUserData.user.email,
              password: storedUserData.user.password,
            }),
          });

          const userLoginData = await userLoginResponse.json();

          if (userLoginResponse.ok) {
            setUserData(userLoginData);
          } else {
            setError('Login failed. Please check your credentials.');
          }

          const forgotPasswordResponse = await fetch('https://wincrics.com:8443/forgotpassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: storedUserData.user.email,
            }),
          });

          const forgotPasswordData = await forgotPasswordResponse.json();

          if (forgotPasswordResponse.ok) {
            setOtpEntry(forgotPasswordData.otpEntry);
            setOtpVerified(forgotPasswordData.otpEntry.otp_number === 'verify');
          } else {
            setError('Failed to fetch forgot password data. Please try again.');
          }

          setLoading(false);
        } catch (error) {
          setError('An error occurred while fetching data.');
        }
      } else {
        setError('No user data found in local storage.');
      }
    };

    fetchData();
  }, []);

  const handleVerifyOTP = async () => {
    try {
      // Send request to verify OTP
      // For demonstration purposes, I'm just setting otpVerified to true
      setOtpVerified(true);
    } catch (error) {
      setError('An error occurred while verifying OTP.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box mt={5} textAlign="center">
          <CircularProgress />
          <Typography variant="body1" mt={2}>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  if (!userData || !otpEntry) {
    return (
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                <AccountCircleIcon fontSize="large" />
              </Avatar>
              <Box ml={2}>
                <Typography variant="h5">{userData.user.fullname}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <EmailIcon color="action" />
              <Box ml={2}>
                <Typography variant="body1">{userData.user.email}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <PhoneIcon color="action" />
              <Box ml={2}>
                <Typography variant="body1">{userData.user.mobile}</Typography>
              </Box>
            </Box>
            {otpVerified ? (
              <Typography variant="body2" sx={{ color: 'green' }}>Email verified</Typography>
            ) : (
              <Box mt={2}>
                <Typography variant="body2" sx={{ color: 'red' }}>Email not verified</Typography>
                {/* {!otpVerified && otpEntry && otpEntry.otp_number !== 'verify' && (
                  <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={handleVerifyOTP}>Verify Email</Button>
                  </Box>
                )} */}
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Profile;
