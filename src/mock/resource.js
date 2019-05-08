import { commonResult } from "./common";
import { superAdminPermission } from "./data/permission/super-admin";
// eslint-disable-next-line no-unused-vars
export const getResource = req => {
  return commonResult(superAdminPermission);
};
