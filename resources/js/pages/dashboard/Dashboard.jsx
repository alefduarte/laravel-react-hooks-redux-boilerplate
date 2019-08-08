import React from "react";
import { Result, Icon } from "antd";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const { t } = useTranslation();
    const user = useSelector(state => state.auth.user);
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
                    <Trans
                        i18nKey="dashPage.loggedIn"
                        values={{ name: user.name }}
                    >
                        {t("dashPage.loggedIn")}
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

export default Dashboard;
