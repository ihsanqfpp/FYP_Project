import { useState, useCallback } from 'react';
import axios from 'axios';

export const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = useCallback(async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      if (query) {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        setRecipes(response.data.meals || []);
      } else {
        // Fetch a general assortment when no query is provided
        const searchQueries = ["chicken", "beef", "vegetarian", "dessert"];
        const recipePromises = searchQueries.map((q) =>
          axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
        );
        const responses = await Promise.all(recipePromises);
        const allMeals = responses.flatMap((res) => res.data.meals || []);
        
        // Remove duplicates if any
        const uniqueMealsMap = new Map();
        allMeals.forEach(meal => {
           if (meal) uniqueMealsMap.set(meal.idMeal, meal);
        });
        
        const uniqueMeals = Array.from(uniqueMealsMap.values());
        const shuffledMeals = uniqueMeals.sort(() => Math.random() - 0.5);
        setRecipes(shuffledMeals.slice(0, 100));
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { recipes, loading, error, fetchRecipes };
};
