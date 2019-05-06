import axios from "axios";
import store from '../store'

let fetch = axios.create({
  baseURL: process.env.VUE_APP_URL,
  validateStatus: function(status) {
    return status >= 200 && status < 300;
  }
});

fetch.interceptors.request.use(config => {
  if (store.state.account.token) {
    config.headers.Authorization = store.state.account.token;
  }
  return config;
});

fetch.interceptors.response.use((res) => {
    return res.data;
  },
  error => {
    return Promise.reject(error);
  }
);
