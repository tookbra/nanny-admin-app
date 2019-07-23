<template>
  <basicContainer>
    <div v-action:account_search class="search-wrapper" v-if="showSearch">
      <a-form layout="inline">
        <a-row :gutter="16">
          <a-col :md="5" :sm="24" v-admin>
            <a-form-item label="所属租户">
              <a-select
                :allowClear="true"
                placeholder="请选择租户"
                style="width: 100%; margin-bottom: 0.4rem;"
                @change="tenantChange"
              >
                <a-select-option
                  v-for="(item, index) in tenants"
                  :key="index"
                  :value="item.tenantId"
                  >{{ item.name }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="状态">
              <a-select v-model="queryParam.status" placeholder="请选择状态">
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
      <div class="table-menu-nav">
        <a-button shape="circle" icon="sync" @click="refresh" />
        <a-button
          v-action:account_search
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
          <a-divider v-action:account_delete type="vertical" />
          <a v-action:account_delete @click="() => remove(record)">
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
      :destroyOnClose="true"
      :afterClose="modalClose"
      @ok="handleOk"
      :okButtonProps="{ props: { disabled: okDisabled } }"
    >
      <a-form :form="accountForm">
        <a-form-item
          label="账号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="账号"
            v-decorator="[
              'account',
              {
                rules: [
                  { required: true, message: '请输入账号' },
                  { min: 4, max: 12, message: '用户姓名长度为[4, 12]' }
                ]
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
          v-admin
          label="所属租户"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-select
            showSearch
            :allowClear="true"
            placeholder="请选择所属租户"
            @change="userTenantsChange"
            v-decorator="[
              'tenantId',
              {
                rules: [{ required: true, message: '请选择所属租户' }]
              }
            ]"
          >
            <a-select-option
              v-for="(item, index) in tenants"
              :key="index"
              :value="item.tenantId"
              >{{ item.name }}</a-select-option
            >
          </a-select>
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
          label="头像"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <upload-pic-input
            v-decorator="['avatar']"
            :upload="avatarData"
            :actionUrl="avatarActionUrl"
          />
        </a-form-item>
        <a-form-item
          label="备注"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-textarea
            placeholder="请输入备注"
            :autosize="{ minRows: 4, maxRows: 6 }"
            v-decorator="[
              'remark',
              {
                rules: [{ required: false, message: '请输入联系地址' }]
              }
            ]"
          ></a-textarea>
        </a-form-item>
        <a-form-item
          label="状态"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-switch
            checkedChildren="启用"
            unCheckedChildren="冻结"
            defaultChecked
            :checked="accountStatus"
            @change="switchTenantType"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </basicContainer>
</template>

<script>
import { getAllTenant } from "@/api/system/tenant";
import { mapGetters } from "vuex";
import { STable, uploadPicInput } from "@/components";
import { getSwitchStatus } from "@/libs/util";
import { getRoleByTenantId } from "@/api/system/role";
import {
  pageAccount,
  removeAccount,
  batchRemoveAccount,
  getAccount,
  addAccount,
  modifyAccount
} from "@/api/system/account";
import AFormItem from "ant-design-vue/es/form/FormItem";
export default {
  name: "account",
  components: {
    AFormItem,
    STable,
    uploadPicInput
  },
  computed: {
    ...mapGetters(["status", "isAdmin"])
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
      accountForm: this.$form.createForm(this),
      account: {},
      userRoles: [],
      accountStatus: true,
      avatarData: {
        path: "avatar"
      },
      avatarActionUrl:
        "/oss/upload/tenant/" + this.$store.getters.tenantCode + "/file",
      tenants: [],
      // 表头
      columns: [
        {
          title: "租户名称",
          dataIndex: "tenantName"
        },
        {
          title: "账号",
          dataIndex: "account"
        },
        {
          title: "角色",
          dataIndex: "roleStr"
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "操作",
          dataIndex: "action",
          fixed: "right",
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
        return pageAccount(Object.assign(parameter, this.queryParam)).then(
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
    getAllTenant().then(res => {
      if (res.success) {
        this.tenants = res.data;
      } else {
        this.$message.error("获取租户失败");
      }
    });
    if (this.$store.getters.tenantCode !== "admin") {
      this.tenantId = this.$store.getters.tenantId;
      setTimeout(() => {
        this.accountForm.getFieldDecorator("tenantId");
        let obj = {};
        obj["tenantId"] = this.tenantId;
        this.accountForm.setFieldsValue(obj);
      });
      this.userTenantsChange(this.tenantId);
    }
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
    updateShowSearch() {
      this.showSearch = !this.showSearch;
    },
    switchTenantType(checked) {
      this.accountStatus = checked;
    },
    tenantChange(value) {
      this.queryParam.tenantId = value;
    },
    async userTenantsChange(value) {
      const _this = this;
      this.userRoles = [];
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
          batchRemoveAccount(vm.selectedRowKeys).then(res => {
            if (res.success) {
              vm.$message.success("批量删除成功");
              vm.$refs.table.refresh(true);
            } else {
              vm.$message.error(res.msg);
            }
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
          removeAccount(row.id).then(res => {
            if (res.success) {
              vm.$message.success("删除成功");
              vm.$refs.table.refresh(true);
            } else {
              vm.$message.error(res.msg);
            }
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
      this.getAccount(row.id);
    },
    showDetail(row) {
      this.title = "详情";
      this.okDisabled = true;
      this.getAccount(row.id);
    },
    handleOk() {
      const vm = this;
      this.accountForm.validateFields(err => {
        if (!err) {
          let account = this.accountForm.getFieldsValue();
          account.id = this.account.id;
          account.status = getSwitchStatus(this.accountStatus);
          if (this.edit) {
            modifyAccount(account).then(res => {
              if (!res.success) {
                vm.$message.error(res.msg);
              } else {
                this.visible = false;
                this.$refs.table.refresh(true);
              }
            });
          } else {
            addAccount(account)
              .then(res => {
                if (!res.success) {
                  vm.$message.error(res.msg);
                } else {
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
      this.accountForm.resetFields();
      this.accountStatus = true;
    },
    getAccount(id) {
      const vm = this;
      getAccount(id).then(res => {
        if (res.success) {
          this.visible = true;
          vm.setFormValues(res.data);
        } else {
          vm.$message.error(res.msg);
        }
      });
    },
    setFormValues({ ...account }) {
      if (this.isAdmin) {
        this.userTenantsChange(account.tenantId);
      }
      let fields = ["id", "account", "tenantId", "remark"];

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
