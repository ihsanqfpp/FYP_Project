import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha
} from "@mui/material";
import {
  Home as HomeIcon,
  RestaurantMenu as RestaurantMenuIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  LocalDining as LocalDiningIcon,
  Cake as CakeIcon,
  Star as StarIcon,
  Whatshot as WhatshotIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../../../context/RecipeContext";
import { useAppTheme } from "../../../context/ThemeContext";

const MobileDrawer = ({ drawerOpen, setDrawerOpen }) => {
  const navigate = useNavigate();
  const { setSearchTriggered } = useRecipes();
  const { darkMode, toggleDarkMode } = useAppTheme();

  const handleNavigate = (path) => {
    navigate(path);
    setSearchTriggered(false);
    setDrawerOpen(false);
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
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: 280,
          backgroundColor: 'background.paper',
          backdropFilter: "blur(10px)",
          borderRight: '1px solid',
          borderColor: 'divider'
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: "bold",
              background: `linear-gradient(45deg, #1976D2 0%, #FF5722 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.5rem"
            }}
          >
            FoodiePK
          </Typography>
          <IconButton onClick={toggleDarkMode}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        
        <List>
          {navLinks.map((link, index) => (
            <React.Fragment key={index}>
              {link.dropdown ? (
                <>
                  <ListItem 
                    button 
                    sx={{ 
                      pl: 2,
                      "&:hover": { backgroundColor: alpha('#1976D2', 0.1) }
                    }}
                  >
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <ListItemText primary={link.name} primaryTypographyProps={{ fontWeight: 500 }} />
                  </ListItem>
                  {link.items.map((item, idx) => (
                    <ListItem 
                      key={idx}
                      button 
                      onClick={() => handleNavigate(item.path)}
                      sx={{ 
                        pl: 6,
                        "&:hover": { backgroundColor: alpha('#1976D2', 0.1) }
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.name} primaryTypographyProps={{ fontWeight: 500 }} />
                    </ListItem>
                  ))}
                </>
              ) : (
                <ListItem 
                  button 
                  onClick={() => handleNavigate(link.path)}
                  sx={{ 
                    pl: 2,
                    "&:hover": { backgroundColor: alpha('#1976D2', 0.1) }
                  }}
                >
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.name} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItem>
              )}
              {index < navLinks.length - 1 && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
