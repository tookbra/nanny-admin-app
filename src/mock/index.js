import Mock from "mockjs2";
// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
});

// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if (
  process.env.NODE_ENV !== "production" ||
  process.env.VUE_APP_PREVIEW === "true"
) {
  // 使用同步加载依赖
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
  console.log("mock mounting");
  require("./services/account");
  require("./services/login");
  require("./services/resource");
  require("./services/system/tenant");
  require("./services/system/menu");
  require("./services/system/dict");

  Mock.setup({
    timeout: 800 // setter delay time
  });
  console.log("mock mounted");
}
