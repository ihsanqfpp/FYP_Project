import React, { useState, useEffect } from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const categories = [
  { name: "Firnee", image: "/Recipe Carousel Images/Firnee.png", link: "https://youtu.be/GvbaD74C2IY?si=t5cGUwaVl6rNYYtF" },
  { name: "Malida", image: "/Recipe Carousel Images/Malida.png", link: "https://youtu.be/Njcx5C5DRyM?si=VhIMIRasU7HP1EYn" },
  { name: "Gosh-e Fil", image: "/Recipe Carousel Images/Gosh-e Fil.png", link: "https://youtu.be/bF2Ko9_P_lI?si=8GnpFw_Xvuj2IBea" },
  { name: "Sheer Pira", image: "/Recipe Carousel Images/Sheer Pira.png", link: "https://youtu.be/pEpU5chBLkM?si=EfjTvLNcPuSjmtvs" },
  { name: "Haft Mewa", image: "/Recipe Carousel Images/Haft Mewa.png", link: "https://youtu.be/4Y_x_dZN6TQ?si=bCUYlBngceC3YrhJ" },
  { name: "Sheer Yakh", image: "/Recipe Carousel Images/Sheer Yakh.png", link: "https://youtu.be/WkNvrmV7xPk?si=cBs6SMIhZyqiBUjO" },
  { name: "Afghani Cream Horns", image: "/Recipe Carousel Images/Afghani Cream Horns.png", link: "https://youtu.be/YuV0wCuG5V4?si=ua3bDIZRhuUGpRQO" },
  { name: "Jalebi", image: "/Recipe Carousel Images/Jalebi.png", link: "https://youtu.be/BMUonq3Eb7I?si=gq7Pk-25481yY2ip" },
  { name: "Kolcha Khatai", image: "/Recipe Carousel Images/Kolcha Khatai.png", link: "https://youtu.be/PhG--KPRsmg?si=cihPa1cr_-7kZM4I" },
  { name: "Shir Berinj", image: "/Recipe Carousel Images/Shir Berinj.png", link: "https://youtu.be/On1lIUTxxKo?si=QKWhLLnRUpKMFR0P" },
  { name: "Mardan Pera", image: "/Recipe Carousel Images/Mardan pera.png", link: "https://youtu.be/acQy66GU1f4?si=LdKGn3D_weglSle6" },
  { name: "Sohan Halwa", image: "/Recipe Carousel Images/Sohan Halwa.png", link: "https://youtu.be/taPu2Eq1WHs?si=QV-FC_sNjH9WH3tA" },
  { name: "Suji Ka Halwa", image: "/Recipe Carousel Images/Suji Ka Halwa.png", link: "https://youtu.be/7ldKgwh7Vs0?si=lUAywUJ2dpIWg8TZ" },
  { name: "Peshawari Kheer", image: "/Recipe Carousel Images/Peshawari Kheer.png", link: "https://youtu.be/ozVyRBwtTKY?si=ObbXc2ZLPTCV6WoA" },
  { name: "Barfi", image: "/Recipe Carousel Images/Barfi.png", link: "https://youtu.be/Aj6tjFCqrx0?si=7gE0j6EdGzlEvfT3" },
  { name: "Kajar Ka Halwa", image: "/Recipe Carousel Images/Kajar Ka Halwa.png", link: "https://youtu.be/SGWyulWSWCE?si=Wlt9WjQT9KBiJqkI" },
  { name: "Falooda", image: "/Recipe Carousel Images/Falooda.png", link: "https://youtu.be/35eYbIzUbm0?si=AaICQY6Qrl4JOPdc" },
  { name: "Laddu", image: "/Recipe Carousel Images/Laddu.png", link: "https://youtu.be/ha5iqVL4VNo?si=x_pCuAVFRMQo_xrM" },
  { name: "Rabri", image: "/Recipe Carousel Images/Rabri.png", link: "https://youtu.be/IfsLvhYfVSU?si=6UMSp2kjdUKg1Nkq" },
  { name: "Gulab jamun", image: "/Recipe Carousel Images/Gulab jamun.png", link: "https://youtu.be/UuHwxMiyW-4?si=i2LzDKUaros9UWUD" },
  { name: "Anday Ka Halwa", image: "/Recipe Carousel Images/Anday Ka Halwa.png", link: "https://youtu.be/hpmOjFHqZEY?si=1ABrvxU684TU0Ko0" },
  { name: "Shahi Tukray", image: "/Recipe Carousel Images/Shahi Tukray.png", link: "https://youtu.be/VAd26uSFD1w?si=9KkeoIRLbbqnRU6q" },
  { name: "Doodh Dulari", image: "/Recipe Carousel Images/Doodh Dulari.png", link: "https://youtu.be/GFRuOPVFggM?si=kdn43JPoNlTHbnSN" },
  { name: "Chana Daal Halwa", image: "/Recipe Carousel Images/Chana Daal Halwa.png", link: "https://youtu.be/q2HCUh6fbP8?si=f47FcmIrmgSCkWf3" },
  { name: "Besan Ka Halwa", image: "/Recipe Carousel Images/Besan Ka Halwa.png", link: "https://youtu.be/oFCCjk6Zogc?si=hTzsJb21LtzKOsmM" },
  { name: "Badam Kheer", image: "/Recipe Carousel Images/Badam Kheer.png", link: "https://youtu.be/5LKmt8eDIHg?si=ZuOUHHL3cKLLNR6K" },
  { name: "Phirni", image: "/Recipe Carousel Images/Phirni.png", link: "https://youtu.be/E7gEjLC_5tY?si=pqaVtYSdcn7PueKB" },
  { name: "Chocolate Barfi", image: "/Recipe Carousel Images/Chocolate Barfi.png", link: "https://youtu.be/MycjAJiydpw?si=8X9DWSCxh2ixLzoh" },
  { name: "Coconut Laddu", image: "/Recipe Carousel Images/Coconut Laddu.png", link: "https://youtu.be/L36oPLgPHKs?si=GC442VEmQhkOfM1A" },
  { name: "Anjeer Barfi", image: "/Recipe Carousel Images/Anjeer Barfi.png", link: "https://youtu.be/_UFqOAnTRzQ?si=L-yvejruBSADpcOJ" },
  { name: "Dry Fruit Halwa", image: "/Recipe Carousel Images/Dry Fruit Halwa.png", link: "https://youtu.be/2caFygyvTgM?si=gaNPBnPNvqZPGUZj" },
  { name: "Boondi Laddu", image: "/Recipe Carousel Images/Boondi Laddu.png", link: "https://youtube.com/shorts/h9WJI_emyyA?si=a6xvVoycaFiKa6XF" },
  { name: "Rose Gulkand Barfi", image: "/Recipe Carousel Images/Rose Gulkand Barfi.png", link: "https://youtu.be/FCuYo_EnYJM?si=Aofsg961Y5N5o7MF" },
  { name: "Milk Cake ", image: "/Recipe Carousel Images/Milk Cake.png", link: "https://youtu.be/F6EWvqz01YU?si=g6L9VM1FK16gEdRd" },
  { name: "Zarda (Sweet Rice)", image: "/Recipe Carousel Images/Zarda (Sweet Rice).png", link: "https://youtu.be/59yogci-nZY?si=TKggWyCbAFKFBBG-" },
  { name: "Panjiri", image: "/Recipe Carousel Images/Panjiri.png", link: "https://youtu.be/tEDAyGG2zTk?si=CTd4xATSzDO2KDsY" },
  { name: "Khopra Mithai", image: "/Recipe Carousel Images/Khopra Mithai.png", link: "https://youtu.be/mn2iluAmW2o?si=XSgqVYDF_ksED8h6" },
  { name: "Jawarish-e-Anar", image: "/Recipe Carousel Images/Jawarish-e-Anar.png", link: "https://youtu.be/4uVBCoI7aro?si=wIQ8skXU5ODor82c" },
  { name: "Sooji Toast Halwa", image: "/Recipe Carousel Images/Sooji Toast Halwa.png", link: "https://youtu.be/1eOAeTPSMxk?si=ZonHI-bITunYweSa" },
  { name: "Carrot Barfi", image: "/Recipe Carousel Images/Carrot Barfi.png", link: "https://youtube.com/shorts/evnlm5D-0ok?si=xkjd4XbowHd6h0sv" },
  { name: "Ras Malai", image: "/Recipe Carousel Images/Ras Malai.png", link: "https://youtu.be/I1QJUhXAt_c?si=5dPWlqiHZmWUiktZ" },
  { name: "Creamy Fruit Custard", image: "/Recipe Carousel Images/Creamy Fruit Custard.png", link: "https://youtu.be/iRq42dfIuiw?si=gl1MV0UieX_dHO_J" },
  { name: "Multani Sohan Halwa ", image: "/Recipe Carousel Images/Multani Sohan Halwa.png", link: "https://youtu.be/taPu2Eq1WHs?si=sJCckNL1Y3jG3xL7" },
  { name: "Khajoor Ka Halwa ", image: "/Recipe Carousel Images/Khajoor Ka Halwa.png ", link: "https://youtu.be/nGCnHSGVr9M?si=tKKw6aKZH1ClXmiQ" },
  { name: "Balushahi", image: "/Recipe Carousel Images/Balushahi.png", link: "https://youtu.be/bz5aoLUa8_s?si=qh8Du7ayDchu3Sta" }
];

const RecipeCarousel = () => {
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      const userData = JSON.parse(savedData);
      if (userData.favorites) {
        const favoriteNames = Object.keys(userData.favorites)
          .filter(name => userData.favorites[name]);
        setFavorites(new Set(favoriteNames));
      }
    }
  }, []);

  const toggleFavorite = (name) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      if (updated.has(name)) {
        updated.delete(name);
      } else {
        updated.add(name);
      }
      
      const userData = JSON.parse(localStorage.getItem('userData')) || { favorites: {} };
      userData.favorites[name] = updated.has(name);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      return updated;
    });
  };

  return (
    <Box
      sx={{
        px: 3,
        py: 5,
        textAlign: "left",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#333",
          textAlign: "left",
          pl: 2,
          fontSize: "1.8rem",
        }}
      >
        Afghani Sweets And Desserts
      </Typography>
      <Box
        sx={{
          width: "80px",
          height: "4px",
          backgroundColor: "#1976d2",
          margin: "0",
          mb: 4,
          ml: 2,
        }}
      />

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Navigation]}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
          1200: { slidesPerView: 5, spaceBetween: 50 },
        }}
        style={{
          padding: "20px 40px",
          position: "relative",
        }}
      >
        {categories.map((item, index) => {
          const isFavorited = favorites.has(item.name);
          return (
            <SwiperSlide
              key={index}
              style={{ 
                opacity: 0,
                animation: "fadeInSlide 0.6s forwards",
                animationDelay: `${index * 0.15}s`
              }}
            >
              <Box
                sx={{
                  cursor: "pointer",
                  textAlign: "center",
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  backgroundColor: "#fff",
                  p: 1,
                  position: "relative",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  color="inherit"
                  sx={{
                    display: "block",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "120px",
                      height: "120px",
                      margin: "0 auto",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        display: "block",
                        margin: "0 auto",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </Box>
                </Link>

                <Typography
                  variant="subtitle1"
                  sx={{
                    mt: 1,
                    fontWeight: "600",
                    color: "#1976d2",
                    textAlign: "center",
                    fontSize: "1rem",
                  }}
                >
                  {item.name}
                </Typography>

                <IconButton
                  aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.name);
                  }}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    backgroundColor: isFavorited
                      ? "rgba(255, 140, 0, 0.9)"
                      : "rgba(255, 165, 0, 0.7)",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "rgba(255, 140, 0, 1)",
                      transform: "scale(1.15)",
                    },
                    p: 0.5,
                    width: 36,
                    height: 36,
                    transition: "background-color 0.3s ease, transform 0.3s ease",
                  }}
                >
                  {isFavorited ? <FavoriteIcon fontSize="medium" /> : <FavoriteBorderIcon fontSize="medium" />}
                </IconButton>
              </Box>
            </SwiperSlide>
          );
        })}

        <ArrowCircleLeftIcon
          className="swiper-button-prev"
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            zIndex: 10,
            cursor: "pointer",
            color: "orange",
            fontSize: 40,
            userSelect: "none",
            transform: "translateY(-50%)",
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#ff7f00",
            },
          }}
        />
        <ArrowCircleRightIcon
          className="swiper-button-next"
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            zIndex: 10,
            cursor: "pointer",
            color: "orange",
            fontSize: 40,
            userSelect: "none",
            transform: "translateY(-50%)",
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#ff7f00",
            },
          }}
        />
      </Swiper>

      <style>
        {`
          @keyframes fadeInSlide {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default RecipeCarousel;