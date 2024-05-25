import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, sm: 3 },
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Box component="li">
                <Link
                  to="/about"
                  style={{
                    textDecoration: 'none',
                    color: isActive('/about') ? 'black' : 'gray',
                    fontWeight: isActive('/about') ? 'bold' : 'normal',
                  }}
                >
                  About Us
                </Link>
              </Box>
              <Box component="li">
                <Link
                  to="/contact"
                  style={{
                    textDecoration: 'none',
                    color: isActive('/contact') ? 'black' : 'gray',
                    fontWeight: isActive('/contact') ? 'bold' : 'normal',
                  }}
                >
                  Contact Us
                </Link>
              </Box>
              <Box component="li">
                <Link
                  to="/terms"
                  style={{
                    textDecoration: 'none',
                    color: isActive('/terms') ? 'black' : 'gray',
                    fontWeight: isActive('/terms') ? 'bold' : 'normal',
                  }}
                >
                  Terms & Conditions
                </Link>
              </Box>
              <Box component="li">
                <Link
                  to="/policy"
                  style={{
                    textDecoration: 'none',
                    color: isActive('/policy') ? 'black' : 'gray',
                    fontWeight: isActive('/policy') ? 'bold' : 'normal',
                  }}
                >
                  Privacy Policy
                </Link>
              </Box>
              <Box component="li">
                <Link
                  to="/billing"
                  style={{
                    textDecoration: 'none',
                    color: isActive('/billing') ? 'black' : 'gray',
                    fontWeight: isActive('/billing') ? 'bold' : 'normal',
                  }}
                >
                  Billing & Subscription
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, gap: '8px' }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <IconButton href="https://www.facebook.com" target="_blank" color="inherit">
                  <FacebookIcon />
                </IconButton>
                <IconButton href="https://www.instagram.com" target="_blank" color="inherit">
                  <InstagramIcon />
                </IconButton>
                <IconButton href="https://www.youtube.com" target="_blank" color="inherit">
                  <YouTubeIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
