<template>
  <basicContainer>
    <a-card
      :bordered="false"
      :bodyStyle="{ padding: '16px 0', height: '100%' }"
      :style="{ height: '100%' }"
    >
      <div class="account-settings-info-main" :class="device">
        <div class="account-settings-info-left">
          <a-menu
            :mode="device == 'mobile' ? 'horizontal' : 'inline'"
            :style="{
              border: '0',
              width: device == 'mobile' ? '560px' : 'auto'
            }"
            :defaultSelectedKeys="defaultSelectedKeys"
            type="inner"
            @openChange="onOpenChange"
          >
            <a-menu-item key="/account/settings/base">
              <router-link :to="{ name: 'BaseSettings' }">
                基本设置
              </router-link>
            </a-menu-item>
            <a-menu-item key="/account/settings/security">
              <router-link :to="{ name: 'SecuritySettings' }">
                安全设置
              </router-link>
            </a-menu-item>
            <a-menu-item key="/account/settings/custom">
              <router-link :to="{ name: 'CustomSettings' }">
                个性化
              </router-link>
            </a-menu-item>
            <a-menu-item key="/account/settings/binding">
              <router-link :to="{ name: 'BindingSettings' }">
                账户绑定
              </router-link>
            </a-menu-item>
            <a-menu-item key="/account/settings/notification">
              <router-link :to="{ name: 'NotificationSettings' }">
                新消息通知
              </router-link>
            </a-menu-item>
          </a-menu>
        </div>
        <div class="account-settings-info-right">
          <div class="account-settings-info-title">
            <span>{{ $route.meta.title }}</span>
          </div>
          <route-view></route-view>
        </div>
      </div>
    </a-card>
  </basicContainer>
</template>

<script>
export default {
  name: "index"
};
</script>

<style scoped></style>
