import React, { createContext, useContext, useState, useEffect }  from "react";
import { subscribeToAuthState,  checkWhitelist } from "../services/firebase/auth-service";

/**
 * AuthContext serves as the single source of truth for user identity.
 * Following SRP: Its only responsibility is to manage and broadcast the auth state.
 */

const AuthContext = createContext(null);


//------------------------- Demo Users and Roles (For Michal's Demo) -------------------------
/**
 * MOCK_ROLES defines the available permission levels in the system.
 * We use a constant to ensure string consistency across the app.
 */
export const MOCK_ROLES = {
    GUEST: 'guest',
    EMPLOYER: 'employer',
    COORDINATOR: 'coordinator',
    ADMIN: 'admin'
};
//----------------------------------------------------------------------------------------


/**
 * AuthProvider wraps the application to provide access to authentication data.
 * It coordinates between Firebase Auth state and our custom Firestore Whitelist.
 * * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped.
 */

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(MOCK_ROLES.GUEST); // Default to 'guest' for unauthenticated users
    const [loading, setLoading] = useState(true);



//------------------------- Demo Role Switcher Logic (For Michal's Demo) ------------------
    /**
     * Demo Override Logic
     * Used to showcase RBAC logic to stakeholders without requiring a real login.
     * @param {string} roleName - The role to simulate.
     */
    const switchDemoRole = (roleName) => {
        setLoading(true);
        // Simulating a Whitelist response for the demo
        const demoUser = { 
            email: `${roleName}@jerusalem.demo`,
            displayName: `Demo ${roleName.charAt(0).toUpperCase() + roleName.slice(1)}`,
            isDemo: true
        };

        if(roleName === MOCK_ROLES.GUEST) {
            setCurrentUser(null);
            setUserRole(MOCK_ROLES.GUEST);
        } else {
            setCurrentUser(demoUser);
            setUserRole(roleName);
        }

        setTimeout(() => setLoading(false), 400); // Simulate network delay
    };
//-----------------------------------------------------------------------------------------



    useEffect(() => {
        /** 
         * We use a listner to detect auth state changes in Firebase. When a user logs in or out, this callback is triggered.
         */
        const unsubscribe = subscribeToAuthState(async (user) => {
            if (user) {
                try {
                    // If a user is authenticated, we check if their email is in the whitelist.
                    const authData = await checkWhitelist(user.email);
                    if (authData) {
                        setCurrentUser(user);
                        setUserRole(authData.role); // Store the user's role for later use in access control
                    } else {
                        // If the email is not in the whitelist, we treat them as unauthenticated.
                        setCurrentUser(null);
                        setUserRole(MOCK_ROLES.GUEST);
                    }
                } catch (error) {
                    console.error('AuthContext Error: Failed to check whitelist', error);
                    setCurrentUser(null);
                    setUserRole(MOCK_ROLES.GUEST);
                }
            } else {
                // If no user is authenticated, we clear the auth state.
                setCurrentUser(null);
                setUserRole(MOCK_ROLES.GUEST);
            }
            
            // We set loading to false only after the initial check is complete to avoid UI flickering.
            setLoading(false); 
        });

        // Cleanup the subscription on unmount to prevent memory leaks.
        return () => unsubscribe();
    }, []);

    const contextValue = {
        currentUser,
        userRole,
        isAuthenticated: !!currentUser,
        loading,
        switchDemoRole, // Expose the demo role switcher for Michal's demo

        isAdmin: userRole === MOCK_ROLES.ADMIN,
        isCoordinator: userRole === MOCK_ROLES.COORDINATOR,
        isEmployer: userRole === MOCK_ROLES.EMPLOYER,
        isGuest: userRole === MOCK_ROLES.GUEST || !currentUser, // Treat unauthenticated users as guests
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {/* We wait for the initial auth check to finish before rendering the app */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

/**
 * * Custom hook to consume the AuthContext.
 * Using a hook follows the DRY principle and makes usage cleaner in components.
 * * @returns {Object} - The current authentication state and helpers.
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        // If the context is not available, it means the hook is being used outside of an AuthProvider, which is a developer error.
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};