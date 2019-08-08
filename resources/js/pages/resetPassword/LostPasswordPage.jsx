import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Layout, Typography, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { Types } from "@ducks/password";
import { tailFormItemLayout, formItemLayout } from "@styles";

const { Content } = Layout;
const { Title, Text } = Typography;

function LostPassword({
    form,
    match: {
        params: { slug }
    }
}) {
    const { t } = useTranslation();
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.password.fetching);

    useEffect(() => {
        if (slug) {
            form.setFields({
                email: {
                    value: decodeURIComponent(slug)
                }
            });
        }
    }, []);

    function info() {
        Modal.info({
            title: t("reset.reset"),
            content: (
                <Trans i18nKey="reset.modal">
                    <Text>{t("reset.modal")}</Text>
                </Trans>
            ),
            onOk() {}
        });
    }

    const submit = ({ email }) => {
        dispatch({ type: Types.TOKEN_REQUEST, email });
        info();
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
                {t("reset.resetPass")}
            </Title>
            <Form
                {...formItemLayout}
                onSubmit={handleSubmit}
                className="login-form"
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

LostPassword.propTypes = {
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

const LostPasswordPage = Form.create({ name: "login_page" })(LostPassword);

export default LostPasswordPage;
