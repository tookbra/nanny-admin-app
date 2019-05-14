import Mock from "mockjs2";
import { builder, getBody } from "../util";

const username = ["admin"];
const password = ["21232f297a57a5a743894a0e4a801fc3"];

// eslint-disable-next-line no-unused-vars
const login = req => {
  const body = getBody(req);
  console.log("mock: body", body);
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, "账户或密码错误", 401);
  }

  return builder(
    {
      user_id: Mock.mock("@guid"),
      name: Mock.mock("@name"),
      username: "admin",
      password: "",
      avatar: "https://blog.tookbra.com/images/logo.png",
      status: 1,
      telephone: "",
      lastLoginIp: "27.154.74.117",
      lastLoginTime: 1534837621348,
      creatorId: "admin",
      createTime: 1497160610259,
      deleted: 0,
      roleId: "admin",
      lang: "zh-CN",
      token: "4291d7da9005377ec9aec4a71ea837f"
    },
    "",
    200,
    { "Custom-Header": Mock.mock("@guid") }
  );
};

Mock.mock(/\/auth\/login/, "post", login);
