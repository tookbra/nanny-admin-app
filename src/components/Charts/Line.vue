<!--suppress ALL -->
<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <v-chart
      height="280"
      :data="data"
      :forceFit="true"
      padding="auto"
      :scale="scale"
      :onClick="handleClick"
    >
      <v-tooltip />
      <v-axis />
      <v-line position="item*num" />
      <v-point position="item*num" shape="circle" />
    </v-chart>
  </div>
</template>

<script>
export default {
  name: "Line",
  props: {
    title: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    scale: {
      type: Array,
      default: () => {
        return [
          {
            dataKey: "num",
            tickInterval: 10,
            alias: "数量"
          }
        ];
      }
    },
    tooltip: {
      type: Array,
      default: () => {
        return [
          "x*y",
          (x, y) => ({
            name: x,
            value: y
          })
        ];
      }
    }
  },
  data() {
    return {
      labelInterval: [
        "value",
        {
          useHtml: true,
          htmlTemplate: function htmlTemplate(text, item) {
            return item.point.y;
          }
        }
      ]
    };
  },
  methods: {
    handleClick(v) {
      this.$emit("handleClick", v.data._origin.key);
    }
  }
};
</script>
