import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form, Input, Button, Layout, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { isError, Types } from "@ducks/users";
import history from "@routes/history";
import { tailFormItemLayout, formItemLayout } from "@styles";

const { Content } = Layout;
const { Title } = Typography;

function RegisterForm({ form }) {
    const { t } = useTranslation();
    const [confirmDirty, setConfirmDirty] = useState(false);
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();
    const error = useSelector(state => isError(state));
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
            dispatch({ type: Types.RESET_ERROR });
        };
    }, [error]);

    /* eslint camelcase: ["error", {ignoreDestructuring: true, allow: ["password_confirmation"]}] */
    const handleSubmit = e => {
        e.preventDefault();
        form.validateFieldsAndScroll(
            (err, { email, name, password, password_confirmation }) => {
                if (!err) {
                    dispatch({
                        type: Types.STORE_USER,
                        email,
                        name,
                        password,
                        password_confirmation
                    });
                    setEmail(email);
                }
            }
        );
    };

    const handleConfirmBlur = e => {
        const { value } = e.target;
        setConfirmDirty(confirmDirty || !!value);
    };

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue("password")) {
            callback(t("signup.noMatch"));
        } else {
            callback();
        }
    };

    const validateToNextPassword = (rule, value, callback) => {
        if (value && confirmDirty) {
            form.validateFields(["confirm"], { force: true });
        }
        callback();
    };

    return (
        <Content className="form-content">
            <Title level={2} style={{ textAlign: "center" }}>
                {t("general.SIGNUP")}
            </Title>
            <Form
                {...formItemLayout}
                onSubmit={handleSubmit}
                className="signup-form"
            >
                <Form.Item label={t("general.name")}>
                    {getFieldDecorator("name", {
                        rules: [
                            {
                                required: true,
                                message: t("signup.noName"),
                                whitespace: true
                            }
                        ]
                    })(<Input autoComplete="name" />)}
                </Form.Item>
                <Form.Item label="E-mail">
                    {getFieldDecorator("email", {
                        rules: [
                            {
                                type: "email",
                                message: t("signup.invalidEmail")
                            },
                            {
                                required: true,
                                message: t("signup.noEmail")
                            }
                        ]
                    })(<Input autoComplete="username email" />)}
                </Form.Item>
                <Form.Item label={t("general.password")} hasFeedback>
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: t("login.noPassword")
                            },
                            {
                                validator: validateToNextPassword
                            }
                        ]
                    })(<Input.Password autoComplete="new-password" />)}
                </Form.Item>
                <Form.Item label={t("general.passwordConf")} hasFeedback>
                    {getFieldDecorator("password_confirmation", {
                        rules: [
                            {
                                required: true,
                                message: t("signup.noPasswordConf")
                            },
                            {
                                validator: compareToFirstPassword
                            }
                        ]
                    })(
                        <Input.Password
                            onBlur={handleConfirmBlur}
                            autoComplete="new-password"
                        />
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
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

RegisterForm.propTypes = {
    form: PropTypes.shape({
        getFieldDecorator: PropTypes.func.isRequired,
        validateFieldsAndScroll: PropTypes.func.isRequired,
        getFieldValue: PropTypes.func.isRequired,
        setFields: PropTypes.func.isRequired,
        validateFields: PropTypes.func.isRequired
    }).isRequired
};

const Register = Form.create({ name: "register" })(RegisterForm);

export default Register;
