<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="table-operator">
            <a-button
              v-action:department_add
              class="btn"
              type="primary"
              @click="showAdd"
              icon="plus"
              >添加科室</a-button
            >
            <a-button
              v-action:department_import
              class="btn"
              type="primary"
              icon="import"
              @click="showImportFile"
              >导入</a-button
            >
            <a-button
              v-action:department_export
              class="btn"
              type="primary"
              icon="download"
              >导出</a-button
            >
            <a-button
              v-action:department_delete
              class="btn"
              type="default"
              @click="remove"
              icon="delete"
              >删除</a-button
            >
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
          <template>
            <a-dropdown
              :trigger="[this.dropTrigger]"
              @visibleChange="dropStatus"
            >
              <span style="user-select: none">
                <a-tree
                  checkable
                  @select="onSelect"
                  @check="onCheck"
                  @rightClick="rightHandle"
                  :selectedKeys="selectedKeys"
                  :treeData="orgTree"
                />
              </span>
              <!--新增右键点击事件,和增加添加和删除功能-->
              <a-menu slot="overlay">
                <a-menu-item @click="handleEdit()" key="1">编辑</a-menu-item>
                <a-menu-item @click="handleRemove()" key="">删除</a-menu-item>
                <a-menu-item @click="handleDrop()" key="3">取消</a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card :bordered="false">
          <a-form @submit="handleSubmit" :form="departmentForm">
            <a-form-item
              label="科室名称"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
            >
              <a-input
                v-bind:disabled="disabled"
                v-decorator="[
                  'name',
                  { rules: [{ required: true, message: '请输入科室名称' }] }
                ]"
                name="name"
                placeholder="请输入科室名称"
              />
            </a-form-item>
            <a-form-item
              label="上级科室"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
            >
              <a-tree-select
                v-bind:disabled="disabled"
                showSearch
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="orgTree"
                placeholder="请选择上级科室"
                @change="deptTreeChange"
                v-decorator="[
                  'parentId',
                  { rules: [{ message: '请选择上级科室' }] }
                ]"
                treeDefaultExpandAll
              >
              </a-tree-select>
            </a-form-item>
            <a-form-item
              label="排序"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
            >
              <a-input-number
                v-bind:disabled="disabled"
                v-decorator="['sort', { initialValue: 0 }]"
                :min="0"
                :max="100"
              />
            </a-form-item>
            <a-form-item
              label="地址"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
            >
              <a-input
                v-bind:disabled="disabled"
                v-decorator="[
                  'address',
                  { rules: [{ required: false, message: '请输入地址' }] }
                ]"
                name="name"
                placeholder="请输入地址"
              />
            </a-form-item>
            <a-form-item
              label="备注"
              :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
            >
              <a-textarea
                v-bind:disabled="disabled"
                placeholder="请输入备注"
                :autosize="{ minRows: 4, maxRows: 6 }"
                v-decorator="['remark']"
              ></a-textarea>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
              <a-button
                htmlType="submit"
                type="primary"
                v-bind:disabled="disabled"
                >提交</a-button
              >
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
    <import-file
      ref="importFile"
      :importVisiable="importFile.visiable"
      :actionUrl="'/system/departments/importFile'"
      :importData="importFile.data"
      :columns="importFile.columns"
      @close="handleImportClose"
      @handleImport="handleImport"
    ></import-file>
  </div>
</template>

<script>
import {
  getDepartmentByTenant,
  getDepartment,
  batchRemove,
  remove,
  addDepartment,
  modifyDeparment,
  importConfirm
} from "@/api/system/department";
import { getAllTenant } from "@/api/system/tenant";
import { importFile } from "@/components";
export default {
  name: "department",
  components: {
    importFile
  },
  data() {
    return {
      orgTree: [],
      tenants: [],
      tenantId: 0,
      disabled: true,
      edit: false,
      orgValue: "",
      departmentForm: this.$form.createForm(this),
      department: {},
      dropTrigger: "",
      selectedKeys: [],
      checkedKeys: [],
      rightClickSelected: "",
      importFile: {
        visiable: false,
        data: {},
        columns: [
          {
            title: "部门",
            dataIndex: "name"
          },
          {
            title: "排序",
            dataIndex: "sort"
          },
          {
            title: "地址",
            dataIndex: "address"
          },
          {
            title: "备注",
            dataIndex: "remark"
          }
        ]
      }
    };
  },
  mounted() {
    getAllTenant().then(res => {
      this.tenants = res.data;
    });

    if (this.$store.getters.tenantCode !== "admin") {
      this.tenantId = this.$store.getters.tenantId;
      this.importFile.data = { tenantId: this.tenantId };
      this.loadTree();
    }
  },
  methods: {
    // 右键点击下拉框改变事件
    dropStatus(visible) {
      if (visible == false) {
        this.dropTrigger = "";
      }
    },
    onSelect(selectedKeys, info) {
      if (info.selected) {
        this.edit = true;
        this.getDepartment(info.node.dataRef.value);
      } else {
        this.edit = false;
        this.departmentForm.resetFields();
      }
      this.selectedKeys = selectedKeys;
    },
    onCheck(checkedKeys) {
      this.checkedKeys = checkedKeys;
    },
    deptTreeChange(value) {
      this.orgValue = value;
    },
    showImportFile() {
      this.importFile.visiable = true;
    },
    handleImportClose() {
      this.importFile.visiable = false;
    },
    showAdd() {
      this.departmentForm.resetFields();
      this.disabled = false;
      this.edit = false;
      let department = {};
      if (this.selectedKeys) {
        department = { parentName: this.selectedKeys.name };
      }
      this.setFormValues(department);
    },
    tenantChange(value) {
      if (value) {
        this.tenantId = value;
        this.importFile.data = { tenantId: this.tenantId };
        this.loadTree();
      } else {
        this.tenantId = 0;
        this.orgTree = [];
      }
    },
    loadTree() {
      getDepartmentByTenant(this.tenantId).then(res => {
        if (res.success) {
          this.orgTree = res.data;
        } else {
          this.$message.error("获取部门失败");
        }
      });
    },
    assemblyTree(data) {
      data.forEach(item => {
        this.treeMenu.push({
          id: item.id,
          pId: item.parentId,
          label: item.name,
          value: item.id
        });
        if (item.children) {
          this.assemblyTree(item.children);
        }
      });
    },
    // 右键操作方法
    rightHandle(node) {
      this.dropTrigger = "contextmenu";
      this.rightClickSelected = node.node;
    },
    handleAdd() {
      this.departmentForm.resetFields();
      this.disabled = false;
      let title = this.rightClickSelected.title;
      let department = {};
      if (this.selectedKeys) {
        department = { parentName: title };
      }
      this.setFormValues(department);
    },
    handleEdit() {
      this.disabled = false;
      this.getDepartment(this.rightClickSelected.dataRef.key);
    },
    handleRemove() {
      remove(this.rightClickSelected.dataRef.key).then(resp => {
        if (resp.success) {
          this.$message.success("删除成功!");
          this.loadTree();
        } else {
          this.$message.warning("删除失败!");
        }
      });
    },
    handleDrop() {
      this.dropTrigger = "";
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
    getDepartment(value) {
      getDepartment(value).then(res => {
        if (res.success) {
          this.setFormValues(res.data);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    remove() {
      if (this.checkedKeys.length <= 0) {
        this.$message.warning("请选择需删除的数据！");
      } else {
        const _this = this;
        this.$confirm({
          title: "确认删除",
          content: "确定要删除所选中的 " + this.checkedKeys.length + " 条数据?",
          onOk: function() {
            batchRemove(_this.checkedKeys).then(res => {
              if (res.success) {
                _this.$message.success(res.msg);
                _this.loadTree();
                _this.onClearSelected();
              } else {
                _this.$message.warning(res.msg);
              }
            });
          }
        });
      }
    },
    onClearSelected() {
      this.checkedKeys = {};
      this.departmentForm.resetFields();
      this.selectedKeys = [];
    },
    handleSubmit(e) {
      e.preventDefault();
      const vm = this;
      this.departmentForm.validateFields((err, values) => {
        if (!err) {
          let department = values;
          department.tenantId = this.tenantId;
          department.id = this.department.id;
          if (this.edit) {
            modifyDeparment(department).then(res => {
              if (!res.success) {
                vm.$message.error(res.msg);
              } else {
                this.loadTree();
                this.onClearSelected();
                this.disabled = true;
              }
            });
          } else {
            addDepartment(department).then(res => {
              if (res.success) {
                this.loadTree();
                this.onClearSelected();
                this.disabled = true;
              }
            });
          }
        }
      });
    },
    setFormValues({ ...department }) {
      let fields = [
        "id",
        "tenantId",
        "name",
        "address",
        "sort",
        "remark",
        "parentId"
      ];
      Object.keys(department).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.departmentForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = department[key];
          this.departmentForm.setFieldsValue(obj);
        }
      });
      this.department = department;
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
