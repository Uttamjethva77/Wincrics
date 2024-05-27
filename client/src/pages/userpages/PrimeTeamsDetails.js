import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Box, Paper } from '@mui/material';

const PrimeTeamDetails = () => {
  const { id } = useParams(); // Extract the ID from the route parameters
  const [blogDetails, setBlogDetails] = useState(null); // State to store the blog details

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/blogs/${id}`); // Make API call to get blog details
        const data = await response.json();
        setBlogDetails(data); // Store the blog details in state
      } catch (error) {
        console.error('Error fetching blog details:', error);
        // Handle error, e.g., show error message
      }
    };

    fetchBlogDetails();
  }, [id]);

  return (
    <Container style={{ marginTop: '50px' }}>
      {blogDetails ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">{blogDetails.title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{blogDetails.content}</Typography>
          </Grid>
          {/* Render images based on the number of images available */}
          {blogDetails.images && blogDetails.images.length > 0 && blogDetails.images.some(image => image.trim() !== '') ? (
            <Grid item xs={12}>
              <Box display="flex" flexDirection="column" alignItems="center" marginBottom={2}>
                <Typography variant="h5" gutterBottom>Head 2 Head</Typography>
                <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: '10px', borderRadius: '10px', marginBottom: '10px' }}>
                  <img src={blogDetails.images[0]} alt="First Head Team" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
                </Paper>
                </Grid>
                <Typography variant="h5" gutterBottom>Small League Teams</Typography>
                <Grid container spacing={2} justifyContent="center">
                  {blogDetails.images.slice(1, 4).map((image, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      {image.trim() !== '' && (
                        <Paper elevation={3} style={{ padding: '10px', borderRadius: '10px' }}>
                          <img src={image} alt={`Small League Team ${index + 1}`} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
                        </Paper>
                      )}
                    </Grid>
                  ))}
                </Grid>
                <Typography variant="h5" gutterBottom>Grand League Teams</Typography>
                <Grid container spacing={2} justifyContent="center">
                  {blogDetails.images.slice(4).map((image, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      {image.trim() !== '' && (
                        <Paper elevation={3} style={{ padding: '10px', borderRadius: '10px' }}>
                          <img src={image} alt={`Grand League Team ${index + 1}`} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
                        </Paper>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6">Teams Will be Updated before 15-30 Minutes of Match Stay tune!</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h6">Loading...</Typography>
        </Box>
      )}
    </Container>
  );
}

export default PrimeTeamDetails;
