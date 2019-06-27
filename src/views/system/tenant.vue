<template>
  <basicContainer>
    <div class="search-wrapper" v-if="showSearch">
      <a-form layout="inline">
        <a-row :gutter="16">
          <a-col :md="5" :sm="24">
            <a-form-item label="租户编号">
              <a-input v-model="queryParam.code" placeholder="租户编号" />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="租户名称">
              <a-input v-model="queryParam.name" placeholder="租户名称" />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="租户类型">
              <a-select v-model="queryParam.type" placeholder="请选择租户类型">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="1">医院</a-select-option>
                <a-select-option value="2">洗涤公司</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
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
    </s-table>

    <a-modal
      :title="title"
      v-model="visible"
      width="780px"
      :afterClose="modalClose"
      @ok="handleOk"
      :okButtonProps="{ props: { disabled: okDisabled } }"
    >
      <a-form :form="tenantForm">
        <a-form-item
          label="租户编号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入租户编号"
            v-decorator="[
              'code',
              {
                rules: [
                  { required: true, message: '请输入租户编号' },
                  { min: 4, max: 10, message: '租户编号长度为[4,10]' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="租户名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入租户名称"
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: '请输入租户名称' },
                  { min: 1, max: 15, message: '租户名称长度为[1,15]' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="租户类型"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-select
            placeholder="请选择租户类型"
            v-decorator="[
              'type',
              {
                rules: [{ required: true, message: '请选择租户类型' }]
              }
            ]"
          >
            <a-select-option :value="1">医院</a-select-option>
            <a-select-option :value="2">洗涤公司</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="使用日期"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-range-picker
            @change="rangePickerChange"
            v-decorator="[
              'rangePicker',
              {
                rules: [{ required: true, message: '请选择使用日期' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="租户人"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入租户人"
            v-decorator="[
              'linkName',
              {
                rules: [{ required: false, message: '请输入租户人' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="联系电话"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入联系电话"
            v-decorator="[
              'phone',
              {
                rules: [{ required: false, message: '请输入联系电话' }]
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
                rules: [{ required: false, message: '请输入联系地址' }]
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
            :checked="tenantStatus"
            @change="switchTenantType"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </basicContainer>
</template>

<script>
import { STable, tableMenu } from "@/components";
import { getSwitchStatus } from "@/libs/util";
import moment from "moment";
import {
  pageTenant,
  removeTenant,
  batchRemoveTenant,
  getTenant,
  addTenant,
  modifyTenant
} from "@/api/system/tenant";
import AFormItem from "ant-design-vue/es/form/FormItem";
export default {
  name: "tenant",
  components: {
    AFormItem,
    STable,
    tableMenu
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
      tenantForm: this.$form.createForm(this),
      tenant: {},
      tenantStatus: true,
      startDate: "",
      endDate: "",
      typeMap: {
        1: "正常",
        2: "禁用"
      },
      // 表头
      columns: [
        {
          title: "租户编号",
          dataIndex: "code"
        },
        {
          title: "租户名称",
          dataIndex: "name"
        },
        {
          title: "类型",
          dataIndex: "type",
          scopedSlots: { customRender: "type" }
        },
        {
          title: "开始日期",
          dataIndex: "startDate"
        },
        {
          title: "结束日期",
          dataIndex: "endDate"
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "联系人",
          dataIndex: "linkman"
        },
        {
          title: "联系电话",
          dataIndex: "phone"
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
        return pageTenant(Object.assign(parameter, this.queryParam)).then(
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
    switchTenantType(checked) {
      this.tenantStatus = checked;
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
          vm.$loading.show();
          batchRemoveTenant(vm.selectedRowKeys)
            .then(res => {
              if (res.success) {
                vm.$message.success("批量删除成功");
                vm.$refs.table.refresh(true);
              } else {
                vm.$message.error(res.msg);
              }
            })
            .finally(() => {
              vm.$loading.hide();
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
          vm.$loading.show();
          removeTenant(row.id)
            .then(res => {
              if (res.success) {
                vm.$message.success("删除成功");
                vm.$refs.table.refresh(true);
              } else {
                vm.$message.error(res.msg);
              }
            })
            .finally(() => {
              vm.$loading.hide();
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
      this.getTenant(row.id);
    },
    showDetail(row) {
      this.title = "详情";
      this.okDisabled = true;
      this.getTenant(row.id);
    },
    rangePickerChange(dates, dataStr) {
      this.startDate = dataStr[0];
      this.endDate = dataStr[1];
    },
    handleOk() {
      const vm = this;
      this.tenantForm.validateFields(err => {
        if (!err) {
          this.$loading.show();
          let tenant = this.tenantForm.getFieldsValue();
          tenant.id = this.tenant.id;
          tenant.status = getSwitchStatus(this.tenantStatus);
          tenant.startDate = this.startDate;
          tenant.endDate = this.endDate;
          if (this.edit) {
            modifyTenant(tenant)
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
          } else {
            console.log(tenant);
            addTenant(tenant)
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
      this.tenantForm.resetFields();
      this.tenantStatus = true;
    },
    getTenant(id) {
      const vm = this;
      this.$loading.show();
      getTenant(id)
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
    setFormValues({ ...tenant }) {
      let fields = [
        "code",
        "name",
        "linkName",
        "phone",
        "address",
        "type",
        "remark",
        "startDate",
        "endDate"
      ];

      Object.keys(tenant).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.tenantForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = tenant[key];
          this.tenantForm.setFieldsValue(obj);
        }
      });
      console.log(this.tenantForm.getFieldsValue());
      setTimeout(() => {
        let dateFormat = "YYYY-MM-DD";
        this.tenantForm.setFieldsValue({
          rangePicker: [
            moment(tenant["startDate"], dateFormat),
            moment(tenant["endDate"], dateFormat)
          ]
        });
      }, 0);
      this.startDate = tenant["startDate"];
      this.endDate = tenant["endDate"];
      this.tenantStatus = tenant["status"] == 1;

      this.tenant = tenant;
    }
  }
};
</script>
