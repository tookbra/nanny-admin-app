<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <a-select
            allowClear=""
            placeholder="请选择租户"
            style="width: 100%; margin-bottom: 0.4rem;"
          >
            <a-select-option
              v-for="(item, index) in tenants"
              :key="index"
              :value="item.value"
              >{{ item.name }}</a-select-option
            >
          </a-select>
          <a-input-search
            style="width:100%;margin-top: 10px"
            placeholder="请输入科室名称"
          ></a-input-search>
          <a-tree
            :checkable="false"
            :defaultExpandAll="true"
            :showLine="true"
            @select="onSelect"
            :treeData="orgTree"
          />
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card :bordered="false">
          <div class="search-wrapper" v-if="showSearch">
            <a-form layout="inline">
              <a-row :gutter="25">
                <a-col :md="5" :sm="24">
                  <a-form-item label="用户名">
                    <a-input
                      v-model="queryParam.realName"
                      placeholder="用户名"
                    />
                  </a-form-item>
                </a-col>
                <a-col :md="5" :sm="24">
                  <a-form-item label="状态">
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
            @showAdd="showAdd"
            @remove="batchRemove"
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
        </a-card>
      </a-col>
    </a-row>
    <a-modal
      :title="title"
      v-model="visible"
      width="1080px"
      :afterClose="modalClose"
      @ok="handleOk"
      :okButtonProps="{ props: { disabled: okDisabled } }"
    >
      <a-form :form="accountForm">
        <a-form-item
          label="用户账号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入用户账号"
            v-decorator="[
              'account',
              {
                rules: [{ required: true, message: '请输入用户账号' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="所属租户"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-tree-select
            showSearch
            :treeData="userTenants"
            placeholder="请选择所属租户"
            treeDefaultExpandAll
            :treeDataSimpleMode="true"
            @change="userTenantsChange"
            v-decorator="[
              'tenantId',
              {
                rules: [{ required: true, message: '请选择所属租户' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="真实姓名"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入真实姓名"
            v-decorator="[
              'realName',
              {
                rules: [{ required: true, message: '请输入真实姓名' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="密码"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入密码"
            type="password"
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入密码' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="所属角色"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-tree-select
            showSearch
            allowClear
            multiple
            :treeData="userRoles"
            placeholder="请选择所属角色"
            treeDefaultExpandAll
            :treeDataSimpleMode="true"
            v-decorator="[
              'roleId',
              {
                rules: [{ required: true, message: '请选择所属角色' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="性别"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-select placeholder="请选择性别">
            <a-select-option value="1">男</a-select-option>
            <a-select-option value="2">女</a-select-option>
            <a-select-option value="0">未知</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {
  pageAccount,
  batchRemoveAccount,
  removeAccount,
  getAccount,
  modifyAccount,
  addAccount
} from "@/api/system/account";
import { getDepartmentByTenant } from "@/api/system/department";
import { STable, tableMenu } from "@/components";
import { getAllTenant } from "@/api/system/tenant";
import { getRoleByTenantId } from "@/api/system/role";
export default {
  name: "account",
  components: {
    STable,
    tableMenu
  },
  data() {
    return {
      // 查询参数
      queryParam: {},
      orgTree: [],
      tenants: [],
      userTenants: [],
      userRoles: [],
      tenantId: 0,
      disabled: true,
      departmentForm: this.$form.createForm(this),
      dropTrigger: "",
      selectedKeys: [],
      checkedKeys: [],
      rightClickSelected: "",
      showSearch: true,
      visible: false,
      title: "",
      selectedRowKeys: [],
      selectedRows: [],
      account: {},
      okDisabled: false,
      accountForm: this.$form.createForm(this),
      // 表头
      columns: [
        {
          title: "用户账号",
          dataIndex: "account"
        },
        {
          title: "真实姓名",
          dataIndex: "realName"
        },
        {
          title: "性别",
          dataIndex: "sex"
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
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return pageAccount(Object.assign(parameter, this.queryParam)).then(
          res => {
            return res.data;
          }
        );
      }
    };
  },
  mounted() {
    this.loadTree();
    getAllTenant().then(res => {
      if (res.success) {
        this.tenants = res.data;
        this.tenants.forEach(item => {
          this.userTenants.push({
            id: item.id,
            label: item.name,
            value: item.id
          });
        });
      } else {
        this.$message.error("获取租户失败");
      }
    });
  },
  methods: {
    refresh() {
      this.$refs.table.refresh(true);
    },
    updateShowSearch(showSearch) {
      this.showSearch = showSearch;
    },
    showAdd() {
      this.visible = true;
      this.title = "新增";
    },
    showDetail(row) {
      this.title = "详情";
      this.okDisabled = true;
      this.getAccount(row.id);
    },
    showModify(row) {
      console.log(row);
      this.visible = true;
      this.title = "编辑";
      this.edit = true;
    },
    loadTree() {
      this.$loading.show();
      const _this = this;
      getDepartmentByTenant(this.tenantId)
        .then(res => {
          this.orgTree = res.data;
        })
        .then(() => {
          _this.$loading.hide();
        });
    },
    modalClose() {
      this.edit = false;
      this.visible = false;
      this.title = "";
      this.okDisabled = false;
      this.accountForm.resetFields();
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    userTenantsChange(value) {
      const _this = this;
      getRoleByTenantId(value)
        .then(res => {
          if (res.success) {
            res.data.forEach(item => {
              this.userRoles.push({
                id: item.id,
                label: item.name,
                value: item.id
              });
            });
          }
        })
        .then(() => {
          _this.$loading.hide();
        });
    },
    getAccount(id) {
      const vm = this;
      this.$loading.show();
      getAccount(id)
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
            batchRemoveAccount(vm.selectedRowKeys).then(res => {
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
            removeAccount(row.id).then(res => {
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
    handleOk() {
      const vm = this;
      this.menuForm.validateFields(err => {
        if (!err) {
          this.$loading.show();
          let account = this.accountForm.getFieldsValue();
          account.id = this.menu.id;
          if (this.edit) {
            modifyAccount(account)
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
            addAccount(account)
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
    onSelect(selectedKeys) {
      console.log(selectedKeys);
      this.queryParam = Object.assign(this.queryParam, {
        tenantId: selectedKeys
      });
      this.$refs.table.refresh(true);
    },
    setFormValues({ ...department }) {
      let fields = ["account", "realName"];
      Object.keys(department).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.departmentForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = department[key];
          this.departmentForm.setFieldsValue(obj);
        }
      });
    }
  }
};
</script>

<style lang="less">
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;
  padding: 10px 10px;
}
</style>
