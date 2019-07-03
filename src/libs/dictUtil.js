import { getDictByType } from "@/api/system/dict";

let dictUtil = {};

// 获取常用的数据字典保存至vuex
dictUtil.initDictData = function(vm) {
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
};

export default dictUtil;
