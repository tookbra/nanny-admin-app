<template>
  <div class="exception">
    <div class="imgBlock">
      <div
        class="imgEle"
        :style="{ backgroundImage: `url(${config[type].img})` }"
      ></div>
    </div>
    <div class="content">
      <h1>{{ config[type].title }}</h1>
      <div class="desc">{{ config[type].desc }}</div>
      <div class="actions">
        <a-button type="primary" @click="handleToHome">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import types from "./type";
export default {
  name: "Exception",
  props: {
    type: {
      type: String,
      default: "404"
    }
  },
  data() {
    return {
      config: types
    };
  },
  methods: {
    handleToHome() {
      this.$router.push({ name: "dashboard" });
    }
  }
};
</script>
<style lang="less">
.exception {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100%;
  .imgBlock {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 62.5%;
    flex: 0 0 50%;
    width: 50%;
    padding-right: 152px;
    zoom: 1;
  }
  .imgBlock:before,
  .imgBlock:after {
    content: " ";
    display: table;
  }
  .imgEle {
    float: right;
    width: 100%;
    max-width: 430px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }
  .content {
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
    h1 {
      margin-bottom: 24px;
      color: #434e59;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
    }
    .desc {
      margin-bottom: 16px;
      color: rgba(0,0,0,.45);
      font-size: 20px;
      line-height: 28px;
    }
  }
}
</style>
