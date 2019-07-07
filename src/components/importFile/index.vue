<template>
  <a-drawer
    title="导入数据"
    placement="right"
    width="960"
    :closable="false"
    :maskClosable="true"
    :destroyOnClose="true"
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
      @change="handleChange"
    >
      <a-button> <a-icon type="upload" />上传excel文件</a-button>
    </a-upload>
    <a-alert
      :style="{ marginTop: '10px' }"
      message="导入前请下载查看导入模版数据文件，确保数据格式正确，不得修改列英文名称"
      type="warning"
      showIcon
    />
    <a-table
      :bordered="true"
      :style="{ marginTop: '10px' }"
      :columns="columns"
      :dataSource="data"
    >
    </a-table>
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
      <a-button type="primary" :disabled="disabled" @click="handleOk">{{
        importText
      }}</a-button>
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
    },
    columns: {
      default: []
    }
  },
  data() {
    return {
      headers: {
        Authorization: "Bearer " + this.$ls.get(ACCESS_TOKEN)
      },
      disabled: true,
      importText: "确认导入",
      data: []
    };
  },
  methods: {
    onClose() {
      this.data = [];
      this.$emit("close");
    },
    downloadFile() {
      console.log(123);
    },
    beforeUpload(file) {
      const isXls =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isXls) {
        this.$message.error("请选择正确的文件格式");
      }
      return isXls;
    },
    handleChange(info) {
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
        }
        if (res.data.length > 0) {
          this.disabled = false;
          this.importText = "确认导入" + res.data.length + "条数据";
        }
        this.data = info.file.response.data;
      }
    },
    handleOk() {
      this.$emit("handleImport", this.data);
    }
  }
};
</script>

<style scoped></style>
