<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="5">
        <a-card :bordered="false">
          <div class="table-operator">
            <a-button
              v-action:dict_add
              class="btn"
              type="primary"
              @click="showAdd"
              icon="plus"
              >添加字典</a-button
            >
            <a-button
              v-action:dict_delete
              class="btn"
              type="default"
              @click="handleRemoveDict"
              icon="delete"
              >删除</a-button
            >
          </div>
          <template>
            <a-dropdown
              :trigger="[this.dropTrigger]"
              @visibleChange="dropStatus"
            >
              <span>
                <a-tree
                  @select="onSelect"
                  @rightClick="rightHandle"
                  :selectedKeys="selectedKeys"
                  :treeData="dictTree"
                />
              </span>
              <!--新增右键点击事件,和增加添加和删除功能-->
              <a-menu slot="overlay">
                <a-menu-item v-action:dict_edit @click="handleEdit()" key="1"
                  >编辑</a-menu-item
                >
                <a-menu-item
                  v-action:dict_delete
                  @click="handleRemove()"
                  key="2"
                  >删除</a-menu-item
                >
                <a-menu-item @click="handleDrop()" key="3">取消</a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="19">
        <a-card :bordered="false">
          <div v-action:dict_search class="search-wrapper" v-if="showSearch">
            <a-form layout="inline">
              <a-row :gutter="16">
                <a-col :md="8" :sm="24">
                  <a-form-item label="字典名称">
                    <a-input v-model="queryParam.name" placeholder="字典名称" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="状态">
                    <a-select
                      v-model="queryParam.status"
                      placeholder="请选择状态"
                    >
                      <a-select-option value="">全部</a-select-option>
                      <a-select-option value="1">启用</a-select-option>
                      <a-select-option value="2">禁用</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
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
                v-action:dict_add
                type="primary"
                class="btn"
                icon="plus"
                @click="showAdd"
                >新增</a-button
              >
              <a-button
                v-action:dict_delete
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
                v-action:dict_search
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
            <span slot="status" slot-scope="text">
              {{ text | statusFilter }}
            </span>
            <span slot="action" class="table-nav" slot-scope="text, record">
              <template>
                <a-divider type="vertical" />
                <a @click="() => showModify(record)">
                  <a-icon type="edit" />
                  编辑
                </a>
                <a-divider type="vertical" />
                <a @click="() => removeData(record)">
                  <a-icon type="delete" />
                  删除
                </a>
              </template>
            </span>
          </s-table>
        </a-card>
      </a-col>
    </a-row>
    <a-modal
      :title="dictTitle"
      v-model="dictVisible"
      width="780px"
      :afterClose="dictModalClose"
      @ok="handleDictOk"
    >
      <a-form :form="dictForm">
        <a-form-item
          label="字典名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入字典名称"
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: '请输入字典名称' },
                  { min: 2, max: 15, message: '字典名称长度为[2,15]' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="字典编码"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入字典编码"
            v-decorator="[
              'code',
              {
                rules: [
                  { required: true, message: '请输入字典编码' },
                  { min: 2, max: 15, message: '字典编码长度为[2,15]' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="排序"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input-number
            v-decorator="['sort', { initialValue: 0 }]"
            :min="0"
            :max="100"
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
            v-decorator="['remark']"
          ></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      :title="dictDataTitle"
      v-model="dictDataVisible"
      width="780px"
      :afterClose="dataModalClose"
      @ok="handleDataOk"
      :okButtonProps="{ props: { disabled: dataOkDisabled } }"
    >
      <a-form :form="dataForm">
        <a-form-item
          label="字典名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入字典名称"
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: '请输入字典名称' },
                  { min: 1, max: 15, message: '字典名称长度为[1,15]' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="字典值"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入字典值"
            v-decorator="[
              'data',
              {
                rules: [
                  { required: true, message: '请输入字典值' },
                  { min: 1, max: 40, message: '字典值长度为[1,40]' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="排序"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input-number
            v-decorator="['sort', { initialValue: 0 }]"
            :min="0"
            :max="100"
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
            v-decorator="['remark']"
          ></a-textarea>
        </a-form-item>
        <a-form-item
          label="状态"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-switch
            checkedChildren="启用"
            unCheckedChildren="禁用"
            defaultChecked
            :checked="dictStatus"
            @change="switchStatus"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { STable } from "@/components";
import { getSwitchStatus } from "@/libs/util";
import {
  removeDict,
  getDict,
  addDict,
  modifyDict,
  dictTree
} from "@/api/system/dict";
import {
  pageDictData,
  batchRemoveDictData,
  addDictData,
  modifyDictData,
  removeData,
  getDictData
} from "@/api/system/dictData";
export default {
  name: "dict",
  components: {
    STable
  },
  data() {
    return {
      queryParam: {},
      dictForm: this.$form.createForm(this),
      dataForm: this.$form.createForm(this),
      dictTitle: "",
      dictDataTitle: "",
      dictVisible: false,
      dictDataVisible: false,
      editDict: false,
      editData: false,
      showSearch: true,
      dataOkDisabled: false,
      dictStatus: true,
      selectedRows: [],
      dictTree: [],
      selectedKeys: [],
      dropTrigger: "",
      rightClickSelected: "",
      dictData: {},
      columns: [
        {
          title: "名称",
          dataIndex: "name"
        },
        {
          title: "值",
          dataIndex: "data"
        },
        {
          title: "排序",
          dataIndex: "sort"
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "备注",
          dataIndex: "remark"
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
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return pageDictData(Object.assign(parameter, this.queryParam)).then(
          res => {
            return res.data;
          }
        );
      }
    };
  },
  mounted() {
    this.loadDictTree();
  },
  methods: {
    refresh() {
      this.$refs.table.refresh(true);
    },
    updateShowSearch(showSearch) {
      this.showSearch = showSearch;
    },
    showAdd() {
      this.dictForm.resetFields();
      this.dictVisible = true;
      this.editDict = false;
    },
    showDataAdd() {
      if (this.selectedKeys.length == 0) {
        this.$message.warning("请选择要添加的字典数据！");
        return;
      }
      this.dictDataVisible = true;
      this.dictDataTitle = "新增";
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    dictModalClose() {
      this.dictVisible = false;
      this.editDict = false;
      this.dictTitle = "";
      this.dictForm.resetFields();
    },
    dataModalClose() {
      this.dictDataVisible = false;
      this.editData = false;
      this.dictDataTitle = "";
      this.dataForm.resetFields();
    },
    switchStatus(checked) {
      this.dictStatus = checked;
    },
    loadDictTree() {
      this.$loading.show();
      dictTree()
        .then(res => {
          if (res.success) {
            this.dictTree = res.data;
          }
        })
        .finally(() => {
          this.$loading.hide();
        });
    },
    onSelect(selectedKeys, info) {
      if (info.selected) {
        this.queryParam.dictId = info.node.dataRef.value;
        this.$refs.table.refresh(true);
        // this.getDepartment(info.node.dataRef.value);
      }
      this.selectedKeys = selectedKeys;
    },
    dropStatus(visible) {
      if (visible == false) {
        this.dropTrigger = "";
      }
    },
    rightHandle(node) {
      this.dropTrigger = "contextmenu";
      this.rightClickSelected = node.node;
    },
    handleEdit() {
      this.$loading.show();
      getDict(this.rightClickSelected.dataRef.key)
        .then(res => {
          if (res.success) {
            this.dictVisible = true;
            this.setDictFormValues(res.data);
          }
        })
        .finally(() => {
          this.$loading.hide();
        });
    },
    handleRemove() {
      this.removeDict(this.rightClickSelected.dataRef.key);
    },
    handleDrop() {
      this.dropTrigger = "";
    },
    handleDictOk() {
      this.dictForm.validateFields((err, values) => {
        if (!err) {
          if (this.editDict) {
            modifyDict(values)
              .then(res => {
                if (!res.success) {
                  this.$message.error(res.msg);
                } else {
                  this.dictVisible = false;
                  this.loadDictTree();
                }
              })
              .finally(() => {
                this.$loading.hide();
              });
          } else {
            addDict(values)
              .then(res => {
                if (!res.success) {
                  this.$message.error(res.msg);
                } else {
                  this.dictVisible = false;
                  this.loadDictTree();
                }
              })
              .finally(() => {
                this.$loading.hide();
              });
          }
        }
      });
    },
    handleDataOk() {
      this.dataForm.validateFields((err, values) => {
        if (!err) {
          values.id = this.dictData.id;
          values.status = getSwitchStatus(this.dictStatus);
          if (this.editData) {
            values.dictId = this.dictData.dictId;
            modifyDictData(values)
              .then(res => {
                if (!res.success) {
                  this.$message.error(res.msg);
                } else {
                  this.dictDataVisible = false;
                  this.$refs.table.refresh(true);
                }
              })
              .finally(() => {
                this.$loading.hide();
              });
          } else {
            values.dictId = this.selectedKeys[0];
            addDictData(values)
              .then(res => {
                if (!res.success) {
                  this.$message.error(res.msg);
                } else {
                  this.dictDataVisible = false;
                  this.$refs.table.refresh(true);
                }
              })
              .finally(() => {
                this.$loading.hide();
              });
          }
        }
      });
    },
    onClearSelected() {
      this.selectedKeys = [];
    },
    handleRemoveDict() {
      if (this.selectedKeys.length == 0) {
        this.$message.warning("请选择需删除的数据！");
      } else {
        this.removeDict(this.selectedKeys[0]);
      }
    },
    removeDict(value) {
      const _this = this;
      this.$confirm({
        title: "确认删除",
        content: "确定要删除所选中的数据?",
        onOk: function() {
          _this.$loading.show();
          removeDict(value)
            .then(res => {
              if (res.success) {
                _this.$message.success(res.msg);
                _this.loadDictTree();
                _this.onClearSelected();
              } else {
                _this.$message.warning(res.msg);
              }
            })
            .finally(() => {
              _this.$loading.hide();
            });
        }
      });
    },
    removeData(row) {
      const vm = this;
      this.$confirm({
        title: "提示",
        content: "确定删除该行记录?",
        centered: true,
        onOk() {
          removeData(row.id)
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
          batchRemoveDictData(vm.selectedRowKeys)
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
    showModify(row) {
      this.dictDataVisible = true;
      this.dictDataTitle = "编辑";
      this.editData = true;
      this.getDictData(row.id);
    },
    getDictData(value) {
      this.$loading.show();
      getDictData(value)
        .then(res => {
          if (res.success) {
            this.setDictDataFormValues(res.data);
          } else {
            this.$message.error(res.msg);
          }
        })
        .then(() => {
          this.$loading.hide();
        });
    },
    setDictFormValues({ ...dict }) {
      let fields = ["id", "name", "code", "sort", "remark", "status"];
      Object.keys(dict).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.dictForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = dict[key];
          this.dictForm.setFieldsValue(obj);
        }
      });
    },
    setDictDataFormValues({ ...dictData }) {
      let fields = ["id", "name", "data", "sort", "status", "dictId"];
      Object.keys(dictData).forEach(key => {
        if (fields.indexOf(key) !== -1) {
          this.dataForm.getFieldDecorator(key);
          let obj = {};
          obj[key] = dictData[key];
          this.dataForm.setFieldsValue(obj);
        }
      });
      this.dictData = dictData;
    }
  }
};
</script>
