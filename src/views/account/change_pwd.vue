<template>
  <basicContainer>
    <a-form :form="form" :style="{ maxWidth: '600px' }" @submit="handleSubmit">
      <a-form-item
        label="原密码"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-input
          placeholder="请输入原密码"
          type="password"
          v-decorator="[
            'oldPassword',
            {
              rules: [
                { required: true, message: '请输入原密码' },
                { min: 6, max: 15, message: '原密码长度为[6.15]' }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="新密码"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-input
          placeholder="请输入新密码"
          type="password"
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: '请输入新密码' },
                { min: 6, max: 15, message: '新密码长度为[6.15]' },
                { validator: handlePassword }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="确认新密码"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-input
          placeholder="请输入确认新密码"
          type="password"
          v-decorator="[
            'confirmPassword',
            {
              rules: [
                { required: true, message: '请输入确认新密码' },
                { min: 6, max: 15, message: '确认新密码长度为[6.15]' },
                { validator: validateRePassword }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button
          type="primary"
          :style="{ marginRight: '5px' }"
          htmlType="submit"
        >
          保存
        </a-button>
        <a-button type="default" @click="handleCancel">
          取消
        </a-button>
      </a-form-item>
    </a-form>
  </basicContainer>
</template>

<script>
import { changePassword } from "@/api/system/employee";
export default {
  name: "change_pwd",
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(err => {
        if (!err) {
          changePassword(this.form.getFieldsValue()).then(() => {
            this.$message.success("修改密码成功");
          });
        }
      });
    },
    handleCancel() {
      this.$store.commit("DEL_TAG", "/change_pwd");
    },
    handlePassword(rule, value, callback) {
      this.password = value;
      callback();
    },
    validateRePassword(rule, value, callback) {
      if (this.password && this.password !== value) {
        callback("两次密码输入不一致！");
      }
      callback();
    }
  }
};
</script>

<style scoped></style>
