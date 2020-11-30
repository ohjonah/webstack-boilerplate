import React from 'react';
import { useAuth } from '../AuthContext';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
const NavBar = () => {
    const { currentUser, authState, logout } = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        logout();
    };

    const handleBackToDashboard = () => {
        history.push(ROUTES.DASHBOARD);
    };

    return (
        <div className="flex flex-row justify-between my-2">
            <h1
                className="text-2xl font-bold cursor-pointer"
                onClick={handleBackToDashboard}
            >
                {authState.isLoading
                    ? 'Loading up your profile!'
                    : `Hi, ${currentUser.displayName}!`}
            </h1>
            <button
                onClick={handleLogout}
                className="bg-gray-600 hover:bg-gray-500 text-white px-2 rounded focus:outline-none focus:shadow-outline"
                type="button"
            >
                {authState.isLoading ? 'Loading' : 'Log Out'}
            </button>
        </div>
    );
};

export default NavBar;
