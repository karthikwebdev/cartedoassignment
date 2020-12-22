import { Button, Card, Input, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import useWindowDimensions from "../utils/useWindowDimensions";
const crypto = require("crypto");

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = "0" + a.getDate();
  var hour = "0" + a.getHours();
  var min = "0" + a.getMinutes();
  var sec = "0" + a.getSeconds();
  var time =
    date.substr(-2) +
    " " +
    month +
    " " +
    year +
    " " +
    hour.substr(-2) +
    ":" +
    min.substr(-2) +
    ":" +
    sec.substr(-2);
  return time;
}

function isValidHash(hash) {
  return typeof hash === "string" ? hash.startsWith("00") : false;
}

function Block({ data, timeStamp, nonce, prevHash, index, blocks, setBlocks }) {
  const { width, height } = useWindowDimensions();
  const [hash, setHash] = useState("");

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
    setHash(
      crypto
        .createHmac("sha256", data)
        .update(nonce + prevHash + timeStamp.toString())
        .digest("hex")
    );
  }, [data, nonce, prevHash, timeStamp]);

  const updateBlocks = (e) => {
    let newData = e.target.value;
    setBlocks((prev) => {
      let prevBlocks = [...prev];
      prevBlocks[index] = {
        ...prevBlocks[index],
        data: newData,
      };
      return prevBlocks;
    });
  };

  const mineBlock = () => {
    let timeStamp = new Date().getTime();
    let nonce = 0;
    let hash = "";
    while (!hash.startsWith("00")) {
      nonce = nonce + 1;
      hash = crypto
        .createHmac("sha256", data)
        .update(nonce + prevHash + timeStamp.toString())
        .digest("hex");
    }
    setBlocks((prev) => {
      let prevBlocks = [...prev];
      prevBlocks[index] = {
        ...prevBlocks[index],
        nonce,
        timeStamp,
      };
      return prevBlocks;
    });
  };

  return (
    <Card
      hoverable
      style={{
        width: width < 800 ? "90%" : "60%",
        margin: "50px auto",
        borderRadius: "20px",
        position: "relative",
        backgroundColor: isValidHash(hash) ? "#22CC7E10" : "#FF362E20",
      }}
    >
      <h2 style={{ ...styles.heading, marginTop: "10px" }}>
        {" "}
        {index === 0 ? "Genesis Block" : `Block  #${index}`}{" "}
      </h2>
      <Input
        size="large"
        placeholder="Enter Data"
        value={blocks[index].data}
        onChange={updateBlocks}
        type="text"
        style={{ margin: "20px 0" }}
        addonBefore={<span style={{ margin: "10px" }}>Data</span>}
      />
      <div style={{ overflow: "hidden", display: "flex" }}>
        <span
          style={{
            textTransform: "Capitalize",
            width: width < 400 ? "30%" : "15%",
          }}
        >
          Prev Hash:{" "}
        </span>{" "}
        <span
          type="red"
          style={{
            width: "80%",
            overflow: width < 400 ? "scroll" : "hidden",
            fontSize: "10px",
            color: isValidHash(prevHash) || prevHash === "0" ? "green" : "red",
          }}
        >
          {prevHash}
        </span>
      </div>
      <div style={{ overflow: "hidden", display: "flex" }}>
        <span
          style={{
            textTransform: "Capitalize",
            width: width < 400 ? "30%" : "15%",
          }}
        >
          Hash:{" "}
        </span>
        <span
          style={{
            width: "80%",
            overflow: width < 400 ? "scroll" : "hidden",
            color: "green",
            fontSize: "10px",
          }}
        >
          <Tag color={isValidHash(hash) ? "green" : "red"}>{hash}</Tag>
        </span>
      </div>
      <h4 style={{ marginTop: "20px", width: "50%" }}>
        {timeConverter(timeStamp / 1000)}
      </h4>

      {isValidHash(hash) ? (
        <Tag
          color="#87d068"
          style={{ position: "absolute", bottom: "30px", right: "30px" }}
        >
          <Tooltip placement="topLeft" title={"Nonce"}>
            {nonce}
          </Tooltip>
        </Tag>
      ) : (
        <Button
          onClick={mineBlock}
          style={{ position: "absolute", bottom: "30px", right: "30px" }}
        >
          Mine Block
        </Button>
      )}
    </Card>
  );
}

export default Block;
