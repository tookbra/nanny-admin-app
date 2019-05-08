import { commonResult } from "./common";

// eslint-disable-next-line no-unused-vars
export const getAccountInfo = req => {
  return commonResult({
    avatar: "https://blog.tookbra.com/images/logo.png",
    name: "admin"
  });
};
