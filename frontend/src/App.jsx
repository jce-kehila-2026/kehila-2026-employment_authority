import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/theme';
import { AuthProvider } from './context/auth-context';
import MainLayout from './components/layout/main-layout';
import LandingPage from './pages/landing-page';
function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* AuthProvider makes the user state available to the whole app */}
      <AuthProvider>
        <MainLayout>
          <LandingPage />
        </MainLayout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;