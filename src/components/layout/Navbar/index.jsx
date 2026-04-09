import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  alpha,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";
import MobileDrawer from "./MobileDrawer";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Box sx={{ height: { xs: '56px', sm: '64px' } }} />
      
      <AppBar 
        position="fixed"
        sx={{ 
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: 3,
          backdropFilter: "blur(10px)",
          background: alpha(theme.palette.background.paper, 0.98),
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ 
          justifyContent: "space-between", 
          padding: { xs: "8px 12px", md: "8px 24px" },
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%"
        }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ 
                  mr: 2,
                  "&:hover": { backgroundColor: alpha(theme.palette.primary.main, 0.1) }
                }}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography 
              variant="h6" 
              noWrap
              sx={{ 
                cursor: "pointer",
                fontWeight: "bold",
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.25rem", sm: "1.5rem" }
              }}
              onClick={() => navigate("/")}
            >
              FoodiePK
            </Typography>
          </Box>

          {!isMobile && <NavLinks />}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SearchBar />
            <ProfileMenu />
          </Box>
        </Toolbar>

        <MobileDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      </AppBar>
    </>
  );
};

export default Navbar;
