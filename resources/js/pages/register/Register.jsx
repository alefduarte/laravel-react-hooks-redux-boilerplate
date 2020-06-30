/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, Button, Layout, Modal, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { isError, isSaved, Types } from "@ducks/users";
import history from "@routes/history";
import { tailFormItemLayout, formItemLayout } from "@styles";

const { Content } = Layout;
const { Title } = Typography;

function Register() {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [confirmDirty, setConfirmDirty] = useState(false);
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.users.fetching);
    const error = useSelector(state => isError(state));
    const saved = useSelector(state => isSaved(state));
    const [currentEmail, setEmail] = useState("");

    useEffect(() => {
        function handleError() {
            form.setFields({
                email: {
                    value: currentEmail,
                    errors: [new Error(t("signup.invalid"))]
                }
            });
        }
        if (error) {
            handleError();
        }
        return () => {
            dispatch({ type: Types.RESET_USER_STATE });
        };
    }, [error]);

    useEffect(() => {
        function handleSaved() {
            Modal.success({
                title: t("signup.successTitle"),
                content: t("signup.successContent"),
                okText: t("general.login"),
                onOk() {
                    history.push(`/login/${encodeURIComponent(currentEmail)}`);
                }
            });
        }
        if (saved) {
            handleSaved();
        }
    }, [saved]);

    /* eslint camelcase: ["error", {ignoreDestructuring: true, allow: ["password_confirmation"]}] */
    const onFinish = ({ name, email, password, password_confirmation }) => {
        dispatch({
            type: Types.STORE_USER,
            email,
            name,
            password,
            password_confirmation,
        });
        setEmail(email);
    };

    const passwordLen = (_, value) => {
        if (value && value.length > 5) {
            return Promise.resolve();
        }
        return Promise.reject(t('signup.passwordLen'));
    };

    const onFinishFailed = ({ errorFields }) => {
        form.scrollToField(errorFields[0].name);
    };

    const handleConfirmBlur = e => {
        const { value } = e.target;
        setConfirmDirty(confirmDirty || !!value);
    };

    return (
        <Content className="form-content">
            <Form
                {...formItemLayout}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="signup-form"
            >
                <Title level={2} style={{ textAlign: "center" }}>
                    {t("general.SIGNUP")}
                </Title>
                <Form.Item
                    label={t('general.name')}
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: t('signup.noName'),
                            whitespace: true,
                        },
                    ]}
                >
                    <Input autoComplete="name" />
                </Form.Item>
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
                    label={t('general.password')}
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
                    label={t('general.passwordConf')}
                    hasFeedback
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
                        loading={isFetching}
                    >
                        {t("general.signup")}
                    </Button>
                    <Button
                        type="primary"
                        onClick={() =>
                            history.push(
                                `/login/${encodeURIComponent(currentEmail)}`
                            )
                        }
                        style={{
                            marginLeft: "10px",
                            backgroundColor: "#009975",
                            borderColor: "#009975",
                            display: error ? "inline" : "none"
                        }}
                    >
                        {t("signup.login")}
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    );
}

export default Register;
