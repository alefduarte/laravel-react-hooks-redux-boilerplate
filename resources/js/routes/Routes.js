import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { Login, Register, Logout, NotFound, LandingPage, HomePage } from '@pages';



const Routes = () => (
    <Router>
        <Switch>
            <PublicRoute restricted={false} component={LandingPage} path="/" exact />
            <PublicRoute restricted component={Login} path="/login" exact />
            <PrivateRoute component={Logout} path="/logout" exact />
            <PublicRoute restricted component={Register} path="/register" exact />
            <PrivateRoute component={HomePage} path="/home" exact />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

export default Routes;