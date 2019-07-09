<template>
  <a-modal
    destroyOnClose
    :title="title"
    :afterClose="modalClose"
    :visible="dialogVisible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :form="exportForm">
      <a-form-item
        label="导出文件名"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-input
          placeholder="导出文件名"
          v-decorator="[
            'fileName',

            {
              initialValue: '导出数据',
              rules: [
                { required: true, message: '请输入导出文件名' },
                { min: 1, max: 10, message: '用户姓名长度为[1, 10]' }
              ]
            }
          ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import ExportCsv from "../../libs/export-csv";
import Csv from "../../libs/csv";
export default {
  name: "export",
  data() {
    return {
      exportForm: this.$form.createForm(this),
      exportVisible: false
    };
  },
  props: {
    title: {
      type: String,
      required: false,
      default: "确认导出"
    },
    params: {
      type: Object,
      required: false
    },
    dialogVisible: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    handleOk() {
      this.exportForm.validateFields(err => {
        if (!err) {
          let params = Object.assign(
            { fileName: this.exportForm.getFieldValue("fileName") },
            this.params
          );
          this.exportCsv(params);
        }
      });
    },
    handleCancel() {
      this.$emit("dialogCancel", false);
    },
    modalClose() {
      this.title = "确认导出";
      this.fileName = "导出数据";
    },
    exportCsv(params) {
      params.fileName += ".csv";
      let columns = [];
      let datas = [];
      if (params.columns && params.data) {
        columns = params.columns;
        datas = params.data;
      }
      let noHeader = false;
      if ("noHeader" in params) noHeader = params.noHeader;
      const data = Csv(columns, datas, params, noHeader);
      if (params.callback) params.callback(data);
      else ExportCsv.download(params.fileName, data);
    }
  }
};
</script>
