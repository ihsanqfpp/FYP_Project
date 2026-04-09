import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

export default function HomePage() {
  const location = useLocation();
  
  if (location.pathname !== "/") {
    return null;
  }
   

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        background: "linear-gradient(135deg, #fff0e6, #ffe0cc, #ffd1b3)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: 4, md: 6 },
      }}
    >
      {/* Header Section */}
      <Box textAlign="center">
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontFamily: "'Playfair Display', serif",
            color: "#c62828",
            fontSize: { xs: "2rem", md: "3.5rem" },
            textShadow: "2px 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          Spice Up Your Kitchen!
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            fontFamily: "'Lato', sans-serif",
            color: "#5d4037",
          }}
        >
          Join our <span style={{ color: "#25D366", fontWeight: "bold" }}>WhatsApp Channel</span> for tasty recipes, kitchen secrets, and more!
        </Typography>
      </Box>

      {/* Cards Section */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              width: "100%",
              background: "#fff3e0",
              boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
              borderRadius: "20px",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image="/Homepage Images/recipe.jpg"
              alt="Downloadable Recipes"
              sx={{ borderRadius: "20px 20px 0 0" }}
            />
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontFamily: "'Lobster', cursive", color: "#e64a19" }}
              >
                Downloadable Recipes
              </Typography>
              <Typography variant="body2" sx={{ color: "#4e342e" }}>
                Easy-to-follow and print-ready delicious meal ideas.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              width: "100%",
              background: "#fff3e0",
              boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
              borderRadius: "20px",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image="/Homepage Images/kitchen.jpg"
              alt="Behind The Scenes"
              sx={{ borderRadius: "20px 20px 0 0" }}
            />
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontFamily: "'Lobster', cursive", color: "#d84315" }}
              >
                Behind The Scenes
              </Typography>
              <Typography variant="body2" sx={{ color: "#4e342e" }}>
                Take a peek into our real kitchen moments.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* WhatsApp Feature Highlights */}
      <Box textAlign="center" maxWidth="600px">
        <Typography
          variant="h5"
          sx={{ color: "#5d4037", fontWeight: "bold", mb: 2 }}
        >
          What You'll Get:
        </Typography>
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            padding: 0,
            fontSize: "18px",
            color: "#4e342e",
            textAlign: "left",
          }}
        >
          <Box component="li" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <RestaurantMenuIcon sx={{ color: "#ff8f00", mr: 1 }} />
            Exclusive downloadable recipes
          </Box>
          <Box component="li" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <EmojiFoodBeverageIcon sx={{ color: "#f4511e", mr: 1 }} />
            Behind-the-scenes kitchen content
          </Box>
          <Box component="li" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <TipsAndUpdatesIcon sx={{ color: "#ffb300", mr: 1 }} />
            Chef's tips & cooking hacks
          </Box>
        </Box>
      </Box>

      {/* CTA Button */}
      <Button
        variant="contained"
        startIcon={<WhatsAppIcon />}
        fullWidth
        sx={{
          maxWidth: { xs: "100%", sm: "320px" },
          background: "linear-gradient(to right, #25D366, #00c853)",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
          px: 4,
          py: 1.5,
          borderRadius: "50px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            background: "linear-gradient(to right, #1ebe5d, #00b248)",
          },
        }}
      >
        Join Our WhatsApp Channel
      </Button>
    </Box>
  );
}