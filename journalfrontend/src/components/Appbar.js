import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

export default function Appbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  React.useEffect(() => {
    if (username) {
      setLoggedIn(true);
    }
  }, [username]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreate = () => {
    handleClose();
    navigate("/Create");
  };

  const handleHome = () => {
    handleClose();
    navigate("/");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("username"); // Remove user info from local storage if needed
    localStorage.removeItem("role");
    localStorage.removeItem("id"); // Remove user info from local storage if needed
    localStorage.removeItem("password");
    navigate("/");
  };

  const handleMessage = () => {
    handleClose();
    navigate("/message");
  };

  const handleInbox = () => {
    handleClose();
    navigate("/inbox");
  };

  const handleSearchPatient = () => {
    handleClose();
    navigate("/searchpatient");
  };

  const handlePatient = () => {
    handleClose();
    navigate("/patient");
  };

  const handleCondition= () => {
    handleClose();
    navigate("/getAllPatients");
  };

  const handleNote= () => {
    handleClose();
    navigate("/CreateObservation");
  };

  const handleVG= () => {
    handleClose();
    navigate("/pat");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {loggedIn && role === "STAFF" && (
              <>
                <MenuItem onClick={handleMessage}>Send message</MenuItem>
                <MenuItem onClick={handleInbox}>Look at messages received</MenuItem>
                <MenuItem onClick={handleNote}>New patient note</MenuItem>
                <MenuItem onClick={handleCondition}>New patient condition</MenuItem>
              </>
            )}
            {loggedIn && role === "PATIENT" && (
              <>
                <MenuItem onClick={handleMessage}>Send message</MenuItem>
                <MenuItem onClick={handleInbox}>Look at messages received</MenuItem>
                <MenuItem onClick={handlePatient}>Info about myself</MenuItem>
              </>
            )}
            {loggedIn && role === "PRACTITIONER" && (
              <>
                <MenuItem onClick={handleMessage}>Send message</MenuItem>
                <MenuItem onClick={handleInbox}>Look at messages received</MenuItem>
                <MenuItem onClick={handleNote}>New patient note</MenuItem>
                <MenuItem onClick={handleCondition}>New patient condition</MenuItem>
                <MenuItem onClick={handleSearchPatient}>Look at info about patients</MenuItem>
              </>
            )}
            {!loggedIn && (
              <>
                <MenuItem onClick={handleHome}>Home</MenuItem>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleCreate}>Register User</MenuItem>
                <MenuItem onClick={handleVG}>VG</MenuItem>

              </>
            )}
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Faisal och Johannes Journal
          </Typography>
          {loggedIn ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" color="inherit" sx={{ mr: 2 }}>
                Välkommen, {username}
              </Typography>
              <Button onClick={handleLogout} color="inherit">Log out</Button>
            </Box>
          ) : (
            <Button color="inherit" onClick={() => navigate("/")}>Log in</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
