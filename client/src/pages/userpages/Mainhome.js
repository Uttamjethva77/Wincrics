import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import Userpackages from "./Packages";
import Blog from "./Blog";
import Videos from "./Videos";
import Winningsuser from "./Winnings";
import SubscribeModal from "../../components/SubscribeModal";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Mainhome = () => {
  return (
    <Box>
      <SubscribeModal></SubscribeModal>
      <Blog limit={3}></Blog>
      <Userpackages limit={2}></Userpackages>
      <Box
        sx={{
          display: "flex",
          justifyContent: {xs:"space-between",sm:"space-between",md:"space-around"},
          alignItems: "center",
          bgcolor: "#EDEEF2", // Background color for the box
          padding: "10px",
          // Padding for the box
          pb: 3,
          pt: 3,
          flexDirection:{xs:"column",sm:"column",md:"row"}
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            py:1
          }}
        >
          <IconButton
            href="https://wa.me/message/7OQSR6TSZX6KD1"
            sx={{
              bgcolor: "green", // Background color for WhatsApp icon
              borderRadius: "50px", // Border radius to create capsule shape
              color: "#fff", // Icon color
              mr: 2,
            }}
            aria-label="WhatsApp"
          >
            <WhatsAppIcon />
          </IconButton>
          <Typography variant="body1" color={"red"} sx={{ cursor: "pointer" }}>
            <Link to={"https://wa.me/message/7OQSR6TSZX6KD1"}>
              Need Prime ? Click to chat Now
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            py:1
          }}
        >
          <IconButton
            href="https://t.me/wincrics"
            sx={{
              bgcolor: "#1976d2", // Background color for Telegram icon
              borderRadius: "50px", // Border radius to create capsule shape
              color: "#fff", // Icon color
              mr:2
            }}
            aria-label="Telegram"
          >
            <TelegramIcon />
          </IconButton>
          <Typography variant="body1" color={"red"} sx={{ cursor: "pointer" }}>
            <Link to={"https://t.me/wincrics"}>
              Need Latest News ? Join NOw{" "}
            </Link>
          </Typography>
        </Box>
      </Box>
      <Videos limit={3}></Videos>
      <Winningsuser limit={5}></Winningsuser>
      <Box sx={{px:2}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
         DREAM11 PRIME MEMBERSHIP | Rules and Tips to follow:
        </AccordionSummary>
        <AccordionDetails>
        If you have Investment and Backup then only join our prime services.
Join only the contest after we provide the teams.
We will provide 6 Grand League teams.
Players must join all teams in mega contests.
The final team will come in Prime teams section before 10-20 minutes of the match deadline or after the lineup is announced.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          How to avoid losses in Dream11? DREAM11 PRIME MEMBERSHIP
        </AccordionSummary>
        <AccordionDetails>
        Always join contests which we will guide you after you join our membership plan.
Never join any contest in advance unless we ask you to join.
Don’t invest your full money in one contest itself.
Play a minimum of 5 to 6 contests in small league contests.
Divide your budget for small league and grand league in equal amounts always.
Don’t play high amount contests after getting profits from one match. Invest equally in all matches.
Always keep a backup budget with you to recover your losses if any.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          What is the secret to win Dream11?
        </AccordionSummary>
        <AccordionDetails>
        One effective strategy to earn money from Dream11 is to play small leagues instead of grand leagues. You will face less opposition and have a better chance of winning by playing in smaller leagues. Select players with a higher chance of scoring points and a history of consistency.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Is it possible to win GL in Dream11?
        </AccordionSummary>
        <AccordionDetails>
        It is indeed not easy to win a grand league in Dream11, as you are competing against numerous other skilled players, and you need to have a deep understanding of the sport, the teams, and the players to make informed decisions.
        </AccordionDetails>
      </Accordion>
      </Box>
    </Box>
  );
};

export default Mainhome;
