import { Box, Container, Paper, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, title, toggleText, toggleLinkText, toggleForm }) => {
  const theme = useTheme();
  
  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          py: 4,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={10}
            sx={{
              p: 4,
              width: '100%',
              borderRadius: '16px',
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
              boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              align="center" 
              gutterBottom 
              sx={{ 
                mb: 3,
                fontWeight: 700,
                background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {title}
            </Typography>
            
            {children}
            
            {toggleForm && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                {toggleText}{' '}
                <Typography
                  component="span"
                  color="primary"
                  sx={{ 
                    cursor: 'pointer', 
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                  onClick={toggleForm}
                >
                  {toggleLinkText}
                </Typography>
              </Typography>
            )}
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};

export default AuthLayout;