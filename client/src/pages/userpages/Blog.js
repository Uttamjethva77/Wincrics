import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Paper, Grid, Avatar, CircularProgress } from '@mui/material';

const Blog = () => {
  const navigate = useNavigate();
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://wincrics.com:8443/blogdata');
        const data = await response.json();
        setBlogsData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/blogdata/${id}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: '2rem', backgroundColor: '#e0f7fa' }}>
      {blogsData.map((data) => (
        <Paper
          key={data.id}
          onClick={() => handleCardClick(data.id)}
          sx={{ marginBottom: '3rem', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0px 3px 10px rgba(0,0,0,0.1)', cursor: 'pointer' }}
        >
          <Box sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Typography variant="h4" gutterBottom style={{ color: '#00796b' }}>{data.title}</Typography>
            <Typography variant="body1" paragraph style={{ color: '#004d40' }}>{data.description}</Typography>
            <Grid container spacing={3}>
              {data.images && data.images.slice(0, 1).map((image, idx) => (
                <Grid item xs={12} key={idx}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={image}
                      alt={`Blog Image ${idx + 1}`}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '16px',
                        border: '4px solid #00796b',
                        marginBottom: '1rem',
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default Blog;
