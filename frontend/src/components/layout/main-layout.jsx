import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Box, CssBaseline } from '@mui/material';
import { useAuth } from '../../context/auth-context';
import DemoRoleSwitcher from '../ui/demo-role-switcher'; // Import from its own file

/**
 * MainLayout provides the consistent header and navigation.
 * It responds to the user's role to show/hide navigation items.
 */
const MainLayout = ({ children }) => {
  const { userRole, isAuthenticated, isAdmin, isCoordinator } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* 
        AppBar implementation following the Jerusalem Municipality style:
        Deep blue primary color with gold accents.
      */}
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            רשות התעסוקה ירושלים
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit">דף הבית</Button>
            <Button color="inherit">לוח אירועים</Button>
            
            {/* RBAC Logic: Only registered users see the Directory */}
            {isAuthenticated && (
              <>
                <Button color="inherit">אלפון מעסיקים</Button>
                
                {/* Manager & Coordinator specific tools */}
                {(isCoordinator || isAdmin) && (
                  <Button 
                    color="secondary" 
                    variant="contained" 
                    sx={{ ml: 1, fontWeight: 'bold' }}
                  >
                    ניהול בוט
                  </Button>
                )}
              </>
            )}
            
            {!isAuthenticated && (
              <Button variant="outlined" color="inherit" sx={{ ml: 2 }}>
                כניסת משתמשים
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        {children}
      </Container>

      {/* 
        The DemoRoleSwitcher is a development-only tool.
        It's placed here to ensure it's accessible on all pages during the demo.
      */}
      <DemoRoleSwitcher />

      {/* Jerusalem Themed Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          textAlign: 'center', 
          bgcolor: 'primary.dark', 
          color: 'white',
          borderTop: '4px solid',
          borderColor: 'secondary.main' // Gold accent line
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} עיריית ירושלים - רשות התעסוקה
        </Typography>
      </Box>
    </Box>
  );
};

export default MainLayout;