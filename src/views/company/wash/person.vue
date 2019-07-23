<template>
  <basicContainer>
    <div v-action:washPerson_search class="search-wrapper" v-if="showSearch">
      <a-form layout="inline">
        <a-row :gutter="16">
          <a-col :md="5" :sm="24">
            <a-form-item label="洗涤公司">
              <a-select
                allowClear
                v-model="queryParam.washCompanyId"
                placeholder="请选择洗涤公司"
              >
                <a-select-option
                  v-for="(item, index) in washCompanies"
                  :key="index"
                  :value="item.id"
                  >{{ item.name }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="姓名">
              <a-input v-model="queryParam.name" placeholder="姓名" />
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
          v-action:washPerson_add
          type="primary"
          class="btn"
          icon="plus"
          @click="showAdd"
          >新增</a-button
        >
        <a-button
          v-action:washPerson_delete
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
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      :showSizeChanger="true"
    >
      <span slot="washCompany" slot-scope="text">
        {{ text | typeFilter(companiesMap) }}
      </span>
      <span slot="action" class="table-nav" slot-scope="text, record">
        <template>
          <a v-action:washPerson_view @click="() => showDetail(record)">
            <a-icon type="eye" />
            详情
          </a>
          <a-divider v-action:washPerson_view type="vertical" />
          <a v-action:washPerson_edit @click="() => showModify(record)">
            <a-icon type="edit" />
            编辑
          </a>
          <a-divider v-action:washPerson_edit type="vertical" />
          <a v-action:washPerson_delete @click="() => remove(record)">
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
      <a-form :form="washPersonForm">
        <a-form-item
          label="洗涤公司"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-select
            placeholder="请选择洗涤公司"
            v-decorator="[
              'washCompanyId',
              {
                rules: [{ required: true, message: '请选择洗涤公司' }]
              }
            ]"
          >
            <a-select-option value="">全部</a-select-option>
            <a-select-option
              v-for="(item, index) in washCompanies"
              :key="index"
              :value="item.id"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item
          label="姓名"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入姓名"
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: '请输入姓名' },
                  { min: 2, max: 10, message: '姓名长度为[2,10]' }
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
            placeholder="联系方式"
            v-decorator="[
              'phone',
              {
                rules: [
                  { min: 0, max: 15, message: '联系方式最大长度为15个字符' }
                ]
              }
            ]"
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
import { getAllWashComapany } from "@/api/system/washCompany";
import {
  pageWashPerson,
  removeWashPerson,
  batchRemoveWashPerson,
  getWashPerson,
  addWashPerson,
  modifyWashPerson
} from "@/api/system/washPerson";
import AFormItem from "ant-design-vue/es/form/FormItem";
export default {
  name: "washPerson",
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
      washPersonForm: this.$form.createForm(this),
      washPerson: {},
      washCompanies: [],
      companiesMap: new Map(),
      // 表头
      columns: [
        {
          title: "洗涤公司",
          dataIndex: "washCompanyId",
          scopedSlots: { customRender: "washCompany" }
        },
        {
          title: "员工姓名",
          dataIndex: "name"
        },
        {
          title: "联系方式",
          dataIndex: "phone"
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
        return pageWashPerson(Object.assign(parameter, this.queryParam)).then(
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
  beforeMount() {
    getAllWashComapany().then(res => {
      this.washCompanies = res.data;
      res.data.forEach(item => {
        this.companiesMap.set(item.id + "", item.name);
      });
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
          batchRemoveWashPerson(vm.selectedRowKeys).then(res => {
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
          removeWashPerson(row.id).then(res => {
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
      this.getWashPerson(row.id);
    },
    showDetail(row) {
      this.title = "详情";
      this.okDisabled = true;
      this.getWashPerson(row.id);
    },
    rangePickerChange(dates, dataStr) {
      this.startDate = dataStr[0];
      this.endDate = dataStr[1];
    },
    handleOk() {
      const vm = this;
      this.washPersonForm.validateFields(err => {
        if (!err) {
          let washPerson = this.washPersonForm.getFieldsValue();
          washPerson.id = this.washPerson.id;
          if (this.edit) {
            modifyWashPerson(washPerson).then(res => {
              if (!res.success) {
                vm.$message.error(res.msg);
              } else {
                this.visible = false;
                this.$refs.table.refresh(true);
              }
            });
          } else {
            addWashPerson(washPerson)
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
      this.washPersonForm.resetFields();
    },
    getWashPerson(id) {
      const vm = this;
      getWashPerson(id).then(res => {
        if (res.success) {
          this.visible = true;
          vm.setFormValues(res.data);
        } else {
          vm.$message.error(res.msg);
        }
      });
    },
    setFormValues({ ...washPerson }) {
      let fields = ["id", "washCompanyId", "name", "phone", "remark"];

      Object.keys(washPerson).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.washPersonForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = washPerson[key];
          this.washPersonForm.setFieldsValue(obj);
        }
      });

      this.washPerson = washPerson;
    }
  }
};
</script>
