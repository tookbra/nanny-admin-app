import Vue from "vue";
import LoadingComponent from "./loading.vue";

let showLoading = false;
let loadingNode = null;
const LoadingConstructor = Vue.extend(LoadingComponent);
const Loading = {
  install(Vue) {
    Vue.prototype.$loading = function(type) {
      if (type === "hide") {
        loadingNode.spinning = showLoading = false;
      } else {
        if (showLoading) {
          // 如果loading还在，则不再执行
          return;
        }
        loadingNode = new LoadingConstructor({
          data: {
            spinning: showLoading
          }
        });
        loadingNode.$mount(); // 挂在实例，为了获取下面的loadingNode.$el
        document.body.appendChild(loadingNode.$el);
        loadingNode.spinning = showLoading = true;
      }
    };

    ["show", "hide"].forEach(function(type) {
      Vue.prototype.$loading[type] = function() {
        return Vue.prototype.$loading(type);
      };
    });
  }
};

export default Loading;
