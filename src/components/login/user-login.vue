<template>
  <a-form
    id="user-login-form"
    :form="form"
    ref="user-login-form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'tenantCode',
          {
            rules: [
              {
                required: true,
                message: '请输入编号',
                validateTrigger: 'change'
              }
            ]
          }
        ]"
        placeholder="请输入编号"
      >
        <a-icon slot="prefix" type="home"></a-icon>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'username',
          {
            rules: [
              {
                required: true,
                message: '请输入账号',
                validateTrigger: 'change'
              }
            ]
          }
        ]"
        placeholder="请输入账号"
      >
        <a-icon slot="prefix" type="user"></a-icon>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入密码',
                validateTrigger: 'change'
              }
            ]
          }
        ]"
        type="password"
        autocomplete="false"
        placeholder="请输入密码"
      >
        <a-icon slot="prefix" type="lock" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        block
        ghost
        type="primary"
        html-type="submit"
        class="login-form-button"
        :loading="state.loginBtn"
        :disabled="state.loginBtn"
      >
        登陆
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "UserLogin",
  data() {
    return {
      state: {
        loginBtn: false
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    ...mapActions(["Login"]),
    handleSubmit(e) {
      e.preventDefault();
      const { state, Login } = this;
      state.loginBtn = true;
      this.form.validateFields((err, values) => {
        if (!err) {
          const loginParams = { ...values };
          loginParams.username += "|" + loginParams.tenantCode;
          Login(loginParams)
            .then(() => this.loginSuccess())
            .finally(() => {
              state.loginBtn = false;
            });
        } else {
          setTimeout(() => {
            state.loginBtn = false;
          }, 600);
        }
      });
    },
    loginSuccess() {
      this.$router.push({ path: "/home" });
    }
  }
};
</script>

<style lang="less">
.login-form {
  .ant-input-affix-wrapper input {
    text-indent: 5px;
    background: transparent;
    border: none;
    border-radius: 0;
    color: #333;
    border-bottom: 1px solid #ebedf2;
  }
  .ant-input-affix-wrapper:focus .ant-input:not(.ant-input-disabled) {
    border-color: #fff !important;
    border-right-width: 0px !important;
  }
  .ant-input:focus {
    border-color: #40a9ff;
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(0, 0, 0, 0) !important;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0) !important;
    border-right-width: 0px !important;
  }
}
</style>
