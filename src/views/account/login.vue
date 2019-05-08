<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-left">
        <a-carousel autoplay>
          <div><h3>2222</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </a-carousel>
      </div>
      <div class="login-right">
        <div class="login-main">
          <h4 class="login-title">登陆</h4>
          <user-login></user-login>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserLogin from "components/login/user-login";
export default {
  name: "login",
  components: {
    UserLogin
  }
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
    position: relative;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;

    .login-main {
      margin: 0 auto;
      width: 70%;
    }
  }

  .login-right,
  .login-left {
    min-height: 500px;
  }

  .login-title {
    color: #333;
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 22px;
    text-align: center;
    letter-spacing: 4px;
  }
}
.ant-carousel {
  .slick-slide {
    text-align: center;
    overflow: hidden;
    div {
      min-height: 500px;
    }
  }
}
</style>
