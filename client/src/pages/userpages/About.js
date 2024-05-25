import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom color="primary">
        About Us
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Box p={2} boxShadow={2} bgcolor="background.paper" borderRadius={8}>
            <Typography variant="body1" paragraph>
              At Wincrics.com, we are passionate about cricket and strive to provide cricket enthusiasts with the best resources and tools for their cricketing needs.
            </Typography>
            <Typography variant="body1" paragraph>
              Our platform offers a wide range of services, including team formation for cricket matches, informative blogs, playing11 predictions, squad analysis, and much more.
            </Typography>
            <Typography variant="body1" paragraph>
              We understand the importance of accurate and reliable information in cricket, which is why we ensure that our content is up-to-date and thoroughly researched. However, users are encouraged to use the information provided on our website at their own risk.
            </Typography>
            <Typography variant="body1" paragraph>
              Whether you're a cricket player, fan, or enthusiast, Wincrics.com is your go-to destination for all things cricket-related. Join us in celebrating the sport we love and let's enjoy cricket together!
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
