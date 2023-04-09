import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import style from "./style.css";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const NavBar = () => {
  const [isLogged, setisLogged] = useState(
    localStorage.getItem("authenticated") === "true"
  );

  // listen for the changes in the local storage, if a user is authenticated set the isLogged to true, if not, to false - important for toggling the button in the NavBar (show login when the user is logged out and logout when the user is logged in)
  useEffect(() => {
    const handleStorageChange = () => {
      setisLogged(localStorage.getItem("authenticated") === "true");
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isLogged]);

  // function for logout button
  const logout = () => {
    localStorage.removeItem("authenticated");
    setisLogged(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MeetingApp
          </Typography>
          <IconButton
            size="large"
            aria-label="searchButton"
            color="inherit"
            id="searchButton"
            to={"/Search"}
            component={Link}
          >
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit" to={"/"} component={Link}>
            <HomeIcon></HomeIcon>
          </IconButton>
          <IconButton color="inherit" to={"/CreateMeeting"} component={Link}>
            <AddCircleIcon></AddCircleIcon>
          </IconButton>
          <IconButton color="inherit" to={"/Notification"} component={Link}>
            <NotificationsIcon></NotificationsIcon>
          </IconButton>
          {isLogged ? (
            <IconButton
              color="inherit"
              to={"/Login"}
              component={Link}
              onClick={logout}
            >
              <LogoutIcon></LogoutIcon>
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              to={"/Login"}
              component={Link}
            >
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavBar;
