import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Button,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const ripple = keyframes`
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(4); opacity: 0; }
`;

// Styled Components
const AnimatedCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  backdropFilter: "blur(10px)",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
  "&:hover": {
    animation: `${float} 3s ease-in-out infinite`,
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.2)",
    background: "rgba(255, 255, 255, 0.2)",
  },
}));

export const RippleButton = styled(Button)({
  position: "relative",
  overflow: "hidden",
  "& .ripple": {
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    transform: "scale(0)",
    animation: `${ripple} 0.6s linear`,
    pointerEvents: "none",
  },
});

const RecipeCard = ({ 
  title, 
  image, 
  rating, 
  category, 
  onClick, 
  isFavorite, 
  onFavorite, 
  onShare 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AnimatedCard
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={image || "/placeholder-recipe.jpg"}
          alt={title}
          sx={{
            objectFit: "cover",
            borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
            filter: isHovered ? "brightness(1.05)" : "brightness(1)",
            transition: "filter 0.3s ease",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 1,
            opacity: isHovered || isMobile ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onFavorite();
            }}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
            }}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: "#ff4081" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "#757575" }} />
            )}
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onShare();
            }}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
            }}
          >
            <ShareIcon sx={{ color: "#757575" }} />
          </IconButton>
        </Box>
        {category && (
          <Chip
            label={category}
            size="small"
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              fontWeight: 600,
            }}
          />
        )}
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          fontWeight={700}
          sx={{
            fontFamily: "Poppins, sans-serif",
            color: "#333",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "64px",
          }}
        >
          {title}
        </Typography>
        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
          <Rating
            value={rating || 0}
            precision={0.5}
            readOnly
            sx={{ color: "#FF6F00" }}
          />
          <Typography variant="body2" color="text.secondary" ml={1}>
            {rating || "N/A"}
          </Typography>
        </Box>
        <RippleButton
          variant="contained"
          fullWidth
          sx={{
            background: "linear-gradient(45deg, #FF7043, #FFB74D)",
            color: "white",
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(45deg, #FFB74D, #FF7043)",
            },
            padding: "8px 16px",
            position: "relative",
          }}
        >
          View Recipe
        </RippleButton>
      </CardContent>
    </AnimatedCard>
  );
};

export default RecipeCard;
