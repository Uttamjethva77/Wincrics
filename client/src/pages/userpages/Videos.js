import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:3000/videos");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setVideos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4} sx={{ mt: 15 }}>
        {videos.map((video) => {
          // Modify the video link to include autoplay if necessary
          const autoplayLink = video.link.includes("youtube")
            ? `${video.link}?autoplay=1`
            : video.link;

          return (
            <Grid item xs={12} sm={6} md={4} key={video.link}>
              <Card>
                <Box
                  component="iframe"
                  height="240"
                  src={autoplayLink}
                  title={video.title}
                  allow="autoplay; encrypted-media"
                  frameBorder="0"
                  allowFullScreen
                ></Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {video.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Videos;
