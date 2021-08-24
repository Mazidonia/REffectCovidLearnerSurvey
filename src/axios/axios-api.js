import axios from "axios";
import store from "../store/store";
import { endpoint } from "../path/index";

let instance = axios.create({
  baseURL: endpoint,
  timeout: 10000,
  //baseURL: "http://coursess.pcru.ac.th:3000/api/v1/"
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;
    const refreshToken = store.getState().auth.refreshToken;
    config.headers["x-access-token"] = accessToken;
    config.headers["x-refresh-token"] = refreshToken;
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
