import React from "react";
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Result } from "antd";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const { t } = useTranslation();
    const user = useSelector(state => state.auth.user);
    return (
        <Result
            className="pulseIcon"
            icon={
                <CheckCircleTwoTone twoToneColor="#52c41a" />
            }
            title={
                <>
                    <Trans
                        i18nKey="dashPage.loggedIn"
                        values={{ name: user.name }}
                    >
                        {t("dashPage.loggedIn")}
                    </Trans>
                    <CheckCircleTwoTone style={{ paddingLeft: "5px" }} twoToneColor="#52c41a" />
                </>
            }
        />
    );
};

export default Dashboard;
