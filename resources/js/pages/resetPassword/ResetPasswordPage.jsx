import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Layout, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { isError, Types } from "@ducks/password";
import { tailFormItemLayout, formItemLayout } from "@styles";

const { Content } = Layout;
const { Title } = Typography;

function ResetPassword({
    form,
    match: {
        params: { slug }
    }
}) {
    const { t } = useTranslation();
    const [confirmDirty, setConfirmDirty] = useState(false);
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.password.fetching);
    const error = useSelector(state => isError(state));
    const [currentEmail, setEmail] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        function handleError() {
            form.setFields({
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
            setToken(slug);
        }
    }, []);

    /* eslint camelcase: ["error", {ignoreDestructuring: true, allow: ["password_confirmation"]}] */
    const submit = ({ email, password, password_confirmation }) => {
        dispatch({
            type: Types.RESET_REQUEST,
            email,
            password,
            password_confirmation,
            token
        });
        setEmail(email);
    };

    const handleSubmit = e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                submit(values);
            }
        });
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
        <Content className="form-content"   >
            <Title level={2} style={{ textAlign: "center" }}>
                {t("reset.resetPass")}
            </Title>
            <Form
                {...formItemLayout}
                onSubmit={handleSubmit}
                className="signup-form"
            >
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
                <Form.Item label={t("reset.newPass")} hasFeedback>
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
                <Form.Item label={t("reset.confPass")} hasFeedback>
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

ResetPassword.propTypes = {
    form: PropTypes.shape({
        getFieldDecorator: PropTypes.func.isRequired,
        setFields: PropTypes.func.isRequired,
        getFieldValue: PropTypes.func.isRequired,
        validateFields: PropTypes.func.isRequired
    }).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            slug: PropTypes.string
        })
    }).isRequired
};

const ResetPasswordPage = Form.create({ name: "reset_page" })(ResetPassword);

export default ResetPasswordPage;
