import React, { useState, useRef, useEffect } from "react";
import {
  InputBase,
  Box,
  CircularProgress,
  Fade,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
  styled,
  keyframes
} from "@mui/material";
import {
  Search as SearchIcon,
  LocalDining as LocalDiningIcon,
  RestaurantMenu as RestaurantMenuIcon,
  Cake as CakeIcon,
  Whatshot as WhatshotIcon
} from "@mui/icons-material";
import { useRecipes } from "../../../context/RecipeContext";
import { useAppTheme } from "../../../context/ThemeContext";
import { useDebounce } from "../../../hooks/useDebounce";

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(25, 118, 210, 0); }
  100% { box-shadow: 0 0 0 0 rgba(25, 118, 210, 0); }
`;

const Search = styled("div")(({ theme, focused }) => ({
  position: "relative",
  borderRadius: "25px",
  backgroundColor: focused ? 
    alpha(theme.palette.primary.main, 0.1) : 
    alpha(theme.palette.primary.main, 0.05),
  marginLeft: 0,
  width: "100%",
  transition: "all 0.3s ease",
  border: focused ? `2px solid ${theme.palette.primary.main}` : "1px solid transparent",
  boxShadow: focused ? `0 0 10px ${alpha(theme.palette.primary.main, 0.2)}` : "none",
  animation: focused ? `${pulse} 2s infinite` : "none",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
  transition: "all 0.3s ease",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchBar = () => {
  const { searchQuery, setSearchQuery, setSearchTriggered } = useRecipes();
  const { darkMode } = useAppTheme();
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debouncedSearch = useDebounce(localSearch, 500);
  
  const [searchFocused, setSearchFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    // If the global searchQuery changes (e.g. from clicking a category), update localSearch
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const fetchAutocomplete = async () => {
      if (debouncedSearch.length >= 2) {
        setLoading(true);
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedSearch}`);
          const data = await response.json();
          if (data.meals) {
            setSearchResults(data.meals.slice(0, 5).map(meal => ({
              name: meal.strMeal,
              icon: <LocalDiningIcon color="primary" />
            })));
            setShowResults(true);
          } else {
            setSearchResults([]);
            setShowResults(false);
          }
        } catch (error) {
          console.error("Autocomplete fetch error: ", error);
        } finally {
          setLoading(false);
        }
      } else {
        setShowResults(false);
        setSearchResults([]);
      }
    };

    fetchAutocomplete();
  }, [debouncedSearch]);

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
  };

  const handleResultClick = (name) => {
    setLocalSearch(name);
    setSearchQuery(name);
    setSearchTriggered(true);
    setShowResults(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(localSearch);
      setSearchTriggered(true);
      setShowResults(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box ref={searchRef} sx={{ position: "relative", minWidth: { xs: "150px", sm: "200px" } }}>
      <Search focused={searchFocused}>
        <SearchIconWrapper>
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <SearchIcon />
          )}
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search recipes..."
          value={localSearch}
          onChange={handleSearchChange}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          onKeyDown={handleKeyDown}
        />
      </Search>
      
      <Fade in={showResults}>
        <Box sx={{ 
          position: "absolute", 
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: 'background.paper',
          boxShadow: 3,
          borderRadius: "12px",
          mt: 1,
          zIndex: 10,
          maxHeight: "300px",
          overflow: "auto",
          backdropFilter: "blur(10px)",
          border: '1px solid',
          borderColor: 'divider'
        }}>
          {searchResults.map((result, index) => (
            <ListItem 
              key={index} 
              button 
              onClick={() => handleResultClick(result.name)}
              sx={{
                "&:hover": {
                  backgroundColor: alpha('#1976D2', 0.1)
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: "36px" }}>
                {result.icon}
              </ListItemIcon>
              <ListItemText 
                primary={result.name} 
                primaryTypographyProps={{ 
                  fontWeight: 500
                }}
              />
            </ListItem>
          ))}
        </Box>
      </Fade>
    </Box>
  );
};

export default SearchBar;
