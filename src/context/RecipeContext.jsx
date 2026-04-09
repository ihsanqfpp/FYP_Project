import React, { createContext, useContext, useState } from 'react';

const RecipeContext = createContext();

export const useRecipes = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (recipeId) => {
    setFavorites((prev) => {
      const next = prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId];
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  const value = {
    searchQuery,
    setSearchQuery,
    searchTriggered,
    setSearchTriggered,
    favorites,
    toggleFavorite,
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
};
