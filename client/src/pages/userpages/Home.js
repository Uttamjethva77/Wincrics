import React from "react";
import { Box } from "@mui/material";

import { Outlet } from "react-router";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function ResponsiveAppBar() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflowY: "auto", // Enable vertical scrolling if needed
          pt: 5, // Add padding top for space below header
          pb: 5, // Add padding bottom for space above footer
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default ResponsiveAppBar;
