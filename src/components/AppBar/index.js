import React, { useState } from "react";
import style from "./style.css";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>    
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MeetingApp
          </Typography>
          <IconButton size="large" aria-label="searchButton" color="inherit" id="searchButton" to={'/Search'} component={Link}>
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit"  to={'/'} component={Link}>
            <HomeIcon></HomeIcon>
          </IconButton>
          <IconButton color="inherit" size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true" to={'/Login'} component={Link}>
          <AccountCircle />
          </IconButton>
          <IconButton color="inherit" to={'/CreateMeeting'} component={Link}>
            <AddCircleIcon></AddCircleIcon>
          </IconButton>
          <IconButton color="inherit" to={'/Notification'} component={Link}>
            <NotificationsIcon></NotificationsIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavBar;
