import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
};

firebase.initializeApp(config);
const db = firebase.database();

const githubProvider = new firebase.auth.GithubAuthProvider();
githubProvider.addScope('repo');
githubProvider.addScope('delete_repo');

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

    const login = async (next) => {
        setAuthState({ ...authState, isLoading: true });

        try {
            const {
                user,
                credential: { accessToken },
                additionalUserInfo
            } = await firebase.auth().signInWithPopup(githubProvider);

            if (additionalUserInfo.isNewUser) {
                const { uid, email, displayName } = user;
                await userAPI(uid).set({ email, displayName, stats: { deletedReposCount: 0 } });
            }

            setAccessToken(accessToken);
            setCurrentUser(user);

            sessionStorage.setItem('currentUser', JSON.stringify(user));
            sessionStorage.setItem('accessToken', JSON.stringify(accessToken));
            setAuthState({ error: null, isLoading: false });
            next();
        } catch (err) {
            next();
            console.error(err.message);
            setAuthState({ error: err.message, isLoading: false });
        }
    };

    const logout = () => {
        sessionStorage.removeItem('currentUser');
        setCurrentUser(null);

        sessionStorage.removeItem('accessToken');
        setAccessToken(null);

        firebase.auth().signOut();
    };

    // *** User API ***
    const userAPI = uid => db.ref(`users/${uid}`);

    const users = () => db.ref('users');

    const statsAPI = (path = null) => path ? db.ref(`users/${currentUser.uid}/stats/${path}`) : db.ref(`users/${currentUser.uid}/stats`);

    return (
        <AuthContext.Provider
            value={{ currentUser, accessToken, authState, login, logout, userAPI, statsAPI }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
