import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { AppThemeProvider } from './context/ThemeContext.jsx'
import { RecipeProvider } from './context/RecipeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ErrorBoundary from './components/common/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AppThemeProvider>
        <AuthProvider>
          <RecipeProvider>
            <App />
          </RecipeProvider>
        </AuthProvider>
      </AppThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
