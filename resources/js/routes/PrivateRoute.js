import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { Layout } from 'antd';
import { useSelector } from "react-redux";
import { isLoggedIn } from "@ducks/auth";
import Main from '../Main';
import { Navbar, PageFooter } from '@components'


const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector(state => isLoggedIn(state));
    return (
        <Route {...rest} render={props => (
            isAuthenticated ? (
                <Main>
                    <Navbar />
                    <Layout className="main-layout">
                        <Component {...props} />
                    </Layout>
                    <PageFooter />
                </Main>
            ) : (
                    <Redirect to='/login' />
                )
        )} />
    )
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired
};

export default PrivateRoute;