import axios from "axios";
import Vue from "vue";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import errorCode from "@/const/errorCode";
import notification from "ant-design-vue/es/notification";
import { showLoading, hideLoading } from "./util";

const notNotfiy = [
  "/system/dicts/type/status",
  "/system/dicts/type/sex",
  "/system/dicts/type/tenant_type",
  "/system/dicts/type/product_type",
  "/system/dicts/type/season",
  "/system/dicts/type/rfid_current_status"
];
export const fetch = axios.create({
  baseURL: "/",
  timeout: 10000,
  withCredentials: true,
  validateStatus: function(status) {
    return status >= 200 && status <= 6000;
  }
});

fetch.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN);
  const isToken = (config.headers || {}).isToken === false;
  if (token && !isToken) {
    config.headers.Authorization = "Bearer " + token;
  }
  if (config.showLoading) {
    showLoading();
  }
  return config;
}, err);

fetch.interceptors.response.use(res => {
  if (res.config.showLoading) {
    hideLoading();
  }
  console.log(res);
  const status = Number(res.status) || 200;
  const message = res.data.msg || errorCode[status] || errorCode["default"];
  if (status !== 200 || (res.data.success != null && !res.data.success)) {
    if (!notNotfiy.includes(res.config.url)) {
      notification.error({
        message: "操作失败",
        description: message
      });
    }
    return Promise.reject(res.data);
  }
  return res.data;
}, err);

const err = error => {
  console.log(error);
  if (error.response) {
    const data = error.response.data;
    if (error.response.status === 403) {
      notification.error({
        message: "Forbidden",
        description: data.message
      });
    }
    if (error.response.status === 401) {
      console.log(error);
      notification.error({
        message: "Unauthorized",
        description: "Authorization verification failed"
      });
    }
  }
  return Promise.reject(error);
};
