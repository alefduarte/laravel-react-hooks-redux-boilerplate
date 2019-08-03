import React from "react";
import { Result, Icon } from "antd";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const HomePage = () => {
    const { t } = useTranslation();
    const user = useSelector(state => state.user);
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
                    <Trans i18nKey="homePage.loggedIn" name={user.name}>
                        {t("homePage.loggedIn")}
                    </Trans>
                    <Icon
                        style={{ paddingLeft: "5px" }}
                        type="check-circle"
                        theme="twoTone"
                        twoToneColor="#52c41a"
                    />
                </>
            }
        />
    );
};

export default HomePage;
