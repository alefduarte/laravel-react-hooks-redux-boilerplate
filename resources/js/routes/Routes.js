import React from 'react'
import {
    Router,
    Switch,
    Route
} from 'react-router-dom'
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import history from './history'
import { Login, Register, Logout, NotFound, LandingPage, HomePage, Dashboard } from '@pages';

const Routes = () => (
    <Router history={history}>
        <Switch>
            <PublicRoute restricted={false} component={LandingPage} path="/" exact />
            <PublicRoute restricted component={Login} path="/login" exact />
            <PrivateRoute component={Logout} path="/logout" exact />
            <PublicRoute restricted component={Register} path="/register" exact />
            <PrivateRoute component={HomePage} path="/home" exact />
            <PrivateRoute component={Dashboard} path="/dashboard" exact />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

export default Routes;