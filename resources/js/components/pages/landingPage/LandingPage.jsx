import React from "react";
import { useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { Result, Icon } from "antd";
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
                <Icon
                    type="check-circle"
                    theme="twoTone"
                    twoToneColor="#52c41a"
                />
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
                            <Icon
                                style={{ paddingLeft: "5px" }}
                                type="check-circle"
                                theme="twoTone"
                                twoToneColor="#52c41a"
                            />
                        </>
                    ) : (
                        <>
                            {t("landingPage.notLoggedIn")}
                            <Icon
                                style={{ paddingLeft: "5px" }}
                                type="exclamation-circle"
                                theme="twoTone"
                                twoToneColor="#ff935c"
                            />
                        </>
                    )}
                </>
            }
        />
    );
};

export default LandingPage;
