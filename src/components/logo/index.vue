<template>
  <div class="layout-logo">
    <LogoSvg alt="logo" />
    <h1>91wash</h1>
  </div>
</template>

<script>
import LogoSvg from "@/assets/logo.svg?inline";
export default {
  name: "index",
  components: {
    LogoSvg
  }
};
</script>

<style lang="less">
.layout-logo {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 64px;
  line-height: 64px;
  background: #002140;
  padding-left: 24px;
  font-size: 20px;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: hsla(0, 0%, 100%, 0.8);
  z-index: 950;

  svg {
    height: 32px;
    width: 32px;
    display: inline-block;
    vertical-align: middle;
  }
  h1 {
    color: #fff;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: 600;
    vertical-align: middle;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
