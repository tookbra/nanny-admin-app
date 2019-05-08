import Mock from "mockjs";
import { login } from "./login";
import { getResource } from "./resource";
import { getAccountInfo } from "./account";

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
});

// 登录相关和获取用户信息
Mock.mock(/\/auth\/login/, login);
Mock.mock(/\/permissions/, getResource);
Mock.mock(/\/account/, getAccountInfo);

export default Mock;
