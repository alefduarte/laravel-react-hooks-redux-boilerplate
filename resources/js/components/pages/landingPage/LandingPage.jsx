import React from "react";
import { Result, Icon } from "antd";
import { Trans, useTranslation } from "react-i18next";

const LandingPage = () => {
    const { t } = useTranslation();
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
                    <Trans i18nKey="landingPage.notLoggedIn">
                        {t("landingPage.notLoggedIn")}
                    </Trans>
                    <Icon
                        style={{ paddingLeft: "5px" }}
                        type="exclamation-circle"
                        theme="twoTone"
                        twoToneColor="#ff935c"
                    />
                </>
            }
        />
    );
};

export default LandingPage;
