import Mock from "mockjs2";
import { builder } from "../../util";

const pageTenant = () => {
  return builder({
    pageNo: 1,
    pages: 1,
    pageSize: 1,
    total: 10,
    records: [
      {
        id: 1,
        tenantCode: 10001,
        tenantName: "租户1",
        tenantUserName: "租户1",
        tenantMobile: "15000000000",
        tenantAddress: "杭州"
      },
      {
        id: 2,
        tenantCode: 10001,
        tenantName: "租户1",
        tenantUserName: "租户1",
        tenantMobile: "15000000000",
        tenantAddress: "杭州"
      },
      {
        id: 3,
        tenantCode: 10001,
        tenantName: "租户1",
        tenantUserName: "租户1",
        tenantMobile: "15000000000",
        tenantAddress: "杭州"
      },
      {
        id: 4,
        tenantCode: 10001,
        tenantName: "租户1",
        tenantUserName: "租户1",
        tenantMobile: "15000000000",
        tenantAddress: "杭州"
      },
      {
        id: 5,
        tenantCode: 10001,
        tenantName: "租户1",
        tenantUserName: "租户1",
        tenantMobile: "15000000000",
        tenantAddress: "杭州"
      },
      {
        id: 6,
        tenantCode: 10001,
        tenantName: "租户1",
        tenantUserName: "租户1",
        tenantMobile: "15000000000",
        tenantAddress: "杭州"
      },
      {
        id: 7,
        tenantCode: 10001,
        tenantName: "租户1",
        tenantUserName: "租户1",
        tenantMobile: "15000000000",
        tenantAddress: "杭州"
      },
      {
        id: 8,
        tenantCode: 10001,
        tenantName: "租户1",
        tenantUserName: "租户1",
        tenantMobile: "15000000000",
        tenantAddress: "杭州"
      },
      {
        id: 9,
        tenantCode: 10001,
        tenantName: "租户1",
        tenantUserName: "租户1",
        tenantMobile: "15000000000",
        tenantAddress: "杭州"
      },
      {
        id: 10,
        tenantCode: 10001,
        tenantName: "租户1",
        tenantUserName: "租户1",
        tenantMobile: "15000000000",
        tenantAddress: "杭州"
      },
      {
        id: 11,
        tenantCode: 10001,
        tenantName: "租户1",
        tenantUserName: "租户1",
        tenantMobile: "15000000000",
        tenantAddress: "杭州"
      }
    ]
  });
};

// eslint-disable-next-line no-unused-vars
export const removeTenant = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const addTenant = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const modifyTenant = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const getTenant = req => {
  return builder({
    id: 1,
    tenantCode: 10001,
    tenantName: "租户1",
    tenantUserName: "租户1",
    tenantMobile: "15000000000",
    tenantAddress: "杭州"
  });
};

Mock.mock(/\/tenants\/1/, "get", getTenant);
Mock.mock(/\/tenants\/1/, "put", modifyTenant);
Mock.mock(/\/tenants/, "get", pageTenant);
Mock.mock(/\/tenants/, "post", addTenant);
Mock.mock(/\/tenants\/batch/, "post", removeTenant);
Mock.mock(/\/tenants/, "delete", removeTenant);
