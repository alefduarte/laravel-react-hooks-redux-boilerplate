import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { SmileTwoTone } from '@ant-design/icons';
import { Result, Button, Spin, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { isError, isActive, Types } from "@ducks/activate";
import { Types as AuthTypes, isLoggedIn } from "@ducks/auth";
import history from "@routes/history";

const { Paragraph, Text } = Typography;

function ActivateAccount() {
    const { t } = useTranslation();
    const { slug } = useParams();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => isLoggedIn(state));
    const isFetching = useSelector(state => state.activate.fetching);
    const error = useSelector(state => isError(state));
    const active = useSelector(state => isActive(state));

    useEffect(() => {
        dispatch({ type: Types.ACTIVATE_REQUEST, token: slug });
    }, []);

    useEffect(() => {
        if (active && isAuthenticated) {
            dispatch({ type: AuthTypes.REFRESH_REQUEST });
        }
    }, [active]);

    return (
        <Spin spinning={isFetching}>
            {error && (
                <Result
                    status="error"
                    title={t("activation.failedTitle")}
                    subTitle={
                        <Paragraph>
                            <Text
                                strong
                                style={{
                                    fontSize: 16
                                }}
                            >
                                {t("activation.the_activation_code_has_either")}
                                <font color="red">
                                    {t("activation.expired")}
                                </font>
                                {t("activation.or_is")}
                                <font color="red">
                                    {t("activation.invalid")}
                                </font>
                                <br />
                                {t("activation.try_resending_activation_code")}
                            </Text>
                        </Paragraph>
                    }
                    extra={[
                        <Button
                            type="primary"
                            key="resend"
                            onClick={() => history.push("/home")}
                        >
                            {t("activation.failedButton")}
                        </Button>
                    ]}
                />
            )}
            {active && (
                <Result
                    icon={<SmileTwoTone />}
                    title={t("activation.successTitle")}
                    extra={
                        <Button
                            type="primary"
                            onClick={() => history.push("/home")}
                        >
                            {t("activation.home")}
                        </Button>
                    }
                />
            )}
        </Spin>
    );
}

export default ActivateAccount;
