<template>
  <basicContainer>
    <div class="search-wrapper" v-if="showSearch">
      <a-form layout="inline">
        <a-row :gutter="16">
          <a-col :md="5" :sm="24">
            <a-form-item label="科室">
              <a-tree-select
                showSearch
                allowClear
                v-model="queryParam.departmentId"
                :treeData="orgTree"
                placeholder="所属科室"
                treeDefaultExpandAll
              />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="员工姓名">
              <a-input v-model="queryParam.name" placeholder="员工姓名" />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="产品名称">
              <a-input
                v-model="queryParam.productName"
                placeholder="产品名称"
              />
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
        <a-button
          class="btn"
          type="primary"
          icon="import"
          @click="showImportFile"
          >导入</a-button
        >
        <a-dropdown>
          <a-menu slot="overlay" @click="handleExportClick">
            <a-menu-item key="1">导出所选数据</a-menu-item>
            <a-menu-item key="2">导出全部数据</a-menu-item>
          </a-menu>
          <a-button icon="export">导出 <a-icon type="down" /> </a-button>
        </a-dropdown>
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
      <a-form :form="rfidForm">
        <a-form-item
          label="rfid编码"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入RFID编码"
            v-decorator="[
              'code',
              {
                rules: [{ min: 2, max: 56, message: 'RFID编码长度为[4,10]' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="产品"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-select
            allowClear
            placeholder="请选择产品"
            v-decorator="[
              'productId',
              {
                rules: [{ required: true, message: '请选择产品' }]
              }
            ]"
          >
            <a-select-option
              v-for="(item, index) in products"
              :key="index"
              :value="item.id"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item
          label="科室"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-tree-select
            showSearch
            allowClear
            :treeData="orgTree"
            placeholder="所属科室"
            treeDefaultExpandAll
            @change="handleOrgChange"
            v-decorator="[
              'departmentId',
              {
                rules: [{ required: true, message: '所属科室' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="员工"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-select placeholder="请选择员工" v-decorator="['userId']">
            <a-select-option
              v-for="(item, index) in users"
              :key="index"
              :value="item.id"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <import-file
      ref="importFile"
      :importVisiable="importFile.visible"
      :actionUrl="'/system/rfids/importFile'"
      :importData="importFile.data"
      :columns="importFile.columns"
      @close="handleImportClose"
      @handleImport="handleImport"
    ></import-file>
  </basicContainer>
</template>

<script>
import { STable, importFile } from "@/components";
import {
  pageRfid,
  removeRfid,
  batchRemoveRfid,
  getRfid,
  addRfid,
  modifyRfid,
  importConfirm
} from "@/api/system/rfid";
import { getDepartmentByTenant } from "@/api/system/department";
import { getAccountByDepartmentId } from "@/api/system/account";
import { getProductAll } from "@/api/basicInfo/product";
import AFormItem from "ant-design-vue/es/form/FormItem";
export default {
  name: "rfid",
  components: {
    AFormItem,
    STable,
    importFile
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
      rfidForm: this.$form.createForm(this),
      rfid: {},
      orgTree: [],
      products: [],
      users: [],
      tenantId: "",
      importFile: {
        visible: false,
        data: {},
        columns: [
          {
            title: "产品名称",
            dataIndex: "productName"
          },
          {
            title: "科室",
            dataIndex: "departmentName"
          },
          {
            title: "员工姓名",
            dataIndex: "userName"
          }
        ]
      },
      // 表头
      columns: [
        {
          title: "RFID编码",
          dataIndex: "code"
        },
        {
          title: "产品名称",
          dataIndex: "productName"
        },
        {
          title: "科室",
          dataIndex: "departmentName"
        },
        {
          title: "人员",
          dataIndex: "userName"
        },
        {
          title: "洗涤次数",
          dataIndex: "washNum"
        },
        {
          title: "使用时间",
          dataIndex: "usedTime"
        },
        {
          title: "上次洗涤时间",
          dataIndex: "lastWashTime"
        },
        {
          title: "状态",
          dataIndex: "status",
          customRender: value => {
            if (value === 1) {
              return "损坏";
            } else {
              return "正常";
            }
          }
        },
        {
          title: "当前位置",
          dataIndex: "currentStatus",
          customRender: value => {
            switch (value) {
              case 0:
                return "使用中";
              case 1:
                return "仓库";
              case 2:
                return "洗涤中";
              case 3:
                return "反洗中";
              case 4:
                return "维修中";
            }
          }
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
        return pageRfid(Object.assign(parameter, this.queryParam)).then(res => {
          return res.data;
        });
      }
    };
  },
  created() {
    this.tableOption();
  },
  beforeMount() {
    this.tenantId = this.$store.getters.tenantId;
    this.loadTree();
    this.loadProduct();
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
    async loadTree() {
      await getDepartmentByTenant(this.tenantId).then(res => {
        this.orgTree = res.data;
      });
    },
    loadProduct() {
      getProductAll().then(res => {
        this.products = res.data;
      });
    },
    handleOrgChange(value) {
      if (value !== undefined) {
        this.loadDepartmentUser(value);
      }
    },
    loadDepartmentUser(departmentId) {
      getAccountByDepartmentId(departmentId).then(res => {
        this.users = res.data;
      });
    },
    showImportFile() {
      this.importFile.visible = true;
    },
    handleImportClose() {
      this.importFile.visible = false;
    },
    handleExportClick(e) {
      console.log(e);
    },
    handleImport(data) {
      if (data.length == 0) {
        this.$notification.error({
          message: "错误提示",
          description: "导入数据为空"
        });
        return;
      }
      importConfirm({ list: data }).then(() => {
        this.$refs.importFile.onClose();
        this.$refs.table.refresh(true);
      });
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
          batchRemoveRfid(vm.selectedRowKeys).then(res => {
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
          removeRfid(row.id).then(res => {
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
      this.getRfid(row.id);
    },
    showDetail(row) {
      this.title = "详情";
      this.okDisabled = true;
      this.getRfid(row.id);
    },
    handleOk() {
      const vm = this;
      this.rfidForm.validateFields(err => {
        if (!err) {
          let rfid = this.rfidForm.getFieldsValue();
          rfid.id = this.rfid.id;
          if (this.edit) {
            modifyRfid(rfid).then(res => {
              if (!res.success) {
                vm.$message.error(res.msg);
              } else {
                this.visible = false;
                this.$refs.table.refresh(true);
              }
            });
          } else {
            addRfid(rfid)
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
      this.rfidForm.resetFields();
    },
    getRfid(id) {
      const vm = this;
      getRfid(id).then(res => {
        if (res.success) {
          this.visible = true;
          this.loadDepartmentUser(res.data.departmentId);
          vm.setFormValues(res.data);
        } else {
          vm.$message.error(res.msg);
        }
      });
    },
    setFormValues({ ...rfid }) {
      let fields = ["id", "productId", "departmentId", "rfid", "userId"];

      Object.keys(rfid).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.rfidForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = rfid[key];
          this.rfidForm.setFieldsValue(obj);
        }
      });

      this.rfid = rfid;
    }
  }
};
</script>
