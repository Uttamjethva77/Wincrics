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
        const response = await fetch("https://wincrics.com:8443/videos");
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

  const getAutoplayLink = (link) => {
    let autoplayLink = link;
    if (link.includes("youtube.com/watch")) {
      const videoId = new URL(link).searchParams.get("v");
      autoplayLink = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (link.includes("youtube.com/embed")) {
      autoplayLink = `${link}?autoplay=1`;
    }
    return autoplayLink;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4} sx={{ mt: 10 }}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.link}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box
                component="iframe"
                height="240"
                src={getAutoplayLink(video.link)}
                title={video.title}
                allow="autoplay; encrypted-media"
                allowFullScreen
                sx={{ }}
              />
             <Typography sx={{py:1}}>{video.title}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Videos;
