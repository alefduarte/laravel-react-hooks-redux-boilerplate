import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { Layout } from 'antd';
import { useSelector } from "react-redux";
import { isLoggedIn } from "@ducks/auth";
import { Navbar, PageFooter } from '@components';
import Main from '../Main';


const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const isAuthenticated = useSelector(state => isLoggedIn(state));
    return (
        <Route {...rest} render={props => (
            !!isAuthenticated && restricted ? <Redirect to="/home" /> :
                <Main>
                    <Navbar />
                    <Layout className="main-layout">
                        <Component {...props} />
                    </Layout>
                    <PageFooter />
                </Main>
        )} />
    )
};

PublicRoute.propTypes = {
    component: PropTypes.func.isRequired,
    restricted: PropTypes.bool.isRequired
};


export default PublicRoute;
