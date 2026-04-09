import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ErrorOutline as ErrorIcon } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          minHeight="100vh"
          bgcolor="background.default"
          p={3}
          textAlign="center"
        >
          <ErrorIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          <Typography variant="h4" color="text.primary" gutterBottom fontWeight="bold">
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            We're sorry, an unexpected error occurred. Please try refreshing the page or contact support if the issue persists.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={this.handleReset}
            size="large"
            sx={{ borderRadius: '30px', px: 4 }}
          >
            Go Back Home
          </Button>
        </Box>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
