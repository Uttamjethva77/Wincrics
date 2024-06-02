// import React, { useEffect, useState } from 'react';
// import {
//   Typography,
//   Box,
//   Divider,
//   Grid,
//   Chip,
//   Avatar,
//   Paper,
//   Card,
//   CardContent,
//   CardHeader,
//   CircularProgress,
// } from '@mui/material';
// import { useParams } from 'react-router-dom';

// const BlogDetail = () => {
//   const { id } = useParams();
//   const [blogData, setBlogData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlogData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/blogdata/${id}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setBlogData(data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogData();
//   }, [id]);

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
//   }

//   if (error) {
//     return <Typography>Error: {error.message}</Typography>;
//   }

//   return (
//     <Box sx={{ padding: { xs: '0.5rem', sm: '1rem', md: '2rem' }, backgroundColor: '#e0f7fa' }}>
//       <Paper sx={{ marginBottom: '3rem', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0px 3px 10px rgba(0,0,0,0.1)' }}>
//         <Box sx={{ padding: { xs: '1rem', sm: '2rem' }, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
//           <Typography variant="h4" gutterBottom sx={{ color: '#00796b', textAlign: 'center' }}>
//             {blogData.title}
//           </Typography>
//           <Typography variant="subtitle2" color="textSecondary" gutterBottom sx={{ textAlign: 'center' }}>
//             {new Date(blogData.date).toLocaleDateString()} | {blogData.time} | {blogData.venue}
//           </Typography>
//           <Divider />
          
//           {blogData.blogimage && (
//             <Box sx={{ textAlign: 'center' }}>
//               <Avatar
//                 src={blogData.blogimage}
//                 alt={`Blog Image`}
//                 sx={{
//                   width: '100%',
//                   height: 'auto',
//                   borderRadius: '16px',
//                   border: '4px solid #00796b',
//                   marginBottom: '2rem',
//                 }}
//               />
//             </Box>
//           )}
//           <Typography variant="body1" paragraph sx={{ color: '#004d40', wordWrap: 'break-word' }}>
//             {blogData.description}
//           </Typography>
//           <Divider />
//           <Typography variant="h6" gutterBottom sx={{ color: '#00796b' }}>
//             Captains:
//           </Typography>
//           <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
//             {blogData.captain?.map((captain, index) => (
//               <Chip key={index} label={captain} color="primary" />
//             ))}
//           </Box>
//           <Divider />
//           <Typography variant="h6" gutterBottom sx={{ color: '#00796b' }}>
//             Vice Captains:
//           </Typography>
//           <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
//             {blogData.vice_captain?.map((vc, index) => (
//               <Chip key={index} label={vc} color="secondary" />
//             ))}
//           </Box>
//           <Divider />
//           {['Fantasy Team', 'Important Players', 'Playing 11 Team 1', 'Playing 11 Team 2', 'Squad Team 1', 'Squad Team 2'].map((title, idx) => {
//             const playerData = {
//               'Fantasy Team': blogData.fantasy_team,
//               'Important Players': blogData.imp_player,
//               'Playing 11 Team 1': blogData.playing_11_team1,
//               'Playing 11 Team 2': blogData.playing_11_team2,
//               'Squad Team 1': blogData.squad_team1,
//               'Squad Team 2': blogData.squad_team2,
//             }[title];
//             return (
//               <Card key={idx} sx={{ backgroundColor: '#e8f5e9', marginBottom: '2rem' }}>
//                 <CardHeader title={title} sx={{ backgroundColor: '#a5d6a7', color: '#004d40' }} />
//                 <CardContent>
//                   <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
//                     {playerData?.map((player, index) => (
//                       <Box key={index} sx={{ textAlign: 'center', margin: '0.5rem',flex:1 }}>
//                         <Avatar sx={{ bgcolor: '#00796b', margin: '0 auto', mb: 1 }}>{player.charAt(0)}</Avatar>
//                         <Typography variant="caption">{player}</Typography>
//                       </Box>
//                     ))}
//                   </Box>
//                 </CardContent>
//               </Card>
//             );
//           })}
//           <Divider />
//           <Typography variant="h6" gutterBottom sx={{ color: '#00796b' }}>
//             Tags:
//           </Typography>
//           <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
//             {blogData.tags?.map((tag, index) => (
//               <Chip key={index} label={tag} variant="outlined" />
//             ))}
//           </Box>
//           <Divider />
//           <Typography variant="body2" color="textSecondary" sx={{ color: '#00695c' }}>
//             {blogData.match_news}
//           </Typography>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default BlogDetail;
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Divider,
  Chip,
  Avatar,
  Paper,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box sx={{ padding: { xs: '1rem', sm: '2rem', md: '3rem' }, backgroundColor: '#DEDFE7' }}>
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ marginBottom: '3rem', backgroundColor: '#EDEEF2', borderRadius: '16px', boxShadow: '0px 4px 20px rgba(0,0,0,0.1)' }}
      >
        <Box sx={{ padding: { xs: '1rem', sm: '2rem' }, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#004d40', textAlign: 'left', fontWeight: 'bold' }}>
            {blogData.title}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom sx={{ textAlign: 'center', fontStyle: 'italic' }}>
            {new Date(blogData.date).toLocaleDateString()} | {blogData.time} | {blogData.venue}
          </Typography>
          <Divider />

          {blogData.blogimage && (
            <Box sx={{ textAlign: 'center' }}>
              <Avatar
                src={blogData.blogimage}
                alt="Blog Image"
                variant="rounded"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  border: '4px solid #004d40',
                  marginBottom: '2rem',
                }}
              />
            </Box>
          )}
          <Typography variant="body1" paragraph sx={{ color: '#004d40', wordWrap: 'break-word', lineHeight: 1.6 }}>
            {blogData.description}
          </Typography>
          <Divider />
          <Typography variant="h6" gutterBottom sx={{ color: '#004d40', fontWeight: 'bold' }}>
            Captains:
          </Typography>
          <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {blogData.captain?.map((captain, index) => (
              <Chip key={index} label={captain} color="primary" />
            ))}
          </Box>
          <Divider />
          <Typography variant="h6" gutterBottom sx={{ color: '#004d40', fontWeight: 'bold' }}>
            Vice Captains:
          </Typography>
          <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
              <Card
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                key={idx}
                sx={{
                  backgroundColor: idx % 2 === 0 ? '#e3f2fd' : '#fce4ec',
                  marginBottom: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0px 3px 10px rgba(0,0,0,0.1)',
                }}
              >
                <CardHeader title={title} sx={{ backgroundColor: idx % 2 === 0 ? '#1e88e5' : '#d81b60', color: '#ffffff', borderRadius: '16px 16px 0 0', padding: '1rem' }} />
                <CardContent>
                  <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {playerData?.map((player, index) => (
                      <Box key={index} sx={{ textAlign: 'center', margin: '0.5rem', flex: 1 }}>
                        <Avatar sx={{ bgcolor: '#004d40', margin: '0 auto', mb: 1, width: 56, height: 56 }}>{player.charAt(0)}</Avatar>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#004d40' }}>{player}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
          <Divider />
          <Typography variant="h6" gutterBottom sx={{ color: '#004d40', fontWeight: 'bold' }}>
            Tags:
          </Typography>
          <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {blogData.tags?.map((tag, index) => (
              <Chip key={index} label={tag} variant="outlined" sx={{ borderColor: '#004d40', color: '#004d40' }} />
            ))}
          </Box>
          <Divider />
          <Typography variant="body2" color="textSecondary" sx={{ color: '#00695c', lineHeight: 1.6 }}>
            {blogData.match_news}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default BlogDetail;
