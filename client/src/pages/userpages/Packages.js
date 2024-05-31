import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';

import CheckIcon from '@mui/icons-material/Check'; // Import the CheckIcon from Material-UI icons
import RupeeIcon from '@mui/icons-material/AttachMoney'; // Import the RupeeIcon from Material-UI icons

const Userpackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/packagess')
      .then(response => response.json())
      .then(data => setPackages(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Membership Packages
      </Typography>
      <Grid container spacing={4}>
        {packages.map((pkg) => (
          <Grid item key={pkg.id} xs={12} sm={6}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                backgroundColor: '#f5f5f5', 
                border: '1px solid #5f5f5f',
                boxShadow: 10,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 10,
                }
              }}
            >
              <CardContent>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom 
                  color="#000000"
                  sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
                >
                  {pkg.title}
                </Typography>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#000000' }}
                >
                  ₹{pkg.price}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ mb: 2, fontWeight: 'bold', color: '#000000' }}
                >
                  Duration: {pkg.time}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography 
                    variant="body1" 
                    component="div" 
                    gutterBottom
                    sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#000000' }}
                  >
                    Benefits:
                  </Typography>
                  <List dense>
                    {pkg.benefit.map((benefit, index) => (
                      <ListItem 
                        key={index} 
                        sx={{ 
                          backgroundColor: '#f5f5f5',
                          borderRadius: 1, 
                          mb: 1, 
                          boxShadow: '3px 2px 5px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <CheckIcon sx={{ color: '#000000', marginRight: '8px' }} /> {/* Check icon */}
                        <ListItemText primary={benefit} sx={{ fontWeight: 'bold', color: '#000000' }} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Button 
                  variant="contained" 
                  sx={{ 
                    mt: 2, 
                    fontWeight: 'bold', 
                    backgroundColor: '#000000', 
                    color: '#FFFFFF',
                    '&:hover': {
                      backgroundColor: '#000000',
                      filter: 'brightness(0.9)',
                    } 
                  }}
                >
                  Purchase
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Userpackages;
