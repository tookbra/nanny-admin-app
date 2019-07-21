<!--
<template>
  <div style="margin: -23px -24px 24px -24px">
    &lt;!&ndash;<a-dropdown :trigger="['contextmenu']" overlayClassName="multi-tab-menu-wrapper">
      <a-menu slot="overlay">
        <a-menu-item key="1">1st menu item</a-menu-item>
        <a-menu-item key="2">2nd menu item</a-menu-item>
        <a-menu-item key="3">3rd menu item</a-menu-item>
      </a-menu>
    </a-dropdown>&ndash;&gt;
    <a-tabs
      hideAdd
      v-model="tagActive"
      type="editable-card"
      :tabBarStyle="{ background: '#FFF', margin: 0, paddingLeft: '16px', paddingTop: '1px' }"
      @edit="onEdit"
    >
      <a-tab-pane v-for="page in pages" :style="{ height: 0 }" :tab="page.meta.title" :key="page.fullPath" :closable="pages.length > 1">
      </a-tab-pane>
      <template slot="renderTabBar" slot-scope="props, DefaultTabBar">
        <component :is="DefaultTabBar" {...props} />
      </template>
    </a-tabs>
  </div>
</template>
-->

<script>
import { mapGetters } from "vuex";
export default {
  name: "navtab",
  data() {
    return {
      newTabIndex: 0,
      activeKey: ""
    };
  },
  computed: {
    ...mapGetters(["pages", "fullPaths", "tagActive"])
  },
  created() {
    this.$store.commit("SET_TAGS", this.$route);
  },
  mounted() {
    this.setActive();
  },
  methods: {
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    remove(targetKey) {
      this.$store.commit("DEL_TAG", targetKey);
    },
    setActive() {
      this.activeKey = this.tagActive;
    },
    // content menu
    closeThis(e) {
      this.remove(e);
    },
    closeThat(e) {
      this.fullPaths.forEach(item => {
        if (item === "/home") {
          return;
        }
        if (item !== e) {
          this.remove(item);
        }
      });
    },
    closeAll() {
      this.fullPaths.forEach(item => {
        if (item !== "/home") {
          this.remove(item);
        }
      });
    },
    /* eslint-disable no-unused-vars */
    closeMenuClick({ key, item, domEvent }) {
      const vkey = domEvent.target.getAttribute("data-vkey");
      switch (key) {
        case "close-that":
          this.closeThat(vkey);
          break;
        case "close-all":
          this.closeAll();
          break;
        default:
        case "close-this":
          this.closeThis(vkey);
          break;
      }
    },
    closeDropMenuClick({ key }) {
      switch (key) {
        case "close-all":
          this.closeAll();
          break;
        default:
        case "close-that":
          this.closeThat(this.activeKey);
          break;
      }
    },
    renderTabPaneMenu(e) {
      return (
        <a-menu {...{ on: { click: this.closeMenuClick } }}>
          <a-menu-item key="close-this" data-vkey={e}>
            关闭当前标签
          </a-menu-item>
          <a-menu-item key="close-that" data-vkey={e}>
            关闭其它
          </a-menu-item>
          <a-menu-item key="close-all" data-vkey={e}>
            关闭全部
          </a-menu-item>
        </a-menu>
      );
    },
    // render
    renderTabPane(label, keyPath) {
      const menu = this.renderTabPaneMenu(keyPath);
      return (
        <a-dropdown overlay={menu} trigger={["contextmenu"]}>
          <span style={{ userSelect: "none" }}>{label}</span>
        </a-dropdown>
      );
    }
  },
  watch: {
    $route: function(newVal) {
      this.$store.commit("SET_TAGS", newVal);
      this.activeKey = newVal.fullPath;
    },
    activeKey: function(newPathKey) {
      this.$router.push({ path: newPathKey });
    },
    tagActive: function(tagActive) {
      this.activeKey = tagActive;
    }
  },
  render() {
    const { onEdit } = this;
    const panes = this.pages.map(page => {
      return (
        <a-tab-pane
          style={{ height: 0 }}
          tab={this.renderTabPane(page.label, page.fullPath)}
          key={page.fullPath}
          closable={page.closeable}
        />
      );
    });

    return (
      <div class="ant-pro-multi-tab">
        <div class="ant-pro-multi-tab-wrapper">
          <a-tabs
            hideAdd
            type={"editable-card"}
            v-model={this.activeKey}
            tabBarStyle={{
              background: "#FFF",
              margin: 0,
              paddingLeft: "16px",
              paddingTop: "1px"
            }}
            {...{ on: { edit: onEdit } }}
          >
            {panes}
            <a-dropdown slot="tabBarExtraContent">
              <a-menu
                slot="overlay"
                {...{ on: { click: this.closeDropMenuClick } }}
              >
                <a-menu-item key="close-that">关闭其它</a-menu-item>
                <a-menu-item key="close-all">关闭所有</a-menu-item>
              </a-menu>
              <a-button class="nav-tab-drop" type="primary">
                更多 <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </a-tabs>
        </div>
      </div>
    );
  }
};
</script>

<style lang="less">
.nav-tab {
  margin-top: 2px;
  .ant-tabs-tab {
    border: 0 !important;
    background-color: #fff !important;
    color: #ccc;
    padding: 0 20px !important;
  }
  .ant-tabs-card-bar .ant-tabs-tab-active {
    border: 0 !important;
    border-bottom: 3px solid #1973d2 !important;
    padding-bottom: 0 !important;
    .anticon-close {
      color: #1973d2 !important;
    }
  }
  .ant-tabs-extra-content {
    line-height: 35px;
  }
  .nav-tab-drop {
    margin-right: 8px;
    background-color: #1973d2;
    font-size: 12px;
    height: 28px;
  }
  .anticon-close {
    &:hover {
      border-radius: 20%;
      background-color: #ccc;
    }
  }
}
</style>
