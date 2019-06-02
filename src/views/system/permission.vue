<template>
  <basicContainer>
    <div class="search-wrapper" v-if="showSearch">
      <a-form layout="inline">
        <a-row :gutter="25">
          <a-col :md="5" :sm="24">
            <a-form-item label="权限名称">
              <a-input v-model="queryParam.name" placeholder="角色名称" />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="权限状态">
              <a-select placeholder="请选择" default-value="">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="1">禁用</a-select-option>
                <a-select-option value="2">启用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="3" :sm="24">
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
      <span slot="actions" slot-scope="text, record">
        <a-tag v-for="(action, index) in record.actions" :key="index">{{
          action.describe
        }}</a-tag>
      </span>
      <span slot="status" slot-scope="text">
        {{ text | statusFilter }}
      </span>
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
      <a-form :form="permissionForm">
        <a-input v-decorator="['id']" type="hidden" />
        <a-form-item
          label="权限名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            placeholder="请输入权限名称"
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '请输入权限名称' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="可操作权限"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            placeholder="请选择可操作权限"
            mode="multiple"
            v-decorator="[
              'actions',
              {
                rules: [{ required: true, message: '请选择可操作权限' }]
              }
            ]"
            :allowClear="true"
          >
            <a-select-option
              v-for="(action, index) in permissionList"
              :key="index"
              :value="action.value"
              >{{ action.label }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item
          label="状态"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            placeholder="请选择状态"
            v-decorator="[
              'status',
              {
                rules: [{ required: true, message: '请选择状态' }]
              }
            ]"
          >
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="2">禁用</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </basicContainer>
</template>

<script>
import { STable, tableMenu } from "@/components";
import {
  pagePermission,
  removePermission,
  batchRemovePermission,
  getPermission,
  addPermission,
  modifyPermission
} from "@/api/system/permission";
import { getDictByCode } from "@/api/system/dict";
import AFormItem from "ant-design-vue/es/form/FormItem";
export default {
  name: "tenant",
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
      permissionList: [],
      permissionForm: this.$form.createForm(this),
      permission: {},
      // 表头
      columns: [
        {
          title: "权限名称",
          dataIndex: "name"
        },
        {
          title: "可操作权限",
          dataIndex: "actionData",
          scopedSlots: { customRender: "actions" }
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
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
        return pagePermission(Object.assign(parameter, this.queryParam)).then(
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
  mounted() {
    getDictByCode("permission").then(res => {
      res.data.forEach(item => {
        console.log(item);
        this.permissionList.push({
          label: item.dictValue,
          value: item.id
        });
      });
    });
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
            batchRemovePermission(vm.selectedRowKeys).then(res => {
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
            removePermission(row.id).then(res => {
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
      this.getPermission(row.id);
    },
    showDetail(row) {
      this.title = "详情";
      this.okDisabled = true;
      this.getPermission(row.id);
    },
    handleOk() {
      const vm = this;
      this.permissionForm.validateFields(err => {
        if (!err) {
          this.$loading.show();
          let permission = this.permissionForm.getFieldsValue();
          permission.id = this.permission.id;
          if (this.edit) {
            modifyPermission(permission)
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
            addPermission(permission)
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
      this.permissionForm.resetFields();
    },
    getPermission(id) {
      const vm = this;
      this.$loading.show();
      getPermission(id)
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
    setFormValues({ ...permission }) {
      let fields = ["actions", "name", "status"];
      Object.keys(permission).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.permissionForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = permission[key];
          this.permissionForm.setFieldsValue(obj);
        }
      });
      this.permission = permission;
    }
  }
};
</script>
