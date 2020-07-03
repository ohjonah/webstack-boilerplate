import React from 'react';
import GITHUB_ICON from './assets/images/github_icon.svg';
import THROW_AWAY_IMG from './assets/images/undraw_throw_away.svg';
import { useAuth } from './AuthContext';
import Dashboard from './Dashboard';

const App = () => {
    const { currentUser, authState, login } = useAuth();

    const handleLogin = (event) => login();

    return currentUser ? (
        <Dashboard />
    ) : (
        <div className="flex flex-col items-center h-screen mt-20">
            <div className="px-4 text-left">
                <h1 className="text-4xl lg:text-6xl font-bold">
                    An easier way to clean your repos.
                </h1>
                {/* <THROW_AWAY_IMG /> */}

                <p className="text-xl">
                    Have you ever wanted to bulk delete your repos? Use this to
                    quickly delete your repos.
                </p>
                <p className="text-xl">
                    User information isn't saved. Once you log out, your account
                    is deleted.
                </p>
                <p className="text-xl">
                    Made with Javascript, React, Webpack, Babel, TailwindCSS.
                </p>
                <button
                    onClick={handleLogin}
                    className="mt-10 bg-black hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                >
                    <GITHUB_ICON className="inline mr-2" />
                    <span>
                        {authState.isLoading
                            ? 'Loading'
                            : 'Sign in with Github'}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default App;
