import { getDictByType } from "@/api/system/dict";
import Vue from "vue";
import { ACCESS_TOKEN } from "@/store/mutation-types";

let dictUtil = {};

// 获取常用的数据字典保存至vuex
dictUtil.initDictData = function(vm) {
  const token = Vue.ls.get(ACCESS_TOKEN);
  if (token && token != null) {
    getDictByType("tenant_type").then(res => {
      if (res.success) {
        vm.$store.commit("SET_TENANT_TYPE", res.data);
      }
    });
    getDictByType("status").then(res => {
      if (res.success) {
        vm.$store.commit("SET_STATUS", res.data);
      }
    });
    getDictByType("sex").then(res => {
      if (res.success) {
        vm.$store.commit("SET_SEX", res.data);
      }
    });
    getDictByType("product_type").then(res => {
      if (res.success) {
        vm.$store.commit("SET_PRODUCT_TYPE", res.data);
      }
    });
    getDictByType("season").then(res => {
      if (res.success) {
        vm.$store.commit("SET_SEASON", res.data);
      }
    });
    getDictByType("rfid_current_status").then(res => {
      if (res.success) {
        vm.$store.commit("SET_RFID_CURRENT_STATUS", res.data);
      }
    });
  }
};

export default dictUtil;
