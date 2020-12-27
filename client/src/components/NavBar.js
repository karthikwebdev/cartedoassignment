import React, { useEffect, useState } from "react";
import Logo from "../Assets/cartedo-logo.svg";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import useWindowDimensions from "../utils/useWindowDimensions";
import { AlignRightOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { actionLogout } from "../store/actions";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;
const { Header } = Layout;
const classes = {
  InvisibleButton: {
    border: "none",
    backgroundColor: "white",
    outline: "none",
  },
};

function NavBar({ history }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [tab, setTab] = useState("0");
  useEffect(() => {
    if (["/", "/login", "/signup"].includes(history.location.pathname)) {
      setTab(["/", "/login", "/signup"].indexOf(history.location.pathname) + 1);
    }
  }, [history, history.location.pathname]);

  function showConfirm() {
    confirm({
      title: "Do you Really want to Logout?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        localStorage.removeItem("token");
        dispatch(actionLogout());
      },
      onCancel() {},
    });
  }

  const MobileNavbar = () => (
    <Layout>
      <Header
        style={{
          position: "fixed",
          backgroundColor: "#fff",
          zIndex: 1,
          width: "100vw",
          margin: 0,
          padding: "0px",
        }}
      >
        <Menu
          theme="light"
          mode={"vertical"}
          defaultSelectedKeys={[tab.toString()]}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              src={Logo}
              alt="logo"
              style={{ width: "80px", marginRight: "50px", marginLeft: "20px" }}
            />
            <button
              style={{ ...classes.InvisibleButton, marginRight: "20px" }}
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <AlignRightOutlined style={{ fontSize: "20px" }} />
            </button>
          </div>
          {isNavOpen ? (
            <>
              <Menu.Item key="1">
                <Link to="/" style={{ textDecoration: "none" }}>
                  {" "}
                  Home{" "}
                </Link>
              </Menu.Item>
              {user ? (
                <Menu.Item onClick={showConfirm} key="2">
                  Logout
                </Menu.Item>
              ) : (
                <>
                  <Menu.Item key="2">
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      {" "}
                      Login{" "}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/signup" style={{ textDecoration: "none" }}>
                      Signup
                    </Link>
                  </Menu.Item>
                </>
              )}
            </>
          ) : (
            ""
          )}
        </Menu>
      </Header>
    </Layout>
  );

  const NotMobileNavBar = () => (
    <Layout>
      <Header
        style={{
          position: "fixed",
          backgroundColor: "#fff",
          zIndex: 1,
          width: "100%",
          margin: 0,
          padding: "0px 30px",
        }}
      >
        <Menu
          theme="light"
          mode={"horizontal"}
          defaultSelectedKeys={[tab.toString()]}
        >
          <img
            src={Logo}
            alt="logo"
            style={{ width: "80px", marginRight: "50px" }}
          />
          <Menu.Item key="1">
            <Link to="/" style={{ textDecoration: "none" }}>
              {" "}
              Home{" "}
            </Link>
          </Menu.Item>
          {user ? (
            <Menu.Item onClick={showConfirm} key="2">
              Logout
            </Menu.Item>
          ) : (
            <>
              <Menu.Item key="2">
                <Link to="/login" style={{ textDecoration: "none" }}>
                  {" "}
                  Login{" "}
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  {" "}
                  Signup{" "}
                </Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Header>
    </Layout>
  );

  return <div>{width <= 450 ? <MobileNavbar /> : <NotMobileNavBar />}</div>;
}

export default withRouter(NavBar);
