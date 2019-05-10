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
  padding: 10px 6px;
  border-radius: 10px;
  box-sizing: border-box;
  .el-card {
    width: 100%;
  }
  &:first-child {
    padding-top: 0;
  }
}
</style>
