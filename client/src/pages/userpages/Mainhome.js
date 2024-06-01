import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import Userpackages from "./Packages";
import Blog from "./Blog";
import Videos from "./Videos";
import Winningsuser from "./Winnings";
import SubscribeModal from "../../components/SubscribeModal";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const Mainhome = () => {
  return (
    <Box>
      <SubscribeModal></SubscribeModal>
      <Userpackages limit={2}></Userpackages>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        bgcolor: '#f2f2f2', // Background color for the box
        padding: '10px',
        // Padding for the box
        pb:3,
        pt:0,
        backgroundColor:""
      }}
    >
      <IconButton
        sx={{
          bgcolor: "green", // Background color for WhatsApp icon
          borderRadius: '50px', // Border radius to create capsule shape
          color: '#fff', // Icon color
        }}
        aria-label="WhatsApp"
      >
        <WhatsAppIcon />
      </IconButton>
      <Typography variant="body1" color={"red"}>WhatsApp</Typography>
      <IconButton
        sx={{
          bgcolor: "green", // Background color for Telegram icon
          borderRadius: '50px', // Border radius to create capsule shape
          color: '#fff', // Icon color
        }}
        aria-label="Telegram"
      >
        <TelegramIcon />
      </IconButton>
      <Typography variant="body1" color={"red"}>Telegram</Typography>
    </Box>
      <Blog></Blog>
      <Videos limit={5}></Videos>
      <Winningsuser></Winningsuser>
      <Box sx={{px:2}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Accordion 1
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      </Box>
    </Box>
  );
};

export default Mainhome;
