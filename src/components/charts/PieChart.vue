<template>
  <div :ref="refStr" class="chart" />
</template>

<script>
import * as echarts from "echarts";
// const colors = ["#46C9AF", "#EAA94D", "#057FEB", "#A5D0F6"];
export default {
  name: "PieChart",
  components: {},
  props: {
    chartData: {
      type: Array,
      default() {
        return [];
      },
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
  mounted() {},
  beforeDestroy() {
    this.chart.clear();
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    initECharts() {
      const option = {
        animationDuration: 5000,
        // color: colors,
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "10",
          // orient: "vertical",
        },
        series: [
          {
            // name: "作业状态",
            type: "pie",
            // radius: ["40%", "60%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 0,
            },
            label: {
              show: this.showLabel,
              // position: "center",
            },
            // emphasis: {
            //   itemStyle: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: "rgba(0, 0, 0, 0.5)",
            //   },
            // },
            data: this.chartData,
          },
        ],
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
  height: 25rem;
  // width: 300px;
  // min-width: 589px;
  // calc(100% - 32px);
  // width: 420px;
  // margin-bottom: 20px;
}
</style>
