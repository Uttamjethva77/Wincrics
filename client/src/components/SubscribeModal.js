import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

const SubscribeModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    whatsapp_number: '',
    name: '',
  });
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    setOpen(true); // Open the modal when the component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://wincrics.com:8443/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMessage('Subscribed successfully!');
        setSnackbarOpen(true);
        handleClose();
      } else {
   
        setMessage("Email or whatsapp number already exists");
        setSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="subscribe-modal-title"
        aria-describedby="subscribe-modal-description"
      >
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90vw',
            maxWidth: 400,
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            borderRadius: '8px',
            outline: 'none',
            animation: 'fadeInDown 0.5s',
          }}
        >
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography id="subscribe-modal-title" variant="h6" component="h2">
              Get Prime News Free
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            style={{ marginTop: '16px' }}
          />
          <TextField
            label="WhatsApp Number"
            name="whatsapp_number"
            value={formData.whatsapp_number}
            onChange={handleChange}
            fullWidth
            margin="normal"
            style={{ marginTop: '16px' }}
          />
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            style={{ marginTop: '16px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            style={{ marginTop: '24px', backgroundColor: '#000000', color: '#ffffff' }}
          >
            Subscribe
          </Button>
        </Box>
      </Modal>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SubscribeModal;
