<template>
  <div class="page-header-index-wide">
    <a-row>
      <a-card :bordered="false" :body-style="{ padding: '0' }">
        <data-tabs :option="option"></data-tabs>
      </a-card>
    </a-row>
    <a-row style="margin-top: 10px">
      <a-card :bordered="false" :body-style="{ padding: '0' }">
        <div class="salesCard">
          <a-tabs
            default-active-key="1"
            size="large"
            :tab-bar-style="{ marginBottom: '24px', paddingLeft: '16px' }"
          >
            <a-tab-pane loading="true" tab="洗涤订单7日汇总" key="1">
              <a-row>
                <a-col :xl="36" :lg="36" :md="36" :sm="24" :xs="24">
                  <bar
                    title="洗涤订单7日汇总"
                    :data="washOrderData"
                    :scale="washOrderScale"
                  />
                </a-col>
              </a-row>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-card>
    </a-row>
  </div>
</template>

<script>
import { Bar, DataTabs } from "@/components";
import { pageOrder } from "@/api/system/order";
import { washReport, orderNumReport } from "@/api/report/report";
import moment from "moment";
export default {
  name: "home",
  components: {
    Bar,
    DataTabs
  },
  data() {
    return {
      washColumns: [
        {
          title: "订单编号",
          dataIndex: "orderNo"
        },
        {
          title: "RFID编码",
          dataIndex: "rfid"
        },
        {
          title: "产品名称",
          dataIndex: "productName"
        },
        {
          title: "部门名称",
          dataIndex: "departmentName"
        },
        {
          title: "用户名称",
          dataIndex: "userName"
        },
        {
          title: "创建时间",
          dataIndex: "created_time"
        }
      ],
      acceptColumns: [
        {
          title: "订单编号",
          dataIndex: "orderNo"
        },
        {
          title: "RFID编码",
          dataIndex: "rfid"
        },
        {
          title: "产品名称",
          dataIndex: "productName"
        },
        {
          title: "部门名称",
          dataIndex: "departmentName"
        },
        {
          title: "用户名称",
          dataIndex: "userName"
        },
        {
          title: "创建时间",
          dataIndex: "created_time"
        }
      ],
      washOrderData: [],
      washOrderScale: [
        {
          dataKey: "y",
          tickInterval: 10,
          alias: "数量"
        },
        {
          dataKey: "x",
          type: "timeCat"
        }
      ],
      loadWashData: parameter => {
        return pageOrder(
          Object.assign(parameter, {
            orderType: 1,
            orderStatus: 0,
            beginDate: moment().format("YYYY-MM-DD"),
            endDate: moment().format("YYYY-MM-DD")
          })
        ).then(res => {
          return res.data;
        });
      },
      loadAcceptData: parameter => {
        return pageOrder(
          Object.assign(parameter, {
            orderType: 1,
            orderStatus: 1,
            beginDate: moment().format("YYYY-MM-DD"),
            endDate: moment().format("YYYY-MM-DD")
          })
        ).then(res => {
          return res.data;
        });
      },
      washNum: 0,
      maintainNum: 0,
      backWashNum: 0
    };
  },
  mounted() {
    this.loadWashOrderReport();
    this.loadOrderNumReport();
  },
  computed: {
    option() {
      return {
        span: 6,
        data: [
          {
            title: "送洗数",
            subtitle: "实时",
            count: this.washNum,
            allcount: 0,
            text: "当日送洗单",
            color: "rgb(230, 71, 88)"
          },
          {
            title: "反洗数",
            subtitle: "实时",
            count: this.backWashNum,
            allcount: 0,
            text: "当日反洗单",
            color: "rgb(27, 201, 142)"
          },
          {
            title: "维修数",
            subtitle: "实时",
            count: this.maintainNum,
            allcount: 0,
            text: "当日维修单",
            color: "rgb(56, 161, 242)"
          },
          {
            title: "报废数",
            subtitle: "实时",
            count: 0,
            allcount: 0,
            text: "当日报废单",
            color: "rgb(230, 71, 88)"
          }
        ]
      };
    }
  },
  methods: {
    loadWashOrderReport() {
      this.washOrderData = [];
      washReport(this.queryParam).then(res => {
        res.data.forEach(item => {
          this.washOrderData.push({
            x: item.item,
            y: item.num,
            key: item.item
          });
        });
      });
    },
    loadOrderNumReport() {
      orderNumReport().then(res => {
        this.washNum = res.data.washNum;
        this.maintainNum = res.data.maintainNum;
        this.backWashNum = res.data.backWashNum;
      });
    }
  }
};
</script>

<style scoped></style>
