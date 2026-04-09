import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { WifiOff as WifiOffIcon, Wifi as WifiIcon } from '@mui/icons-material';

const NetworkNotifier = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setOpen(true);
      // Auto close the "online" message after a few seconds
      setTimeout(() => setOpen(false), 4000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setOpen(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Snackbar
      open={open || !isOnline}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert 
        icon={isOnline ? <WifiIcon /> : <WifiOffIcon />}
        severity={isOnline ? "success" : "error"} 
        variant="filled"
        sx={{ width: '100%', fontWeight: 'bold' }}
      >
        {isOnline 
          ? "Connection restored!" 
          : "No internet connection. Please check your network."}
      </Alert>
    </Snackbar>
  );
};

export default NetworkNotifier;
