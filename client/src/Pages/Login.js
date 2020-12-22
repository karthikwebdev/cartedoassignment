import { Alert, Button, Card } from "antd";
import React, { useState } from "react";
import { Input, Tooltip } from "antd";
import {
  InfoCircleOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import useWindowDimensions from "../utils/useWindowDimensions";
import { Link, Redirect } from "react-router-dom";
import NavBar from "../components/NavBar";
import { login } from "../utils/services";
import { useSelector, useDispatch } from "react-redux";
import { actionLogin } from "../store/actions";

function Login() {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState("");

  const classes = {
    fullScreen: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height,
      backgroundColor: "#eee",
    },
    textCenter: {
      textAlign: "center",
    },
  };

  const loginUser = (e) => {
    setLoading(true);
    e.preventDefault();
    login(email, password)
      .then((data) => {
        if (data.data && data.data.token) {
          let token = data.data.token;
          setRedirect("/");
          let parsedData = JSON.parse(window.atob(token.split(".")[1]));
          localStorage.setItem("token", token);
          dispatch(actionLogin(parsedData));
          setTimeout(() => {}, 3000);
        }
      })
      .catch((err) => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.error
        ) {
          setMessage(err.response.data.error);
          setLoading(false);
          setError(true);
          setTimeout(() => {
            setMessage("");
            setError(false);
          }, 5000);
        }
      });
  };
  if (redirect || user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <NavBar />
      <div style={classes.fullScreen}>
        {message ? (
          <Alert
            message={message}
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translate(-50%)",
            }}
            type={error ? "error" : "success"}
            showIcon
            closable
          />
        ) : (
          ""
        )}
        <Card
          bordered
          hoverable={true}
          style={{ width: width < 400 ? "90%" : 400, borderRadius: "20px" }}
        >
          <h1 style={classes.textCenter}> Login Here </h1>
          <h3
            style={{
              ...classes.textCenter,
              fontSize: "13px",
              marginTop: "20px",
              color: "#69B7FF",
            }}
          >
            No account!,
            <Link to="/signup" style={{ textDecoration: "underline" }}>
              {" "}
              Signup here{" "}
            </Link>
          </h3>
          <form onSubmit={loginUser}>
            <Input
              size="large"
              placeholder="Enter Email"
              type="email"
              style={{ margin: "20px 0" }}
              prefix={<MailOutlined />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              suffix={
                <Tooltip title="Enter Verified email address">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              style={{ margin: "20px 0" }}
            />
            <div
              style={{
                width: "100%",
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type={"primary"}
                size={"large"}
                shape="round"
                onClick={loginUser}
                style={{ padding: "0 50px" }}
                loading={loading}
              >
                Login
              </Button>
              <button type="submit" style={{ display: "none" }}></button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Login;
