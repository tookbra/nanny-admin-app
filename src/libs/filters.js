import Vue from "vue";
const statusMap = {
  1: "正常",
  2: "禁用"
};
Vue.filter("statusFilter", function(status) {
  return statusMap[status];
});

Vue.filter("typeFilter", function(type, typeMap) {
  return typeMap[type];
});
