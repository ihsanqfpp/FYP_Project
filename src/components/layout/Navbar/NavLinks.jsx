import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  alpha,
  Slide
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Home as HomeIcon,
  RestaurantMenu as RestaurantMenuIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
  Whatshot as WhatshotIcon,
  Cake as CakeIcon,
  Star as StarIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../../../context/RecipeContext";

const NavLinks = () => {
  const navigate = useNavigate();
  const { setSearchTriggered } = useRecipes();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNavigate = (path) => {
    navigate(path);
    setSearchTriggered(false);
    handleMenuClose();
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { 
      name: "Recipes", 
      dropdown: true, 
      icon: <RestaurantMenuIcon />,
      items: [
        { name: "Popular Recipes", path: "/popular-recipes", icon: <WhatshotIcon color="secondary" /> },
        { name: "Afghani Sweets", path: "/afghani-sweets", icon: <CakeIcon /> },
        { name: "Latest Recipes", path: "/latest-recipes", icon: <StarIcon color="secondary" /> }
      ]
    },
    { name: "About", path: "/about", icon: <InfoIcon /> },
    { name: "Contact", path: "/contact", icon: <ContactMailIcon /> }
  ];

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {navLinks.map((link, index) => (
        <Box key={index}>
          {link.dropdown ? (
            <>
              <Button
                color="inherit"
                startIcon={link.icon}
                endIcon={<ExpandMoreIcon />}
                onClick={handleMenuOpen}
                sx={{ 
                  textTransform: "capitalize",
                  fontWeight: 500,
                  "&:hover": { backgroundColor: alpha('#1976D2', 0.1) }
                }}
              >
                {link.name}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                TransitionComponent={Slide}
                PaperProps={{
                  sx: {
                    minWidth: 200,
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                {link.items.map((item, idx) => (
                  <MenuItem 
                    key={idx} 
                    onClick={() => handleNavigate(item.path)}
                    sx={{ py: 1.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              startIcon={link.icon}
              onClick={() => handleNavigate(link.path)}
              sx={{ 
                textTransform: "capitalize",
                fontWeight: 500,
                "&:hover": { backgroundColor: alpha('#1976D2', 0.1) }
              }}
            >
              {link.name}
            </Button>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default NavLinks;
