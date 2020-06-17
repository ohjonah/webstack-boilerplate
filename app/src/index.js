import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const title = 'React with Webpack and test';

ReactDOM.render(
    <div className="bg-green-500">{title}</div>,
    document.getElementById('app')
);
