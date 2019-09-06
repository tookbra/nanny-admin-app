<template>
  <div>
    <a-modal
      title="订单明细"
      :visible="show"
      width="1180px"
      :footer="null"
      @cancel="handleCancel"
    >
      <div class="search-wrapper">
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
                  :treeNodeFilterProp="'title'"
                  treeDefaultExpandAll
                />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
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
            <a-col :md="6" :sm="24">
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
        :showSizeChanger="true"
      >
      </s-table>
    </a-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { pageOrderDetail } from "@/api/system/order";
import { getDepartmentByTenant } from "@/api/system/department";
import { getProductByType } from "@/api/basicInfo/product";
import { STable } from "@/components";
export default {
  name: "order_detail",
  components: {
    STable
  },
  computed: {
    ...mapGetters(["productType"])
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    orderNo: {
      type: String
    }
  },
  mounted() {
    this.loadTree();
  },
  beforeMount() {
    this.tenantId = this.$store.getters.tenantId;
  },
  data() {
    return {
      queryParam: {},
      visible: false,
      orgTree: [],
      products: [],
      // 表头
      columns: [
        {
          title: "标签编码",
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
          title: "人员",
          dataIndex: "employeeName"
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        this.queryParam.orderNo = this.orderNo;
        return pageOrderDetail(Object.assign(parameter, this.queryParam)).then(
          res => {
            return res.data;
          }
        );
      }
    };
  },
  methods: {
    refresh() {
      this.$refs.table.refresh(true);
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
    },
    handleCancel() {
      this.$emit("dialogCancel", false);
    }
  }
};
</script>
