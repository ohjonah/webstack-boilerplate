import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
};

firebase.initializeApp(config);
const githubProvider = new firebase.auth.GithubAuthProvider();
githubProvider.addScope('repo');

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        error: null,
        isLoading: false,
    });
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem('currentUser'))
    );
    const [accessToken, setAccessToken] = useState(
        JSON.parse(sessionStorage.getItem('accessToken'))
    );

    const login = async () => {
        setAuthState({ ...authState, isLoading: true });

        try {
            const {
                user,
                credential: { accessToken },
            } = await firebase.auth().signInWithPopup(githubProvider);

            setAccessToken(accessToken);
            setCurrentUser(user);

            sessionStorage.setItem('currentUser', JSON.stringify(user));
            sessionStorage.setItem('accessToken', JSON.stringify(accessToken));

            setAuthState({ ...authState, isLoading: false });
        } catch (err) {
            console.error(err);
        }
    };

    const logout = () => {
        sessionStorage.removeItem('currentUser');
        setCurrentUser(null);

        sessionStorage.removeItem('accessToken');
        setAccessToken(null);

        firebase.auth().signOut();
    };

    return (
        <AuthContext.Provider
            value={{ currentUser, accessToken, authState, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
