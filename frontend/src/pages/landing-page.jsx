import React from 'react';
import { Typography, Grid, Card, CardContent, Button, Box, Divider, Paper } from '@mui/material';
import { useAuth } from '../context/auth-context';
import { MOCK_ARTICLES, MOCK_EVENTS } from '../utils/mock-data';

/**
 * EventCalendar generates a classic month-view grid.
 * We use CSS Grid (display: 'grid') instead of MUI's Flexbox Grid
 * to ensure a strict, unbreakable 7-column layout for the calendar.
 */
const EventCalendar = ({ isGuest }) => {
    const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
    
    const getEventForDay = (day) => {
        if (day === 15) return MOCK_EVENTS[0];
        if (day === 22) return MOCK_EVENTS[1];
        return null;
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Box 
                sx={{ 
                    display: 'grid', 
                    // Forces exactly 7 equal columns
                    gridTemplateColumns: 'repeat(7, 1fr)', 
                    borderTop: '1px solid #ccc', 
                    borderRight: '1px solid #ccc' 
                }}
            >
                {/* Header Row: Days of the week */}
                {daysOfWeek.map(day => (
                    <Box 
                        key={day} 
                        sx={{ 
                            bgcolor: 'primary.main', 
                            color: 'white', 
                            textAlign: 'center', 
                            py: 1,
                            borderLeft: '1px solid #ccc',
                            borderBottom: '1px solid #ccc'
                        }}
                    >
                        <Typography variant="subtitle2" fontWeight="bold">
                            {day}
                        </Typography>
                    </Box>
                ))}
                
                {/* Calendar Days */}
                {daysInMonth.map(day => {
                    const dayEvent = getEventForDay(day);
                    return (
                        <Box 
                            key={day}
                            sx={{ 
                                height: '110px', 
                                p: 1, 
                                bgcolor: dayEvent ? '#f0f8ff' : 'white',
                                borderLeft: '1px solid #ccc',
                                borderBottom: '1px solid #ccc',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: '0.2s',
                                '&:hover': { bgcolor: '#f5f5f5' }
                            }}
                        >
                            {/* Date number in the top right (RTL context) */}
                            <Typography variant="body2" color="primary" fontWeight="bold" sx={{ textAlign: 'right' }}>
                                {day}
                            </Typography>
                            
                            {/* Event Content */}
                            {dayEvent && (
                                <Box sx={{ mt: 1, textAlign: 'center' }}>
                                    <Typography variant="caption" display="block" fontWeight="bold" color="secondary" sx={{ lineHeight: 1.2, mb: 0.5 }}>
                                        {dayEvent.name}
                                    </Typography>
                                    {!isGuest && (
                                        <Button size="small" variant="outlined" color="primary" sx={{ fontSize: '0.6rem', p: 0, minWidth: '100%' }}>
                                            הרשמה
                                        </Button>
                                    )}
                                </Box>
                            )}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

/**
 * LandingPage organizes the main layout.
 * Features a narrow scrollable news section and a wide central calendar.
 */
const LandingPage = () => {
    const { isAuthenticated, currentUser, isGuest } = useAuth();

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                    {isAuthenticated ? `שלום, ${currentUser.displayName}` : 'ברוכים הבאים לרשות התעסוקה ירושלים'}
                </Typography>
            </Box>

            <Grid container spacing={3} direction="row-reverse"> 
                <Grid item xs={12} md={1}>
                    <Paper elevation={3} sx={{ height: '600px', display: 'flex', flexDirection: 'column', bgcolor: '#f8f9fa', overflow: 'hidden' }}>
                        <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 1.5, textAlign: 'center' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                               (News)
                            </Typography>
                        </Box>
                        
                        <Box sx={{ overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {MOCK_ARTICLES.map(article => (
                                <Card key={article.id} variant="outlined" sx={{ borderRight: '4px solid', borderColor: 'secondary.main' }}>
                                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                                        <Typography variant="caption" fontWeight="bold" color="secondary">
                                            {article.source}
                                        </Typography>
                                        <Typography variant="body2" fontWeight="bold" sx={{ mt: 0.5, lineHeight: 1.2 }}>
                                            {article.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                {/* 
                   Center Main Content: Google-style Calendar
                   Notice md={9} instead of md={8}. This expands the width to 75%.
                */}
                <Grid item xs={12} md={9}>
                    <Paper elevation={0} sx={{ p: 2 }}>
                        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
                            לוח אירועים חודשי
                        </Typography>
                        
                        <EventCalendar isGuest={isGuest} />
                        
                        {isGuest && (
                            <Typography variant="caption" color="error" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
                                * אורחים צופים ביומן בלבד. יש להתחבר כדי להירשם.
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LandingPage;