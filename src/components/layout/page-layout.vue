<template>
  <a-layout-content class="basic-container">
    <a-card>
      <slot></slot>
    </a-card>
  </a-layout-content>
</template>

<script>
export default {
  name: "pageLayout"
};
</script>

<style lang="less">
.basic-container {
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
  .el-card {
    width: 100%;
  }
  &:first-child {
    padding-top: 0;
  }
}
</style>
