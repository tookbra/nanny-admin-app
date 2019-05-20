<template>
  <div class="loading" v-if="spinning">
    <div class="background"></div>
    <div class="icon">
      <span class="ant-spin-dot ant-spin-dot-spin"
        ><i></i><i></i><i></i><i></i
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {
      spinning: false
    };
  }
};
</script>
<style lang="less">
.loading {
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 3000;
  display: flex;
  .background {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.65);
    opacity: 0.5;
  }
  .icon {
    position: relative;
    color: #1890ff;
    vertical-align: middle;
    text-align: center;
    .ant-spin-dot-spin {
      position: absolute;
      left: 50%;
    }
  }
}
</style>
