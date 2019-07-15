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
            <a-form-item label="产品类型">
              <a-select
                placeholder="请选择"
                v-model="queryParam.productTypeId"
                default-value=""
              >
                <a-select-option value="">全部</a-select-option>
                <a-select-option
                  v-for="(item, index) in productType"
                  :key="index"
                  :value="item.data"
                  >{{ item.name }}</a-select-option
                >
              </a-select>
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
        <a-button type="primary" class="btn" icon="plus" @click="showAdd"
          >新增</a-button
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
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      :pagination="pagination"
      :showSizeChanger="true"
    >
      <span slot="type" slot-scope="text">
        {{ text | typeFilter(typeMap) }}
      </span>
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
      width="880px"
      :afterClose="modalClose"
      @ok="handleOk"
      :okButtonProps="{ props: { disabled: okDisabled } }"
    >
      <a-form :form="productForm">
        <a-form-item
          label="产品名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 10 }"
        >
          <a-input
            placeholder="请输入产品名称"
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: '请输入产品名称' },
                  { min: 2, max: 10, message: '产品名称长度为[2,10]' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="产品类型"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 10 }"
        >
          <a-select
            placeholder="请选择产品类型"
            allowClear
            v-decorator="[
              'typeId',
              {
                rules: [{ required: true, message: '请选择产品类型' }]
              }
            ]"
          >
            <a-select-option
              v-for="(item, index) in productType"
              :key="index"
              :value="item.data"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item
          label="洗涤次数"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 10 }"
        >
          <a-input-number
            v-decorator="['washedNum', { initialValue: 0 }]"
            :min="0"
          />
        </a-form-item>
        <a-form-item
          label="使用天数"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 10 }"
        >
          <a-input-number
            v-decorator="['usedDay', { initialValue: 0 }]"
            :min="0"
          />
        </a-form-item>
        <a-form-item
          label="规格"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 10 }"
        >
          <a-input
            placeholder="请输入规格"
            v-decorator="[
              'specification',
              {
                rules: [{ min: 1, max: 10, message: '规格长度为[1,10]' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="产品季节"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 10 }"
        >
          <a-select
            placeholder="请选择产品季节"
            allowClear
            v-decorator="['season']"
            default-value="0"
          >
            <a-select-option value="0">请选择</a-select-option>
            <a-select-option
              v-for="(item, index) in season"
              :key="index"
              :value="item.data"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item
          label="状态"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 10 }"
        >
          <a-switch
            checkedChildren="启用"
            unCheckedChildren="禁用"
            defaultChecked
            :checked="productStatus"
            @change="switchProductStatus"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </basicContainer>
</template>

<script>
import { mapGetters } from "vuex";
import { STable } from "@/components";
import { getSwitchStatus } from "@/libs/util";
import {
  pageProduct,
  removeProduct,
  batchRemoveProduct,
  getProduct,
  addProduct,
  modifyProduct
} from "@/api/basicInfo/product";
export default {
  name: "product",
  components: {
    STable
  },
  computed: {
    ...mapGetters(["productType", "status", "season"])
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
      productStatus: true,
      productForm: this.$form.createForm(this),
      product: {},
      typeMap: new Map(),
      pagination: {
        defaultPageSize: 50,
        hideOnSinglePage: true
      },
      // 表头
      columns: [
        {
          title: "产品名称",
          dataIndex: "name"
        },
        {
          title: "产品类型",
          dataIndex: "typeId",
          scopedSlots: { customRender: "type" }
        },
        {
          title: "洗涤次数",
          dataIndex: "washedNum"
        },
        {
          title: "使用天数",
          dataIndex: "usedDay"
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
  beforeMount() {
    this.productType.forEach(item => {
      this.typeMap.set(item.data, item.name);
    });
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
          removeProduct(row.id).then(res => {
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
      this.getProduct(row.id);
    },
    switchProductStatus(checked) {
      this.productStatus = checked;
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
          product.status = getSwitchStatus(this.productStatus);
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
      let fields = [
        "name",
        "status",
        "typeId",
        "washedNum",
        "usedDay",
        "specification",
        "season"
      ];
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
