<template>
  <div class="ant-header-fixedHeader ant-header-side-opened">
    <div class="header">
      <div
        class="header-collapse"
        :class="[{ 'header-collapse-active': collapsed }]"
      >
        <IconFont type="iconnavicon" @click="setCollapse" class="trigger" />
      </div>
      <div class="header-bread"></div>
      <div class="header-features">
        <!--        <a href="https://www.baidu.com" target="_blank">-->
        <!--          <span class="action">-->
        <!--            <a-icon type="question-circle-o"></a-icon>-->
        <!--          </span>-->
        <!--        </a>-->
        <a-dropdown>
          <span class="action ant-dropdown-link user-dropdown-menu">
            <a-avatar class="avatar" size="small" :src="avatar()" />
            <span>{{ name() }}</span>
          </span>
          <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
            <a-menu-item key="0">
              <router-link :to="{ path: 'setting' }">
                <a-icon type="user" />
                <span>个人中心</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="1">
              <router-link :to="{ path: 'change_pwd' }">
                <a-icon type="setting" />
                <span>修改密码</span>
              </router-link>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3" @click="handleLogout">
              <a href="javascript:;">
                <a-icon type="logout" />
                <span>退出登录</span>
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import IconFont from "components/icon";
export default {
  name: "navigation",
  components: {
    IconFont
  },
  methods: {
    ...mapActions(["Logout"]),
    ...mapGetters(["name", "avatar"]),
    handleLogout() {
      const that = this;

      this.$confirm({
        title: "提示",
        content: "真的要注销登录吗 ?",
        onOk() {
          that
            .Logout({})
            .then(() => {
              that.$router.push({ name: "login" });
            })
            .catch(err => {
              that.$message.error({
                title: "错误",
                description: err.message
              });
            });
        },
        onCancel() {}
      });
    },
    setCollapse() {
      this.$store.commit("SET_COLLAPSE");
    }
  },
  computed: {
    ...mapGetters(["collapsed"])
  }
};
</script>
<style lang="less">
.header {
  padding: 0 20px;
  position: relative;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  height: 64px;
  white-space: nowrap;
  background: #fff;
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .header-features,
  .header-collapse {
    height: 64px;
    position: absolute;
    top: 0;
    .trigger {
      line-height: 70px;
      font-size: 30px;
    }
  }

  .header-collapse-active {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .header-features {
    height: 64px;
    right: 20px;
    display: flex;
    align-items: center;
    .action {
      color: rgba(0, 0, 0, 0.65);
      cursor: pointer;
      padding: 0 12px;
      display: inline-block;
      transition: all 0.3s;
      height: 100%;
      .icon {
        font-size: 16px;
        padding: 4px;
      }
    }

    .avatar {
      margin: 0 8px 0 5px;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      box-sizing: border-box;
      border: 1px solid #eee;
      vertical-align: middle;
    }
    .ant-dropdown-link i {
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>
