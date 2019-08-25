<template>
  <div class="data-tabs">
    <a-row :span="24">
      <a-col
        :md="span"
        :xs="24"
        :sm="12"
        v-for="(item, index) in data"
        :key="index"
      >
        <div class="item" :style="{ background: item.color }">
          <a
            :href="item.href ? item.href : 'javascript:void(0);'"
            @click="item.click ? item.click(item) : ''"
            :target="item.target"
          >
            <div class="item-header">
              <p>{{ item.title }}</p>
              <span>{{ item.subtitle }}</span>
            </div>
            <div class="item-body">
              <count-up
                class="h2"
                :animation="animation"
                :end="item.count"
              ></count-up>
            </div>
            <div class="item-footer">
              <span>{{ item.allcount }}</span>
              <p>{{ item.text }}</p>
            </div>
            <p class="item-tip">{{ item.key }}</p>
          </a>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import countUp from "../count-up";
export default {
  name: "data-tabs",
  components: {
    countUp
  },
  data() {
    return {};
  },
  computed: {
    animation() {
      return this.option.animation;
    },
    span() {
      return this.option.span || 8;
    },
    data() {
      return this.option.data || [];
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="less">
.data-tabs {
  .item {
    position: relative;
    margin: 15px;
    padding: 12px;
    height: 160px;
    border-radius: 4px;
    box-sizing: border-box;
    overflow: hidden;
    color: #fff;
    a {
      color: #fff;
    }
  }
  .item-header {
    position: relative;
    & > p {
      color: #fff;
      margin: 0px;
      font-size: 14px;
    }
    & > span {
      position: absolute;
      right: 0px;
      top: 0px;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      background: rgba(255, 255, 255, 0.3);
    }
  }
  .item-body {
    .h2 {
      color: #fff;
      margin: 0;
      font-size: 32px;
      line-height: 60px;
      font-weight: bold;
    }
  }
  .item-footer {
    padding-top: 8px;
    line-height: 20px;
    & > span {
      font-size: 10px;
    }
    & > p {
      color: #fff;
      margin: 0px;
      font-size: 12px;
    }
  }
  .item-tip {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 80px;
    height: 80px;
    bottom: 10px;
    right: 10px;
    border: 2px solid #fff;
    border-radius: 100%;
    font-size: 48px;
    transform: rotate(-40deg);
    opacity: 0.1;
  }
}
</style>
