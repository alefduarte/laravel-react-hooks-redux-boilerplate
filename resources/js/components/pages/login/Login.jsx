import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Icon, Input, Button, Checkbox, Layout, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { isError, Types } from "@ducks/auth";
import history from "@routes/history";

const { Content } = Layout;
const { Title } = Typography;

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
    const error = useSelector(state => isError(state));
    const [currentEmail, setEmail] = useState("");
    const [currentPassword, setPassword] = useState("");

    useEffect(() => {
        function handleError() {
            form.setFields({
                password: {
                    value: currentPassword,
                    errors: [new Error(t("login.invalid"))]
                },
                email: {
                    value: currentEmail,
                    errors: [new Error(t("login.invalid"))]
                }
            });
        }
        if (error) {
            handleError();
        }
    }, [error]);

    useEffect(() => {
        if (slug) {
            form.setFields({
                email: {
                    value: decodeURIComponent(slug)
                }
            });
        }
    }, []);

    /* eslint camelcase: ["error", {ignoreDestructuring: true, allow: ["remember_me"]}] */
    const submit = ({ email, password, remember_me }) => {
        dispatch({ type: Types.LOGIN_REQUEST, email, password, remember_me });
        setEmail(email);
        setPassword(password);
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
        <Content style={{ padding: "30px 5px 0px 30px" }}>
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
