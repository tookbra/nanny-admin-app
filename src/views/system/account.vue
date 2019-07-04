<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="5">
        <a-card :bordered="false">
          <div class="table-operator">
            <a-button
              v-action:account_import
              class="btn"
              type="primary"
              icon="import"
              >导入</a-button
            >
            <a-dropdown>
              <a-menu slot="overlay" @click="handleExportClick">
                <a-menu-item key="1">导出所选数据</a-menu-item>
                <a-menu-item key="2">导出全部数据</a-menu-item>
              </a-menu>
              <a-button v-action:account_export icon="export"
                >导出 <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </div>
          <a-select
            :allowClear="true"
            placeholder="请选择租户"
            style="width: 100%; margin-bottom: 0.4rem;"
            @change="tenantChange"
          >
            <a-select-option
              v-for="(item, index) in tenants"
              :key="index"
              :value="item.id"
              >{{ item.name }}</a-select-option
            >
          </a-select>
          <a-input-search
            style="width:100%;margin-top: 10px"
            placeholder="请输入部门名称"
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
      <a-col :md="24" :lg="19">
        <a-card :bordered="false">
          <div class="search-wrapper" v-if="showSearch" v-action:tenant_search>
            <a-form layout="inline">
              <a-row :gutter="25">
                <a-col :md="5" :sm="24">
                  <a-form-item label="用户名">
                    <a-input v-model="queryParam.name" placeholder="用户名" />
                  </a-form-item>
                </a-col>
                <a-col :md="5" :sm="24">
                  <a-form-item label="状态">
                    <a-select
                      v-model="queryParam.status"
                      placeholder="请选择状态"
                    >
                      <a-select-option value="">全部</a-select-option>
                      <a-select-option
                        v-for="(item, index) in status"
                        :key="index"
                        :value="item.data"
                        >{{ item.name }}</a-select-option
                      >
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
          <div class="table-menu">
            <div class="table-menu-permission">
              <a-button
                v-action:account_add
                type="primary"
                class="btn"
                icon="plus"
                @click="showAdd"
                >新增</a-button
              >
              <a-button
                v-action:account_delete
                type="danger"
                class="btn anger"
                icon="delete"
                @click="batchRemove"
                >删除</a-button
              >
            </div>
            <div v-action:account_search class="table-menu-nav">
              <a-button shape="circle" icon="sync" @click="refresh" />
              <a-button
                shape="circle"
                icon="search"
                @click="updateShowSearch"
              />
            </div>
          </div>
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
            <span slot="sex" slot-scope="text">
              {{ text | typeFilter(sexMap) }}
            </span>
            <span slot="status" slot-scope="text">
              {{ text | statusFilter }}
            </span>
            <span slot="action" class="table-nav" slot-scope="text, record">
              <template>
                <a v-action:account_view @click="() => showDetail(record)">
                  <a-icon type="eye" />
                  详情
                </a>
                <a-divider v-action:account_edit type="vertical" />
                <a v-action:account_edit @click="() => showModify(record)">
                  <a-icon type="edit" />
                  编辑
                </a>
                <a-divider v-action:account_disable type="vertical" />
                <a v-action:account_disable @click="() => disableUser(record)">
                  <a-icon type="lock" />
                  禁用
                </a>
                <a-divider v-action:account_delete type="vertical" />
                <a v-action:account_delete @click="() => remove(record)">
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
          label="用户姓名"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="用户姓名"
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: '请输入用户姓名' },
                  { min: 2, max: 5, message: '用户姓名长度为[2, 5]' }
                ]
              }
            ]"
          />
        </a-form-item>
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
                rules: [
                  { required: true, message: '请输入用户账号' },
                  { min: 4, max: 12, message: '用户姓名长度为[4, 12]' }
                ]
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
                rules: [{ min: 6, max: 15, message: '密码长度为[6.15]' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="手机号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入手机号"
            v-decorator="[
              'phone',
              {
                rules: [{ min: 11, max: 11, message: '手机号长度错误' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="性别"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-select placeholder="请选择性别" v-decorator="['sex']">
            <a-select-option :value="1">男</a-select-option>
            <a-select-option :value="2">女</a-select-option>
            <a-select-option :value="0">未知</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="头像"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-row :gutter="8">
            <a-col :span="12">
              <a-input placeholder="请输入头像地址" v-decorator="['avatar']" />
            </a-col>
            <a-col :span="12">
              <a-upload
                name="file"
                :showUploadList="false"
                :multiple="false"
                accept="image/*"
                action="localhost:20000/oss/upload/file"
              >
                <a-button> <a-icon type="upload" /> Click to Upload </a-button>
              </a-upload>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item
          label="所属部门"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-tree-select
            showSearch
            allowClear
            :treeData="orgTree"
            placeholder="所属部门"
            treeDefaultExpandAll
            v-decorator="[
              'departmentId',
              {
                rules: [{ required: true, message: '所属部门' }]
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
              'roleIds',
              {
                rules: [{ required: true, message: '请选择所属角色' }]
              }
            ]"
          />
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
            :checked="userStatus"
            @change="switchUserStatus"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <export-csv
      :dialogVisible="exportVisible"
      @dialogCancel="exportCancel"
      :params="exportData"
    ></export-csv>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  pageAccount,
  batchRemoveAccount,
  removeAccount,
  getAccount,
  modifyAccount,
  addAccount,
  disable,
  getAllAccount
} from "@/api/system/account";
import { getSwitchStatus } from "@/libs/util";
import { getDepartmentByTenant } from "@/api/system/department";
import { STable, exportCsv } from "@/components";
import { getAllTenant } from "@/api/system/tenant";
import { getRoleByTenantId } from "@/api/system/role";
export default {
  name: "account",
  components: {
    STable,
    exportCsv
  },
  computed: {
    ...mapGetters(["sex", "status"])
  },
  beforeMount() {
    this.sex.forEach(item => {
      this.sexMap.set(item.data, item.name);
    });
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
      userStatus: true,
      exportVisible: false,
      accountForm: this.$form.createForm(this),
      sexMap: new Map(),
      exportData: {
        columns: [
          {
            title: "姓名",
            key: "name"
          },
          {
            title: "性别",
            key: "sex"
          },
          {
            title: "状态",
            key: "status"
          },
          {
            title: "手机号",
            key: "phone"
          }
        ]
      },
      // 表头
      columns: [
        {
          title: "用户账号",
          dataIndex: "account"
        },
        {
          title: "真实姓名",
          dataIndex: "name"
        },
        {
          title: "性别",
          dataIndex: "sex",
          scopedSlots: { customRender: "sex" }
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
      if (this.tenantId == 0) {
        this.$message.error("请选择租户");
        return;
      }
      this.visible = true;
      this.title = "新增";
    },
    showDetail(row) {
      this.title = "详情";
      this.okDisabled = true;
      this.getAccount(row.id);
    },
    showModify(row) {
      this.visible = true;
      this.title = "编辑";
      this.edit = true;
      this.getAccount(row.id);
    },
    switchUserStatus(checked) {
      this.userStatus = checked;
    },
    async loadTree() {
      this.$loading.show();
      const _this = this;
      await getDepartmentByTenant(this.tenantId)
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
    tenantChange(value) {
      this.tenantId = value;
      this.loadTree();
      if (value) {
        this.userTenantsChange(value);
        this.accountForm.getFieldDecorator("tenantId");
        let obj = {};
        obj["tenantId"] = this.tenantId;
        this.accountForm.setFieldsValue(obj);
      } else {
        this.userRoles = [];
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    async userTenantsChange(value) {
      const _this = this;
      await getRoleByTenantId(value)
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
    handleExportClick(e) {
      if (this.tenantId == 0) {
        this.$message.error("请选择租户");
        return;
      }
      if (e.key == "2") {
        this.$loading.show();
        getAllAccount(this.tenantId)
          .then(res => {
            this.exportData = Object.assign(this.exportData, {
              data: res.data
            });
          })
          .finally(() => {
            this.$loading.hide();
          });
      }
      this.exportVisible = true;
    },
    exportCancel() {
      this.exportVisible = false;
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
        .finally(() => {
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
          batchRemoveAccount(vm.selectedRowKeys).then(() => {
            vm.$message.success("批量删除成功");
            vm.$refs.table.refresh(true);
          });
        },
        onCancel() {}
      });
    },
    remove(row) {
      const vm = this;
      this.$confirm({
        title: "提示",
        content: "确定删除用户" + row.name + "?",
        centered: true,
        onOk() {
          removeAccount(row.id).then(() => {
            vm.$message.success("删除成功");
            vm.$refs.table.refresh(true);
          });
        },
        onCancel() {}
      });
    },
    handleOk() {
      const vm = this;
      this.accountForm.validateFields(err => {
        if (!err) {
          this.$loading.show();
          let account = this.accountForm.getFieldsValue();
          account.id = this.account.id;
          account.status = getSwitchStatus(this.userStatus);
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
    disableUser(row) {
      const vm = this;
      this.$confirm({
        title: "提示",
        content: "确定要禁用用户" + row.name + "?",
        centered: true,
        onOk() {
          disable(row.id).then(() => {
            vm.$message.success("操作成功");
            vm.$refs.table.refresh(true);
          });
        },
        onCancel() {}
      });
    },
    onSelect(selectedKeys, info) {
      if (info.selected) {
        this.queryParam.departmentId = selectedKeys[0];
        this.queryParam.tenantId = this.tenantId;
        this.accountForm.getFieldDecorator("departmentId");
        let obj = {};
        obj["departmentId"] = info.node.dataRef.value;
        this.accountForm.setFieldsValue(obj);
      } else {
        this.queryParam.departmentId = "";
      }
      this.$refs.table.refresh(true);
      this.selectedKeys = selectedKeys;
    },
    setFormValues({ ...account }) {
      this.tenantId = account.tenantId;
      if (this.orgTree.length == 0) {
        this.loadTree();
      }
      if (this.userRoles.length == 0) {
        this.userTenantsChange(this.tenantId);
      }
      let fields = [
        "account",
        "name",
        "tenantId",
        "phone",
        "sex",
        "departmentId",
        "avatar",
        "status",
        "remark"
      ];
      Object.keys(account).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.accountForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = account[key];
          this.accountForm.setFieldsValue(obj);
        }
      });
      let roleIds = [];
      account.roles.forEach(item => {
        roleIds.push(item.id);
      });
      this.accountForm.getFieldDecorator("roleIds");
      let obj = {};
      obj["roleIds"] = roleIds;
      this.accountForm.setFieldsValue(obj);
      this.account = account;
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
