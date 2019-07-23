<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="5">
        <a-card
          :bordered="false"
          :style="{ maxHeight: '780px', overflow: 'auto' }"
        >
          <div class="table-operator">
            <a-button
              v-action:employee_import
              class="btn"
              type="primary"
              icon="import"
              @click="showImportFile"
              >导入</a-button
            >
            <!--<a-dropdown>-->
            <!--<a-menu slot="overlay" @click="handleExportClick">-->
            <!--<a-menu-item key="1">导出所选数据</a-menu-item>-->
            <!--<a-menu-item key="2">导出全部数据</a-menu-item>-->
            <!--</a-menu>-->
            <!--<a-button v-action:account_export icon="export"-->
            <!--&gt;导出 <a-icon type="down" />-->
            <!--</a-button>-->
            <!--</a-dropdown>-->
          </div>
          <a-select
            v-admin
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
          <div
            class="search-wrapper"
            v-if="showSearch"
            v-action:employee_search
          >
            <a-form layout="inline">
              <a-row :gutter="25">
                <a-col :md="5" :sm="24">
                  <a-form-item label="姓名">
                    <a-input v-model="queryParam.name" placeholder="姓名" />
                  </a-form-item>
                </a-col>
                <a-col :md="5" :sm="24">
                  <a-form-item label="工号">
                    <a-input
                      v-model="queryParam.jobNumber"
                      placeholder="工号"
                    />
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
                v-action:employee_add
                type="primary"
                class="btn"
                icon="plus"
                @click="showAdd"
                >新增</a-button
              >
              <a-button
                v-action:employee_delete
                type="danger"
                class="btn anger"
                icon="delete"
                @click="batchRemove"
                >删除</a-button
              >
            </div>
            <div v-action:employee_search class="table-menu-nav">
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
                <a v-action:employee_view @click="() => showDetail(record)">
                  <a-icon type="eye" />
                  详情
                </a>
                <a-divider v-action:employee_edit type="vertical" />
                <a v-action:employee_edit @click="() => showModify(record)">
                  <a-icon type="edit" />
                  编辑
                </a>
                <a-divider v-action:employee_disable type="vertical" />
                <a v-action:employee_disable @click="() => disableUser(record)">
                  <a-icon type="lock" />
                  禁用
                </a>
                <a-divider v-action:employee_delete type="vertical" />
                <a v-action:employee_delete @click="() => remove(record)">
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
      <a-form :form="employeeForm">
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
            v-decorator="[
              'tenantId',
              {
                rules: [{ required: true, message: '请选择所属租户' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="工号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入用户工号"
            v-decorator="[
              'jobNumber',
              {
                rules: [{ min: 1, max: 10, message: '工号长度为[1, 10]' }]
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
    <import-file
      ref="importFile"
      :importVisiable="importFile.visible"
      :actionUrl="'/system/employees/importFile'"
      :importData="importFile.data"
      :columns="importFile.columns"
      @close="handleImportClose"
      @handleImport="handleImport"
      @downloadFile="downloadFile"
    ></import-file>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  pageEmployee,
  batchRemoveEmployee,
  removeEmployee,
  getEmployee,
  modifyEmployee,
  addEmployee,
  disable,
  getAllEmployee,
  importConfirm
} from "@/api/system/employee";
import { getSwitchStatus } from "@/libs/util";
import { getDepartmentByTenant } from "@/api/system/department";
import { STable, exportCsv, importFile } from "@/components";
import { getAllTenant } from "@/api/system/tenant";
export default {
  name: "employee",
  components: {
    STable,
    exportCsv,
    importFile
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
      tenantId: "",
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
      employee: {},
      okDisabled: false,
      userStatus: true,
      exportVisible: false,
      employeeForm: this.$form.createForm(this),
      sexMap: new Map(),
      importFile: {
        visible: false,
        data: {},
        columns: [
          {
            title: "姓名",
            dataIndex: "name"
          },
          {
            title: "工号",
            dataIndex: "jobNumber"
          },
          {
            title: "手机号",
            dataIndex: "phone"
          },
          {
            title: "性别",
            dataIndex: "sex"
          },
          {
            title: "部门",
            dataIndex: "department"
          },
          {
            title: "状态",
            dataIndex: "status"
          },
          {
            title: "备注",
            dataIndex: "remark"
          }
        ]
      },
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
          title: "姓名",
          dataIndex: "name"
        },
        {
          title: "工号",
          dataIndex: "jobNumber"
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
          fixed: "right",
          width: "230px",
          scopedSlots: { customRender: "action" }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return pageEmployee(Object.assign(parameter, this.queryParam)).then(
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
            id: item.tenantId,
            label: item.name,
            value: item.tenantId
          });
        });
      } else {
        this.$message.error("获取租户失败");
      }
    });
    if (this.$store.getters.tenantCode !== "admin") {
      this.tenantId = this.$store.getters.tenantId;
      setTimeout(() => {
        this.employeeForm.getFieldDecorator("tenantId");
        let obj = {};
        obj["tenantId"] = this.tenantId;
        this.employeeForm.setFieldsValue(obj);
      });
      this.loadTree();
    }
    this.importFile.data = { tenantId: this.tenantId };
  },
  methods: {
    refresh() {
      this.$refs.table.refresh(true);
    },
    updateShowSearch() {
      this.showSearch = !this.showSearch;
    },
    showAdd() {
      if (this.tenantId == "") {
        this.$message.error("请选择租户");
        return;
      }
      this.visible = true;
      this.title = "新增";
    },
    showDetail(row) {
      this.title = "详情";
      this.okDisabled = true;
      this.getEmployee(row.id);
    },
    showModify(row) {
      if (this.tenantId == "") {
        this.$message.error("请选择租户");
        return;
      }
      this.visible = true;
      this.title = "编辑";
      this.edit = true;
      this.getEmployee(row.id);
    },
    switchUserStatus(checked) {
      this.userStatus = checked;
    },
    showImportFile() {
      this.importFile.visible = true;
    },
    handleImportClose() {
      this.importFile.visible = false;
    },
    handleImport(data) {
      if (data.length == 0) {
        this.$notification.error({
          message: "错误提示",
          description: "导入数据为空"
        });
        return;
      }
      importConfirm({ tenantId: this.tenantId, list: data }).then(() => {
        this.$refs.importFile.onClose();
        this.loadTree();
      });
    },
    async loadTree() {
      await getDepartmentByTenant(this.tenantId).then(res => {
        this.orgTree = res.data;
      });
    },
    downloadFile() {
      const link = document.createElement("a");
      link.href =
        "https://img-tookbra.oss-cn-hangzhou.aliyuncs.com/%E5%91%98%E5%B7%A5%E6%A8%A1%E7%89%88.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    modalClose() {
      this.edit = false;
      this.visible = false;
      this.title = "";
      this.okDisabled = false;
      this.employeeForm.resetFields();
    },
    tenantChange(value) {
      if (value) {
        this.employeeForm.getFieldDecorator("tenantId");
        let obj = {};
        obj["tenantId"] = this.tenantId;
        this.employeeForm.setFieldsValue(obj);
        this.importFile.data = { tenantId: this.tenantId };
        this.tenantId = value;
        this.queryParam.tenantId = this.tenantId;
        this.loadTree();
      } else {
        this.tenantId = "";
        delete this.queryParam.tenantId;
        this.orgTree = [];
      }
      this.importFile.data = { tenantId: this.tenantId };
      this.$refs.table.refresh(true);
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    handleExportClick(e) {
      if (this.tenantId == "") {
        this.$message.error("请选择租户");
        return;
      }
      if (e.key == "2") {
        getAllEmployee(this.tenantId).then(res => {
          this.exportData = Object.assign(this.exportData, {
            data: res.data
          });
        });
      }
      this.exportVisible = true;
    },
    exportCancel() {
      this.exportVisible = false;
    },
    getEmployee(id) {
      const vm = this;
      getEmployee(id).then(res => {
        if (res.success) {
          this.visible = true;
          vm.setFormValues(res.data);
        } else {
          vm.$message.error(res.msg);
        }
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
          batchRemoveEmployee(vm.selectedRowKeys).then(() => {
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
          removeEmployee(row.id).then(() => {
            vm.$message.success("删除成功");
            vm.$refs.table.refresh(true);
          });
        },
        onCancel() {}
      });
    },
    handleOk() {
      this.employeeForm.validateFields(err => {
        if (!err) {
          let employee = this.employeeForm.getFieldsValue();
          employee.id = this.employee.id;
          employee.status = getSwitchStatus(this.userStatus);
          if (this.edit) {
            modifyEmployee(employee).then(res => {
              if (res.success) {
                this.visible = false;
                this.$refs.table.refresh(true);
              }
            });
          } else {
            addEmployee(employee).then(res => {
              if (res.success) {
                this.visible = false;
                this.$refs.table.refresh(true);
              }
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
        this.employeeForm.getFieldDecorator("departmentId");
        let obj = {};
        obj["departmentId"] = info.node.dataRef.value;
        this.employeeForm.setFieldsValue(obj);
      } else {
        this.queryParam.departmentId = "";
      }
      this.$refs.table.refresh(true);
      this.selectedKeys = selectedKeys;
    },
    setFormValues({ ...employee }) {
      this.tenantId = employee.tenantId;
      if (this.orgTree.length == 0) {
        this.loadTree();
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
        "remark",
        "jobNumber"
      ];
      Object.keys(employee).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.employeeForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = employee[key];
          this.employeeForm.setFieldsValue(obj);
        }
      });
      let roleIds = [];
      employee.roles.forEach(item => {
        roleIds.push(item.id);
      });
      this.employeeForm.getFieldDecorator("roleIds");
      let obj = {};
      obj["roleIds"] = roleIds;
      this.employeeForm.setFieldsValue(obj);
      this.employee = employee;
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
