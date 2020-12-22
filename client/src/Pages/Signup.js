import { Alert, Button, Card, Tag } from "antd";
import React, { useState } from "react";
import { Input, Tooltip } from "antd";
import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useWindowDimensions from "../utils/useWindowDimensions";
import { Link, Redirect } from "react-router-dom";
import NavBar from "../components/NavBar";
import { signup } from "../utils/services";
import { useSelector } from "react-redux";

function Signup() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

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

  const submitForm = (e) => {
    setLoading(true);
    e.preventDefault();
    signup(email, password, userName)
      .then((data) => {
        if (data.data && data.data.message) {
          setMessage(data.data.message);
          setLoading(false);
          setError(false);
          setTimeout(() => {
            setMessage("");
            setError(false);
          }, 15000);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error) {
          setMessage(err.response.data.error);
          setLoading(false);
          setError(true);
          setTimeout(() => {
            setMessage("");
            setError(false);
          }, 5000);
        } else {
          setError(true);
          setLoading(false);
          setMessage("Something went wrong, try again!");
          setTimeout(() => {
            setError(false);
            setMessage("");
          }, 5000);
        }
      });
  };

  if (user) {
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
              zIndex: 1000,
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
          <h1 style={classes.textCenter}> Signup Here </h1>
          <h3
            style={{
              ...classes.textCenter,
              fontSize: "13px",
              marginTop: "20px",
              color: "#69B7FF",
            }}
          >
            Already Registered!,
            <Link to="/login" style={{ textDecoration: "underline" }}>
              {" "}
              Login here{" "}
            </Link>
          </h3>
          <form onSubmit={submitForm}>
            <Input
              size="large"
              placeholder="Enter Email"
              type="email"
              style={{ margin: "20px 0 0" }}
              prefix={<MailOutlined />}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidEmail(
                  !!e.target.value.match(
                    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
                  )
                );
              }}
              suffix={
                <Tooltip title="Enter correct email for verification, I promise you no spamming ;)">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
            {typeof validEmail === "boolean" ? (
              <Tag
                icon={<ExclamationCircleOutlined />}
                color={validEmail ? "success" : "warning"}
                style={{ display: "block", width: "100%" }}
              >
                {!validEmail ? "Enter valid email address" : "Email is valid"}
              </Tag>
            ) : (
              ""
            )}

            <Input
              size="large"
              placeholder="Enter Username"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ margin: "20px 0" }}
              prefix={<UserOutlined />}
            />
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                style={{ padding: "0 50px" }}
                loading={loading}
                onClick={submitForm}
              >
                Signup
              </Button>
              <button type="submit" style={{ display: "none" }}></button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
