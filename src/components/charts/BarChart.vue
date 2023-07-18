<template>
  <div :ref="refStr" class="chart" />
</template>

<script>
import * as echarts from "echarts";
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
    chartData: {
      handler() {
        this.$nextTick(() => {
          if (this.chart) {
            this.chart.dispose();
            this.chart = null;
          }
          // if (isNaN(this.height)) {
          //   this.$refs[this.refStr].style.height = this.height;
          // } else {
          //   this.$refs[this.refStr].style.height = this.height + "px";
          // }
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
      const xAxisData = [];
      const seriesData = [];
      this.chartData.forEach((item) => {
        xAxisData.push(item.name);
        seriesData.push(item.value);
      });
      const option = {
        color: "#75BEFF",
        grid: {
          top: 30,
          bottom: 30,
          left: 60,
          right: 20,
        },
        tooltip: {
          trigger: "axis",
          // triggerOn: "click",
          axisPointer: {
            type: "shadow",
          },
          // valueFormatter: (value) => value + " 收运车辆",
        },
        xAxis: {
          type: this.displayMode === "horizontal" ? "value" : "category",
          data: this.displayMode === "horizontal" ? null : xAxisData,
          axisLabel: {
            // rotate: -20,
          },
        },
        yAxis: {
          type: this.displayMode === "horizontal" ? "category" : "value",
          data: this.displayMode === "horizontal" ? xAxisData : null,
        },
        series: [
          {
            name: this.alias || "数值",
            data: seriesData,
            type: "bar",
            barWidth: "25",
          },
        ],
      };
      const chartDom = this.$refs[this.refStr];
      const myChart = echarts.init(chartDom);
      option && myChart.setOption(option);
      this.chart = myChart;
      // this.showTooltip();
    },
    showTooltip() {
      let dataIndex = 0;
      this.timer = setInterval(() => {
        this.chart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: dataIndex,
        });
        if (dataIndex >= this.chartData.length - 1) {
          dataIndex = -1;
        }
        dataIndex += 1;
      }, 2000);
    },
  },
};
</script>

<style scoped lang="less">
.chart {
  width: 100%;
  height: 25rem;
  // height: 300px;
  // min-width: 589px;
  // calc(100% - 32px);
  // width: 420px;
  // margin-bottom: 20px;
}
</style>
