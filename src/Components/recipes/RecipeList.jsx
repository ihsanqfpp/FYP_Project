import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Typography,
  Grid,
  Box,
  Divider,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Grow,
  Zoom,
  Skeleton,
  useMediaQuery,
  useTheme,
  CardContent,
} from "@mui/material";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecipes } from "../../context/RecipeContext";

// Components
import RecipeCard, { RippleButton } from "./RecipeCard";
import RecipeModal from "./RecipeModal";

// Animations
const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 111, 0, 0.3); }
  50% { box-shadow: 0 0 20px rgba(255, 111, 0, 0.6); }
  100% { box-shadow: 0 0 5px rgba(255, 111, 0, 0.3); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const ShimmerButton = styled(Button)({
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
    animation: `${shimmer} 2s infinite`,
  },
});

const RecipeList = () => {
  const { searchQuery, searchTriggered, setSearchTriggered, favorites, toggleFavorite } = useRecipes();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [visibleRecipes, setVisibleRecipes] = useState(8);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("all");
  const [localSearch, setLocalSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  // Fetch recipes
  const fetchRecipes = useCallback(async (query = "") => {
    setLoading(true);
    try {
      let response;
      if (query) {
        response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        setRecipes(response.data.meals || []);
      } else {
        const searchQueries = [
          "chicken",
          "beef",
          "vegetarian",
          "pasta",
          "pizza",
          "burger",
          "salad",
          "dessert",
        ];
        // Performance note: In Phase 3 this parallel fetching will be avoided
        const recipePromises = searchQueries.map((q) =>
          axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
        );
        const responses = await Promise.all(recipePromises);
        const allMeals = responses.flatMap((res) => res.data.meals || []);
        const shuffledMeals = allMeals.sort(() => Math.random() - 0.5);
        setRecipes(shuffledMeals.slice(0, 150));
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial load and search handling
  useEffect(() => {
    if (location.state?.searchQuery) {
      fetchRecipes(location.state.searchQuery);
      setSearchTriggered(true);
    } else if (searchTriggered && searchQuery) {
      fetchRecipes(searchQuery);
    } else {
      fetchRecipes();
    }

    const storedSavedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(storedSavedRecipes);
  }, [fetchRecipes, location.state, searchQuery, searchTriggered]);

  // Filter recipes by category
  useEffect(() => {
    if (category === "all") {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) =>
          recipe.strCategory?.toLowerCase().includes(category.toLowerCase())
        )
      );
    }
  }, [category, recipes]);

  // Fetch meal details
  const fetchMealDetails = async (mealId) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const meal = response.data.meals?.[0];
      if (meal) {
        setSelectedMeal(meal);
        setOpen(true);
      }
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
  };

  // Load more recipes
  const handleLoadMore = () => {
    setVisibleRecipes((prev) => prev + 8);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMeal(null);
  };

  const resetSearch = () => {
    setSearchTriggered(false);
    setLocalSearch("");
    fetchRecipes();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim() !== "") {
      fetchRecipes(localSearch);
      setSearchTriggered(true);
      navigate("/", { state: { searchQuery: localSearch } });
    }
  };

  const toggleSavedRecipe = (recipeId) => {
    const newSavedRecipes = savedRecipes.includes(recipeId)
      ? savedRecipes.filter((id) => id !== recipeId)
      : [...savedRecipes, recipeId];
    setSavedRecipes(newSavedRecipes);
    localStorage.setItem("savedRecipes", JSON.stringify(newSavedRecipes));
  };

  const shareRecipe = (recipe) => {
    if (navigator.share) {
      navigator.share({
        title: recipe.strMeal,
        text: `Check out this delicious ${recipe.strMeal} recipe!`,
        url: window.location.href,
      }).catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(`${recipe.strMeal} - ${window.location.href}`);
      alert("Recipe link copied to clipboard!");
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: { xs: 2, sm: 3 },
        mt: { xs: 6, sm: 8 },
        backgroundColor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 3,
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            fontFamily: "Playfair Display, serif",
            color: "text.primary",
            fontSize: { xs: "1.8rem", sm: "2.2rem" },
            mb: { xs: 2, sm: 0 },
          }}
        >
          {searchTriggered ? (
            <>
              🔍 Search Results for "{searchQuery || localSearch}"
              <Button
                onClick={resetSearch}
                variant="outlined"
                size="small"
                sx={{ ml: 2 }}
              >
                Clear
              </Button>
            </>
          ) : (
            "🍽️ Latest & Trending Recipes"
          )}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{
            position: "relative",
            transition: "all 0.3s ease",
            transform: searchFocused ? "translateY(-5px)" : "none",
            animation: searchFocused ? `${pulse} 3s infinite` : "none",
            "&:hover": {
              transform: "translateY(-5px)",
              animation: `${glow} 2s infinite, ${pulse} 3s infinite`,
            },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search recipes..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            sx={{
              width: { xs: "100%", sm: 300 },
              backgroundColor: "background.paper",
              borderRadius: "30px",
              boxShadow: 3,
              transition: "all 0.3s ease",
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "#FF6F00" },
                "&.Mui-focused fieldset": {
                  borderColor: "#FF6F00",
                  boxShadow: "0 0 0 2px rgba(255, 111, 0, 0.2)",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: searchFocused ? "#FF6F00" : "text.secondary",
                      transition: "color 0.3s ease",
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: localSearch && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setLocalSearch("");
                      setSearchTriggered(false);
                      fetchRecipes();
                    }}
                    size="small"
                    sx={{
                      color: "#FF6F00",
                      "&:hover": { backgroundColor: "rgba(255, 111, 0, 0.1)" },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { paddingLeft: "10px", fontWeight: 500 },
            }}
          />
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {!searchTriggered && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {["all", "chicken", "beef", "vegetarian", "dessert"].map((cat) => (
            <Button
              key={cat}
              variant="contained"
              onClick={() => setCategory(cat)}
              sx={{
                m: 0.5,
                background:
                  category === cat
                    ? "linear-gradient(45deg, #FF7043, #FFB74D)"
                    : "#607D8B",
                color: "white",
                fontWeight: 600,
                "&:hover": {
                  background: category === cat ? "linear-gradient(45deg, #FFB74D, #FF7043)" : "#455A64",
                },
                borderRadius: "30px",
                padding: "6px 16px",
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                transition: "all 0.3s ease",
              }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </Box>
      )}

      {loading ? (
        <Grid container spacing={4}>
          {[...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box sx={{ maxWidth: 345, borderRadius: '16px', overflow: 'hidden', boxShadow: 1, bgcolor: 'background.paper' }}>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" width="80%" height={32} />
                  <Skeleton variant="text" width="60%" height={24} />
                  <Skeleton variant="text" width="40%" height={24} />
                  <Skeleton variant="rectangular" height={40} sx={{ mt: 2, borderRadius: "20px" }} />
                </CardContent>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={4}>
          {filteredRecipes.slice(0, visibleRecipes).map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.idMeal}>
              <Grow in={!loading} timeout={index * 100}>
                <div>
                  <RecipeCard
                    title={recipe.strMeal}
                    image={recipe.strMealThumb}
                    rating={4.5}
                    category={recipe.strCategory}
                    onClick={() => fetchMealDetails(recipe.idMeal)}
                    isFavorite={favorites.includes(recipe.idMeal)}
                    onFavorite={() => toggleFavorite(recipe.idMeal)}
                    onShare={() => shareRecipe(recipe)}
                  />
                </div>
              </Grow>
            </Grid>
          ))}
        </Grid>
      )}

      {filteredRecipes.length === 0 && !loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "300px",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, color: "text.secondary" }}>
            🍳 No recipes found
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
            Try a different search term or browse our categories
          </Typography>
          <Button
            variant="contained"
            onClick={resetSearch}
            sx={{
              background: "linear-gradient(45deg, #FF7043, #FFB74D)",
              color: "white",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              "&:hover": { background: "linear-gradient(45deg, #FFB74D, #FF7043)" },
              borderRadius: "30px",
            }}
          >
            Explore Recipes
          </Button>
        </Box>
      )}

      <Box display="flex" justifyContent="center" mt={4}>
        {visibleRecipes < filteredRecipes.length && (
          <ShimmerButton
            variant="contained"
            onClick={handleLoadMore}
            sx={{
              background: "linear-gradient(45deg, #FF6F00, #FF9800)",
              color: "white",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              "&:hover": { background: "linear-gradient(45deg, #FF9800, #FF6F00)" },
              borderRadius: "30px",
            }}
          >
            Load More Recipes
          </ShimmerButton>
        )}
      </Box>

      <RecipeModal
        open={open}
        handleClose={handleClose}
        selectedMeal={selectedMeal}
        favorites={favorites}
        savedRecipes={savedRecipes}
        toggleFavorite={toggleFavorite}
        toggleSavedRecipe={toggleSavedRecipe}
        shareRecipe={shareRecipe}
      />

      {isScrolled && (
        <Zoom in={isScrolled}>
          <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
            <RippleButton
              variant="contained"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              sx={{
                minWidth: "unset",
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(45deg, #FF7043, #FFB74D)",
                color: "white",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  background: "linear-gradient(45deg, #FFB74D, #FF7043)",
                  boxShadow: "0px 6px 24px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              ↑
            </RippleButton>
          </Box>
        </Zoom>
      )}
    </Box>
  );
};

export default RecipeList;
