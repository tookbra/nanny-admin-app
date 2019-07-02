import axios from "axios";
import Vue from "vue";
import { ACCESS_TOKEN } from "@/store/mutation-types";

import notification from "ant-design-vue/es/notification";

export const fetch = axios.create({
  baseURL:
    process.env.VUE_APP_PROXY === "true"
      ? process.env.VUE_APP_PROXY_URL
      : process.env.VUE_APP_URL,
  timeout: 5000,
  validateStatus: function(status) {
    return status >= 200 && status <= 500;
  }
});

fetch.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
}, err);

fetch.interceptors.response.use(res => {
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
