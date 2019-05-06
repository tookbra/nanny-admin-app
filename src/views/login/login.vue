<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-left"></div>
      <div class="login-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: url("http://www.17sucai.com/preview/242158/2015-01-10/%E7%99%BB%E5%BD%95/images/cloud.jpg")
    0 bottom repeat-x #049ec4;
  animation: animate-cloud 20s linear infinite;

  .login-wrapper {
    margin: 0 auto;
    width: 1000px;
    box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);
  }

  .login-left {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    background-color: #409eff;
    color: #fff;
    float: left;
    width: 50%;
    position: relative;
  }

  .login-right {
    border-left: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    color: #fff;
    background-color: #fff;
    width: 50%;
    float: left;
  }

  .login-right, .login-left {
    position: relative;
    min-height: 500px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
}
</style>
