import axios from "axios";

const api = axios.create({
  baseURL: "https://tecprime.com.br/api",
});

export default api;
