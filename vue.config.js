const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const resolve = dir => {
  return path.join(__dirname, dir);
};

const cdn = {
  css: ["https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css"],
  js: [
    "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
    "https://cdn.bootcss.com/axios/0.18.0/axios.min.js",
    "https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js",
    "https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js",
    "https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js",
    "https://cdn.bootcss.com/vue-ls/3.2.1/vue-ls.min.js",
    "https://cdn.bootcss.com/countup.js/1.9.3/countUp.min.js"
  ]
};

const BASE_URL = process.env.NODE_ENV === "production" ? "/" : "/";

function getProdExternals() {
  return {
    vue: "Vue",
    axios: "axios",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    "vue-ls": "VueStorage",
    "countup.js": "CountUp",
    nprogress: "NProgress"
  };
}

module.exports = {
  publicPath: BASE_URL,
  lintOnSave: true,
  configureWebpack: config => {
    if (IS_PRODUCTION) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8
        })
      );
      config.externals = getProdExternals();
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set("components", resolve("src/components"));
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
    // 生产环境配置
    if (IS_PRODUCTION) {
      // 生产环境注入cdn
      config.plugin("html").tap(args => {
        args[0].cdn = cdn;
        return args;
      });
    }
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
    port: 4100,
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
