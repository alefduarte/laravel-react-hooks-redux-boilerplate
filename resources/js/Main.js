import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Layout, Spin } from 'antd';
import ptBR from 'antd/es/locale-provider/pt_BR';

const Main = ({ children }) => {
    return (
        <ConfigProvider locale={ptBR}>
            <Suspense
                fallback={
                    <Spin
                        style={{
                            margin: 'auto',
                            width: '100%',
                            position: 'absolute',
                            top: '50%',
                        }}
                    />
                }
            >
                <Layout style={{ background: '#fff', padding: 0 }}>
                    {children}
                </Layout>
            </Suspense>
        </ConfigProvider>
    );
};

Main.propTypes = {
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Main;
