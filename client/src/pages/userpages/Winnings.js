import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, Typography } from '@mui/material';

const Winningsuser = () => {
  const [winnings, setWinnings] = useState([]);

  useEffect(() => {
    fetch('https://wincrics.com:8443/winnings')
      .then(response => response.json())
      .then(data => setWinnings(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Container sx={{ py: 8 ,backgroundColor:"#DEDFE7"}} maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Winnings
      </Typography>

      <Grid container spacing={4}>
        {winnings.map((winning) => (
          <Grid item key={winning.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{ pt: 1}} // 16:9 aspect ratio
                image={winning.images}
                alt={`Winning ${winning.id}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Winningsuser;
