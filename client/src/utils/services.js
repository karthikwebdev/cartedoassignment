import axios from "axios";
const API = "https://cartedo-challenge.herokuapp.com";
const api = axios.create({
  baseURL: `${API}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = (email, password, userName) =>
  api.post("/signup", { email, password, userName });

export const verifyUser = (token) => api.post("/verify", { token });

export const login = (email, password) =>
  api.post("/login", { email, password });

export const getAllBlocks = () =>
  axios.get(`${API}/api/blockchain`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  });

export const postBlocks = (blocks) =>
  axios.post(
    `${API}/api/blockchain`,
    { blocks },
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    }
  );
