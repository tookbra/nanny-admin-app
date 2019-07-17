<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <v-chart
      :height="height"
      :data="data"
      :forceFit="true"
      padding="auto"
      :onClick="handleClick"
    >
      <v-tooltip :showTitle="false" dataKey="item*percent" />
      <v-axis />
      <v-legend dataKey="item" />
      <v-pie
        position="percent"
        color="item"
        :v-style="pieStyle"
        :label="labelConfig"
      />
      <v-coord type="theta" />
    </v-chart>
  </div>
</template>

<script>
export default {
  name: "Pie",
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
        return [];
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
      height: 280,
      pieStyle: {
        stroke: "#fff",
        lineWidth: 1
      },
      labelConfig: [
        "percent",
        {
          formatter: (val, item) => {
            return item.point.item + ": " + item.point.num + "(" + val + ")";
          }
        }
      ]
    };
  },
  methods: {
    handleClick(v) {
      this.$emit("handleClick", v.data.point.currentStatus);
    }
  }
};
</script>

<style scoped></style>
