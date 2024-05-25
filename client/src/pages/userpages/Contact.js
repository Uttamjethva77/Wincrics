import React from 'react';
import { Container, TextField, Button, Grid, Typography, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Contact = () => {
  const initialValues = {
    full_name: '',
    email: '',
    phone_number: '',
    message: ''
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone_number: Yup.string(),
    message: Yup.string().required('Message is required')
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Message submitted successfully!');
      resetForm();
    } catch (error) {
      console.error('Error submitting message:', error);
      alert('Failed to submit message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom color="primary">
        Contact us
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box p={2} boxShadow={2} bgcolor="background.paper" borderRadius={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        label="Full Name"
                        name="full_name"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        label="Phone Number"
                        name="phone_number"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        multiline
                        rows={4}
                        label="Message"
                        name="message"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Contact;
