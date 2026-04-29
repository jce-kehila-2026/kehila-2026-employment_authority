import React from 'react';
import { Button, ButtonGroup, Typography, Paper, Box } from '@mui/material';
import { useAuth, MOCK_ROLES } from '../../context/auth-context';

/**
 * DemoRoleSwitcher - Minimized and moved to the bottom-right corner.
 * We use an absolute fixed position with high z-index to avoid layout shifts,
 * and reduced padding/font sizes to make it unobtrusive.
 */
const DemoRoleSwitcher = () => {
    const { switchDemoRole, userRole } = useAuth();

    const availableRoles = [
        { id: MOCK_ROLES.GUEST, label: 'אורח' },
        { id: MOCK_ROLES.EMPLOYER, label: 'מעסיק' },
        { id: MOCK_ROLES.COORDINATOR, label: 'רכז' },
        { id: MOCK_ROLES.ADMIN, label: 'מנהלת' }
    ];

    return (
        <Paper 
            elevation={4} 
            sx={{ 
                position: 'fixed', 
                bottom: 16, 
                right: 16, // Moved to the right corner
                p: 1, 
                zIndex: 9999,
                border: '1px solid',
                borderColor: 'primary.main',
                bgcolor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Typography variant="caption" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                Demo: {userRole}
            </Typography>
            
            <ButtonGroup size="small" variant="outlined">
                {availableRoles.map((role) => (
                    <Button
                        key={role.id}
                        variant={userRole === role.id ? 'contained' : 'outlined'}
                        onClick={() => switchDemoRole(role.id)}
                        sx={{ fontSize: '0.65rem', padding: '2px 6px', minWidth: '40px' }}
                    >
                        {role.label}
                    </Button>
                ))}
            </ButtonGroup>
        </Paper>
    );
};

export default DemoRoleSwitcher;