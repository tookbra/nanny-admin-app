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
      <v-tooltip :shared="true" />
      <v-interval
        position="x*y"
        :label="labelInterval"
        :opcaity="1"
      ></v-interval>
      <v-axis dataKey="x" />
      <v-axis dataKey="y" />
      <v-legend dataKey="item" />
      <v-bar position="x*y" />
    </v-chart>
  </div>
</template>

<script>
export default {
  name: "Bar",
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
            dataKey: "y",
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
