import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  IconButton,
  CardMedia,
  Chip,
  Grid,
  Fade,
  Slide,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Bookmark as BookmarkIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

const RecipeModal = ({
  open,
  handleClose,
  selectedMeal,
  favorites,
  savedRecipes,
  toggleFavorite,
  toggleSavedRecipe,
  shareRecipe,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showIngredients, setShowIngredients] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);

  if (!selectedMeal) return null;

  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      fullScreen={isMobile}
      TransitionComponent={Slide}
      transitionDuration={500}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : "16px",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1.5rem", sm: "1.8rem" },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(to right, #FF7043, #FFB74D)",
          color: "white",
          py: 2,
        }}
      >
        {selectedMeal.strMeal}
        <Box>
          <IconButton
            onClick={() => toggleFavorite(selectedMeal.idMeal)}
            sx={{ color: "white" }}
          >
            {favorites.includes(selectedMeal.idMeal) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton
            onClick={() => toggleSavedRecipe(selectedMeal.idMeal)}
            sx={{ color: "white" }}
          >
            {savedRecipes.includes(selectedMeal.idMeal) ? (
              <BookmarkIcon />
            ) : (
              <BookmarkBorderIcon />
            )}
          </IconButton>
          <IconButton
            onClick={() => shareRecipe(selectedMeal)}
            sx={{ color: "white" }}
          >
            <ShareIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        <Box sx={{ position: "relative", borderRadius: "12px", overflow: "hidden", mb: 3, mt: 2 }}>
          <CardMedia
            component="img"
            height={isMobile ? "200" : "400"}
            image={selectedMeal.strMealThumb}
            alt={selectedMeal.strMeal}
            sx={{
              objectFit: "cover",
              width: "100%",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.02)" },
            }}
          />
          <Chip
            label={selectedMeal.strCategory}
            size="medium"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              fontWeight: 600,
            }}
          />
          <Chip
            label={selectedMeal.strArea}
            size="medium"
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              backgroundColor: "rgba(255, 111, 0, 0.9)",
              color: "white",
              fontWeight: 600,
            }}
          />
        </Box>

        {selectedMeal.strYoutube && (
          <Box mb={3}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="h6" sx={{ color: "#FF5722", display: "flex", alignItems: "center" }}>
                Video Tutorial
              </Typography>
              <Button
                size="small"
                href={`https://www.youtube.com/watch?v=${selectedMeal.strYoutube.split("v=")[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#FF5722",
                  "&:hover": { backgroundColor: "rgba(255, 87, 34, 0.1)" },
                }}
              >
                Watch on YouTube
              </Button>
            </Box>
            <Box
              sx={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: "12px",
              }}
            >
              <iframe
                width="100%"
                height="100%"
                style={{ position: "absolute", top: 0, left: 0, border: "none" }}
                src={`https://www.youtube.com/embed/${selectedMeal.strYoutube.split("v=")[1]}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Box>
          </Box>
        )}

        {/* Ingredients Section */}
        <Box sx={{ mb: 3, border: "1px solid rgba(0, 0, 0, 0.12)", borderRadius: "12px", overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              px: 2,
              py: 1.5,
              cursor: "pointer",
              "&:hover": { backgroundColor: "#eeeeee" },
            }}
            onClick={() => setShowIngredients(!showIngredients)}
          >
            <Typography variant="h6" sx={{ color: "#FF5722", fontWeight: 600 }}>
              Ingredients
            </Typography>
            <ExpandMoreIcon
              sx={{
                transform: showIngredients ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
                color: "#FF5722",
              }}
            />
          </Box>
          <Fade in={showIngredients}>
            <Box sx={{ p: 2, display: showIngredients ? 'block' : 'none' }}>
              <Grid container spacing={2}>
                {getIngredients(selectedMeal).map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 1,
                        borderRadius: "8px",
                        backgroundColor: index % 2 === 0 ? "rgba(255, 111, 0, 0.05)" : "transparent",
                      }}
                    >
                      <Box
                        sx={{
                          width: "8px",
                          height: "8px",
                          backgroundColor: "#FF6F00",
                          borderRadius: "50%",
                          mr: 2,
                        }}
                      />
                      <Typography>{item}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        </Box>

        {/* Instructions Section */}
        <Box sx={{ border: "1px solid rgba(0, 0, 0, 0.12)", borderRadius: "12px", overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              px: 2,
              py: 1.5,
              cursor: "pointer",
              "&:hover": { backgroundColor: "#eeeeee" },
            }}
            onClick={() => setShowInstructions(!showInstructions)}
          >
            <Typography variant="h6" sx={{ color: "#FF5722", fontWeight: 600 }}>
              Instructions
            </Typography>
            <ExpandMoreIcon
              sx={{
                transform: showInstructions ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
                color: "#FF5722",
              }}
            />
          </Box>
          <Fade in={showInstructions}>
            <Box sx={{ p: 3, display: showInstructions ? 'block' : 'none' }}>
              {selectedMeal.strInstructions
                ? selectedMeal.strInstructions
                    .split("\r\n")
                    .filter((step) => step.trim() !== "")
                    .map((step, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            "&::first-letter": {
                              fontSize: "1.5em",
                              color: "#FF6F00",
                              fontWeight: "bold",
                            },
                          }}
                        >
                          {step}
                        </Typography>
                      </Box>
                    ))
                : "No instructions available."}
            </Box>
          </Fade>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={handleClose}
          variant="contained"
          color="error"
          sx={{
            borderRadius: "30px",
            px: 3,
            py: 1,
            fontWeight: 600,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeModal;
