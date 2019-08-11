import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    Form,
    Icon,
    Input,
    Button,
    Modal,
    Checkbox,
    Layout,
    Typography
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { lockedSeconds, isError, Types } from "@ducks/auth";
import history from "@routes/history";

const { Content } = Layout;
const { Title, Text } = Typography;

function LoginPage({
    form,
    match: {
        params: { slug }
    }
}) {
    const { t } = useTranslation();
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.auth.fetching);
    const errorStatus = useSelector(state => state.auth.error);
    const error = useSelector(state => isError(state));
    const lockoutSeconds = useSelector(state => lockedSeconds(state));
    const [currentEmail, setEmail] = useState("");
    const [currentPassword, setPassword] = useState("");

    useEffect(() => {
        function handleError(message) {
            form.setFields({
                password: {
                    value: currentPassword,
                    errors: [new Error(message)]
                },
                email: {
                    value: currentEmail,
                    errors: [new Error(message)]
                }
            });
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

    const handleSubmit = e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                submit(values);
            }
        });
    };

    return (
        <Content className="form-content">
            <Title level={2} style={{ textAlign: "center" }}>
                {t("general.LOGIN")}
            </Title>
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator("email", {
                        rules: [
                            {
                                required: true,
                                message: t("login.noUsername")
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            placeholder={t("general.username")}
                            autoComplete="username"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: t("login.noPassword")
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            type="password"
                            placeholder={t("general.password")}
                            autoComplete="current-password"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("remember_me", {
                        valuePropName: "checked",
                        initialValue: true
                    })(<Checkbox>{t("login.remember")}</Checkbox>)}
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
                    <br />
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

LoginPage.propTypes = {
    form: PropTypes.shape({
        getFieldDecorator: PropTypes.func.isRequired,
        setFields: PropTypes.func.isRequired,
        validateFields: PropTypes.func.isRequired
    }).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            slug: PropTypes.string
        })
    }).isRequired
};

const Login = Form.create({ name: "login_page" })(LoginPage);

export default Login;
