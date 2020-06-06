import React from 'react';
import ReactDOM from 'react-dom';

const title = 'React with Webpack and test';

ReactDOM.render(<div>{title}</div>, document.getElementById('app'));

module.hot.accept();
