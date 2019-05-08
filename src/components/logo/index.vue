<template>
  <div class="layout-logo"></div>
</template>

<script>
export default {
  name: "index"
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
  background-color: #20222a;
  font-size: 20px;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: hsla(0, 0%, 100%, 0.8);
  z-index: 1024;
}
</style>
