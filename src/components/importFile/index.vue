<template>
  <a-drawer
    title="导入数据"
    placement="right"
    width="960"
    :closable="false"
    :maskClosable="true"
    :visible="importVisiable"
    :wrapStyle="{
      height: 'calc(100% - 108px)',
      overflow: 'auto',
      paddingBottom: '108px'
    }"
  >
    <a-upload
      name="file"
      accept=".xls, .xlsx"
      :action="actionUrl"
      :beforeUpload="beforeUpload"
      :headers="headers"
      :data="importData"
    >
      <a-button> <a-icon type="upload" />上传excel文件</a-button>
    </a-upload>
    <a-alert
      :style="{ marginTop: '10px' }"
      message="导入前请下载查看导入模版数据文件，确保数据格式正确，不得修改列英文名称"
      type="warning"
      showIcon
    />
    <div
      :style="{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right'
      }"
    >
      <a-button
        type="primary"
        :style="{ position: 'absolute', left: '15px' }"
        @click="downloadFile"
      >
        下载导入模版
      </a-button>
      <a-button :style="{ marginRight: '8px' }" @click="onClose">
        关闭
      </a-button>
      <a-button type="primary">确认导入</a-button>
    </div>
  </a-drawer>
</template>

<script>
import { ACCESS_TOKEN } from "@/store/mutation-types";
export default {
  name: "import-file",
  props: {
    importVisiable: {
      default: false
    },
    actionUrl: {
      default: ""
    },
    importData: {
      default: {}
    }
  },
  data() {
    return {
      headers: {
        Authorization: "Bearer " + this.$ls.get(ACCESS_TOKEN)
      }
    };
  },
  methods: {
    onClose() {
      this.$emit("close");
    },
    downloadFile() {
      console.log(123);
    },
    beforeUpload(file) {
      const isJPG =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isJPG) {
        this.$message.error("请选择正确的文件格式");
      }
      return isJPG;
    }
  }
};
</script>

<style scoped></style>
