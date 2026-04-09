import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const ThemeContext = createContext();

export const useAppTheme = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#1976D2',
          },
          secondary: {
            main: '#FF5722',
          },
          background: {
            default: darkMode ? '#121212' : '#F5F5F5',
            paper: darkMode ? '#1E1E1E' : '#FFFFFF',
          },
        },
        typography: {
          fontFamily: "'Lato', sans-serif",
          h2: {
            fontFamily: "'Playfair Display', serif",
          },
          h6: {
            fontFamily: "'Lobster', cursive",
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '30px',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              },
            },
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
