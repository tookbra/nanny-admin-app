import axios from "axios";

let fetch = axios.create({
  baseURL: process.env.VUE_APP_URL,
  validateStatus: function(status) {
    return status >= 200 && status < 300;
  }
});

fetch.interceptors.request.use(config => {
  if (true) {
    config.headers.Authorization = "token";
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
