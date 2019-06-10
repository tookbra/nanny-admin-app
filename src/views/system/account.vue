<template>
  <basicContainer>
    <a-row :gutter="25">
      <a-col :span="5">
        <s-tree
          :dataSource="orgTree"
          :tenants="tenants"
          :search="true"
        ></s-tree>
      </a-col>
      <a-col :span="18"></a-col>
    </a-row>
  </basicContainer>
</template>

<script>
import STree from "@/components/Tree/Tree";
import { getDepartmentByTenant } from "@/api/system/department";
import { getAllTenant } from "@/api/system/tenant";
export default {
  name: "account",
  components: {
    STree
  },
  data() {
    return {
      orgTree: [],
      tenants: [],
      tenantId: 0,
      showSearch: false
    };
  },
  mounted() {
    getDepartmentByTenant(this.tenantId).then(res => {
      this.orgTree = res.data;
    });
    getAllTenant().then(res => {
      this.tenants = res.data;
    });
  }
};
</script>

<style scoped></style>
