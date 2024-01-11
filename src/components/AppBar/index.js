import React, { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isLogged, setisLogged] = useState(
    localStorage.getItem("authenticated") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setisLogged(localStorage.getItem("authenticated") === "true");
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("loggedUser");
    setisLogged(false);
    navigate("/Login");
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
            to="/Search"
            component={Link}
          >
            <SearchIcon />  
          </IconButton>
          <IconButton color="inherit" to={"/"} component={Link}>
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" to={"/CreateMeeting"} component={Link}>
            <AddCircleIcon />
          </IconButton>
          <IconButton color="inherit" to={"/Notification"} component={Link}>
            <NotificationsIcon />
          </IconButton>
          {localStorage.getItem("authenticated") ? (
            <IconButton color="inherit" onClick={logout}>
              <LogoutIcon />
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
