import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupIcon from '@mui/icons-material/Group';
import CollectionsIcon from '@mui/icons-material/Collections';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const sidebarItems = [
  { text: 'analyitics', icon: <InfoIcon sx={{ fontSize: "30px" }} />, path: '/admin/analytics' },
  { text: 'Video', icon: <VideoLibraryIcon sx={{ fontSize: "30px" }} />, path: '/admin/videos' },
  { text: 'Packages', icon: <HomeIcon sx={{ fontSize: "30px" }} />, path: '/admin/packages' },
  { text: 'Blogs', icon: <SportsCricketIcon sx={{ fontSize: "30px" }} />, path: '/admin/blogs' },
  { text: 'Payment', icon: <AttachMoneyIcon sx={{ fontSize: "30px" }} />, path: '/admin/payment' },
  { text: 'Users', icon: <GroupIcon sx={{ fontSize: "30px" }} />, path: '/admin/users' },
  { text: 'AdminUsers', icon: <AdminPanelSettingsIcon sx={{ fontSize: "30px" }} />, path: '/admin/adminusers' },
  { text: 'Winnings', icon: <CollectionsIcon sx={{ fontSize: "30px" }} />, path: '/admin/winnings' },
  { text: 'Contactus', icon: <ContactPageIcon sx={{ fontSize: "30px" }} />, path: '/admin/contactus' },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();  // Get the current path
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    localStorage.removeItem('admintoken');
    navigate('/admin/login');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 240 : 60,
          boxSizing: 'border-box',
          overflowX: 'hidden',
        },
      }}
    >
      <List>
        <ListItem button onClick={handleDrawerToggle}>
          <ListItemIcon>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </ListItemIcon>
          {open ? <ListItemText primary="Collapse" /> : null}
        </ListItem>

        {sidebarItems.map((item, index) => (
          <Tooltip title={item.text} placement="right" key={index}>
            <ListItem 
              button 
              component={Link} 
              to={item.path} 
              sx={{
                backgroundColor: location.pathname === item.path ? '#03fcb6 !important' : '',
                transition: 'background-color 0.3s ease',

              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open ? <ListItemText primary={item.text} /> : null}
            </ListItem>
          </Tooltip>
        ))}
        <Tooltip title="Logout" placement="right">
          <ListItem 
            button 
            onClick={handleLogout}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            {open ? <ListItemText primary="Logout" /> : null}
          </ListItem>
        </Tooltip>
      </List>
    </Drawer>
  );
};

export default Sidebar;
