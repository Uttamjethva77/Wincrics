import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  CircularProgress,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";

const Blog = () => {
  const navigate = useNavigate();
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/blogdata");
        const data = await response.json();
        setBlogsData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/blogdata/${id}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: { xs: "1rem", sm: "2rem", md: "3rem" }, backgroundColor: "#DEDFE7" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#004d40", textAlign: "center", marginBottom: "2rem" }}>
        Blog Previews
      </Typography>
      <Grid container spacing={3}>
        {blogsData.map((data) => (
          <Grid item xs={12} md={6} lg={4} key={data.id}>
            <Paper
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCardClick(data.id)}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                boxShadow: "10px 10px 20px rgba(0,0,0,0.1)", // Changed shadow to diagonal
                cursor: "pointer",
                overflow: 'hidden',
                marginBottom: '2rem',
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: "0px 0px 30px rgba(0,0,0,0.3)", // Shine effect on hover
                },
                '@media (max-width: 600px)': {
                  '&:hover': {
                    boxShadow: "10px 10px 20px rgba(0,0,0,0.1)", // Reset shine effect on mobile
                  },
                },
              }}
            >
              <Box
                sx={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: "#004d40", textAlign: "center", fontWeight: "bold" }}
                >
                  {data.title}
                </Typography>
                <Box sx={{ textAlign: "center" }}>
                  {data.blogimage && (
                    <Avatar
                      src={data.blogimage}
                      alt={`Blog Image ${data.id}`}
                      variant="rounded"
                      sx={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "16px",
                        border: "3px solid transparent", // Removed solid color border
                        animation: "border-color-animation 5s infinite linear", // Added border color animation
                        marginBottom: "1rem",
                        '@keyframes border-color-animation': {
                          '0%': { borderColor: 'rgb(255, 0, 0)' }, // Red
                          '10%': { borderColor: 'rgb(255, 165, 0)' }, // Orange
                          '20%': { borderColor: 'rgb(255, 255, 0)' }, // Yellow
                          '30%': { borderColor: 'rgb(0, 128, 0)' }, // Green
                          '40%': { borderColor: 'rgb(0, 0, 255)' }, // Blue
                          '50%': { borderColor: 'rgb(75, 0, 130)' }, // Indigo
                          '60%': { borderColor: 'rgb(128, 0, 128)' }, // Violet
                          '70%': { borderColor: 'rgb(255, 69, 0)' }, // Red-Orange
                          '80%': { borderColor: 'rgb(0, 191, 255)' }, // Sky Blue
                          '90%': { borderColor: 'rgb(218, 112, 214)' }, // Orchid
                          '100%': { borderColor: 'rgb(255, 0, 0)' }, // Red
                        },
                      }}
                    />
                  )}
                </Box>
                <Typography variant="body2" sx={{ color: "#004d40", textAlign: "center" }}>
                  {data.description.substring(0, 100)}...
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ 
                    mt: 2, 
                    backgroundColor: "#004d40", 
                    color: "#ffffff",
                    '&:hover': {
                      backgroundColor: "#00332e"
                    }
                  }}
                  onClick={() => handleCardClick(data.id)}
                >
                  Read More
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Blog;
