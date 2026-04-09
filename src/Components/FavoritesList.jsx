import React from "react";
import { Box, Typography } from "@mui/material";

const FavoritesList = ({ favorites }) => {
  if (!favorites || favorites.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        No favorite recipes yet. Add some by clicking the heart icon!
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 3, display: "flex", gap: 3, flexWrap: "wrap" }}>
      {favorites.map(({ name, image }) => (
        <Box
          key={name}
          sx={{
            width: 100,
            textAlign: "center",
            borderRadius: 1,
            boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
            p: 1,
            bgcolor: "#fafafa",
          }}
        >
          <img
            src={image}
            alt={name}
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: 6,
            }}
          />
          <Typography variant="body2" noWrap>
            {name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default FavoritesList;
