<template>
  <basicContainer>
    <a-card
      :bordered="false"
      :bodyStyle="{ padding: '16px 0', height: '100%' }"
      :style="{ height: '100%' }"
      :activeTabKey="noTitleKey"
    >
      <div class="account-settings-info-main" :class="device">
        <div class="account-settings-info-left">
          <a-menu
            :mode="device == 'mobile' ? 'horizontal' : 'inline'"
            :style="{
              border: '0',
              width: device == 'mobile' ? '560px' : 'auto'
            }"
            type="inner"
            :defaultSelectedKeys="['base']"
          >
            <a-menu-item key="base">
              基本信息
            </a-menu-item>
          </a-menu>
        </div>
        <div class="account-settings-info-right">
          <div class="account-settings-info-title">
            <span></span>
          </div>
          <div class="account-settings-info-body">
            <div v-if="noTitleKey === 'base'">
              <a-row :gutter="16">
                <a-col :md="24" :lg="16">
                  <a-form layout="vertical">
                    <a-form-item label="昵称">
                      <a-input />
                    </a-form-item>
                  </a-form>
                </a-col>
              </a-row>
            </div>
          </div>
        </div>
      </div>
    </a-card>
  </basicContainer>
</template>

<script>
import { mixinDevice } from "@/libs/mixin.js";
export default {
  name: "index",
  mixins: [mixinDevice],
  data() {
    return {
      noTitleKey: "base"
    };
  }
};
</script>

<style lang="less" scoped>
.account-settings-info-main {
  width: 100%;
  display: flex;
  height: 100%;
  overflow: auto;

  &.mobile {
    display: block;

    .account-settings-info-left {
      border-right: unset;
      border-bottom: 1px solid #e8e8e8;
      width: 100%;
      height: 50px;
      overflow-x: auto;
      overflow-y: scroll;
    }
    .account-settings-info-right {
      padding: 20px 40px;
    }
  }

  .account-settings-info-left {
    border-right: 1px solid #e8e8e8;
    width: 224px;
  }

  .account-settings-info-right {
    flex: 1 1;
    padding: 8px 40px;

    .account-settings-info-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      margin-bottom: 12px;
    }
    .account-settings-info-view {
      padding-top: 12px;
    }
  }
}
</style>
