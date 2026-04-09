import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useAppTheme } from './context/ThemeContext';
import { useRecipes } from './context/RecipeContext';

// Import your components
import Navbar from './components/layout/Navbar';
import HomePage from './Components/HomePage';
import PopularRecipes from './Components/PopularRecipes';
import RecipeCarousel from './Components/RecipeCarousel';
import RecipeList from './components/recipes/RecipeList';
import NewsletterSection from './Components/NewsletterSection';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ForgotPassword from './Components/ForgotPassword';
import Profile from './Components/Profile';
import About from './Components/About';
import Contact from './Components/Contact';
import NetworkNotifier from './components/common/NetworkNotifier';

import { Box, CircularProgress } from '@mui/material';

function App() {
  const { user, loading } = useAuth();
  const { darkMode } = useAppTheme();

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        bgcolor={darkMode ? '#121212' : '#ffffff'}
      >
        <CircularProgress size={48} thickness={4} sx={{ color: '#25D366' }} />
      </Box>
    );
  }

  return (
    <Router>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', color: 'text.primary' }}>
        <Navbar />
        <NetworkNotifier />
        
        <Routes>
          <Route path="/" element={
            <>
              <HomePage />
              <RecipeCarousel />
              <PopularRecipes />
              <RecipeList />
              <NewsletterSection />
            </>
          } />
          
          <Route path="/popular-recipes" element={<PopularRecipes />} />
          <Route path="/afghani-sweets" element={<RecipeCarousel />} />
          <Route path="/latest-recipes" element={<RecipeList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={user ? <Navigate to="/profile" replace /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/profile" replace /> : <Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route 
            path="/profile" 
            element={
              user ? (
                <Profile 
                  user={{
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                  }} 
                />
              ) : (
                <Navigate to="/login" state={{ from: '/profile' }} replace />
              )
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;