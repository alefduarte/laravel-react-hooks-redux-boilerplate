import React from "react";
import { useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';
import { Result } from "antd";
import { isLoggedIn } from "@ducks/auth";

const LandingPage = () => {
    const { t } = useTranslation();
    const isUserAuthenticated = useSelector(state => isLoggedIn(state));
    const username = useSelector(state =>
        state.auth.user ? state.auth.user.name : ""
    );

    return (
        <Result
            className="pulseIcon"
            icon={
                <CheckCircleTwoTone twoToneColor="#52c41a" />
            }
            title={
                <>
                    {t("landingPage.welcome")}
                    <br />
                    {isUserAuthenticated ? (
                        <>
                            <Trans
                                i18nKey="landingPage.loggedIn"
                                values={{ name: username }}
                            >
                                {t("landingPage.loggedIn")}
                            </Trans>
                            <CheckCircleTwoTone style={{ paddingLeft: "5px" }} twoToneColor="#52c41a" />
                        </>
                    ) : (
                            <>
                                {t("landingPage.notLoggedIn")}
                                <ExclamationCircleTwoTone style={{ paddingLeft: "5px" }} twoToneColor="#ff935c" />
                            </>
                        )}
                </>
            }
        />
    );
};

export default LandingPage;
