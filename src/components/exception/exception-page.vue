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
<style lang="less"></style>
