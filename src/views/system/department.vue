<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="table-operator">
            <a-button class="btn" type="primary" @click="showAdd" icon="plus"
              >添加科室</a-button
            >
            <a-button class="btn" type="primary" icon="import">导入</a-button>
            <a-button class="btn" type="primary" icon="download">导出</a-button>
            <a-button class="btn" type="default" @click="remove" icon="delete"
              >删除</a-button
            >
          </div>
          <a-select
            allowClear=""
            placeholder="请选择租户"
            style="width: 100%; margin-bottom: 0.4rem;"
          >
            <a-select-option
              v-for="(item, index) in tenants"
              :key="index"
              :value="item.id"
              >{{ item.tenantName }}</a-select-option
            >
          </a-select>
          <a-input-search
            style="width:100%;margin-top: 10px"
            placeholder="请输入科室名称"
          />
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
                <a-menu-item @click="handleAdd()" key="1">添加</a-menu-item>
                <a-menu-item @click="handleRemove()" key="2">删除</a-menu-item>
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
              <a-input
                v-bind:disabled="disabled"
                v-decorator="[
                  'parentName',
                  { rules: [{ required: true, message: '请输入科室名称' }] }
                ]"
                name="name"
                placeholder="请输入上级科室"
              />
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
  </div>
</template>

<script>
import {
  getDepartmentByTenant,
  getDepartment,
  batchRemove,
  remove,
  addDepartment
} from "@/api/system/department";
import { getAllTenant } from "@/api/system/tenant";
export default {
  name: "department",
  data() {
    return {
      orgTree: [],
      tenants: [],
      tenantId: 0,
      disabled: true,
      departmentForm: this.$form.createForm(this),
      dropTrigger: "",
      selectedKeys: [],
      checkedKeys: [],
      rightClickSelected: ""
    };
  },
  mounted() {
    this.loadTree();
    getAllTenant().then(res => {
      this.tenants = res.data;
    });
  },
  methods: {
    // 右键点击下拉框改变事件
    dropStatus(visible) {
      if (visible == false) {
        this.dropTrigger = "";
      }
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      if (info.selected) {
        const _this = this;
        this.$loading.show();
        getDepartment(info.node.dataRef.value)
          .then(res => {
            if (res.success) {
              _this.setFormValues(res.data);
            } else {
              _this.$message.error(res.msg);
            }
          })
          .then(() => {
            _this.$loading.hide();
          });
      } else {
        this.departmentForm.resetFields();
      }
      this.selectedKeys = selectedKeys;
    },
    onCheck(checkedKeys) {
      checkedKeys.forEach(item => {
        this.checkedKeys.push(item);
      });
    },
    showAdd() {
      this.departmentForm.resetFields();
      this.disabled = false;
      let department = {};
      if (this.selectedKeys) {
        department = { parentName: this.selectedKeys.name };
      }
      this.setFormValues(department);
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
    handleRemove() {
      this.$loading.show();
      remove(this.rightClickSelected.key)
        .then(resp => {
          if (resp.success) {
            this.$message.success("删除成功!");
            this.loadTree();
          } else {
            this.$message.warning("删除失败!");
          }
        })
        .then(() => {
          this.$loading.hide();
        });
    },
    handleDrop() {
      this.dropTrigger = "";
    },
    remove() {
      if (this.checkedKeys.length <= 0) {
        this.$message.warning("请选择需删除的数据！");
      } else {
        let ids = "";
        for (let a = 0; a < this.checkedKeys.length; a++) {
          ids += this.checkedKeys[a] + ",";
        }
        const _this = this;
        this.$confirm({
          title: "确认删除",
          content: "确定要删除所选中的 " + this.checkedKeys.length + " 条数据?",
          onOk: function() {
            _this.$loading.show();
            batchRemove({ ids: ids })
              .then(res => {
                if (res.success) {
                  _this.$message.success(res.message);
                  _this.loadTree();
                  _this.onClearSelected();
                } else {
                  _this.$message.warning(res.message);
                }
              })
              .then(() => {
                _this.$loading.hide();
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
      this.departmentForm.validateFields((err, values) => {
        if (!err) {
          this.$loading.show();
          let department = values;
          addDepartment(department)
            .then(res => {
              if (res.success) {
                this.loadTree();
                this.onClearSelected();
                this.disabled = true;
              }
            })
            .then(() => {
              this.$loading.hide();
            });
        }
      });
    },
    setFormValues({ ...department }) {
      let fields = ["name", "address", "sort", "remark", "parentName"];
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
