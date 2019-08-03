import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const PageFooter = () => {
    return (
        <Footer className="footer">
            <div className="copyright">
                <strong>
                    Copyright &copy; {new Date().getFullYear()} | ÁLEF DUARTE
                </strong>
            </div>
        </Footer>
    );
};

export default PageFooter;
