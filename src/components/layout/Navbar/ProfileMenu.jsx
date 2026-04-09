import React, { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  alpha
} from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  ExitToApp as LogoutIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useAuth } from "../../../context/AuthContext";
import { useAppTheme } from "../../../context/ThemeContext";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { darkMode, toggleDarkMode } = useAppTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleClose();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton 
        onClick={toggleDarkMode}
        color="inherit"
        sx={{ 
          "&:hover": { backgroundColor: alpha('#1976D2', 0.1) }
        }}
      >
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      <IconButton 
        onClick={handleOpen}
        color="inherit"
        sx={{ 
          "&:hover": { backgroundColor: alpha('#1976D2', 0.1) }
        }}
      >
        {user ? (
          <Avatar 
            src={user.photoURL || undefined} 
            sx={{ width: 32, height: 32 }}
          >
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
          </Avatar>
        ) : (
          <AccountCircleIcon />
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 180,
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '1px solid',
            borderColor: 'divider'
          }
        }}
      >
        {user ? (
          <>
            <MenuItem onClick={() => handleNavigate('/profile')} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => handleNavigate('/signup')} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </MenuItem>
            <MenuItem onClick={() => handleNavigate('/login')} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
