import axios from "axios";
import store from "@/store";

import notification from "ant-design-vue/es/notification";

export const fetch = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 5000,
  validateStatus: function(status) {
    return status >= 200 && status < 300;
  }
});

fetch.interceptors.request.use(config => {
  if (store.state.account.token) {
    config.headers.Authorization = store.state.account.token;
  }
  return config;
}, err);

fetch.interceptors.response.use(res => {
  console.log(res.data);
  return res.data;
}, err);

const err = error => {
  if (error.response) {
    const data = error.response.data;
    if (error.response.status === 403) {
      notification.error({
        message: "Forbidden",
        description: data.message
      });
    }
    if (error.response.status === 401) {
      notification.error({
        message: "Unauthorized",
        description: "Authorization verification failed"
      });
    }
  }
  return Promise.reject(error);
};
