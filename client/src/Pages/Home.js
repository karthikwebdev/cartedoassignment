import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import useWindowDimensions from "../utils/useWindowDimensions";
import Blockchain from "../Assets/blockchain2.gif";
import { useSelector } from "react-redux";
import Blocks from "../components/Blocks";

function Home() {
  const { width, height } = useWindowDimensions();
  const user = useSelector((state) => state.user);

  const styles = {
    heading: {
      textAlign: "center",
      textTransform: "uppercase",
      marginTop: "100px",
    },
    container: {
      minHeight: height,
      paddingBottom: "100px",
      backgroundColor: "#eee",
    },
  };

  return (
    <>
      <div style={styles.container}>
        <NavBar />
        <h1
          style={{ ...styles.heading, fontSize: width < 320 ? "2rem" : "3rem" }}
        >
          {" "}
          Blockchain{" "}
        </h1>
        <img
          src={Blockchain}
          style={{
            width: width > 400 ? "20%" : "30%",
            margin: "0 auto",
            display: "block",
          }}
          alt="blockchain"
        />
        {!user ? (
          <>
            <h3 style={{ ...styles.heading, marginTop: "50px" }}>
              {" "}
              Please Login to Add and Access Blocks{" "}
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: width > 400 ? "row" : "column",
              }}
            >
              <Link to="/login" style={{ margin: "10px 20px" }}>
                <Button
                  type="primary"
                  shape="round"
                  style={{ padding: "0 50px" }}
                  size="large"
                >
                  Login
                </Button>
              </Link>
              <div style={{ margin: "10px 20px" }}> OR </div>
              <Link to="/signup" style={{ margin: "10px 20px" }}>
                <Button
                  type="primary"
                  shape="round"
                  style={{ padding: "0 50px" }}
                  size="large"
                >
                  Signup
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <Blocks />
        )}
      </div>
    </>
  );
}

export default Home;
