import { commonResult } from "./common";
// eslint-disable-next-line no-unused-vars
const USER_MAP = {
  super_admin: {
    name: "super_admin",
    user_id: "1",
    token: "super_admin",
    avatar: "https://blog.tookbra.com/images/logo.png"
  }
};

// eslint-disable-next-line no-unused-vars
export const login = req => {
  req = JSON.parse(req.body);
  return commonResult({ token: "test" });
};
