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
    // 忽略的打包文件
    // config.externals({
    //   "v-track": "v-track"
    // });
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .oneOf("inline")
      .resourceQuery(/inline/)
      .use("vue-svg-icon-loader")
      .loader("vue-svg-icon-loader")
      .end()
      .end()
      .oneOf("external")
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "assets/[name].[hash:8].[ext]"
      });
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true
      }
    }
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
      },
      "/auth": {
        target: "http://127.0.0.1:20000",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "^/auth": "/auth"
        }
      },
      "/oss": {
        target: "http://127.0.0.1:20000",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "^/oss": "/oss"
        }
      }
    }
  }
};
