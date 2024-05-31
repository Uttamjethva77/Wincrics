import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Divider,
  Grid,
  Chip,
  Avatar,
  Paper,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`https://wincrics.com:8443/blogdata/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box sx={{ padding: '2rem', backgroundColor: '#e0f7fa' }}>
      <Paper sx={{ marginBottom: '3rem', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0px 3px 10px rgba(0,0,0,0.1)' }}>
        <Box sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Typography variant="h2" gutterBottom style={{ color: '#00796b' }}>{blogData.title}</Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {blogData.date} | {blogData.time} | {blogData.venue}
          </Typography>
          <Divider />
          <Typography variant="body1" paragraph style={{ color: '#004d40',height:"auto",wordWrap:"break-word" }}>{blogData.description}</Typography>
          <Grid container spacing={3}>
            {blogData.images?.map((image, idx) => (
              <Grid item xs={12} md={6} lg={4} key={idx}>
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
          <Divider />
          <Typography variant="h6" gutterBottom style={{ color: '#00796b' }}>Captains:</Typography>
          <Box sx={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {blogData.captain?.map((captain, index) => (
              <Chip key={index} label={captain} color="primary" />
            ))}
          </Box>
          <Divider />
          <Typography variant="h6" gutterBottom style={{ color: '#00796b' }}>Vice Captains:</Typography>
          <Box sx={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {blogData.vice_captain?.map((vc, index) => (
              <Chip key={index} label={vc} color="secondary" />
            ))}
          </Box>
          <Divider />
          {['Fantasy Team', 'Important Players', 'Playing 11 Team 1', 'Playing 11 Team 2', 'Squad Team 1', 'Squad Team 2'].map((title, idx) => {
            const playerData = {
              'Fantasy Team': blogData.fantasy_team,
              'Important Players': blogData.imp_player,
              'Playing 11 Team 1': blogData.playing_11_team1,
              'Playing 11 Team 2': blogData.playing_11_team2,
              'Squad Team 1': blogData.squad_team1,
              'Squad Team 2': blogData.squad_team2,
            }[title];
            return (
              <Card key={idx} sx={{ backgroundColor: '#e8f5e9', marginBottom: '1rem' }}>
                <CardHeader title={title} sx={{ backgroundColor: '#a5d6a7', color: '#004d40' }} />
                <CardContent>
                  <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {playerData?.map((player, index) => (
                      <Box key={index} sx={{ textAlign: 'center' }}>
                        <Avatar sx={{ bgcolor: '#00796b', margin: '0 auto' }}>{player.charAt(0)}</Avatar>
                        <Typography variant="caption">{player}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
          <Divider />
          <Typography variant="h6" gutterBottom style={{ color: '#00796b' }}>Tags:</Typography>
          <Box sx={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {blogData.tags?.map((tag, index) => (
              <Chip key={index} label={tag} variant="outlined" />
            ))}
          </Box>
          <Divider />
          <Typography variant="body2" color="textSecondary" style={{ color: '#00695c' }}>{blogData.match_news}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default BlogDetail;
