<template>
  <basicContainer>
    <div class="search-wrapper" v-if="showSearch">
      <a-form layout="inline">
        <a-row :gutter="16">
          <a-col :md="6" :sm="24">
            <a-form-item label="订单日期">
              <a-range-picker v-model="picker" @change="rangePickerChange" />
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
      <div class="table-menu-nav" style="margin-left: auto">
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
    </s-table>
  </basicContainer>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import { STable } from "@/components";
import { getDepartmentByTenant } from "@/api/system/department";
import { getProductByType } from "@/api/basicInfo/product";
import { pageOrder } from "@/api/system/order";
import AFormItem from "ant-design-vue/es/form/FormItem";
export default {
  name: "wash",
  components: {
    AFormItem,
    STable
  },
  computed: {
    ...mapGetters(["productType"])
  },
  data() {
    return {
      // 查询参数
      queryParam: {},
      showSearch: true,
      orgTree: [],
      products: [],
      picker: [],
      // 表头
      columns: [
        {
          title: "订单编号",
          fixed: "left",
          dataIndex: "orderNo"
        },
        {
          title: "洗涤公司",
          dataIndex: "washCompanyName"
        },
        {
          title: "订单状态",
          dataIndex: "orderStatus"
        },
        {
          title: "创建时间",
          dataIndex: "created_time"
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
        return pageOrder(Object.assign(parameter, this.queryParam)).then(
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
    this.tenantId = this.$store.getters.tenantId;
    this.loadTree();
    this.queryParam.orderType = 1;
    this.queryParam.orderStatus = 0;
    let now = moment();
    this.picker = [now, now];
    this.queryParam.beginDate = now.format("YYYY-MM-DD");
    this.queryParam.endDate = now.format("YYYY-MM-DD");
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
    refresh() {
      this.$refs.table.refresh(true);
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
    loadTree() {
      getDepartmentByTenant(this.tenantId).then(res => {
        this.orgTree = res.data;
      });
    },
    handleProductType(value) {
      if (value) {
        getProductByType(value).then(res => {
          this.products = res.data;
        });
      }
    }
  }
};
</script>
