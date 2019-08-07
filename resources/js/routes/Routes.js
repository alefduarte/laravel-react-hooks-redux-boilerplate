import React from 'react'
import {
    Router,
    Switch,
    Route
} from 'react-router-dom'
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import history from './history'
import {
    Login,
    Register,
    Logout,
    NotFound,
    LandingPage,
    HomePage,
    Dashboard,
    LostPasswordPage,
    ResetPasswordPage
} from '@pages';

const Routes = () => (
    <Router history={history}>
        <Switch>
            <PublicRoute restricted={false} component={LandingPage} path="/" exact />
            <PublicRoute restricted={false} component={LostPasswordPage} path="/lostpass" exact />
            <PublicRoute restricted={false} component={LostPasswordPage} path="/lostpass/:slug" exact />
            <PublicRoute restricted={false} component={ResetPasswordPage} path="/reset/:slug" exact />
            <PublicRoute restricted component={Login} path="/login" exact />
            <PublicRoute restricted component={Login} path="/login/:slug" exact />
            <PrivateRoute component={Logout} path="/logout" exact />
            <PublicRoute restricted component={Register} path="/register" exact />
            <PrivateRoute component={HomePage} path="/home" exact />
            <PrivateRoute component={Dashboard} path="/dashboard" exact />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

export default Routes;