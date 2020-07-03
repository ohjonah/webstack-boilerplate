import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

import { AuthProvider } from './AuthContext';
import App from './App';

ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
    document.getElementById('app')
);
