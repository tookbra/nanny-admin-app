export default {
  /**
   * @name UVPV 固定名称不支持修改
   * @desc UV、PV埋点
   */
  UVPV() {
    let location = window.location;
    let contentUrl = location.pathname + location.hash;
    console.log(location);
    console.log(contentUrl);
    console.log(22);
  },
  /**
   * @name TONP 固定名称不支持修改
   * @desc 页面停留时间埋点（Time on Page）
   * @param {Timestamp} et 进入页面时间
   * @param {Timestamp} dt 离开页面时间
   */
  TONP({ et, dt }) {
    console.log(et);
    console.log(dt);
  }
};
