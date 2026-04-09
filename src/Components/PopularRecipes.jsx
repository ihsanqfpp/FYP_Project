
import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Grid, 
    Typography, 
    Card, 
    CardMedia, 
    Rating, 
    Button, 
    IconButton,
    Tooltip,
    Zoom,
    Grow
} from '@mui/material';
import { 
    PlayCircleOutline, 
    Favorite, 
    FavoriteBorder,
    Share,
    Bookmark,
    BookmarkBorder
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnackbar } from 'notistack';




const recipes = [
    { title: 'Charsadda Chawal', image: '/Popular Recipes Images/Charsada_chawal.png', rating: 3, link: "https://youtu.be/4NOFbqqaWoM?si=bCCNvi5Q8zsHp0jR" },
    { title: 'Chicken Handi', image: '/Popular Recipes Images/Chicken_Handi.png', rating: 2, link: "https://youtu.be/eIibtZgagQc?si=YwLff74HhXeYalXg" },
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

const PopularRecipes = ({ searchQuery = '' }) => {
    const [visibleCount, setVisibleCount] = useState(6);
    const [favorites, setFavorites] = useState({});
    const [saved, setSaved] = useState({});
    const [isMobile, setIsMobile] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        
        // Load favorites and saved recipes from localStorage
        const loadUserData = () => {
            const userData = JSON.parse(localStorage.getItem('userData')) || {};
            setFavorites(userData.favorites || {});
            setSaved(userData.saved || {});
        };
        
        loadUserData();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + 3, recipes.length));
    };

    const handleCardClick = (link) => {
        window.open(link, '_blank');
    };

    const updateUserData = (key, value) => {
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        userData[key] = value;
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    const toggleFavorite = (recipeTitle, e) => {
        e.stopPropagation();
        const newFavorites = {
            ...favorites,
            [recipeTitle]: !favorites[recipeTitle]
        };
        setFavorites(newFavorites);
        updateUserData('favorites', newFavorites);
        enqueueSnackbar(
             `${newFavorites[recipeTitle] ? 'Added to' : 'Removed from'} favorites`,
            { variant: 'success', autoHideDuration: 1500 }
        );
    };

    const toggleSaved = (recipeTitle, e) => {
        e.stopPropagation();
        const newSaved = {
            ...saved,
            [recipeTitle]: !saved[recipeTitle]
        };
        setSaved(newSaved);
        updateUserData('saved', newSaved);
        enqueueSnackbar(
           `${newSaved[recipeTitle] ? 'Saved for later' : 'Removed from saved'}`,  
            { variant: 'info', autoHideDuration: 1500 }
        );
    };

    const shareRecipe = (recipe, e) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: recipe.title,
                text: `Check out this amazing ${recipe.title} recipe!`,

                url: recipe.link,
            }).catch(err => {
                enqueueSnackbar('Error sharing recipe', { variant: 'error' });
            });
        } else {
            navigator.clipboard.writeText(recipe.link);
            enqueueSnackbar('Link copied to clipboard!', { variant: 'success' });
        }
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ 
            px: { xs: 2, md: 4 }, 
            py: 6, 
            backgroundColor: '#f9f9f9',
            position: 'relative'
        }}>
            {/* Left-aligned header section */}
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start',
                mb: 4
            }}>
                <Typography variant="h3" sx={{ 
                    color: 'black',
                    textAlign: 'left',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    letterSpacing: '1px',
                    px: 2
                }}>
                    POPULAR RECIPES
                </Typography>
                
                <Box sx={{ 
                    height: '4px', 
                    width: 80, 
                    background: 'linear-gradient(90deg, #FF6600, #FF8C00)',
                    ml: 2,
                    borderRadius: '2px',
                    boxShadow: '0 2px 4px rgba(255,102,0,0.3)'
                }} />
            </Box>

            {filteredRecipes.length === 0 ? (
                <Typography variant="h5" textAlign="center" sx={{ 
                    py: 4,
                    color: '#666',
                    fontStyle: 'italic'
                }}>
                    No recipes found matching "{searchQuery}"
                </Typography>
            ) : (
                <Grid container spacing={4}>
                    {filteredRecipes.slice(0, visibleCount).map((recipe, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card
                                component={motion.div}
                                whileHover={{ y: -10 }}
                                sx={{
                                    position: 'relative',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                                    '&:hover': {
                                        boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
                                    },
                                }}
                                onClick={() => handleCardClick(recipe.link)}
                            >
                                <Box sx={{ 
                                    position: 'relative', 
                                    flexGrow: 1,
                                    overflow: 'hidden',
                                    height: isMobile ? '200px' : '240px'
                                }}>
                                    <CardMedia
                                        component="img"
                                        image={recipe.image}
                                        alt={recipe.title}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                        }}
                                    />
                                    
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                        zIndex: 2
                                    }}>
                                        <Tooltip title={favorites[recipe.title] ? 'Remove from favorites' : 'Add to favorites'}>
                                            <IconButton
                                                sx={{
                                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                                    '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                                                }}
                                                onClick={(e) => toggleFavorite(recipe.title, e)}
                                            >
                                                {favorites[recipe.title] ? (
                                                    <Favorite sx={{ color: '#FF4081' }} />
                                                ) : (
                                                    <FavoriteBorder sx={{ color: '#555' }} />
                                                )}
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title={saved[recipe.title] ? 'Remove from saved' : 'Save for later'}>
                                            <IconButton
                                                sx={{
                                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                                    '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                                                }}
                                                onClick={(e) => toggleSaved(recipe.title, e)}
                                            >
                                                {saved[recipe.title] ? (
                                                    <Bookmark sx={{ color: '#4CAF50' }} />
                                                ) : (
                                                    <BookmarkBorder sx={{ color: '#555' }} />
                                                )}
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Share recipe">
                                            <IconButton
                                                sx={{
                                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                                    '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                                                }}
                                                onClick={(e) => shareRecipe(recipe, e)}
                                            >
                                                <Share sx={{ color: '#2196F3' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>
                                
                                <Box
                                    sx={{
                                        width: '100%',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                        p: 2,
                                        position: 'relative',
                                    }}
                                >
                                    <Typography 
                                        variant="h6" 
                                        fontWeight="bold" 
                                        sx={{
                                            color: '#fff',
                                            textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
                                            fontFamily: "'Poppins', sans-serif",
                                            mb: 0.5
                                        }}
                                    >
                                        {recipe.title}
                                    </Typography>
                                    
                                    <Rating 
                                        value={recipe.rating} 
                                        readOnly 
                                        size="small" 
                                        sx={{
                                            '& .MuiRating-iconFilled': { color: '#FFD700' },
                                            '& .MuiRating-iconEmpty': { color: 'rgba(255,255,255,0.5)' },
                                        }}
                                    />
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {visibleCount < filteredRecipes.length && (
                <Box textAlign="center" mt={6}>
                    <Button
                        component={motion.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(45deg, #FF8C00, #FF6600)',
                            color: '#fff',
                            px: 6,
                            py: 1.5,
                            fontWeight: 600,
                            borderRadius: 50,
                            fontSize: '1rem',
                            textTransform: 'none',
                            boxShadow: '0 4px 15px rgba(255,102,0,0.4)',
                            '&:hover': { background: 'linear-gradient(45deg, #FF6600, #FF8C00)' }
                        }}
                        onClick={handleLoadMore}
                    >
                        Load More Recipes
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default PopularRecipes;