<template>
  <basicContainer>
    <div class="search-wrapper" v-if="showSearch">
      <a-form layout="inline">
        <a-row :gutter="25">
          <a-col :md="5" :sm="24">
            <a-form-item label="产品名称">
              <a-input v-model="queryParam.name" placeholder="产品名称" />
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
      <a-form :form="productForm">
        <a-form-item
          label="产品编码"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input
            placeholder="请输入产品编码"
            v-decorator="[
              'code',
              {
                rules: [{ required: true, message: '请输入产品编码' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="产品名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input
            placeholder="请输入产品名称"
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '请输入产品名称' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="产品尺寸"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-select
            placeholder="请选择产品尺寸"
            v-decorator="[
              'attr',
              {
                rules: [{ required: false, message: '请选择产品尺寸' }]
              }
            ]"
          >
            <a-select-option value="1">XL</a-select-option>
            <a-select-option value="2">L</a-select-option>
            <a-select-option value="3">M</a-select-option>
            <a-select-option value="4">S</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="产品颜色"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input
            placeholder="请输入产品颜色"
            v-decorator="[
              'color',
              {
                rules: [{ required: false, message: '请输入产品颜色' }]
              }
            ]"
          />
        </a-form-item>
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
  pageProduct,
  removeProduct,
  batchRemoveProduct,
  getProduct,
  addProduct,
  modifyProduct
} from "@/api/basicInfo/product";
import AFormItem from "ant-design-vue/es/form/FormItem";
import ACol from "ant-design-vue/es/grid/Col";
export default {
  name: "product",
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
      showSearch: true,
      showIcon: false,
      visible: false,
      loading: false,
      okDisabled: false,
      title: "",
      iconType: "",
      edit: false,
      productForm: this.$form.createForm(this),
      product: {},
      pagination: {
        defaultPageSize: 50,
        hideOnSinglePage: true
      },
      // 表头
      columns: [
        {
          title: "编码",
          dataIndex: "code"
        },
        {
          title: "名称",
          dataIndex: "name"
        },
        {
          title: "尺寸",
          dataIndex: "attr"
        },
        {
          title: "颜色",
          dataIndex: "color"
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
        parameter.pageSize = 50;
        return pageProduct(Object.assign(parameter, this.queryParam)).then(
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
            batchRemoveProduct(vm.selectedRowKeys).then(res => {
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
            removeProduct(row.id).then(res => {
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
      this.getProduct(row.id);
    },
    showDetail(row) {
      this.title = "详情";
      this.okDisabled = true;
      this.getProduct(row.id);
    },
    handleOk() {
      const vm = this;
      this.productForm.validateFields(err => {
        if (!err) {
          this.$loading.show();
          let product = this.productForm.getFieldsValue();
          product.id = this.product.id;
          if (this.edit) {
            modifyProduct(product)
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
            addProduct(product)
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
      this.productForm.resetFields();
    },
    getProduct(id) {
      const vm = this;
      this.$loading.show();
      getProduct(id)
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
    setFormValues({ ...product }) {
      let fields = ["code", "name", "attr", "color", "status"];
      Object.keys(product).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.productForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = product[key];
          this.productForm.setFieldsValue(obj);
        }
      });
      this.product = product;
    }
  }
};
</script>
