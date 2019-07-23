<template>
  <basicContainer>
    <div class="search-wrapper" v-if="showSearch">
      <a-form layout="inline">
        <a-row :gutter="25">
          <a-col :md="5" :sm="24">
            <a-form-item label="菜单名称">
              <a-input v-model="queryParam.name" placeholder="菜单名称" />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="菜单编码">
              <a-input v-model="queryParam.code" placeholder="菜单编码" />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="状态">
              <a-select
                placeholder="请选择"
                v-model="queryParam.status"
                default-value=""
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
    <div class="table-menu">
      <div class="table-menu-permission">
        <a-button type="primary" class="btn" icon="plus" @click="showAdd"
          >新增</a-button
        >
        <a-button
          type="danger"
          class="btn anger"
          icon="delete"
          @click="batchRemove"
          >删除</a-button
        >
      </div>
      <div class="table-menu-nav">
        <a-button shape="circle" icon="sync" @click="refresh" />
        <a-button shape="circle" icon="search" @click="updateShowSearch" />
      </div>
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="false"
      :showPagination="false"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
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
                    rules: [
                      { required: true, message: '请输入菜单名称' },
                      { min: 2, max: 15, message: '菜单名称长度为[2, 10]' }
                    ]
                  }
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="菜单编码"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                placeholder="请输入菜单编码"
                v-decorator="[
                  'code',
                  {
                    rules: [
                      { required: true, message: '请输入菜单编码' },
                      { min: 2, max: 20, message: '菜单编码长度为[2, 20]' }
                    ]
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
              <a-input placeholder="请输入路由地址" v-decorator="['path']" />
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
                :disabled="menuTreeDisabled"
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
              label="前端组件"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-select
                allowClear
                placeholder="请选择前端组件"
                v-decorator="['component']"
              >
                <a-select-option
                  v-for="(item, index) in components"
                  :key="index"
                  :value="item.data"
                  >{{ item.name }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="按钮权限类型"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-select
                allowClear
                placeholder="请选择按钮权限类型"
                v-decorator="['permission']"
              >
                <a-select-option
                  v-for="(item, index) in permissions"
                  :key="index"
                  :value="item.data"
                  >{{ item.name }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="菜单类型"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-radio-group v-decorator="['category']" name="category">
                <a-radio :value="1">
                  菜单
                </a-radio>
                <a-radio :value="2">
                  按钮
                </a-radio>
              </a-radio-group>
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
              label="状态"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-radio-group
                v-decorator="[
                  'status',
                  {
                    initialValue: 1,
                    rules: [{ required: true, message: '请选择状态' }]
                  }
                ]"
                name="opened"
              >
                <a-radio :value="1">
                  启用
                </a-radio>
                <a-radio :value="2">
                  禁用
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="是否显示"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-radio-group
                v-decorator="[
                  'showed',
                  {
                    initialValue: 1,
                    rules: [{ required: true, message: '请选择是否显示' }]
                  }
                ]"
                name="opened"
              >
                <a-radio :value="1">
                  显示
                </a-radio>
                <a-radio :value="0">
                  隐藏
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="隐藏子菜单"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-radio-group
                v-decorator="[
                  'hiddenChildren',
                  {
                    initialValue: false,
                    rules: [{ required: true, message: '请选择是否隐藏子菜单' }]
                  }
                ]"
                name="hideChildren"
              >
                <a-radio :value="true">
                  是
                </a-radio>
                <a-radio :value="false">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item
              label="重定向地址"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                placeholder="请输入重定向地址"
                v-decorator="['redirect']"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="424">
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
import { STable, IconSelector } from "@/components";
import {
  pageMenu,
  removeMenu,
  batchRemoveMenu,
  getMenu,
  addMenu,
  modifyMenu
} from "@/api/system/menu";
import { getDictByType } from "@/api/system/dict";
import dict from "@/const/dict";
import AFormItem from "ant-design-vue/es/form/FormItem";
import ACol from "ant-design-vue/es/grid/Col";
export default {
  name: "menu",
  components: {
    ACol,
    AFormItem,
    STable,
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
      menuTreeDisabled: false,
      title: "",
      iconType: "",
      edit: false,
      menuForm: this.$form.createForm(this),
      menu: {},
      components: [],
      permissions: [],
      category: 0,
      // 表头
      columns: [
        {
          title: "名称",
          dataIndex: "name"
        },
        {
          title: "编号",
          dataIndex: "code"
        },
        {
          title: "路由地址",
          dataIndex: "path"
        },
        {
          title: "类型",
          dataIndex: "category",
          customRender: text => {
            switch (text) {
              case 1:
                return <a-tag color="cyan"> 菜单 </a-tag>;
              case 2:
                return <a-tag color="pink"> 按钮 </a-tag>;
              default:
                return text;
            }
          }
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
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "操作",
          dataIndex: "action",
          width: "230px",
          fixed: "right",
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
        parameter.size = 200;
        return pageMenu(Object.assign(parameter, this.queryParam)).then(res => {
          this.treeMenu = [];
          this.assemblyTree(res.data.records);
          return res.data;
        });
      }
    };
  },
  created() {
    this.tableOption();
  },
  beforeMount() {
    getDictByType(dict.componentType).then(res => {
      if (res.success) {
        this.components = res.data;
      }
    });
    getDictByType(dict.permissionType).then(res => {
      if (res.success) {
        this.permissions = res.data;
      }
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
    assemblyTree(data) {
      data.forEach(item => {
        if (item.category == 2) {
          return;
        }
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
    updateShowSearch() {
      this.showSearch = !this.showSearch;
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
          batchRemoveMenu(vm.selectedRowKeys).then(res => {
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
          removeMenu(row.id).then(res => {
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
      this.getMenu(row.id);
    },
    showDetail(row) {
      this.title = "详情";
      this.okDisabled = true;
      this.getMenu(row.id);
    },
    handleOk() {
      this.menuForm.validateFields(err => {
        if (!err) {
          let menu = this.menuForm.getFieldsValue();
          menu.id = this.menu.id;
          if (this.edit) {
            modifyMenu(menu).then(res => {
              if (res.success) {
                this.visible = false;
                this.$refs.table.refresh(true);
              }
            });
          } else {
            addMenu(menu).then(() => {
              this.visible = false;
              this.$refs.table.refresh(true);
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
      getMenu(id).then(res => {
        if (res.success) {
          this.visible = true;
          vm.setFormValues(res.data);
        } else {
          vm.$message.error(res.msg);
        }
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
        "opened",
        "category",
        "status",
        "showed",
        "component",
        "hiddenChildren",
        "redirect"
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
