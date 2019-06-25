const path = require("path");
const resolve = dir => {
  return path.join(__dirname, dir);
};

const BASE_URL = process.env.NODE_ENV === "production" ? "/" : "/";

module.exports = {
  publicPath: BASE_URL,
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set("components", resolve("src/components"));
  },
  productionSourceMap: false,
  devServer: {
    open: true,
    proxy: {
      "/system": {
        target: "http://127.0.0.1:20000",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "^/system": "/system"
        }
      }
    }
  }
};
