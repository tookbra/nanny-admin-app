<template>
  <basicContainer>
    <div class="search-wrapper" :style="{ marginBottom: '60px' }">
      <a-form layout="inline">
        <a-row :gutter="16">
          <a-col :md="6" :sm="24">
            <a-form-item label="科室">
              <a-tree-select
                showSearch
                allowClear
                v-model="queryParam.departmentId"
                :treeData="orgTree"
                placeholder="请选择所属科室"
                treeDefaultExpandAll
              />
            </a-form-item>
          </a-col>
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
    <s-table
      ref="table"
      size="default"
      rowKey="rfid"
      :columns="columns"
      :data="loadData"
      :alert="false"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      :showSizeChanger="true"
    />
  </basicContainer>
</template>

<script>
import { STable } from "@/components";
import { getProductByType } from "@/api/basicInfo/product";
import { getDepartmentByTenant } from "@/api/system/department";
import { pageScrap } from "@/api/system/scrap";
import { mapGetters } from "vuex";
import ACol from "ant-design-vue/es/grid/Col";
export default {
  name: "scrapDetailReport",
  components: {
    ACol,
    STable
  },
  data() {
    return {
      queryParam: {},
      tenantId: "",
      products: [],
      orgTree: [],
      selectedRowKeys: [],
      selectedRows: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return pageScrap(Object.assign(parameter, this.queryParam)).then(
          res => {
            return res.data;
          }
        );
      },
      columns: [
        {
          title: "订单编号",
          // fixed: "left",
          dataIndex: "orderNo"
        },
        {
          title: "科室",
          dataIndex: "departmentName"
        },
        {
          title: "产品名称",
          dataIndex: "productName"
        },
        {
          title: "数量",
          dataIndex: "detailNum"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["productType"])
  },
  beforeMount() {
    this.tenantId = this.$store.getters.tenantId;
    this.loadTree();
  },
  methods: {
    handleProductType(value) {
      if (value) {
        getProductByType(value).then(res => {
          this.products = res.data;
        });
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    loadTree() {
      getDepartmentByTenant(this.tenantId).then(res => {
        this.orgTree = res.data;
      });
    }
  }
};
</script>

<style scoped></style>
