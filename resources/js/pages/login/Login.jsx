import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Modal, Checkbox, Layout, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { lockedSeconds, isError, Types } from "@ducks/auth";
import history from "@routes/history";

const { Content } = Layout;
const { Title, Text } = Typography;

function Login() {
    const { t } = useTranslation();
    const { slug } = useParams();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.auth.fetching);
    const errorStatus = useSelector(state => state.auth.error);
    const error = useSelector(state => isError(state));
    const lockoutSeconds = useSelector(state => lockedSeconds(state));
    const [currentEmail, setEmail] = useState("");
    const [currentPassword, setPassword] = useState("");

    useEffect(() => {
        function handleError(message) {
            form.setFields([
                {
                    name: ['password'],
                    value: currentPassword,
                    errors: [message],
                },
                {
                    name: ['email'],
                    value: currentEmail,
                    errors: [message],
                },
            ]);
        }

        function handleExpiredError() {
            Modal.error({
                title: t("login.errorTitle"),
                content: (
                    <Trans i18nKey="login.errorContent">
                        <Text>{t("login.errorContent")}</Text>
                    </Trans>
                )
            });
        }

        if (error) {
            switch (errorStatus) {
                case 401:
                    handleError(t("login.invalid"));
                    break;
                case 403:
                    handleExpiredError();
                    break;
                case 429:
                    handleError(
                        `${t("login.error429")} ${lockoutSeconds} ${t(
                            "general.seconds"
                        )}`
                    );
                    break;
                default:
                    handleError(t(errorStatus));
                    break;
            }
        }
    }, [error, lockoutSeconds]);

    useEffect(() => {
        if (slug) {
            form.setFields({
                email: {
                    value: decodeURIComponent(slug)
                }
            });
        }
        return () => {
            dispatch({ type: Types.RESET_ERROR });
        };
    }, []);

    /* eslint camelcase: ["error", {ignoreDestructuring: true, allow: ["remember_me"]}] */
    const submit = ({ email, password, remember_me }) => {
        setEmail(email);
        setPassword(password);
        if (lockoutSeconds) {
            dispatch({
                type: Types.LOCKOUT_USER
            });
        } else {
            dispatch({
                type: Types.LOGIN_REQUEST,
                email,
                password,
                remember_me
            });
        }
    };

    const onFinish = values => {
        submit(values);
    };

    return (
        <Content className="form-content">
            <Title level={2} style={{ textAlign: "center" }}>
                {t("general.LOGIN")}
            </Title>
            <Form form={form} onFinish={onFinish} className="login-form">
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: t('signup.invalidEmail'),
                        },
                        {
                            required: true,
                            message: t('login.noUsername'),
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                        }
                        placeholder={t("general.username")}
                        autoComplete="username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: t('login.noPassword'),
                        },
                    ]}>
                    <Input
                        prefix={
                            <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                        }
                        type="password"
                        placeholder={t("general.password")}
                        autoComplete="current-password"
                        allowClear
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item valuePropName="checked" initialValue="true" noStyle>
                        <Checkbox>{t('login.remember')}</Checkbox>
                    </Form.Item>
                    <Button
                        type="link"
                        onClick={() =>
                            history.push(
                                `/lostpass/${encodeURIComponent(currentEmail)}`
                            )
                        }
                        className="login-form-forgot"
                    >
                        {t("login.forgotPassword")}
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={isFetching}
                    >
                        {t("general.login")}
                    </Button>
                    {t("login.or")}
                    <Button
                        className="no-padding"
                        type="link"
                        onClick={() => history.push("/register")}
                    >
                        {t("login.register")}
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    );
}

export default Login;
