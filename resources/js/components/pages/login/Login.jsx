import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, Layout, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { isError } from "@ducks/auth";

const { Content } = Layout;
const { Title } = Typography;

function LoginPage({ form }) {
    const { t } = useTranslation();
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const error = useSelector(state => isError(state));
    const [fieldValues, setFieldValues] = useState("");

    useEffect(() => {
        function handleError() {
            form.setFields({
                password: {
                    value: fieldValues.password,
                    errors: [new Error(t("login.invalid"))]
                },
                email: {
                    value: fieldValues.email,
                    errors: [new Error(t("login.invalid"))]
                }
            });
        }
        if (error) {
            handleError();
        }
    }, [error]);

    const submit = values => {
        dispatch({ type: "LOGIN_REQUEST", values });
        setFieldValues(values);
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
                    <a className="login-form-forgot" href="/">
                        {t("login.forgotPassword")}
                    </a>
                    <br />
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={auth.fetching}
                    >
                        {t("general.login")}
                    </Button>
                    {t("login.or")}{" "}
                    <Link to="/register">{t("login.register")}</Link>
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
    }).isRequired
};

const Login = Form.create({ name: "login_page" })(LoginPage);

export default Login;
