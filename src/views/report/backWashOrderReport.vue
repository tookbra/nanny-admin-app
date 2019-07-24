<template>
  <basicContainer>
    <div class="search-wrapper" :style="{ marginBottom: '60px' }">
      <a-form layout="inline">
        <a-row :gutter="16">
          <a-col :md="5" :sm="24">
            <a-form-item label="产品类型">
              <a-select
                allowClear
                v-model="queryParam.productTypeId"
                placeholder="请选择产品类型"
                @change="handleProductType"
              >
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
            <a-form-item label="产品名称">
              <a-select
                v-model="queryParam.productId"
                allowClear
                placeholder="请选择产品"
              >
                <a-select-option
                  v-for="(item, index) in products"
                  :key="index"
                  :value="item.id"
                  >{{ item.name }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="订单日期">
              <a-range-picker v-model="picker" @change="rangePickerChange" />
            </a-form-item>
          </a-col>
          <a-col :md="3" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" icon="search" @click="loadReport"
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
    <a-row :gutter="36">
      <a-col :md="36" :sm="24">
        <bar :data="barData" :scale="scale" @handleClick="handleBarClick" />
      </a-col>
      <a-col :md="36" :sm="24">
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :data="loadData"
          :alert="false"
          :showSizeChanger="true"
        />
      </a-col>
    </a-row>
  </basicContainer>
</template>

<script>
import { Bar, STable } from "@/components";
import { getProductByType } from "@/api/basicInfo/product";
import { pageOrder } from "@/api/system/order";
import { washReport } from "@/api/report/report";
import { mapGetters } from "vuex";
import ACol from "ant-design-vue/es/grid/Col";
export default {
  name: "backWashOrderReport",
  components: {
    ACol,
    Bar,
    STable
  },
  data() {
    return {
      queryParam: {},
      tenantId: "",
      products: [],
      barData: [],
      picker: [],
      scale: [
        {
          dataKey: "y",
          alias: "数量"
        },
        {
          dataKey: "x",
          type: "timeCat"
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return pageOrder(Object.assign(parameter, this.queryParam)).then(
          res => {
            return res.data;
          }
        );
      },
      columns: [
        {
          title: "RFID编码",
          fixed: "left",
          dataIndex: "rfid"
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
          title: "员工",
          dataIndex: "userName"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["productType"])
  },
  beforeMount() {
    this.tenantId = this.$store.getters.tenantId;
    this.queryParam.orderType = 2;
  },
  mounted() {
    this.loadReport();
  },
  methods: {
    handleProductType(value) {
      if (value) {
        getProductByType(value).then(res => {
          this.products = res.data;
        });
      }
    },
    rangePickerChange(dates, dataStr) {
      this.queryParam.beginDate = dataStr[0];
      this.queryParam.endDate = dataStr[1];
    },
    loadReport() {
      washReport(this.queryParam).then(res => {
        this.barData = [];
        res.data.forEach(item => {
          this.barData.push({
            x: item.item,
            y: item.num,
            key: item.item
          });
        });
      });
      this.$refs.table.refresh(true);
    },
    handleBarClick(v) {
      this.queryParam.beginDate = v;
      this.queryParam.endDate = v;
      this.$refs.table.refresh(true);
    }
  }
};
</script>

<style scoped></style>
