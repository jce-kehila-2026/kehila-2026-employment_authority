import React from 'react';
import { Box, Button, ButtonGroup, Typography, Paper } from '@mui/material';
import { useAuth, MOCK_ROLES } from '../../context/auth-context';

/**
 * DemoRoleSwitcher provides a UI overlay to quickly swap between user personas.
 * Following SRP: Its only responsibility is to trigger the switchDemoRole logic.
 */
const DemoRoleSwitcher = () => {
    const { switchDemoRole, userRole } = useAuth();

    // Define the roles available for the demonstration
    const availableRoles = [
        { id: MOCK_ROLES.GUEST, label: 'אורח', color: 'inherit' },
        { id: MOCK_ROLES.EMPLOYER, label: 'מעסיק', color: 'info' },
        { id: MOCK_ROLES.COORDINATOR, label: 'רכז', color: 'success' },
        { id: MOCK_ROLES.ADMIN, label: 'מנהלת ', color: 'secondary' }
    ];

    return (
        <Paper 
            elevation={6} 
            sx={{ 
                position: 'fixed', 
                bottom: 16, 
                left: 16, 
                p: 2, 
                zIndex: 9999, // Ensure it floats above all other UI elements
                border: '1px solid',
                borderColor: 'primary.main',
                bgcolor: 'rgba(255, 255, 255, 0.95)'
            }}
        >
            <Typography variant="caption" sx={{ fontWeight: 'bold', mb: 1, display: 'block' }}>
                כלי דמו: החלפת תפקיד (Role: {userRole})
            </Typography>
            
            <ButtonGroup size="small" variant="outlined" aria-label="demo role switcher">
                {availableRoles.map((role) => (
                    <Button
                        key={role.id}
                        color={role.color}
                        variant={userRole === role.id ? 'contained' : 'outlined'}
                        onClick={() => switchDemoRole(role.id)}
                        sx={{ fontSize: '0.75rem' }}
                    >
                        {role.label}
                    </Button>
                ))}
            </ButtonGroup>
        </Paper>
    );
};

export default DemoRoleSwitcher;