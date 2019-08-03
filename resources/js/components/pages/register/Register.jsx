import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form, Input, Button, Layout, Typography } from "antd";
import { useDispatch } from "react-redux";

const { Content } = Layout;
const { Title } = Typography;

function RegisterForm({ form }) {
    const { t } = useTranslation();
    const [confirmDirty, setConfirmDirty] = useState(false);
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({ type: "LOGIN_REQUEST", values });
            }
        });
    };

    const handleConfirmBlur = e => {
        const { value } = e.target;
        setConfirmDirty(confirmDirty || !!value);
    };

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue("password")) {
            callback("Two passwords that you enter is inconsistent!");
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

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 }
        }
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0
            },
            sm: {
                span: 16,
                offset: 8
            }
        }
    };

    return (
        <Content style={{ padding: "30px 5px 0px 30px" }}>
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
                    {getFieldDecorator("confirm", {
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
        validateFields: PropTypes.func.isRequired
    }).isRequired
};

const Register = Form.create({ name: "register" })(RegisterForm);

export default Register;
