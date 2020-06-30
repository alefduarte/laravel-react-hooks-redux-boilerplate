import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import {
    BellOutlined,
    DownOutlined,
    GlobalOutlined,
    HomeOutlined,
    LoginOutlined,
    LogoutOutlined,
    QuestionCircleOutlined,
    SettingOutlined,
    UserAddOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Menu, Dropdown, Avatar, Button, Tooltip, Layout } from "antd";
import { isLoggedIn, isAdmin, expiresAt, isActive } from "@ducks/auth";
import history from "@routes/history";

const { Header } = Layout;

function Navbar() {
    const { t, i18n } = useTranslation();
    const isAuthenticated = useSelector(state => isLoggedIn(state));
    const isAdminUser = useSelector(state => isAdmin(state));
    const isUserActive = useSelector(state => isActive(state));
    const daysToExpire = useSelector(state => expiresAt(state));
    const username = useSelector(state =>
        state.auth.user ? state.auth.user.name : ""
    );
    const userEmail = useSelector(state =>
        state.auth.user ? state.auth.user.email : ""
    );

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <UserOutlined />
                {t("navbar.profile")}
            </Menu.Item>
            <Menu.Item key="1">
                <SettingOutlined />
                {t("navbar.settings")}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2">
                <Link to="/logout">
                    <LogoutOutlined />
                    <span style={{ margin: "10px" }}>{t("navbar.logout")}</span>
                </Link>
            </Menu.Item>
        </Menu>
    );

    const onClick = ({ key }) =>
        setTimeout(() => {
            changeLanguage(key);
        }, 100);

    const languageMenu = (
        <Menu onClick={onClick}>
            <Menu.Item key="pt-BR">Português</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="en">English</Menu.Item>
        </Menu>
    );

    return (
        <Header className="header">
            <div style={{ height: "100%", float: "left" }}>
                <Button
                    type="link"
                    className="header-menu-button"
                    onClick={() => history.push("/")}
                >
                    Boilerplate
                </Button>
                <Button
                    className="header-menu-button"
                    size="large"
                    type="link"
                    icon={<HomeOutlined />}
                    aria-label="start"
                    style={{ width: "40px" }}
                    onClick={() =>
                        isAdminUser
                            ? history.push("/dashboard")
                            : history.push("/home")
                    }
                />
            </div>
            <div style={{ height: "100%" }}>
                <div className="header-container">
                    {isAuthenticated ? (
                        <>
                            <Tooltip title="Ajuda">
                                <Button
                                    className="header-menu-button"
                                    size="large"
                                    type="link"
                                    icon={<QuestionCircleOutlined />}
                                />
                            </Tooltip>
                            <Button
                                className="header-menu-button"
                                size="large"
                                type="link"
                                icon={<BellOutlined />}
                            />
                            <Dropdown overlay={menu}>
                                <span
                                    key={username}
                                    className="header-menu-button"
                                >
                                    <Avatar
                                        style={{
                                            backgroundColor:
                                                "rgb(24, 110, 197)",
                                            verticalAlign: "middle"
                                        }}
                                        size="small"
                                    >
                                        User
                                    </Avatar>
                                    <p className="header-username">
                                        {username}
                                    </p>
                                    <DownOutlined />
                                </span>
                            </Dropdown>
                        </>
                    ) : (
                            <>
                                <Button
                                    className="header-menu-button"
                                    type="link"
                                    icon={<LoginOutlined />}
                                    onClick={() => history.push("/login")}
                                >
                                    {t("general.login")}
                                </Button>
                                <Button
                                    className="header-menu-button"
                                    type="link"
                                    icon={<UserAddOutlined />}
                                    onClick={() => history.push("/register")}
                                >
                                    {t("general.signup")}
                                </Button>
                            </>
                        )}
                    <Dropdown overlay={languageMenu} trigger={["click"]}>
                        <Button
                            className="header-menu-button"
                            size="large"
                            type="link"
                            icon={<GlobalOutlined />}
                            aria-label="home"
                        />
                    </Dropdown>
                </div>
                {isAuthenticated && !isUserActive && (
                    <div className="rectangle-message">
                        <Trans
                            i18nKey="navbar.expire"
                            values={{ days: daysToExpire }}
                            count={daysToExpire}
                        >
                            {t("navbar.expire")}
                        </Trans>
                        <Button
                            type="link"
                            style={{ padding: 0 }}
                            onClick={() =>
                                history.push(
                                    `/resend/${encodeURIComponent(userEmail)}`
                                )
                            }
                        >
                            {t("navbar.clickHere")}
                        </Button>
                        {t("navbar.resend")}
                    </div>
                )}
            </div>
        </Header>
    );
}

export default Navbar;
