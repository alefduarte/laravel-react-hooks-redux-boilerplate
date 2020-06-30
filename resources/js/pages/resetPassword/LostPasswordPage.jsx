/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Form, Input, Button, Layout, Typography, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { Types } from "@ducks/password";
import { tailFormItemLayout, formItemLayout } from "@styles";

const { Content } = Layout;
const { Title, Text } = Typography;

function LostPasswordPage() {
    const { t } = useTranslation();
    const { slug } = useParams();
    const [form] = Form.useForm();
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
            onOk() { }
        });
    }

    const onFinish = ({ email }) => {
        dispatch({ type: Types.TOKEN_REQUEST, email });
        info();
    };

    return (
        <Content className="form-content">
            <Title level={2} style={{ textAlign: "center" }}>
                {t("reset.resetPass")}
            </Title>
            <Form
                {...formItemLayout}
                form={form}
                onFinish={onFinish}
                className="login-form"
            >
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

export default LostPasswordPage;
