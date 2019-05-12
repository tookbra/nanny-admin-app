<template>
  <basicContainer>
    <div class="search-wrapper">
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
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
    >
      <span slot="action">
        <template>
          <a>详情</a>
          <a-divider type="vertical" />
          <a>编辑</a>
          <a-divider type="vertical" />
          <a>删除</a>
        </template>
      </span>
    </s-table>
  </basicContainer>
</template>

<script>
import { STable } from "@/components";
import { pageTenant } from "@/api/system/tenant";
export default {
  name: "tenant",
  components: {
    STable
  },
  data() {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: "租户编号",
          dataIndex: "tenantCode"
        },
        {
          title: "租户名称",
          dataIndex: "tenantName"
        },
        {
          title: "联系人",
          dataIndex: "tenantUserName"
        },
        {
          title: "联系电话",
          dataIndex: "tenantMobile"
        },
        {
          title: "联系地址",
          dataIndex: "tenantAddress"
        },
        {
          title: "操作",
          dataIndex: "action",
          width: "180px",
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
      optionAlertShow: true,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log("loadData.parameter", parameter);
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
      if (!this.optionAlertShow) {
        this.options = {
          alert: {
            show: true,
            clear: () => {
              this.selectedRowKeys = [];
            }
          },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
          }
        };
        this.optionAlertShow = true;
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        };
        this.optionAlertShow = false;
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    }
  }
};
</script>
