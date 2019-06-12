import Mock from "mockjs2";
import { builder } from "../../util";

const pageProduct = () => {
  return builder({
    pageNo: 1,
    pages: 1,
    pageSize: 1,
    total: 10,
    records: [
      {
        id: "1",
        name: "医生服",
        code: "1001",
        attr: "L",
        color: "白色",
        status: 1
      }
    ]
  });
};

// eslint-disable-next-line no-unused-vars
export const removeProduct = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const getProduct = req => {
  return builder({
    id: "1",
    name: "医生服",
    code: "1001",
    attr: "L",
    color: "白色",
    status: 1
  });
};

// eslint-disable-next-line no-unused-vars
export const addProduct = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const modifyProduct = req => {
  return builder({});
};

Mock.mock(/\/products\/1/, "get", getProduct);
Mock.mock(/\/products/, "get", pageProduct);
Mock.mock(/\/products\/1/, "put", modifyProduct);
Mock.mock(/\/products/, "post", addProduct);
Mock.mock(/\/products/, "delete", removeProduct);
Mock.mock(/\/products\/batch/, "post", removeProduct);
