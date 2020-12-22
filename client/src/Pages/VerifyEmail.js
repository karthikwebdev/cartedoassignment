import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Success from "../Assets/Success.gif";
import { verifyUser } from "../utils/services";
import { Redirect } from "react-router-dom";

function VerifyEmail({ match }) {
  const { token } = match.params;
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [redirect, setRedirect] = useState("");
  useEffect(() => {
    verifyUser(token)
      .then((data) => {
        setDisplay(true);
        setTimeout(() => {
          setVerified(true);
        }, [4000]);
        setTimeout(() => {
          setDisplay(false);
          setRedirect("/login");
        }, [8000]);
      })
      .catch((err) => {
        setDisplay(false);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.error
        ) {
          setError(err.response.data.error);
        } else {
          setError("Something went wrong!!!");
        }
      });
  }, [token]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <>
      <NavBar />
      {display ? (
        <>
          {verified ? (
            <div
              style={{
                textAlign: "center",
                color: "green",
                marginTop: "100px",
              }}
            >
              {"Email verification successful"}{" "}
            </div>
          ) : (
            ""
          )}
          <img
            src={Success}
            alt="Success"
            style={{ display: "block", margin: "100px auto", width: "200px" }}
          />
        </>
      ) : (
        <>
          {error ? (
            <div
              style={{ textAlign: "center", color: "red", marginTop: "300px" }}
            >
              {error}{" "}
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}

export default VerifyEmail;
