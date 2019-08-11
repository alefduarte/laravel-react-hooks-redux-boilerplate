import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Layout, Typography, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
import { isError, isSent, Types } from "@ducks/activate";
import { tailFormItemLayout, formItemLayout } from "@styles";

const { Content } = Layout;
const { Title } = Typography;

function SendActivation({
    form,
    match: {
        params: { slug }
    }
}) {
    const { t } = useTranslation();
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.activate.fetching);
    const errorStatus = useSelector(state => state.activate.error);
    const error = useSelector(state => isError(state));
    const sent = useSelector(state => isSent(state));

    useEffect(() => {
        if (slug) {
            form.setFields({
                email: {
                    value: decodeURIComponent(slug)
                }
            });
        }
    }, []);

    useEffect(() => {
        function handleSuccess() {
            Modal.success({
                title: t("resend.successModalTitle"),
                content: t("resend.successModalSubTitle")
            });
        }
        if (sent) {
            handleSuccess();
        }
    }, [sent]);

    useEffect(() => {
        function handleError(message) {
            Modal.error({
                title: t("general.error"),
                content: <Trans i18nKey={message}>{t(message)}</Trans>
            });
        }
        if (error) {
            switch (errorStatus) {
                case 404:
                    handleError("resend.errorNotFound");
                    break;
                case 403:
                    handleError("resend.errorAlreadySent");
                    break;
                default:
                    handleError(t(errorStatus));
                    break;
            }
        }
    }, [error]);

    const submit = ({ email }) => {
        dispatch({ type: Types.SEND_REQUEST, email });
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
                {t("resend.title")}
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
                        {t("general.SEND")}
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    );
}

SendActivation.propTypes = {
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

const SendActivationPage = Form.create({ name: "activation_page" })(
    SendActivation
);

export default SendActivationPage;
