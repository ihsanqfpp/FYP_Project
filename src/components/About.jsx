import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  useMediaQuery,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import PublicIcon from '@mui/icons-material/Public';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import CakeIcon from '@mui/icons-material/Cake';
import CountUp from 'react-countup';

const MotionBox = motion(Box);

const testimonials = [
  { name: 'Ali Khan', feedback: 'FoodiePK changed how I cook!', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Ayesha Bibi', feedback: 'Sleek UI and tasty recipes!', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Raza Ahmed', feedback: 'Huge variety of Desi meals.', avatar: 'https://randomuser.me/api/portraits/men/66.jpg' },
];

const contributors = [
  { name: 'Imran Chef', role: 'Head Recipe Creator', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Sara Cook', role: 'Food Photographer', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { name: 'Bilal Qureshi', role: 'Nutritionist', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
];

function About() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ bgcolor: '#fdfdfd', pb: 12 }}>
      {/* 🌄 Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: isMobile ? '45vh' : '70vh',
          backgroundImage: `url("/About/aboutBG.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
        }}
      >
        <Box
          sx={{
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0,0,0,0.4)',
            p: 4,
            borderRadius: 4,
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <Typography variant={isMobile ? 'h4' : 'h3'} fontWeight="bold">
            Discover the Taste of Pakistan
          </Typography>
          <Typography variant="subtitle1" mt={1}>
            Traditional Desi & Global Recipes at Your Fingertips
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 3, borderRadius: 3, background: '#ff7043' }}
          >
            Start Cooking
          </Button>
        </Box>
      </Box>

      {/* 🔢 Animated Counters */}
      <Box sx={{ py: 6, px: { xs: 2, sm: 4 }, background: '#fffbe7' }}>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {[{
            label: 'Recipes',
            icon: '🍲',
            count: 150
          }, {
            label: 'Contributors',
            icon: '👨‍🍳',
            count: 40
          }, {
            label: 'Visitors',
            icon: '📈',
            count: 120000
          }].map((item, index) => (
            <Grid item xs={12} sm={4} key={index} textAlign="center">
              <Box sx={{ fontSize: '3rem' }}>{item.icon}</Box>
              <Typography variant="h4" fontWeight="bold">
                <CountUp end={item.count} duration={2.5} separator="," />
                {item.label === 'Visitors' ? '+' : ''}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {item.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 💡 Why FoodiePK */}
      <MotionBox
        sx={{ p: { xs: 2, sm: 4 }, mt: -2 }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
          Why FoodiePK?
        </Typography>
        <Typography variant="body1" textAlign="center" mb={4}>
          Explore authentic and easy-to-follow recipes with an elegant interface.
        </Typography>

        <Grid container spacing={3}>
          {[{
            icon: <RestaurantMenuIcon color="primary" fontSize="large" />,
            title: 'Authentic Recipes',
            text: 'Step-by-step guides with local ingredients and full instructions.'
          }, {
            icon: <LocalDiningIcon color="success" fontSize="large" />,
            title: 'Modern UI',
            text: 'Filters, categories, and smart search for fast discovery.'
          }, {
            icon: <PublicIcon color="secondary" fontSize="large" />,
            title: 'Global Taste',
            text: 'Beyond borders – experience international food made local.'
          }].map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                sx={{ p: 3, borderRadius: 4, boxShadow: 3, height: '100%' }}
              >
                <CardContent>
                  {item.icon}
                  <Typography variant="h6" mt={2}>{item.title}</Typography>
                  <Typography variant="body2" mt={1}>{item.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </MotionBox>

      {/* 💬 Testimonials */}
      <Box sx={{ mt: 8, px: { xs: 2, sm: 4 }, py: 6, background: 'linear-gradient(to right, #fff, #ffe0b2)' }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          What Our Users Say
        </Typography>
        <Swiper spaceBetween={16} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}>
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <Card sx={{ p: 3, m: 2, borderRadius: 4, boxShadow: 2, textAlign: 'center' }}>
                <Avatar src={t.avatar} sx={{ width: 60, height: 60, mx: 'auto', mb: 1 }} />
                <Typography variant="h6">{t.name}</Typography>
                <Typography variant="body2" color="text.secondary">"{t.feedback}"</Typography>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* 👨‍🍳 Contributors */}
      <Box sx={{ mt: 6, px: { xs: 2, sm: 4 }, pb: 8 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
          Meet Our Contributors
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {contributors.map((c, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ textAlign: 'center', p: 3, borderRadius: 3 }}>
                <Avatar src={c.avatar} sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }} />
                <Typography variant="h6">{c.name}</Typography>
                <Typography variant="body2" color="text.secondary">{c.role}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 📌 Sticky Bottom Bar */}
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderTop: '1px solid #ddd',
          backgroundColor: '#fff',
        }}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction label="Popular" icon={<WhatshotIcon />} />
          <BottomNavigationAction label="Soups" icon={<RamenDiningIcon />} />
          <BottomNavigationAction label="Desserts" icon={<CakeIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default About;
