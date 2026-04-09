import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Avatar,
  Divider,
  IconButton,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Tabs,
  Tab,
  Rating
} from "@mui/material";
import { Logout, Edit, Favorite, Bookmark } from "@mui/icons-material";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const mainDishesRecipes = [
  { title: 'Charsadda Chawal', image: '/Popular Recipes Images/Charsada_chawal.png', rating: 5, link: "https://youtu.be/4NOFbqqaWoM?si=bCCNvi5Q8zsHp0jR" },
  { title: 'Chicken Handi', image: '/Popular Recipes Images/Chicken_Handi.png', rating: 5, link: "https://youtu.be/eIibtZgagQc?si=YwLff74HhXeYalXg" },
  { title: 'Shinwari Karahi', image: '/Popular Recipes Images/Shinwari_karahi.png', rating: 5, link: "https://youtu.be/hBhiJJE1lOA?si=hd9x009wydWRHCeS" },
  { title: 'Kabli Palao', image: '/Popular Recipes Images/Kabuli_pulao.png', rating: 5, link: "https://youtu.be/kkCIC3ciBlA?si=jP7AItemk896AHmD" },
  { title: 'Charsii Karahi', image: '/Popular Recipes Images/Charsi_karahi.png', rating: 5, link: "https://youtu.be/NnthwNkKjYI?si=dOJoWWEny6lP_nas" },
  { title: 'Rosh', image: '/Popular Recipes Images/Rosh.png', rating: 5, link: "https://youtu.be/xkc18WfyncQ?si=Je4vWFybQRFFoMZH" },
  { title: 'Bannu pulao', image: '/Popular Recipes Images/Bannu pulao.png', rating: 5, link: "https://youtu.be/VUOEVD6KzdI?si=zQA-YgrxiFCGFpth" },
  { title: 'Afghani Dum pukht', image: '/Popular Recipes Images/afghani dum pukht.png', rating: 5, link: "https://youtu.be/hPq-uMUB3CA?si=sH5lamLFc9OlwjSC" },
  { title: 'Mutton Karahi', image: '/Popular Recipes Images/Mutton karahi.png', rating: 5, link: "https://youtu.be/LVhgYAvlIR0?si=Ovzr7sZfD_9t4H_D" },
  { title: 'Chicken Biryani', image: '/Popular Recipes Images/Chicken biryani.png', rating: 5, link: "https://youtu.be/rpKOoR3Ml2I?si=fmwNCen5FvM_YVXe" },
  { title: 'Beef Biryani', image: '/Popular Recipes Images/Beef biryani.png', rating: 5, link: "https://youtu.be/TwzSmMXMAyo?si=HnvPetr0PQopCebZ" },
  { title: 'Chicken Pulao', image: '/Popular Recipes Images/Chicken pulao.png', rating: 5, link: "https://youtu.be/njw81KkLSlw?si=uUG9SakFqXuwPCz6" },
  { title: 'Mutton Pulao', image: '/Popular Recipes Images/Mutton pulao.png', rating: 5, link: "https://youtu.be/2xRzuKKCFPc?si=Rk-ONRppe1b1qFYF" },
  { title: 'Chicken Karahi', image: '/Popular Recipes Images/Chicken karahi.png', rating: 5, link: "https://youtu.be/OGjGyRHTcHM?si=s_aBTk_5IIrLhcJT" },
  { title: 'Beef Karahi', image: '/Popular Recipes Images/Beef karahi.png', rating: 5, link: "https://youtu.be/0YS7VOItcK0?si=qEivn-1faXSer8QF" },
  { title: 'Chicken Seekh Kabab', image: '/Popular Recipes Images/Chicken Seekh Kabab.png', rating: 5, link: "https://youtu.be/nZdxCpL51eg?si=xskG0iijtttJ4eyC" },
  { title: 'Beef Seekh Kabab', image: '/Popular Recipes Images/Beef Seekh Kabab.png', rating: 5, link: "https://youtu.be/OKjyNvM5l_o?si=EjFCDiqBPpKE20iQ" },
  { title: 'Chicken Tikka', image: '/Popular Recipes Images/Chicken Tikka.png', rating: 5, link: "https://youtu.be/Vdyv8g1la8A?si=7bUVr5bgngLWMEbc" },
  { title: 'Beef Tikka', image: '/Popular Recipes Images/Beef Tikka.png', rating: 5, link: "https://youtu.be/SJHnahGxXwM?si=bgneAtmcLho0l-dZ" },
  { title: 'Beef Boti', image: '/Popular Recipes Images/Beef Boti.png', rating: 5, link: "https://youtu.be/drG1ug8t9SU?si=qdMKyHV7JbeabqxS" },
  { title: 'Chicken  Shami Kebab', image: '/Popular Recipes Images/Chicken Kebab.png', rating: 5, link: "https://youtu.be/mG_PSu2VNbU?si=kyxix-mTLomBduMq" },
  { title: 'Bhindi', image: '/Popular Recipes Images/Bhindi.png', rating: 5, link: "https://youtu.be/tdHMQ37OMgA?si=INAHXRRSE4QSnVC8" },
  { title: 'Fried fish', image: '/Popular Recipes Images/Fried fish.png', rating: 5, link: "https://youtu.be/GLMqayVEHEM?si=DZsvXfi-66j_8BO8" },
  { title: 'Naray ghokha', image: '/Popular Recipes Images/Naray ghokha.png', rating: 5, link: "https://youtu.be/0YS7VOItcK0?si=WdG8l7WLqEv6GxxA" },
  { title: 'Wara marai', image: '/Popular Recipes Images/Wara marai.png', rating: 5, link: "https://youtu.be/ccA-QIMwBzY?si=FSc7uWF8zALcr14G" },
  { title: 'Mantu', image: '/Popular Recipes Images/Mantu.png', rating: 5, link: "https://youtu.be/7RVhb5TJFmg?si=NFigGqBrttf1m9wm" },
  { title: 'Chicken Kaliji', image: '/Popular Recipes Images/Liver Korma.png', rating: 5, link: "https://youtu.be/faF5Z7L3aaI?si=67gE7zwXflUShJ-Y" },
  { title: 'Afghani Korma', image: '/Popular Recipes Images/Afghani Korma.png', rating: 5, link: "https://youtu.be/xzkSrTUxWUk?si=VLWJFp1NI3LQNplr" },
  { title: 'chapli kabab', image: '/Popular Recipes Images/chapli kabab.png', rating: 5, link: "https://youtu.be/ngSBOwUN6Ts?si=EKw6-hvbXY-EPv1u" },
  { title: 'Shinwari Roasted Lamb', image: '/Popular Recipes Images/Shinwari Roasted Lamb.png', rating: 5, link: "https://youtu.be/dPSZJyGHsH8?si=Vkn7FR9zT7HMdyY-" },
  { title: 'Peshawari Yakhni', image: '/Popular Recipes Images/Peshawari Yakhni.png', rating: 5, link: "https://youtu.be/n5j3xQRaDp8?si=jCcsq2cnztGV8auq" },
];

const dessertCategories = [
  "Firnee", "Malida", "Gosh-e Fil", "Sheer Pira", "Haft Mewa", 
  "Sheer Yakh", "Afghani Cream Horns", "Jalebi", "Kolcha Khatai",
  "Shir Berinj", "Mardan Pera", "Sohan Halwa", "Suji Ka Halwa",
  "Peshawari Kheer", "Barfi", "Kajar Ka Halwa", "Falooda", "Laddu",
  "Rabri", "Gulab jamun", "Anday Ka Halwa", "Shahi Tukray",
  "Doodh Dulari", "Chana Daal Halwa", "Besan Ka Halwa", "Badam Kheer",
  "Phirni", "Chocolate Barfi", "Coconut Laddu", "Anjeer Barfi",
  "Dry Fruit Halwa", "Boondi Laddu", "Rose Gulkand Barfi", "Milk Cake",
  "Zarda (Sweet Rice)", "Panjiri", "Khopra Mithai", "Jawarish-e-Anar",
  "Sooji Toast Halwa", "Carrot Barfi", "Ras Malai", "Creamy Fruit Custard",
  "Multani Sohan Halwa", "Khajoor Ka Halwa", "Balushahi"
];

const Profile = ({ user }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [userData, setUserData] = useState({ favorites: {}, saved: {} });

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getMainDishFavorites = () => {
    if (!userData.favorites) return [];
    return mainDishesRecipes.filter(recipe => 
      userData.favorites[recipe.title] === true
    );
  };

  const getDessertFavorites = () => {
    if (!userData.favorites) return [];
    return dessertCategories
      .filter(name => userData.favorites[name] === true)
      .map(name => ({
        title: name,
        image: `/Recipe Carousel Images/${name.replace(/\s+/g, ' ').trim()}.png`,
        rating: 5,
        link: "#" // You can add actual links if needed
      }));
  };

  const getSavedRecipes = () => {
    if (!userData.saved) return [];
    return mainDishesRecipes.filter(recipe => 
      userData.saved[recipe.title] === true
    );
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      p: 3,
      pt: 6
    }}>
      <Paper elevation={6} sx={{
        width: '100%',
        maxWidth: 800,
        backgroundColor: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        mb: 4
      }}>
        <Box sx={{
          height: 120,
          width: '100%',
          background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
          position: 'relative',
          mb: 8
        }}>
          <Avatar
            src={user.photoURL}
            sx={{
              width: 120,
              height: 120,
              fontSize: '3rem',
              border: '4px solid white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              position: 'absolute',
              bottom: -60,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#64b5f6'
            }}
          >
            {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
          </Avatar>
        </Box>

        <Box sx={{ p: 4, pt: 8 }}>
          <Typography variant="h4" sx={{
            color: '#212121',
            fontWeight: 700,
            textAlign: 'center',
            mb: 1
          }}>
            {user.displayName || "Guest User"}
          </Typography>

          <Typography variant="body1" sx={{
            color: '#757575',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            mb: 3
          }}>
            {user.email}
            <IconButton size="small" sx={{
              color: '#2196f3',
              '&:hover': {
                color: '#1976d2'
              }
            }}>
              <Edit fontSize="small" />
            </IconButton>
          </Typography>

          <Divider sx={{
            my: 3,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderBottomWidth: 2
          }} />

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              mb: 3,
              '& .MuiTabs-indicator': {
                backgroundColor: '#2196f3',
                height: 3
              }
            }}
          >
            <Tab
              label="Favorites"
              icon={<Favorite />}
              iconPosition="start"
              sx={{
                fontWeight: 600,
                color: tabValue === 0 ? '#2196f3' : '#757575',
                textTransform: 'none',
                fontSize: '0.9rem'
              }}
            />
            <Tab
              label="Saved Recipes"
              icon={<Bookmark />}
              iconPosition="start"
              sx={{
                fontWeight: 600,
                color: tabValue === 1 ? '#2196f3' : '#757575',
                textTransform: 'none',
                fontSize: '0.9rem'
              }}
            />
          </Tabs>

          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: '#424242' }}>
                Your Favorite Recipes
              </Typography>
              
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, color: '#1976d2' }}>
                Main Dishes
              </Typography>
              {getMainDishFavorites().length > 0 ? (
                <Grid container spacing={2}>
                  {getMainDishFavorites().map((recipe, index) => (
                    <Grid item xs={12} sm={6} md={4} key={`main-${index}`}>
                      <Card
                        component={motion.div}
                        whileHover={{ y: -5 }}
                        sx={{
                          borderRadius: 2,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          height: '100%',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                        onClick={() => window.open(recipe.link, '_blank')}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={recipe.image}
                          alt={recipe.title}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="subtitle1" component="div">
                            {recipe.title}
                          </Typography>
                          <Rating
                            value={recipe.rating}
                            readOnly
                            size="small"
                            precision={0.5}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1" sx={{ color: '#757575', mb: 3 }}>
                  No favorite main dishes yet.
                </Typography>
              )}
              
              <Typography variant="subtitle1" sx={{ mt: 4, mb: 1, color: '#1976d2' }}>
                Desserts
              </Typography>
              {getDessertFavorites().length > 0 ? (
                <Grid container spacing={2}>
                  {getDessertFavorites().map((recipe, index) => (
                    <Grid item xs={12} sm={6} md={4} key={`dessert-${index}`}>
                      <Card
                        component={motion.div}
                        whileHover={{ y: -5 }}
                        sx={{
                          borderRadius: 2,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          height: '100%',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                        onClick={() => window.open(recipe.link, '_blank')}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={recipe.image}
                          alt={recipe.title}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="subtitle1" component="div">
                            {recipe.title}
                          </Typography>
                          <Rating
                            value={recipe.rating}
                            readOnly
                            size="small"
                            precision={0.5}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1" sx={{ color: '#757575' }}>
                  No favorite desserts yet.
                </Typography>
              )}
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: '#424242' }}>
                Your Saved Recipes
              </Typography>
              {getSavedRecipes().length > 0 ? (
                <Grid container spacing={2}>
                  {getSavedRecipes().map((recipe, index) => (
                    <Grid item xs={12} sm={6} md={4} key={`saved-${index}`}>
                      <Card
                        component={motion.div}
                        whileHover={{ y: -5 }}
                        sx={{
                          borderRadius: 2,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          height: '100%',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                        onClick={() => window.open(recipe.link, '_blank')}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={recipe.image}
                          alt={recipe.title}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="subtitle1" component="div">
                            {recipe.title}
                          </Typography>
                          <Rating
                            value={recipe.rating}
                            readOnly
                            size="small"
                            precision={0.5}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1" sx={{ color: '#757575', textAlign: 'center', py: 4 }}>
                  You haven't saved any recipes yet.
                </Typography>
              )}
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          <Button
            variant="contained"
            startIcon={<Logout sx={{ color: 'white' }} />}
            onClick={handleLogout}
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: '12px',
              background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
              color: 'white',
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              boxShadow: '0 4px 10px rgba(33, 150, 243, 0.3)',
              '&:hover': {
                background: 'linear-gradient(90deg, #1565c0 0%, #1976d2 100%)',
                boxShadow: '0 6px 14px rgba(33, 150, 243, 0.4)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Log Out
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;