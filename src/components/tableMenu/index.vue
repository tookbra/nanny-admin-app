<template>
  <div class="table-menu">
    <div class="table-menu-permission">
      <a-button type="primary" class="btn" icon="plus" @click="showAdd"
        >新增</a-button
      >
      <a-button type="danger" class="btn anger" icon="delete" @click="remove"
        >删除</a-button
      >
      <a-button class="btn" icon="delete" @click="showPermission"
        >权限设置</a-button
      >
      <a-button class="btn" icon="reset" @click="showPermission"
        >重置密码</a-button
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
    },
    showPermission() {
      this.$emit("showPermission");
    }
  }
};
</script>
