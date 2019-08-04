import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, Dropdown, Icon, Avatar, Button, Tooltip, Layout } from "antd";
import { isLoggedIn } from "@ducks/auth";
import history from "@routes/history";

const { Header } = Layout;

function Navbar() {
    const { t, i18n } = useTranslation();
    const isAuthenticated = useSelector(state => isLoggedIn(state));
    const user = useSelector(state => state.user);

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Icon type="user" />
                {t("navbar.profile")}
            </Menu.Item>
            <Menu.Item key="1">
                <Icon type="setting" />
                {t("navbar.settings")}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2">
                <Link to="/logout">
                    <Icon type="logout" />
                    <span style={{ margin: "10px" }}>{t("navbar.logout")}</span>
                </Link>
            </Menu.Item>
        </Menu>
    );

    const onClick = ({ key }) => changeLanguage(key);

    const languageMenu = (
        <Menu onClick={onClick}>
            <Menu.Item key="pt-BR">Português</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="en">English</Menu.Item>
        </Menu>
    );

    return (
        <Header className="header">
            {isAuthenticated ? (
                <div style={{ height: "100%" }}>
                    <div className="header-container">
                        <Tooltip title="Ajuda">
                            <Button
                                className="header-menu-button"
                                size="large"
                                type="link"
                                icon="question-circle"
                            />
                        </Tooltip>
                        <Button
                            className="header-menu-button"
                            size="large"
                            type="link"
                            icon="bell"
                        />
                        <Dropdown overlay={menu}>
                            <span
                                key={user.name}
                                className="header-menu-button"
                            >
                                <Avatar
                                    style={{
                                        backgroundColor: "rgb(24, 110, 197)",
                                        verticalAlign: "middle"
                                    }}
                                    size="small"
                                >
                                    User
                                </Avatar>
                                <p className="header-username">{user.name}</p>
                                <Icon type="down" />
                            </span>
                        </Dropdown>
                    </div>
                </div>
            ) : (
                <div style={{ height: "100%" }}>
                    <div style={{ height: "100%", float: "left" }}>
                        <Button
                            className="header-menu-button"
                            size="large"
                            type="link"
                            icon="home"
                            aria-label="home"
                            style={{ margin: "0px 15px", width: "60px" }}
                            onClick={() => history.push("/")}
                        />
                    </div>
                    <div className="header-container">
                        <Button
                            className="header-menu-button"
                            type="link"
                            icon="login"
                            onClick={() => history.push("/login")}
                        >
                            {t("general.login")}
                        </Button>
                        <Button
                            className="header-menu-button"
                            type="link"
                            icon="user-add"
                            onClick={() => history.push("/register")}
                        >
                            {t("general.signup")}
                        </Button>
                        <Dropdown overlay={languageMenu} trigger={["click"]}>
                            <Button
                                className="header-menu-button"
                                size="large"
                                type="link"
                                icon="global"
                                aria-label="home"
                                style={{ margin: "0px 5px" }}
                            />
                        </Dropdown>
                    </div>
                </div>
            )}
        </Header>
    );
}

export default Navbar;
