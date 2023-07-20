<template>
  <div :ref="refStr" class="chart" />
</template>

<script>
import * as echarts from "echarts";
const colors = ["#5470C6", "#EE6666"];
// const colors = ["#46C9AF", "#EAA94D", "#057FEB", "#A5D0F6"];
export default {
  name: "BarChart",
  components: {},
  props: {
    chartData: {
      type: Array,
      default() {
        return [];
      },
    },
    newChartData: {
      type: Object,
      default() {
        return {};
      },
    },
    alias: {
      type: String,
      default: "",
    },
    // height: {
    //   type: Number | String,
    //   default: 250,
    // },
    // width: {
    //   type: Number | String,
    //   default: 300,
    // },
    smooth: {
      type: Number,
      default: 0,
    },
    refStr: {
      type: String,
      default: "",
    },
    rotate: {
      type: Boolean,
      default: false,
    },
    showLegends: {
      type: Boolean,
      default: true,
    },
    showLabel: {
      type: Boolean,
      default: false,
    },
    legends: {
      type: Array,
      default() {
        return [];
      },
    },
    fixedValue: {
      type: Object,
      default: () => {},
    },
    displayMode: {
      type: String,
      default: "vertical", // horizontal
    },
  },
  data() {
    return {
      chart: null,
      timer: null,
    };
  },
  watch: {
    newChartData: {
      handler(val) {
        this.$nextTick(() => {
          if (!val.xAxisData && !val.series) return;
          if (this.chart) {
            this.chart.dispose();
            this.chart = null;
          }
          this.initECharts();
        });
      },
      immediate: true,
      deep: true,
    },
    chartData: {
      handler() {
        this.$nextTick(() => {
          if (this.chart) {
            this.chart.dispose();
            this.chart = null;
          }
          this.initECharts();
        });
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.$nextTick(() => {});
  },
  mounted() {},
  beforeDestroy() {
    this.chart.clear();
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    initECharts() {
      const option = {
        color: colors,
        grid: {
          top: 40,
          bottom: 30,
          left: 60,
          right: 50,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: this.newChartData.xAxisData,
          axisLabel: {},
        },
        yAxis: this.newChartData.yAxis || {
          type: "value",
        },
        series: this.newChartData.series,
      };
      const chartDom = this.$refs[this.refStr];
      const myChart = echarts.init(chartDom);
      option && myChart.setOption(option);
      this.chart = myChart;
    },
  },
};
</script>

<style scoped lang="less">
.chart {
  width: 100%;
  height: 20rem;
  // height: 300px;
  // min-width: 589px;
  // calc(100% - 32px);
  // width: 420px;
  // margin-bottom: 20px;
}
</style>
