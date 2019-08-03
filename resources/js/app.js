import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import 'antd/dist/antd.min.css';
import store from './store';
import Routes from './routes/Routes';
import './i18n';

render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);
