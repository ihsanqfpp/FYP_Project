import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  TextField,
  Button,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
  Box,
  Fade
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { auth } from '../firebase';
import AuthLayout from './AuthLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [fieldFocus, setFieldFocus] = useState({ email: false, password: false });
  const navigate = useNavigate();
  const theme = useTheme();
  const controls = useAnimation();

  useEffect(() => {
    // Initial animation sequence
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    });
  }, [controls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      
      // Success animation
      await controls.start({
        scale: 0.98,
        transition: { duration: 0.2 }
      });
      await controls.start({
        scale: 1,
        transition: { duration: 0.3 }
      });
      
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      // Error shake animation
      await controls.start({
        x: [-5, 5, -5, 5, 0],
        transition: { duration: 0.5 }
      });
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleFieldFocus = (field) => {
    setFieldFocus({ ...fieldFocus, [field]: true });
  };

  const handleFieldBlur = (field) => {
    setFieldFocus({ ...fieldFocus, [field]: false });
  };

  return (
    <AuthLayout
      title="Welcome to KPK Recipes"
      toggleText="Don't have an account?"
      toggleLinkText="Sign Up"
      toggleForm={handleSignupClick}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
      >
        <form onSubmit={handleSubmit}>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert 
                  severity="error" 
                  sx={{ mb: 2 }}
                  component={motion.div}
                  whileHover={{ scale: 1.02 }}
                >
                  {error}
                </Alert>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Alert 
                  severity="success" 
                  sx={{ mb: 2 }}
                >
                  Login successful! Redirecting...
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => handleFieldFocus('email')}
              onBlur={() => handleFieldBlur('email')}
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <motion.div
                      animate={{
                        scale: fieldFocus.email ? 1.2 : 1,
                        rotate: fieldFocus.email ? 5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Typography color="text.secondary">✉️</Typography>
                    </motion.div>
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleFieldFocus('password')}
              onBlur={() => handleFieldBlur('password')}
              required
              sx={{ mb: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <motion.div
                      animate={{
                        scale: fieldFocus.password ? 1.2 : 1,
                        rotate: fieldFocus.password ? 5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Typography color="text.secondary">🔒</Typography>
                    </motion.div>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={() => setShowPassword(!showPassword)} 
                      edge="end"
                      component={motion.button}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>

          <motion.div
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            <Typography
              variant="body2"
              align="right"
              sx={{
                mb: 2,
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
                cursor: 'pointer'
              }}
              component={Link}
              to="/forgot-password"
              state={{ email }}
            >
              Forgot Password?
            </Typography>
          </motion.div>

          <Box
            component={motion.div}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: '12px',
                fontWeight: 600,
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1,
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  zIndex: -1,
                  transition: 'all 0.3s ease',
                },
                '&:hover:before': {
                  filter: 'brightness(1.1)',
                }
              }}
            >
              {loading ? (
                <CircularProgress 
                  size={24} 
                  color="inherit" 
                  component={motion.div}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <motion.span
                    animate={{ 
                      x: isHovered ? [0, 5, -5, 0] : 0,
                      transition: { duration: 0.5 }
                    }}
                  >
                    Login
                  </motion.span>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      style={{ marginLeft: 8 }}
                    >
                      →
                    </motion.span>
                  )}
                </>
              )}
            </Button>
          </Box>

          {/* Particles background effect for the button */}
          {isHovered && (
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'relative',
                height: 0,
                overflow: 'visible',
                pointerEvents: 'none'
              }}
            >
              {[...Array(8)].map((_, i) => (
                <Box
                  key={i}
                  component={motion.div}
                  initial={{ 
                    opacity: 0,
                    scale: 0,
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 30 - 15
                  }}
                  animate={{ 
                    opacity: [0, 0.7, 0],
                    scale: [0, 1.5, 0],
                    x: Math.random() * 200 - 100,
                    y: Math.random() * 60 - 30
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                  style={{
                    position: 'absolute',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: theme.palette.primary.light,
                  }}
                />
              ))}
            </Box>
          )}
        </form>
      </motion.div>
    </AuthLayout>
  );
};

export default Login;