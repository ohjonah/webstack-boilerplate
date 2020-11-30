import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import Home from './Home';
import Review from './Review';
import * as ROUTES from './constants/routes';

import ProtectedRoute from './ProtectedRoute';
import { ReposProvider } from './ReposContext';

const App = () => (
    <Router>
        <Switch>
            <Route exact path={ROUTES.HOME}>
                <Home />
            </Route>
            <ReposProvider>
                <ProtectedRoute path={ROUTES.DASHBOARD}>
                    <Dashboard />
                </ProtectedRoute>
                <ProtectedRoute path={ROUTES.REVIEW}>
                    <Review />
                </ProtectedRoute>
            </ReposProvider>
        </Switch>
    </Router>
);

export default App;
