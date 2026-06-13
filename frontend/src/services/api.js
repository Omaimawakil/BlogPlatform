import axios from "axios";

const API = axios.create({
  baseURL: "https://blogplatform-wxxw.onrender.com",
});

export default API;