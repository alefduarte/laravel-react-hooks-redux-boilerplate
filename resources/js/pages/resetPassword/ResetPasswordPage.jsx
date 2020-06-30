/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Form, Input, Button, Layout, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { isError, Types } from "@ducks/password";
import { tailFormItemLayout, formItemLayout } from "@styles";

const { Content } = Layout;
const { Title } = Typography;

function ResetPasswordPage() {
    const { t } = useTranslation();
    const [confirmDirty, setConfirmDirty] = useState(false);
    const { slug } = useParams();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.password.fetching);
    const error = useSelector(state => isError(state));
    const [currentEmail, setEmail] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        function handleError() {
            form.setFields([
                {
                    name: ['email'],
                    value: currentEmail,
                    errors: [t("login.invalid")],
                },
            ]);
        }
        if (error) {
            handleError();
        }
    }, [error]);

    useEffect(() => {
        if (slug) {
            setToken(slug);
        }
    }, []);

    /* eslint camelcase: ["error", {ignoreDestructuring: true, allow: ["password_confirmation"]}] */
    const onFinish = ({ email, password, password_confirmation }) => {
        dispatch({
            type: Types.RESET_REQUEST,
            email,
            password,
            password_confirmation,
            token,
        });
        setEmail(email);
    };

    const passwordLen = (_, value) => {
        if (value && value.length > 5) {
            return Promise.resolve();
        }
        return Promise.reject(t('signup.passwordLen'));
    };

    const handleConfirmBlur = e => {
        const { value } = e.target;
        setConfirmDirty(confirmDirty || !!value);
    };

    const onFinishFailed = ({ errorFields }) => {
        form.scrollToField(errorFields[0].name);
    };

    return (
        <Content className="form-content"   >
            <Title level={2} style={{ textAlign: "center" }}>
                {t("reset.resetPass")}
            </Title>
            <Form
                {...formItemLayout}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="signup-form"
            >
                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: t('signup.invalidEmail'),
                        },
                        {
                            required: true,
                            message: t('signup.noEmail'),
                        },
                    ]}
                >
                    <Input autoComplete="username email" />
                </Form.Item>
                <Form.Item
                    label={t('reset.newPass')}
                    hasFeedback
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: t('login.noPassword'),
                        },
                        {
                            validator: passwordLen,
                        },
                    ]}
                >
                    <Input.Password autoComplete="new-password" />
                </Form.Item>
                <Form.Item
                    label={t('reset.confPass')}
                    name="password_confirmation"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: t('signup.noPasswordConf'),
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(t('signup.noMatch'));
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        onBlur={handleConfirmBlur}
                        autoComplete="new-password"
                    />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={isFetching}
                    >
                        {t("reset.reset")}
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    );
}

export default ResetPasswordPage;
