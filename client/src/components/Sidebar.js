import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const sidebarItems = [

  { text: 'analyitics', icon: <InfoIcon sx={{fontSize:"30px"}}/>, path: '/admin/analyitics' },
  { text: 'Video', icon: <VideoLibraryIcon sx={{fontSize:"30px"}} />, path: '/admin' },
  { text: 'Packages', icon: <HomeIcon sx={{fontSize:"30px"}} />, path: '/admin/packages' },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
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
            <ListItem button component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open ? <ListItemText primary={item.text} /> : null}
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
