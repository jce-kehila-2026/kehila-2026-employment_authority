import React from 'react';
import { Typography, Grid, Card, CardContent, Button, Box, Paper } from '@mui/material';
import { useAuth } from '../context/auth-context';
import { MOCK_ARTICLES, MOCK_EVENTS } from '../utils/mock-data';

/**
 * LandingPage component - The main entry point for all users.
 * Following RBAC: Guests see "Read More", Employers see "Register to Event".
 */
const LandingPage = () => {
    const { isGuest, isAuthenticated, currentUser } = useAuth();

    return (
        <Box>
            {/* Hero Section - Matching the Jerusalem Municipality aesthetic */}
            <Paper 
                elevation={0} 
                sx={{ 
                    p: 4, 
                    mb: 4, 
                    bgcolor: 'primary.light', 
                    color: 'white',
                    borderRadius: 2,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h3" gutterBottom fontWeight="bold">
                    {isAuthenticated ? `שלום, ${currentUser.displayName}` : 'ברוכים הבאים לרשות התעסוקה'}
                </Typography>
                <Typography variant="h6">
                    מרכז המידע והכלים למעסיקים ורכזים בירושלים
                </Typography>
            </Paper>

            <Grid container spacing={4}>
                {/* News & Articles Section (From Content Bot) */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
                        חדשות ועדכונים (Content Bot)
                    </Typography>
                    {MOCK_ARTICLES.map(article => (
                        <Card key={article.id} sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="h6">{article.title}</Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    מקור: {article.source} | {article.date}
                                </Typography>
                                <Typography variant="body1">{article.summary}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>

                {/* Events Preview Section (Annual Calendar) */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" gutterBottom color="secondary" fontWeight="bold">
                        אירועים קרובים
                    </Typography>
                    {MOCK_EVENTS.map(event => (
                        <Card key={event.id} sx={{ mb: 2, borderLeft: '5px solid', borderColor: 'secondary.main' }}>
                            <CardContent>
                                <Typography variant="subtitle1" fontWeight="bold">{event.name}</Typography>
                                <Typography variant="caption" display="block">{event.date} | {event.time}</Typography>
                                <Typography variant="caption" display="block" gutterBottom>{event.location}</Typography>
                                
                                {/* RBAC Logic: Guests cannot register to events */}
                                {isGuest ? (
                                    <Button size="small" variant="outlined" disabled>
                                        התחבר להרשמה
                                    </Button>
                                ) : (
                                    <Button size="small" variant="contained" color="secondary">
                                        הרשמה לאירוע
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};

export default LandingPage;