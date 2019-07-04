import axios from "axios";
import Vue from "vue";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import errorCode from "@/const/errorCode";
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
  const status = Number(res.status) || 200;
  const message = res.data.msg || errorCode[status] || errorCode["default"];
  if (status !== 200 || (res.data.success && !res.data.success)) {
    Vue.prototype.$loading("hide");
    notification.error({
      message: "操作失败",
      description: message
    });
    return Promise.reject(res.data);
  }
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
