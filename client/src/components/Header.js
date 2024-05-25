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
    Toolbar,
    Tooltip,
    Typography,
  } from "@mui/material";
  import MenuIcon from '@mui/icons-material/Menu';
  import HomeIcon from '@mui/icons-material/Home';
  import PriceCheckIcon from '@mui/icons-material/PriceCheck';
  import ArticleIcon from '@mui/icons-material/Article';
  import AccountCircleIcon from '@mui/icons-material/AccountCircle';
  import SettingsIcon from '@mui/icons-material/Settings';
  import DashboardIcon from '@mui/icons-material/Dashboard';
  import LogoutIcon from '@mui/icons-material/Logout';
  import React from "react";
  import { useNavigate } from "react-router-dom";
  
  const Header = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const navigate = useNavigate();
  
    const menuItems = [
    //   { text: "Home", icon: <HomeIcon />, route: "/home" },
      { text: "packages", icon: <PriceCheckIcon />, route: "/packages" },
      { text: "Blog", icon: <ArticleIcon />, route: "/blog" },
      { text: "videos", icon: <AccountCircleIcon />, route: "/videos" },
      { text: "Account", icon: <SettingsIcon />, route: "/account" },
      { text: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
      { text: "Logout", icon: <LogoutIcon />, route: "/logout" }
    ];
  
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
  
    const drawerList = (
      <Box
        sx={{ width: 250 ,backgroundColor:"lightgray",height:"100%"}}
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
  
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={toggleDrawer(true)} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {drawerList}
        </Drawer>
      </div>
    );
  };
  
  export default Header;
  