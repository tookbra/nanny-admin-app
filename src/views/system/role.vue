<template>
  <basicContainer>
    <div class="search-wrapper" v-if="showSearch">
      <a-form layout="inline">
        <a-row :gutter="25">
          <a-col :md="5" :sm="24">
            <a-form-item label="所属租户">
              <a-input v-model="queryParam.tenantName" placeholder="所属租户" />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="角色名称">
              <a-input v-model="queryParam.name" placeholder="角色名称" />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="角色编码">
              <a-input v-model="queryParam.code" placeholder="角色别名" />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="角色状态">
              <a-select
                placeholder="请选择"
                default-value=""
                v-model="queryParam.status"
              >
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="2">禁用</a-select-option>
                <a-select-option value="1">启用</a-select-option>
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
      @showPermission="showPermission"
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
      <a-form :form="roleForm">
        <a-form-item
          label="角色名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: '请输入角色名称' },
                  { min: 4, max: 10, message: '角色名称长度为[4,10]' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="角色编码"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'code',
              {
                rules: [
                  { required: true, message: '请输入角色编码' },
                  { min: 4, max: 10, message: '角色编码长度为[4,10]' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="所属租户"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            showSearch
            allowClear
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择所属租户"
            v-decorator="[
              'tenantId',
              {
                rules: [{ required: true, message: '请选择所属租户' }]
              }
            ]"
          >
            <a-select-option
              v-for="(item, index) in treeTenant"
              :key="index"
              :value="item.value"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item
          label="状态"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-switch
            checkedChildren="启用"
            unCheckedChildren="禁用"
            defaultChecked
            :checked="roleStatus"
            @change="switchRoleType"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </basicContainer>
</template>

<script>
import { STable, tableMenu } from "@/components";
import { getSwitchStatus } from "@/libs/util";
import {
  pageRole,
  removeRole,
  batchRemoveRole,
  getRole,
  addRole,
  modifyRole
} from "@/api/system/role";
import { getAllTenant } from "@/api/system/tenant";
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
      roleForm: this.$form.createForm(this),
      role: {},
      treeTenant: [],
      roleStatus: true,
      // 表头
      columns: [
        {
          title: "角色名称",
          search: true,
          dataIndex: "name"
        },
        {
          title: "角色编码",
          search: true,
          dataIndex: "code"
        },
        {
          title: "所属租户",
          dataIndex: "tenantName"
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
        return pageRole(Object.assign(parameter, this.queryParam)).then(res => {
          return res.data;
        });
      }
    };
  },
  created() {
    this.tableOption();
  },
  mounted() {
    getAllTenant().then(res => {
      res.data.forEach(item => {
        this.treeTenant.push({ name: item.name, value: item.id });
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
    switchRoleType(checked) {
      this.roleStatus = checked;
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
          vm.$loading.show();
          batchRemoveRole(vm.selectedRowKeys)
            .then(res => {
              if (res.success) {
                vm.$message.success("批量删除成功");
                vm.$refs.table.refresh(true);
              } else {
                vm.$message.error(res.msg);
              }
            })
            .finally(() => {
              vm.$loading.hide();
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
            removeRole(row.id).then(res => {
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
    showPermission() {
      if (!this.selectedRowKeys.length) {
        this.$message.warning("请选择需授权的数据");
        return;
      }
      if (this.selectedRowKeys.length > 1) {
        this.$message.warning("只能选择一条需授权的数据");
        return;
      }
    },
    showAdd() {
      this.visible = true;
      this.title = "新增";
    },
    showModify(row) {
      this.visible = true;
      this.title = "编辑";
      this.edit = true;
      this.getRole(row.id);
    },
    showDetail(row) {
      this.title = "详情";
      this.okDisabled = true;
      this.getRole(row.id);
    },
    handleOk() {
      const vm = this;
      this.roleForm.validateFields(err => {
        if (!err) {
          this.$loading.show();
          let role = this.roleForm.getFieldsValue();
          role.id = this.role.id;
          role.status = getSwitchStatus(this.roleStatus);
          if (this.edit) {
            modifyRole(role)
              .then(res => {
                if (res.success) {
                  this.visible = false;
                  this.$refs.table.refresh(true);
                }
              })
              .finally(() => {
                vm.$loading.hide();
              });
          } else {
            addRole(role)
              .then(res => {
                if (res.success) {
                  this.visible = false;
                  this.$refs.table.refresh(true);
                }
              })
              .finally(() => {
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
      this.roleForm.resetFields();
      this.roleStatus = true;
    },
    getRole(id) {
      const vm = this;
      this.$loading.show();
      getRole(id)
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
    setFormValues({ ...role }) {
      let fields = ["code", "name", "tenantId", "status"];
      Object.keys(role).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.roleForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = role[key];
          this.roleForm.setFieldsValue(obj);
        }
      });
      this.roleStatus = role["status"] == 1;
      this.role = role;
    }
  }
};
</script>
