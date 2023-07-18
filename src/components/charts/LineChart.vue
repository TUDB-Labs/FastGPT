<template>
  <div :ref="refStr" class="chart" />
</template>

<script>
import * as echarts from "echarts";
// import dayJs from "dayjs";
export default {
  name: "LineChart",
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
    chartType: {
      type: String,
      default: "line",
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
      handler(value) {
        this.$nextTick(() => {
          if (!value) return;
          if (this.chart) {
            this.chart.dispose();
            this.chart = null;
          }
          // if (isNaN(this.width)) {
          //   this.$refs[this.refStr].style.width = this.width;
          // } else {
          //   this.$refs[this.refStr].style.width = this.width + "px";
          // }
          // if (isNaN(this.height)) {
          //   this.$refs[this.refStr].style.height = this.height;
          // } else {
          //   this.$refs[this.refStr].style.height = this.height + "px";
          // }
          this.initECharts(value);
        });
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.$nextTick(() => {});
  },
  destroy() {
    this.chart.clear();
  },

  mounted() {},
  beforeDestroy() {
    this.chart.clear();
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    initECharts(data) {
      const xAxisData = data.map((item) => item.name);
      const seriesData = data.map((item) => item.value);
      const option = {
        animationDuration: 5000,
        tooltip: {
          trigger: "axis",
        },
        color: "#057FEB",
        grid: {
          top: "20",
          bottom: "30",
          left: "50",
          right: "10",
        },

        xAxis: {
          type: "category",
          boundaryGap: true,
          data: xAxisData,
          axisLabel: {
            color: "#000",
          },
          axisLine: {
            lineStyle: {
              width: 2,
              color: "#F6F0EB",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#000",
          },
          splitLine: {
            lineStyle: {
              color: "#00726b1a",
            },
          },
          splitNumber: 5,
          axisLine: {
            lineStyle: {
              width: 1,
              color: "#00726b1a",
            },
          },
        },
        series: [
          {
            name: this.alias || "数值",
            data: seriesData,
            type: "line",
            smooth: this.smooth,
            // symbol: "none",
            lineStyle: {
              width: 2,
            },
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
  height: 16rem;
  // width: 300px;
  // min-width: 589px;
  // calc(100% - 32px);
  // width: 420px;
  // margin-bottom: 20px;
}
</style>
