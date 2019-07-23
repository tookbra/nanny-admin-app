<template>
  <basicContainer>
    <div v-action:washCompany_search class="search-wrapper" v-if="showSearch">
      <a-form layout="inline">
        <a-row :gutter="16">
          <a-col :md="5" :sm="24">
            <a-form-item label="公司名称">
              <a-input v-model="queryParam.name" placeholder="公司名称" />
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
          v-action:washCompany_add
          type="primary"
          class="btn"
          icon="plus"
          @click="showAdd"
          >新增</a-button
        >
        <a-button
          v-action:washCompany_delete
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
          v-action:washCompany_search
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
      <span slot="action" class="table-nav" slot-scope="text, record">
        <template>
          <a v-action:washCompany_view @click="() => showDetail(record)">
            <a-icon type="eye" />
            详情
          </a>
          <a-divider v-action:washCompany_view type="vertical" />
          <a v-action:washCompany_edit @click="() => showModify(record)">
            <a-icon type="edit" />
            编辑
          </a>
          <a-divider v-action:washCompany_edit type="vertical" />
          <a v-action:washCompany_delete @click="() => remove(record)">
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
      :afterClose="modalClose"
      @ok="handleOk"
      :okButtonProps="{ props: { disabled: okDisabled } }"
    >
      <a-form :form="washCompanyForm">
        <a-form-item
          label="公司名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入公司名称"
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: '请输入公司名称' },
                  { min: 2, max: 15, message: '公司名称长度为[4,10]' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="联系方式"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入联系方式"
            v-decorator="[
              'phone',
              {
                rules: [
                  { required: true, message: '请输入联系方式' },
                  { min: 0, max: 15, message: '联系方式长度为[0,15]' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="联系地址"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-textarea
            placeholder="请输入联系地址"
            :autosize="{ minRows: 4, maxRows: 6 }"
            v-decorator="[
              'address',
              {
                rules: [
                  { min: 0, max: 256, message: '联系地址最大长度为256个字符' }
                ]
              }
            ]"
          ></a-textarea>
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
                rules: [{ min: 0, max: 15, message: '备注最大长度为256个字符' }]
              }
            ]"
          ></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
  </basicContainer>
</template>

<script>
import { STable } from "@/components";
import {
  pageCompany,
  removeCompany,
  batchRemoveCompany,
  getCompany,
  addCompany,
  modifyCompany
} from "@/api/system/washCompany";
import AFormItem from "ant-design-vue/es/form/FormItem";
export default {
  name: "washCompany",
  components: {
    AFormItem,
    STable
  },
  data() {
    return {
      // 查询参数
      queryParam: {},
      showSearch: true,
      visible: false,
      okDisabled: false,
      title: "",
      edit: false,
      washCompanyForm: this.$form.createForm(this),
      washCompany: {},
      // 表头
      columns: [
        {
          title: "公司名称",
          dataIndex: "name"
        },
        {
          title: "联系方式",
          dataIndex: "phone"
        },
        {
          title: "备注",
          dataIndex: "remark"
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
        return pageCompany(Object.assign(parameter, this.queryParam)).then(
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
          batchRemoveCompany(vm.selectedRowKeys).then(res => {
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
          removeCompany(row.id).then(res => {
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
      this.getCompany(row.id);
    },
    showDetail(row) {
      this.title = "详情";
      this.okDisabled = true;
      this.getCompany(row.id);
    },
    handleOk() {
      const vm = this;
      this.washCompanyForm.validateFields(err => {
        if (!err) {
          let washCompany = this.washCompanyForm.getFieldsValue();
          washCompany.id = this.washCompany.id;
          if (this.edit) {
            modifyCompany(washCompany).then(res => {
              if (!res.success) {
                vm.$message.error(res.msg);
              } else {
                this.visible = false;
                this.$refs.table.refresh(true);
              }
            });
          } else {
            addCompany(washCompany)
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
      this.washCompanyForm.resetFields();
    },
    getCompany(id) {
      const vm = this;
      getCompany(id).then(res => {
        if (res.success) {
          this.visible = true;
          vm.setFormValues(res.data);
        } else {
          vm.$message.error(res.msg);
        }
      });
    },
    setFormValues({ ...washCompany }) {
      let fields = ["name", "phone", "address", "remark"];

      Object.keys(washCompany).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.washCompanyForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = washCompany[key];
          this.washCompanyForm.setFieldsValue(obj);
        }
      });

      this.washCompany = washCompany;
    }
  }
};
</script>
