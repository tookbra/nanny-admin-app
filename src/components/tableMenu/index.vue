<template>
  <div class="table-menu">
    <div class="table-menu-permission">
      <a-button type="primary" icon="plus" @click="showAdd">新增</a-button>
      <a-button type="danger" class="danger" icon="delete" @click="remove"
        >删除</a-button
      >
    </div>
    <div class="table-menu-nav">
      <a-button shape="circle" icon="sync" @click="refresh" />
      <a-button shape="circle" icon="search" @click="updateShowSearch" />
    </div>
  </div>
</template>

<script>
export default {
  name: "tableMenu",
  props: {
    showSearch: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    updateShowSearch() {
      this.$emit("updateShowSearch", !this.showSearch);
    },
    refresh() {
      this.$emit("refresh");
    },
    remove() {
      this.$emit("remove");
    },
    showAdd() {
      this.$emit("showAdd");
    }
  }
};
</script>

<style lang="less">
.table-menu {
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  position: relative;
  width: 100%;
  min-height: 40px;
  height: auto;
  overflow: hidden;
  margin-bottom: 5px;

  .ant-btn-primary {
    margin-right: 8px;
  }
  .table-menu-nav {
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;

    .ant-btn {
      margin-right: 8px;
    }
  }
  .danger {
    color: #f56c6c;
    background: #fef0f0;
    border-color: #fbc4c4;
  }
}
</style>
