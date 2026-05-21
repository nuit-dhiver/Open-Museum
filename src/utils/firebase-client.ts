import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getStorage, ref, getBlob } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

// Check if the essential Firebase config is provided
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.storageBucket
);

/**
 * Initializes and returns the Firebase app client instance.
 * Returns null if credentials are not configured.
 */
export function getFirebaseApp() {
  if (!isFirebaseConfigured) return null;

  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
}

/**
 * Returns the Firebase Storage client instance.
 * Returns null if credentials are not configured.
 */
export function getClientStorage() {
  const app = getFirebaseApp();
  return app ? getStorage(app) : null;
}

/**
 * Ensures that the client browser is authenticated with Firebase Auth (Anonymous).
 * Automatically signs in anonymously if there is no active session.
 */
export async function ensureAuthenticated() {
  const app = getFirebaseApp();
  if (!app) return null;

  const auth = getAuth(app);
  
  // Wait for the auth state to resolve, or trigger immediate anonymous login if empty
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
  
  return auth.currentUser;
}

/**
 * Fetches a protected file from Firebase Storage securely using the authenticated session.
 * Converts the file to a browser-local Object URL.
 * 
 * Supports both storage paths (e.g., 'models/foo.glb') and full HTTP Storage URLs.
 * 
 * @param pathOrUrl Storage path or full Firebase Storage URL
 * @returns Promise<string> Browser-local Object URL (blob:...)
 */
export async function fetchSecureModel(pathOrUrl: string): Promise<string> {
  const storage = getClientStorage();
  if (!storage) {
    throw new Error('Firebase Storage is not configured.');
  }

  // Ensure user has a valid authenticated session before downloading
  await ensureAuthenticated();

  // Create a reference to the storage object. ref() accepts full URLs as well!
  const fileRef = ref(storage, pathOrUrl);
  
  // Download file as a Blob using authenticated session credentials
  const blob = await getBlob(fileRef);
  
  // Create and return local Object URL
  return URL.createObjectURL(blob);
}
