/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Form, Input, Button, Layout, Typography, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
import { isError, isSent, Types } from "@ducks/activate";
import { tailFormItemLayout, formItemLayout } from "@styles";

const { Content } = Layout;
const { Title } = Typography;

function SendActivationPage() {
    const { t } = useTranslation();
    const { slug } = useParams();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.activate.fetching);
    const errorStatus = useSelector(state => state.activate.error);
    const error = useSelector(state => isError(state));
    const sent = useSelector(state => isSent(state));

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
                form={form}
                {...formItemLayout}
                onFinish={handleSubmit}
                initialValues={{ email: decodeURIComponent(slug) }}
                className="login-form"
            >
                <Form.Item name="email" label="E-mail"
                    rules={[
                        {
                            type: "email",
                            message: t("signup.invalidEmail")
                        },
                        {
                            required: true,
                            message: t("signup.noEmail")
                        }
                    ]}
                >
                    <Input autoComplete="username email" />
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

export default SendActivationPage;
