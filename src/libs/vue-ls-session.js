// https://github.com/RobinCK/vue-ls/issues/83
import VueStorage from "vue-ls";
const VueSessionStorage = {
  /**
   * Install plugin
   *
   * @param {Object} Vue
   * @param {Object} options
   * @returns {WebStorage}
   */
  install(Vue, options = {}) {
    const _options = Object.assign({}, options, {
      storage: options.storage || "session",
      name: options.name || "ss"
    });
    VueStorage.install(Vue, _options);
  }
};

export default VueSessionStorage;
