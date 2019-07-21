<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-right">
        <div class="login-main">
          <h4 class="login-title">登陆</h4>
          <user-login></user-login>
          <footer class="copyright">
            <p>
              杭州宝亿健@<a href="http://baoyijian.cn" target="_blank"
                >baoyijian.cn</a
              >
            </p>
          </footer>
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
  background: url("http://www.17sucai.com/preview/242158/2015-01-10/%E7%99%BB%E5%BD%95/images/cloud.jpg")
    0 bottom repeat-x #049ec4;
  animation: animate-cloud 20s linear infinite;

  .login-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 1000px;
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
    height: 100%;
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
  .copyright {
    margin-top: 60px;
    font-size: 0.858rem;
    color: #37474f;
    letter-spacing: 1px;
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;
    text-align: center;
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
