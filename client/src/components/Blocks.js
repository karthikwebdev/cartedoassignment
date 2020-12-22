import { DownOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { getAllBlocks, postBlocks } from "../utils/services";
import useWindowDimensions from "../utils/useWindowDimensions";
import { useSelector } from "react-redux";
import Block from "./Block";
const crypto = require("crypto");

function Blocks() {
  const { width, height } = useWindowDimensions();
  const [blocks, setBlocks] = useState([]);
  const [data, setData] = useState("");
  const [hashes, setHashes] = useState([]);
  const [error, setError] = useState("");
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

  useEffect(() => {
    getAllBlocks()
      .then((blocksData) => {
        setBlocks(blocksData.data.result);
      })
      .catch((err) => {
        console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.error
        ) {
          setError(err.response.data.error);
        } else {
          setError("Something went wrong! try login again");
        }
      });
  }, [user]);

  const updateTheChangesToBlocks = async () => {
    try {
      await postBlocks(blocks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let prevHash = "0";
    let tempHashes = ["0"];
    blocks.forEach((object) => {
      let newHash = crypto
        .createHmac("sha256", object.data)
        .update(object.nonce + prevHash + object.timeStamp.toString())
        .digest("hex");
      prevHash = newHash;
      tempHashes.push(newHash);
    });
    setHashes(tempHashes);
    if (blocks.length) {
      updateTheChangesToBlocks();
    }
  }, [blocks]);

  const addNewBlock = (e) => {
    e.preventDefault();
    let timeStamp = new Date().getTime();
    let nonce = 0;
    let prev = hashes[hashes.length - 1];
    let hash = "";
    while (!hash.startsWith("00")) {
      nonce = nonce + 1;
      hash = crypto
        .createHmac("sha256", data)
        .update(nonce + prev + timeStamp.toString())
        .digest("hex");
    }
    postBlocks([...blocks, { nonce, timeStamp, data }])
      .then((retrievedData) => {
        setBlocks((prev) => [...retrievedData.data.result]);
        let prevHash = "0";
        let tempHashes = ["0"];
        retrievedData.data.result.forEach((object) => {
          let newHash = crypto
            .createHmac("sha256", object.data)
            .update(object.nonce + prevHash + object.timeStamp.toString())
            .digest("hex");
          prevHash = newHash;
          tempHashes.push(newHash);
        });
        setHashes(tempHashes);
        setData("");
      })
      .catch((err) => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.error
        ) {
          setError(err.response.data.error);
        } else {
          setError("Something went wrong! try login again");
        }
      });
  };

  return (
    <>
      {hashes.length &&
        blocks.map((block, i) => {
          return (
            <React.Fragment key={block._id}>
              <Block
                {...block}
                prevHash={hashes[i]}
                index={i}
                blocks={blocks}
                setBlocks={setBlocks}
              />
              {i + 1 !== blocks.length ? (
                <div
                  style={{
                    margin: "0 auto",
                    textAlign: "center",
                    fontSize: "50px",
                  }}
                >
                  <DownOutlined />
                </div>
              ) : (
                ""
              )}
            </React.Fragment>
          );
        })}
      {error ? (
        <Alert
          message={error}
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
        hoverable
        style={{
          width: width < 800 ? "90%" : "60%",
          margin: "50px auto",
          borderRadius: "20px",
          position: "relative",
        }}
      >
        <h2 style={{ ...styles.heading, marginTop: "10px" }}>Add New Block</h2>
        <form onSubmit={addNewBlock}>
          <Input
            size="large"
            placeholder="Enter Data"
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            style={{ margin: "20px 0" }}
            addonBefore={<span style={{ margin: "10px" }}>Data</span>}
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
              onClick={addNewBlock}
              style={{ padding: "0 50px" }}
              loading={false}
            >
              Add New Block
            </Button>
            <button type="submit" style={{ display: "none" }}></button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default Blocks;
