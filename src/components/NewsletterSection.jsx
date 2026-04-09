import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  IconButton,
  Collapse,
  Fade,
  Grow,
  Slide,
  Avatar,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  Send,
  Email,
  CheckCircle,
  Close,
  Bolt,
  Restaurant,
  LocalPizza,
  Cake,
  Icecream
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Floating Food Component
const FloatingFood = ({ position, icon }) => {
  const meshRef = useRef();
  const speed = 0.5 + Math.random() * 0.5;
  const rotationSpeed = 0.01 + Math.random() * 0.02;
  const amplitude = 0.5 + Math.random();

  useFrame(({ clock }) => {
    meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed) * amplitude;
    meshRef.current.rotation.x += rotationSpeed;
    meshRef.current.rotation.y += rotationSpeed;
  });

  return (
    <mesh position={position} ref={meshRef}>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial 
        color={new THREE.Color(Math.random(), Math.random(), Math.random()).multiplyScalar(2)}
        emissive="#ff6600"
        emissiveIntensity={0.2}
        roughness={0.7}
        metalness={0.3}
      />
    </mesh>
  );
};

// Particle System
const Particles = ({ count = 100 }) => {
  const particlesRef = useRef();
  const particles = useRef();

  useEffect(() => {
    particles.current = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      particles.current[i * 3] = (Math.random() - 0.5) * 10;
      particles.current[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particles.current[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    particlesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(particles.current, 3));
  }, [count]);

  useFrame(({ clock }) => {
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      particles.current[i3 + 1] += 0.01;
      if (particles.current[i3 + 1] > 5) {
        particles.current[i3 + 1] = -5;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry" />
      <pointsMaterial 
        attach="material" 
        size={0.05} 
        sizeAttenuation 
        color="#ffaa00" 
        transparent 
        opacity={0.8}
      />
    </points>
  );
};

// Custom animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeFood, setActiveFood] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const formRef = useRef();

  const socialIcons = [
    { icon: <Facebook />, name: 'Facebook', color: '#1877F2' },
    { icon: <Twitter />, name: 'Twitter', color: '#1DA1F2' },
    { icon: <Instagram />, name: 'Instagram', color: '#E1306C' },
    { icon: <LinkedIn />, name: 'LinkedIn', color: '#0077B5' },
    { icon: <YouTube />, name: 'YouTube', color: '#FF0000' },
  ];

  const foodItems = [
    { icon: <Restaurant />, name: 'Main Course' },
    { icon: <LocalPizza />, name: 'Pizza' },
    { icon: <Cake />, name: 'Desserts' },
    { icon: <Icecream />, name: 'Ice Cream' },
  ];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }

    setIsSubmitting(true);
    setIsValid(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setEmail('');
        setIsSuccess(false);
      }, 3000);
    }, 2000);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value.length > 0) {
      setIsValid(validateEmail(e.target.value));
    } else {
      setIsValid(null);
    }
  };

  return (
    <Box sx={{ 
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    }}>
      {/* 3D Background Scene */}
      {!isMobile && (
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.3,
        }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <FloatingFood position={[-2, 1, 0]} />
            <FloatingFood position={[2, -1, 0]} />
            <FloatingFood position={[0, 0, -2]} />
            <Particles count={200} />
          </Canvas>
        </Box>
      )}

      {/* Social Bar with Interactive Elements */}
      <Box
        sx={{
          background: 'linear-gradient(90deg, rgba(30,30,30,0.95) 0%, rgba(50,50,50,0.9) 100%)',
          py: 2,
          backdropFilter: 'blur(16px) saturate(200%)',
          WebkitBackdropFilter: 'blur(16px) saturate(200%)',
          boxShadow: '0 8px 48px rgba(0, 0, 0, 0.4)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
            }}
          >
            <Slide in direction="right" timeout={800}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                  letterSpacing: '1px',
                  background: 'linear-gradient(45deg, #fff, #aaa)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  animation: `${gradientShift} 8s ease infinite`,
                  backgroundSize: '200% 200%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Bolt sx={{ color: '#FFAA00' }} /> CONNECT WITH OUR CULINARY NETWORK
              </Typography>
            </Slide>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialIcons.map((item, index) => (
                <Tooltip key={item.name} title={item.name} arrow>
                  <IconButton
                    aria-label={item.name}
                    sx={{
                      color: 'white',
                      transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
                      transform: 'scale(1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        backgroundColor: `${item.color}`,
                        boxShadow: `0 0 20px ${item.color}`,
                        transform: 'scale(1.2) rotate(10deg)',
                      },
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Newsletter Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          px: 2,
          color: 'white',
          minHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
            }}
          >
            <Grow in timeout={1000}>
              <Box>
                <Typography
                  variant="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 900,
                    mb: 2,
                    textShadow: '0 4px 12px rgba(0,0,0,0.6)',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    letterSpacing: '-0.5px',
                    lineHeight: 1.2,
                    background: 'linear-gradient(to right, #ff8a00, #ff4d00, #ff8a00)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    animation: `${gradientShift} 6s ease infinite`,
                    backgroundSize: '200% 200%',
                  }}
                >
                  JOIN OUR CULINARY REVOLUTION
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    mb: 4,
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    opacity: 0.9,
                    maxWidth: '700px',
                    mx: 'auto',
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                  }}
                >
                  Get weekly exclusive recipes from top chefs, AI-generated meal plans, and VIP access to our virtual cooking classes
                </Typography>
              </Box>
            </Grow>

            {/* Interactive Food Preference Selector */}
            <Fade in timeout={1500}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, opacity: 0.8 }}>
                  What are you craving?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  {foodItems.map((item) => (
                    <Tooltip key={item.name} title={item.name} arrow>
                      <Avatar
                        sx={{
                          bgcolor: activeFood === item.name ? 'primary.main' : 'rgba(255,255,255,0.1)',
                          width: 56,
                          height: 56,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                            boxShadow: '0 0 20px rgba(255,165,0,0.5)',
                          },
                          animation: `${pulse} 4s infinite ease-in-out`,
                        }}
                        onClick={() => setActiveFood(item.name)}
                      >
                        {item.icon}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Box>
              </Box>
            </Fade>

            {/* Interactive Form with AI Validation */}
            <Box
              component="form"
              ref={formRef}
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                mt: 4,
                position: 'relative',
              }}
            >
              <Fade in={!isSuccess} timeout={1500}>
                <Box sx={{ 
                  width: '100%', 
                  maxWidth: '600px',
                  position: 'relative',
                }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Your professional email address"
                    value={email}
                    onChange={handleEmailChange}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '50px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '50px',
                        paddingLeft: 2,
                        '& fieldset': {
                          border: 'none',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                        },
                        '&:hover fieldset': {
                          border: 'none',
                          boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
                        },
                        '&.Mui-focused fieldset': {
                          border: 'none',
                          boxShadow: '0 0 0 2px #ff8a00, 0 8px 32px rgba(255,138,0,0.3)',
                        },
                      },
                      transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    }}
                    InputProps={{
                      style: {
                        fontSize: '1.1rem',
                        height: '60px',
                      },
                      startAdornment: (
                        <Email sx={{ color: 'text.secondary', mr: 1, opacity: 0.7 }} />
                      ),
                      endAdornment: isValid !== null && (
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          pr: 2,
                          color: isValid ? '#4CAF50' : '#F44336',
                        }}>
                          {isValid ? <CheckCircle /> : <Close />}
                        </Box>
                      ),
                    }}
                  />
                  {isValid === false && (
                    <Typography 
                      variant="caption" 
                      sx={{
                        position: 'absolute',
                        bottom: '-20px',
                        left: '24px',
                        color: '#F44336',
                        fontSize: '0.8rem',
                      }}
                    >
                      Please enter a valid email address
                    </Typography>
                  )}
                </Box>
              </Fade>

              <Fade in={!isSuccess} timeout={1500}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  endIcon={<Send sx={{ 
                    transition: 'transform 0.3s ease',
                    transform: isSubmitting ? 'translateX(5px)' : 'translateX(0)',
                  }} />}
                  sx={{
                    background: 'linear-gradient(45deg, #FF8A00 0%, #FF4D00 100%)',
                    color: 'white',
                    borderRadius: '50px',
                    px: 6,
                    py: 2,
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    letterSpacing: '1px',
                    minWidth: '220px',
                    height: '60px',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF4D00 0%, #FF8A00 100%)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 24px rgba(255,77,0,0.4)',
                    },
                    '&:active': {
                      transform: 'translateY(1px)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 8px 20px rgba(255,77,0,0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: isSubmitting ? '100%' : '0%',
                      height: '100%',
                      background: 'rgba(255,255,255,0.2)',
                      transition: 'width 2s linear',
                    },
                  }}
                >
                  {isSubmitting ? 'OPTIMIZING YOUR PREFERENCES...' : 'GET SMART RECIPES'}
                </Button>
              </Fade>

              {/* Success Message */}
              <Collapse in={isSuccess}>
                <Box sx={{
                  mt: 3,
                  p: 3,
                  backgroundColor: 'rgba(76, 175, 80, 0.2)',
                  borderRadius: '16px',
                  border: '1px solid rgba(76, 175, 80, 0.3)',
                  backdropFilter: 'blur(10px)',
                  maxWidth: '500px',
                  textAlign: 'center',
                  animation: `${pulse} 2s infinite`,
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    WELCOME TO OUR CULINARY CIRCLE!
                  </Typography>
                  <Typography variant="body1">
                    We're analyzing your food preferences and crafting personalized recommendations...
                  </Typography>
                </Box>
              </Collapse>
            </Box>

            {/* Interactive Stats */}
            <Fade in timeout={2000}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 4,
                mt: 6,
                flexWrap: 'wrap',
              }}>
                {[
                  { value: '15K+', label: 'Recipes Available' },
                  { value: '98%', label: 'Satisfaction Rate' },
                  { value: '24/7', label: 'AI Chef Support' },
                ].map((stat, index) => (
                  <Box 
                    key={stat.label}
                    sx={{
                      textAlign: 'center',
                      animation: `${float} 3s infinite ease-in-out ${index * 0.3}s`,
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFAA00' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Fade>
          </Box>
        </Container>
      </Box>

      {/* Animated Floating Elements */}
      {!isMobile && (
        <>
          <Box sx={{
            position: 'absolute',
            top: '30%',
            left: '5%',
            zIndex: 0,
            animation: `${float} 6s infinite ease-in-out`,
          }}>
            <LocalPizza sx={{ fontSize: '4rem', opacity: 0.1 }} />
          </Box>
          <Box sx={{
            position: 'absolute',
            bottom: '20%',
            right: '8%',
            zIndex: 0,
            animation: `${float} 7s infinite ease-in-out 1s`,
          }}>
            <Cake sx={{ fontSize: '5rem', opacity: 0.1 }} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default NewsletterSection;
