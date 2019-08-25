<template>
  <div class="data-box">
    <a-row :gutter="24">
      <a-col
        :md="span"
        :xs="24"
        :sm="12"
        v-for="(item, index) in data"
        :key="index"
      >
        <div class="item">
          <a
            :href="item.href ? item.href : 'javascript:void(0);'"
            @click="item.click ? item.click(item) : ''"
            :target="item.target"
          >
            <div class="item-icon" :style="{ backgroundColor: item.color }">
              <i :class="item.icon"></i>
            </div>
            <div class="item-info">
              <count-up
                :animation="animation"
                :style="{ color: item.color }"
                class="title"
                :end="item.count"
              ></count-up>
              <div class="info">{{ item.title }}</div>
            </div>
          </a>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import countUp from "../count-up";
export default {
  name: "data-box",
  components: {
    countUp
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
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
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style lang="less">
.data-box {
  @height: 100px;
  @radius: 5px;
  .item {
    position: relative;
    margin: 0 auto 10px auto;
    width: 96%;
    height: @height;
    overflow: hidden;
    border-radius: @radius;
    box-sizing: border-box;
    &:hover .item-text {
      top: 0;
    }
    a {
      display: flex;
    }
  }
  .item-icon {
    width: 100px;
    height: @height;
    color: #fff;
    text-align: center;
    line-height: @height;
    align-items: center;
    justify-content: center;
    display: flex;
    i {
      font-size: 48px !important;
    }
  }
  .item-info {
    border-radius: 0 @radius @radius 0;
    border: 1px solid #eee;
    border-left: none;
    background-color: #fff;
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .title {
      font-size: 30px;
      line-height: 40px;
      text-align: center;
    }
    .info {
      color: #999;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
