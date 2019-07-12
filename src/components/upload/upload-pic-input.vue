<template>
  <div>
    <a-popover trigger="hover" placement="right" title="图片预览" width="150">
      <a-input
        v-model="currentValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readOnly="readonly"
        @change="handleChange"
        clearable
      />
      <template slot="content">
        <img
          width="150"
          height="150"
          :src="currentValue"
          alt="无效的图片链接"
          style="margin: 0 auto;display: block;"
        />
      </template>
    </a-popover>
    <a-upload
      name="file"
      :showUploadList="false"
      :multiple="false"
      :headers="headers"
      accept="image/*"
      :action="actionUrl"
      :data="data"
      :beforeUpload="beforeUpload"
      @change="handleUploadChange"
    >
      <a-button :loading="loading" :disable="disabled">
        <a-icon type="upload" />上传图片</a-button
      >
    </a-upload>
  </div>
</template>

<script>
import { ACCESS_TOKEN } from "@/store/mutation-types";
export default {
  name: "uploadPicInput",
  props: {
    value: String,
    placeholder: {
      type: String,
      default: "可输入图片链接"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    data: {},
    actionUrl: String
  },
  data() {
    return {
      accessToken: {},
      currentValue: this.value,
      loading: false,
      headers: {
        Authorization: "Bearer " + this.$ls.get(ACCESS_TOKEN)
      }
    };
  },
  methods: {
    beforeUpload(file) {
      const isLt3M = file.size / 1024 / 1024 < 5;
      if (!isLt3M) {
        this.$message.error("Image must smaller than 2MB!");
        return false;
      }
      this.loading = true;
      return true;
    },
    handleChange() {
      this.$emit("input", this.currentValue);
      this.$emit("change", this.currentValue);
    },
    handleUploadChange(info) {
      this.loading = false;
      if (info.file.status === "error") {
        this.$notification.error({
          message: "错误提示",
          description: info.file.response.msg
        });
        return;
      }

      if (info.file.status === "done") {
        let res = info.file.response;
        if (!res.success) {
          this.$notification.error({
            message: "错误提示",
            description: res.msg
          });
          return;
        } else {
          this.currentValue = res.data.url;
          this.$emit("input", this.currentValue);
          this.$emit("change", this.currentValue);
        }
      }
    },
    setCurrentValue(value) {
      if (value === this.currentValue) {
        return;
      }
      this.currentValue = value;
      this.$emit("change", this.currentValue);
    }
  },
  watch: {
    value(val) {
      this.setCurrentValue(val);
    }
  }
};
</script>

<style scoped></style>
