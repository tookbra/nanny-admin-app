<template>
  <basicContainer>
    <div class="search-wrapper" v-if="showSearch">
      <a-form layout="inline">
        <a-row :gutter="16">
          <a-col :md="5" :sm="24">
            <a-form-item label="租户编号">
              <a-input v-model="queryParam.code" placeholder="租户编号" />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="租户名称">
              <a-input v-model="queryParam.name" placeholder="租户名称" />
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
      @ok="handleOk"
      width="780px"
      :afterClose="modalClose"
    >
      <a-form :form="tenantForm">
        <a-form-item
          label="租户编号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'tenantCode',
              {
                rules: [{ required: true, message: '请输入租户编号' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="租户名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'tenantName',
              {
                rules: [{ required: true, message: '请输入租户名称' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="租户人"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'linkName',
              {
                rules: [{ required: false, message: '请输入租户人' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="联系电话"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'linkPhone',
              {
                rules: [{ required: false, message: '请输入联系电话' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="linkAddress"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-textarea
            :autosize="{ minRows: 4, maxRows: 6 }"
            v-decorator="[
              '联系地址',
              {
                rules: [{ required: false, message: '请输入联系地址' }]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <page-loading />
  </basicContainer>
</template>

<script>
import { STable, tableMenu, PageLoading } from "@/components";
import {
  pageTenant,
  removeTenant,
  batchRemoveTenant,
  getTenant
} from "@/api/system/tenant";
import AFormItem from "ant-design-vue/es/form/FormItem";
export default {
  name: "tenant",
  components: {
    AFormItem,
    STable,
    tableMenu,
    PageLoading
  },
  data() {
    return {
      // 查询参数
      queryParam: {},
      showSearch: true,
      visible: false,
      title: "",
      edit: false,
      tenantForm: this.$form.createForm(this),
      // 表头
      columns: [
        {
          title: "租户编号",
          search: true,
          dataIndex: "tenantCode"
        },
        {
          title: "租户名称",
          search: true,
          dataIndex: "tenantName"
        },
        {
          title: "联系人",
          dataIndex: "tenantUserName"
        },
        {
          title: "联系电话",
          dataIndex: "tenantMobile"
        },
        {
          title: "联系地址",
          dataIndex: "tenantAddress"
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
        return pageTenant(Object.assign(parameter, this.queryParam)).then(
          res => {
            return res.data;
          }
        );
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
            batchRemoveTenant(vm.selectedRowKeys).then(res => {
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
            removeTenant(row.id).then(res => {
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
      console.log(this.edit);
    },
    showModify(row) {
      this.visible = true;
      this.title = "编辑";
      this.edit = true;
    },
    showDetail(row) {
      this.title = "编辑";
      const vm = this;
      console.log(row);

      getTenant(row.id).then(res => {
        if (res.success) {
          this.visible = true;
          vm.setFormValues(res.data);
        } else {
          vm.$message.error(res.msg);
        }
      });
    },
    handleOk() {
      this.tenantForm.validateFields(err => {
        if (!err) {
          console.info("success");
        }
      });
    },
    modalClose() {
      this.edit = false;
      this.tenantForm.resetFields();
    },
    setFormValues({ ...tenant }) {
      let fields = [
        "tenantCode",
        "tenantName",
        "linkName",
        "linkPhone",
        "linkAddress"
      ];
      Object.keys(tenant).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.tenantForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = tenant[key];
          this.tenantForm.setFieldsValue(obj);
        }
      });
    }
  }
};
</script>
