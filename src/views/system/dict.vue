<template>
  <basicContainer>
    <div class="search-wrapper" v-if="showSearch">
      <a-form layout="inline">
        <a-row :gutter="16">
          <a-col :md="5" :sm="24">
            <a-form-item label="字典名称">
              <a-input v-model="queryParam.name" placeholder="字典名称" />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="字典键名">
              <a-input v-model="queryParam.key" placeholder="字典键名" />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button
                type="primary"
                icon="search"
                @click="$refs.table.refresh(true)"
                >查询</a-button
              >
              <a-button
                icon="delete"
                style="margin-left: 8px"
                @click="() => (queryParam = {})"
                >重置</a-button
              >
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <table-menu
      :showSearch="showSearch"
      @updateShowSearch="updateShowSearch"
      @refresh="refresh"
      @remove="batchRemove"
      @showAdd="showAdd"
    />
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="false"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      :showSizeChanger="true"
    >
      <span slot="action" class="table-nav" slot-scope="text, record">
        <template>
          <a @click="() => showDetail(record)">
            <a-icon type="eye" />
            详情
          </a>
          <a-divider type="vertical" />
          <a @click="() => showModify(record)">
            <a-icon type="edit" />
            编辑
          </a>
          <a-divider type="vertical" />
          <a @click="() => remove(record)">
            <a-icon type="delete" />
            删除
          </a>
        </template>
      </span>
    </s-table>

    <a-modal
      :title="title"
      v-model="visible"
      width="780px"
      :afterClose="modalClose"
      @ok="handleOk"
      :okButtonProps="{ props: { disabled: okDisabled } }"
    >
      <a-form :form="dictForm">
        <a-form-item
          label="字典名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入字典名称"
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: '请输入字典名称' },
                  { max: 20, message: '长度不能超过20个字符' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="字典编码"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入字典编码"
            v-decorator="[
              'code',
              {
                rules: [
                  { required: true, message: '请输入字典编码' },
                  { max: 20, message: '长度不能超过20个字符' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="字典键名"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入字典键名"
            v-decorator="[
              'dictKey',
              {
                rules: [
                  { required: true, message: '请输入字典键名' },
                  { max: 20, message: '长度不能超过20个字符' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="字典键值"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入字典键值"
            v-decorator="[
              'dictValue',
              {
                rules: [
                  { required: true, message: '请输入字典键值' },
                  { max: 20, message: '长度不能超过20个字符' }
                ]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </basicContainer>
</template>

<script>
import { STable, tableMenu } from "@/components";
import {
  pageDict,
  removeDict,
  batchRemoveDict,
  getDict,
  addDict,
  modifyDict
} from "@/api/system/dict";
import AFormItem from "ant-design-vue/es/form/FormItem";
export default {
  name: "Dict",
  components: {
    AFormItem,
    STable,
    tableMenu
  },
  data() {
    return {
      // 查询参数
      queryParam: {},
      showSearch: true,
      visible: false,
      loading: false,
      okDisabled: false,
      title: "",
      edit: false,
      dictForm: this.$form.createForm(this),
      // 表头
      columns: [
        {
          title: "字典名称",
          dataIndex: "name"
        },
        {
          title: "字典编码",
          dataIndex: "code"
        },
        {
          title: "字典键名",
          search: true,
          dataIndex: "dictKey"
        },
        {
          title: "字典键值",
          dataIndex: "dictValue"
        },
        {
          title: "操作",
          dataIndex: "action",
          width: "230px",
          scopedSlots: { customRender: "action" }
        }
      ],
      options: {
        alert: {
          show: false,
          clear: () => {
            this.selectedRowKeys = [];
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      selectedRowKeys: [],
      selectedRows: [],
      optionAlertShow: false,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return pageDict(Object.assign(parameter, this.queryParam)).then(res => {
          return res.data;
        });
      }
    };
  },
  created() {
    this.tableOption();
  },
  methods: {
    tableOption() {
      this.options = {
        alert: {
          show: false,
          clear: () => {
            this.selectedRowKeys = [];
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      };
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    refresh() {
      this.$refs.table.refresh(true);
    },
    updateShowSearch(showSearch) {
      this.showSearch = showSearch;
    },
    batchRemove() {
      if (!this.selectedRowKeys.length) {
        this.$message.warning("请选择需删除的数据");
        return;
      }

      const vm = this;
      this.$confirm({
        title: "提示",
        content: "确定删除所选中的记录?",
        centered: true,
        onOk() {
          return new Promise(resolve => {
            batchRemoveDict(vm.selectedRowKeys).then(res => {
              if (res.success) {
                vm.$message.success("批量删除成功");
                vm.$refs.table.refresh(true);
                resolve(res);
              } else {
                vm.$message.error(res.msg);
                resolve("");
              }
            });
          });
        },
        onCancel() {}
      });
    },
    remove(row) {
      const vm = this;
      this.$confirm({
        title: "提示",
        content: "确定删除该行记录?",
        centered: true,
        onOk() {
          return new Promise(resolve => {
            removeDict(row.id).then(res => {
              if (res.success) {
                vm.$message.success("删除成功");
                vm.$refs.table.refresh(true);
                resolve(res);
              } else {
                vm.$message.error(res.msg);
                resolve("");
              }
            });
          });
        },
        onCancel() {}
      });
    },
    showAdd() {
      this.visible = true;
      this.title = "新增";
    },
    showModify(row) {
      this.visible = true;
      this.title = "编辑";
      this.edit = true;
      this.getDict(row.id);
    },
    showDetail(row) {
      this.title = "详情";
      this.okDisabled = true;
      this.getDict(row.id);
    },
    handleOk() {
      const vm = this;
      this.dictForm.validateFields(err => {
        if (!err) {
          this.$loading.show();
          if (this.edit) {
            modifyDict(this.dictForm.getFieldsValue())
              .then(res => {
                if (res.success) {
                  this.visible = false;
                  this.$refs.table.refresh(true);
                }
              })
              .then(() => {
                vm.$loading.hide();
              });
          } else {
            addDict(this.dictForm.getFieldsValue())
              .then(res => {
                if (res.success) {
                  this.visible = false;
                  this.$refs.table.refresh(true);
                }
              })
              .then(() => {
                vm.$loading.hide();
              });
          }
        }
      });
    },
    modalClose() {
      this.edit = false;
      this.visible = false;
      this.title = "";
      this.okDisabled = false;
      this.dictForm.resetFields();
    },
    getDict(id) {
      const vm = this;
      this.$loading.show();
      getDict(id)
        .then(res => {
          if (res.success) {
            this.visible = true;
            vm.setFormValues(res.data);
          } else {
            vm.$message.error(res.msg);
          }
        })
        .then(() => {
          vm.$loading.hide();
        });
    },
    setFormValues({ ...dict }) {
      let fields = ["id", "code", "name", "dictKey", "dictValue"];
      Object.keys(dict).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.dictForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = dict[key];
          this.dictForm.setFieldsValue(obj);
        }
      });
    }
  }
};
</script>
