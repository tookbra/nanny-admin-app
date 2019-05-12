import { commonResult } from "../common";

// eslint-disable-next-line no-unused-vars
export const pageTenant = req => {
  return commonResult({
    pageNo: 1,
    pages: 1,
    pageSize: 1,
    total: 10,
    records: {}
  });
};
