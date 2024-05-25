import React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useLocation } from 'react-router-dom';

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
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: '8px' }}>
              <Box component="li">
                <Link
                  href="/about"
                  variant="subtitle1"
                  color={isActive('/about') ? 'primary' : 'textSecondary'}
                  sx={isActive('/about') ? { fontWeight: 'bold' } : {}}
                >
                  About Us
                </Link>
              </Box>
              <Box component="li">
                <Link
                  href="/contact"
                  variant="subtitle1"
                  color={isActive('/contact') ? 'primary' : 'textSecondary'}
                  sx={isActive('/contact') ? { fontWeight: 'bold' } : {}}
                >
                  Contact Us
                </Link>
              </Box>
              <Box component="li">
                <Link
                  href="/terms"
                  variant="subtitle1"
                  color={isActive('/terms') ? 'primary' : 'textSecondary'}
                  sx={isActive('/terms') ? { fontWeight: 'bold' } : {}}
                >
                  Terms & Conditions
                </Link>
              </Box>
              <Box component="li">
                <Link
                  href="/policy"
                  variant="subtitle1"
                  color={isActive('/policy') ? 'primary' : 'textSecondary'}
                  sx={isActive('/policy') ? { fontWeight: 'bold' } : {}}
                >
                  Privacy Policy
                </Link>
              </Box>
              <Box component="li">
                <Link
                  href="/billing"
                  variant="subtitle1"
                  color={isActive('/billing') ? 'primary' : 'textSecondary'}
                  sx={isActive('/billing') ? { fontWeight: 'bold' } : {}}
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
                <IconButton href="#" color="inherit">
                  <FacebookIcon />
                </IconButton>
                <IconButton href="#" color="inherit">
                  <InstagramIcon />
                </IconButton>
                <IconButton href="#" color="inherit">
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
