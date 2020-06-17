import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';

const title = 'React with Webpack and test';

ReactDOM.render(
    <div className="bg-yellow-500">
        {title}
        <App />
    </div>,
    document.getElementById('app')
);
