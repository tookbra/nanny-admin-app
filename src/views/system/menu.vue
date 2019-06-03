<template>
  <basicContainer>
    <div class="search-wrapper" v-if="showSearch">
      <a-form layout="inline">
        <a-row :gutter="25">
          <a-col :md="5" :sm="24">
            <a-form-item label="菜单名称">
              <a-input v-model="queryParam.code" placeholder="菜单名称" />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="菜单编码">
              <a-input v-model="queryParam.name" placeholder="菜单编码" />
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
      :pagination="pagination"
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
      <span slot="icon" class="table-nav" slot-scope="text">
        <template>
          <a-icon :type="text" />
        </template>
      </span>
    </s-table>

    <a-modal
      :title="title"
      v-model="visible"
      width="1080px"
      :afterClose="modalClose"
      @ok="handleOk"
      :okButtonProps="{ props: { disabled: okDisabled } }"
    >
      <a-form :form="menuForm">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item
              label="菜单名称"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                placeholder="请输入菜单名称"
                v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: '请输入菜单名称' }]
                  }
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="路由地址"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                placeholder="请输入路由地址"
                v-decorator="[
                  'path',
                  {
                    rules: [{ required: true, message: '请输入路由地址' }]
                  }
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="上级菜单"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-tree-select
                showSearch
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="treeMenu"
                placeholder="请选择上级菜单"
                treeDefaultExpandAll
                :treeDataSimpleMode="true"
                v-decorator="['parentId']"
              >
              </a-tree-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="菜单图标"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                placeholder="请输入菜单图标"
                v-decorator="['icon']"
                @click="chooseIcon"
              >
                <a-icon slot="addonAfter" :type="iconType" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="菜单排序"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input-number
                v-decorator="['sort', { initialValue: 0 }]"
                :min="0"
                :max="100"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="新窗口"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-radio-group v-decorator="['opened']" name="opened">
                <a-radio :value="1">
                  是
                </a-radio>
                <a-radio :value="0">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="菜单备注"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-textarea
                placeholder="请输入备注"
                :autosize="{ minRows: 4, maxRows: 6 }"
                v-decorator="['remark']"
              ></a-textarea>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>

    <a-modal
      v-model="showIcon"
      :width="900"
      :mask="false"
      :footer="null"
      :afterClose="handleIconCancel"
    >
      <icon-selector @change="handleIconChange" />
    </a-modal>
  </basicContainer>
</template>

<script>
import { STable, tableMenu, IconSelector } from "@/components";
import {
  pageMenu,
  removeMenu,
  batchRemoveMenu,
  getMenu,
  addMenu,
  modifyMenu
} from "@/api/system/menu";
import AFormItem from "ant-design-vue/es/form/FormItem";
import ACol from "ant-design-vue/es/grid/Col";
export default {
  name: "menu",
  components: {
    ACol,
    AFormItem,
    STable,
    tableMenu,
    IconSelector
  },
  data() {
    return {
      // 查询参数
      queryParam: {},
      treeMenu: [],
      showSearch: true,
      showIcon: false,
      visible: false,
      loading: false,
      okDisabled: false,
      title: "",
      iconType: "",
      edit: false,
      menuForm: this.$form.createForm(this),
      menu: {},
      pagination: {
        defaultPageSize: 50,
        hideOnSinglePage: true
      },
      // 表头
      columns: [
        {
          title: "名称",
          search: true,
          dataIndex: "name"
        },
        {
          title: "编号",
          dataIndex: "code"
        },
        {
          title: "路由地址",
          search: true,
          dataIndex: "path"
        },
        {
          title: "图标",
          dataIndex: "icon",
          scopedSlots: { customRender: "icon" }
        },
        {
          title: "排序",
          dataIndex: "sort"
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
        parameter.pageSize = 50;
        return pageMenu(Object.assign(parameter, this.queryParam)).then(res => {
          this.assemblyTree(res.data.records);
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
    chooseIcon() {
      this.showIcon = true;
    },
    handleIconCancel() {
      this.showIcon = false;
    },
    handleIconChange(icon) {
      this.iconType = icon;
      this.showIcon = false;
      this.menuForm.setFieldsValue({
        icon: icon
      });
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
            batchRemoveMenu(vm.selectedRowKeys).then(res => {
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
            removeMenu(row.id).then(res => {
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
      this.getMenu(row.id);
    },
    showDetail(row) {
      this.title = "详情";
      this.okDisabled = true;
      this.getMenu(row.id);
    },
    handleOk() {
      const vm = this;
      this.menuForm.validateFields(err => {
        if (!err) {
          this.$loading.show();
          let menu = this.menuForm.getFieldsValue();
          menu.id = this.menu.id;
          if (this.edit) {
            modifyMenu(menu)
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
            addMenu(menu)
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
      this.menuForm.resetFields();
    },
    getMenu(id) {
      const vm = this;
      this.$loading.show();
      getMenu(id)
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
    setFormValues({ ...menu }) {
      let fields = [
        "name",
        "path",
        "icon",
        "code",
        "sort",
        "parentId",
        "remark",
        "opened"
      ];
      Object.keys(menu).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.menuForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = menu[key];
          this.menuForm.setFieldsValue(obj);
        }
      });
      this.menu = menu;
    }
  }
};
</script>
