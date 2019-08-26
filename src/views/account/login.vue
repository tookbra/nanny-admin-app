<template>
  <div class="login-container">
    <div class="login-left">
      <a-carousel class="carousel" autoplay>
        <div :style="{ height: height + 'px' }">
          <img
            src="https://img-tookbra.oss-cn-hangzhou.aliyuncs.com/1123.jpg"
            alt
          />
        </div>
        <div :style="{ height: height + 'px' }">
          <img
            src="https://img-tookbra.oss-cn-hangzhou.aliyuncs.com/20190825221215.jpg"
            alt
          />
        </div>
        <div :style="{ height: height + 'px' }">
          <img
            src="https://img-tookbra.oss-cn-hangzhou.aliyuncs.com/timg%20%281%29.jpg"
            alt
          />
        </div>
      </a-carousel>
    </div>
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
</template>

<script>
import UserLogin from "components/login/user-login";
export default {
  name: "login",
  data() {
    return {
      height: "500px"
    };
  },
  components: {
    UserLogin
  },
  beforeMount: function() {
    this.height = `${document.documentElement.clientHeight}`;
  }
};
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: space-between;
  height: 100%;

  .login-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 1000px;
  }

  .login-left {
    flex: 1;
    .carousel {
      height: 100%;
      img {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
      }
      .ant-carousel {
        .slick-slider {
          height: 100%;
        }
      }
    }
  }

  .login-right {
    min-width: 500px;
    height: 100%;
    border-left: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    color: #fff;
    background-color: #fff;
    /*width: 50%;*/
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
    min-width: 500px;
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
  }
  .slick-slider {
    height: 100%;
  }
}
</style>
