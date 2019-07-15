<template>
  <basicContainer>
    <div v-action:washCar_search class="search-wrapper" v-if="showSearch">
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
            <a-form-item label="车牌号">
              <a-input v-model="queryParam.carNumber" placeholder="车牌号" />
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
          v-action:washCar_add
          type="primary"
          class="btn"
          icon="plus"
          @click="showAdd"
          >新增</a-button
        >
        <a-button
          v-action:washCar_delete
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
          v-action:washCar_search
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
      <span slot="washCompany" slot-scope="text">
        {{ text | typeFilter(companiesMap) }}
      </span>
      <span slot="action" class="table-nav" slot-scope="text, record">
        <template>
          <a v-action:washCar_view @click="() => showDetail(record)">
            <a-icon type="eye" />
            详情
          </a>
          <a-divider v-action:washCar_view type="vertical" />
          <a v-action:washCar_edit @click="() => showModify(record)">
            <a-icon type="edit" />
            编辑
          </a>
          <a-divider v-action:washCar_edit type="vertical" />
          <a v-action:washCar_delete @click="() => remove(record)">
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
      <a-form :form="washCarForm">
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
          label="车牌号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入车牌号"
            v-decorator="[
              'carNumber',
              {
                rules: [
                  { required: true, message: '请输入车牌号' },
                  { min: 1, max: 10, message: '车牌号长度为[1,10]' }
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
  pageWashCar,
  removeWashCar,
  batchRemoveWashCar,
  getWashCar,
  addWashCar,
  modifyWashCar
} from "@/api/system/washCar";
import AFormItem from "ant-design-vue/es/form/FormItem";
export default {
  name: "washCar",
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
      washCarForm: this.$form.createForm(this),
      washCar: {},
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
          title: "车牌号",
          dataIndex: "carNumber"
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
        return pageWashCar(Object.assign(parameter, this.queryParam)).then(
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
          batchRemoveWashCar(vm.selectedRowKeys).then(res => {
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
          removeWashCar(row.id).then(res => {
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
      this.getWashCar(row.id);
    },
    showDetail(row) {
      this.title = "详情";
      this.okDisabled = true;
      this.getWashCar(row.id);
    },
    rangePickerChange(dates, dataStr) {
      this.startDate = dataStr[0];
      this.endDate = dataStr[1];
    },
    handleOk() {
      const vm = this;
      this.washCarForm.validateFields(err => {
        if (!err) {
          let washCar = this.washCarForm.getFieldsValue();
          washCar.id = this.washCar.id;
          if (this.edit) {
            modifyWashCar(washCar).then(res => {
              if (!res.success) {
                vm.$message.error(res.msg);
              } else {
                this.visible = false;
                this.$refs.table.refresh(true);
              }
            });
          } else {
            addWashCar(washCar)
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
      this.washCarForm.resetFields();
    },
    getWashCar(id) {
      const vm = this;
      getWashCar(id).then(res => {
        if (res.success) {
          this.visible = true;
          vm.setFormValues(res.data);
        } else {
          vm.$message.error(res.msg);
        }
      });
    },
    setFormValues({ ...washCar }) {
      let fields = ["id", "washCompanyId", "carNumber", "remark"];

      Object.keys(washCar).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.washCarForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = washCar[key];
          this.washCarForm.setFieldsValue(obj);
        }
      });

      this.washCar = washCar;
    }
  }
};
</script>
