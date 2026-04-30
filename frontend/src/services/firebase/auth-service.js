import { auth, db } from './config';
import { 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

/**
 * Checks if a user's email is present in the authorized whitelist collection.
 * This is the first step of our security gate.
 * * @param {string} email - The user email to verify.
 * @returns {Promise<Object|null>} - Returns the whitelist document data or null if not found.
 */

export const checkWhitelist = async (email) => {
  try {
    const whitelistRef = collection(db, 'whitelist');
    const q = query(whitelistRef, where('email', '==', email.toLowerCase()), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null; // Email not found in whitelist
    }

    // Returning the data allows us to access the users 'role' later (admin/coordinator/etc)
    return querySnapshot.docs[0].data();
  } catch (error) {
    console.error('AuthService Error: whitelist check failed', error);
    throw error;
  }
};

/**
 * Signs in a user using email and password.
 * Following SRP: This function only handles the technical login process.
 * * @param {string} email 
 * @param {string} password 
 * @returns {Promise<UserCredential>}
 */

export const loginUser = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('AuthService Error: login failed', error);
    throw error;
  }
};

/**
 * Signs out the currently authenticated user.
 * * @returns {Promise<void>}
 */

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('AuthService Error: logout failed', error);
    throw error;
  }
};

/**
 * Subscribes to authentication state changes.
 * This is crucial for keeping the user logged in after page refreshes.
 * * @param {Function} callback - Function to run when the auth state changes.
 * @returns {Unsubscribe} - Function to clean up the listener.
 */

export const subscribeToAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};