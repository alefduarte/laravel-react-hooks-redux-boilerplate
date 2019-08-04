import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const PageFooter = () => {
    return (
        <Footer className="footer">
            <div className="copyright">
                <strong>
                    Copyright &copy; {new Date().getFullYear()} |{" "}
                    <a
                        href="https://github.com/alefduarte"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                    >
                        ÁLEF DUARTE
                    </a>
                </strong>
            </div>
        </Footer>
    );
};

export default PageFooter;
