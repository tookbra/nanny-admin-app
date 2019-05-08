<template>
  <div class="layout-wrapper" :class="{ 'layout-collapse': collapsed }">
    <a-layout class="layout-container">
      <div class="layout-left">
        <sidebar />
      </div>
      <a-layout class="layout-right">
        <a-layout-header class="layout-header">
          <navigation />
        </a-layout-header>

        <a-layout-content class="layout-content">
          <!--          <navtab />-->
          <keep-alive>
            <router-view class="layout-main" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <router-view class="layout-main" v-if="!$route.meta.keepAlive" />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import sidebar from "@/components/menu";
import navigation from "@/components/header";
// import navtab from "@/components/navtab";
export default {
  name: "BasicLayout",
  components: {
    sidebar,
    navigation
    // navtab
  },
  computed: mapGetters(["collapsed"])
};
</script>

<style lang="less">
.layout-wrapper {
  width: 100%;
  height: 100%;
  background-size: 100%;
  background: #f0f2f5 no-repeat;
}
.layout-right {
  .ant-layout-header {
    padding: 0;
  }
}
</style>
