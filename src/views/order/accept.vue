<template>
  <basicContainer>
    <div class="search-wrapper" v-if="showSearch">
      <a-form layout="inline">
        <a-row :gutter="16">
          <a-col :md="6" :sm="24">
            <a-form-item label="产品名称">
              <a-input v-model="queryParam.orderNo" placeholder="订单号" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
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
          <a-col :md="6" :sm="24">
            <a-form-item label="订单日期">
              <a-range-picker
                v-model="queryParam.picker"
                @change="rangePickerChange"
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
                @click="resetForm"
                >重置</a-button
              >
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-menu">
      <div class="table-menu-nav" style="margin-left: auto">
        <a-button shape="circle" icon="sync" @click="refresh" />
        <a-button shape="circle" icon="search" @click="updateShowSearch" />
      </div>
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="orderNo"
      :columns="columns"
      :data="loadData"
      :alert="false"
      :showSizeChanger="true"
    >
      <span slot="orderStatus" slot-scope="text">
        {{ text | orderStatusFilter }}
      </span>
      <span slot="action" class="table-nav" slot-scope="text, record">
        <template>
          <a @click="() => showDetail(record)">
            <a-icon type="eye" />
            明细
          </a>
        </template>
      </span>
    </s-table>
    <OrderDetail
      :show="visible"
      :orderNo="orderNo"
      @dialogCancel="dialogCancel"
    ></OrderDetail>
  </basicContainer>
</template>

<script>
import { mapGetters } from "vuex";
import { STable, OrderDetail } from "@/components";
import { getAllWashCompany } from "@/api/system/washCompany";
import { pageOrder } from "@/api/system/order";
import AFormItem from "ant-design-vue/es/form/FormItem";
export default {
  name: "accept",
  components: {
    AFormItem,
    STable,
    OrderDetail
  },
  computed: {
    ...mapGetters(["productType"])
  },
  data() {
    return {
      // 查询参数
      queryParam: {},
      showSearch: true,
      washCompanies: [],
      orderNo: "0",
      visible: false,
      // 表头
      columns: [
        {
          title: "订单编号",
          dataIndex: "orderNo"
        },
        {
          title: "洗涤公司",
          dataIndex: "washCompanyName"
        },
        {
          title: "件数",
          dataIndex: "orderNum"
        },
        {
          title: "订单状态",
          dataIndex: "orderStatus",
          scopedSlots: { customRender: "orderStatus" }
        },
        {
          title: "创建时间",
          dataIndex: "createdTime"
        },
        {
          title: "操作",
          dataIndex: "action",
          fixed: "right",
          width: "100px",
          scopedSlots: { customRender: "action" }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return pageOrder(Object.assign(parameter, this.queryParam)).then(
          res => {
            return res.data;
          }
        );
      }
    };
  },
  beforeMount() {
    this.tenantId = this.$store.getters.tenantId;
    this.queryParam.orderType = 1;
    this.queryParam.orderStatus = 1;
    this.getAllWashCompany();
  },
  methods: {
    refresh() {
      this.$refs.table.refresh(true);
    },
    resetForm() {
      this.queryParam = {};
      this.queryParam.picker = [];
      this.queryParam.orderStatus = 1;
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    updateShowSearch() {
      this.showSearch = !this.showSearch;
    },
    rangePickerChange(dates, dataStr) {
      this.queryParam.beginDate = dataStr[0];
      this.queryParam.endDate = dataStr[1];
    },
    getAllWashCompany() {
      getAllWashCompany().then(res => {
        this.washCompanies = res.data;
      });
    },
    showDetail(row) {
      this.orderNo = row.orderNo;
      this.visible = true;
    },
    dialogCancel() {
      this.visible = false;
    }
  }
};
</script>
