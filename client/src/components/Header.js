import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SportsCricketIcon from '@mui/icons-material/SportsCricket';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();
  const [data, setdata] = useState();

  const [logout,setlogout] = useState()

  const menuItems = [
    //   { text: "Home", icon: <HomeIcon />, route: "/home" },
    { text: "Packages", icon: <PriceCheckIcon />, route: "/packages" },
    { text: "Prime Teams", icon: <SportsCricketIcon />, route: "/prime-teams" },
    { text: "Blogs", icon: <ArticleIcon />, route: "/blog" },
    { text: "Videos", icon: <AccountCircleIcon />, route: "/videos" },
    { text: "Winnings", icon: <SettingsIcon />, route: "/winnings" },
    // { text: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
  ];

  useEffect(() => {
    const userdata = localStorage.getItem("userdata");
    // console.log(JSON.parse(userdata));
    setdata(JSON.parse(userdata));
  }, [logout]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleMenuClick = (route) => {
    navigate(route);
    setDrawerOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(true);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawerList = (
    <Box
      sx={{ width: 250, backgroundColor: "lightgray", height: "100%" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleMenuClick(item.route)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              WINCRICS
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              WINCRICS
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={() => handleMenuClick(item.route)}
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Tooltip title="Open settings">
                {data ? (
                  <IconButton
                    onClick={handleMenu}
                    sx={{ p: 1, backgroundColor: "white" }}
                  >
                    <PersonIcon />
                  </IconButton>
                ) : (
                  <Box
                    onClick={() => {
                      navigate("/login");
                    }}
                    sx={{
                      cursor: "pointer",
                      p: 1,
                      
                    }}
                  >
                    Login
                  </Box>
                )}
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                keepMounted
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>{navigate("/profile"); setAnchorEl(null);}}>Profile</MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.clear("userdata");
                    navigate("/");
                    setAnchorEl(null);
                    setlogout(null)
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </div>
  );
};

export default Header;
