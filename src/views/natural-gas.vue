<template>
  <div class="wrapper">
    <h4>
      <img src="@/assets/images/tianranqi.png" alt="" />
      <strong>ChatGas</strong>
    </h4>
    <main>
      <div class="main-content content-width">
        <div v-if="false" class="search-wrapper">
          <div class="submit-wrapper">
            <input
              v-model.trim="searchValue"
              type="text"
              placeholder="获取更多访问权限，请联系我们 ~"
              maxlength="100"
              disabled
              class="not-allowed"
              @keydown="onKeydown"
            />
            <!-- <img
              src="https://cdn.tudb.work/aios/web/images/send-btn.png"
              alt="send-img"
              class="send-img"
              @click="onSearch"
            /> -->
          </div>
          <div class="count-wrapper">
            <img
              src="@/assets/images/delete.png"
              alt="clear"
              @click="searchValue = ''"
            />
            <span>{{ searchValue.length }} / 100</span>
          </div>
          <b-progress
            v-if="isShowProgress"
            ref="bprogress"
            :value="searchProgress"
            :max="100"
            show-progress
            animated
            style="margin-top: 6px; height: 0.7rem"
          />
        </div>
        <div class="recommend-wrapper">
          <h5>
            <strong>推荐问题</strong>
            <span class="refresh" @click="onRefresh"
              >换一批<img
                src="https://cdn.tudb.work/aios/web/images/change.png"
                alt=""
              />
            </span>
          </h5>
          <div class="recommend-list">
            <div
              v-for="(item, index) in recommendList.filter(
                (recommend) => recommend.index === curRecommendIndex
              )"
              :key="index"
              class="recommend-item"
              :class="{ active: item.content === curRecommandname }"
              @click="
                onSelectRecommend(item);
                curRecommandname = item.content;
              "
            >
              {{ item.content }}
            </div>
          </div>

          <b-progress
            v-if="isShowProgress"
            ref="bprogress"
            :value="searchProgress"
            :max="100"
            show-progress
            animated
            style="margin-top: 0.8rem; height: 0.7rem"
          />
          <p class="sql">
            <b-button v-if="curType === 'result'" @click="showSql"
              >SQL</b-button
            >
            <b-button v-if="curType === 'sql'" @click="showResult"
              >结果</b-button
            >
          </p>

          <div ref="resultWrap" class="result-wrap">
            <template v-if="curType === 'result'">
              <el-table
                ref="table"
                v-show="resultObj.msgId"
                width="100%"
                stripe
                border
                height="100%"
                :fit="true"
                :data="resultObj.result"
              >
                <el-table-column
                  v-for="field in fields"
                  :key="field"
                  :prop="field"
                  :label="field"
                  align="center"
                  sortable
                  :min-width="field.length * oneWordWidth + 80"
                />
                <!-- 
                  :width="field.length * oneWordWidth + 50" -->
              </el-table>
              <div v-if="false" v-show="!resultObj.id && resultObj.sql">
                <!-- 暂无结果内容，请输入您想了解的天然气信息进行查询" -->
                您的问题不准确或者含有歧义，请简洁描述下想要查询的天然气信息。
              </div>
            </template>
            <div
              v-if="curType === 'sql'"
              style="text-align: left; padding: 1rem; font-size: 0.9rem"
            >
              {{
                resultObj.sql ||
                "暂无sql内容，请输入您想了解的天然气信息进行查询"
              }}
            </div>
            <!-- <div class="result-content">{{ resultContent }}</div> -->
          </div>
          <div
            v-if="chartType !== 'none'"
            v-show="curType === 'result'"
            class="chart-wrapper"
          >
            <PieChart
              v-if="chartType === 'pie'"
              ref="pieChart"
              refStr="pieChart"
              :newChartData="newChartData"
            />
            <BarChart
              v-if="chartType === 'bar' || chartType === 'line'"
              ref="barChart"
              refStr="barChart"
              :newChartData="newChartData"
            />
          </div>
          <Actions
            v-if="resultObj.msgId"
            :attitude="resultObj.attitude"
            @like="onLike(resultObj)"
            @diss="onDiss(resultObj)"
          />
        </div>
        <div class="tips">
          本公司不对服务内容与结果的真实性，准确性进行陈述与保证，相关内容亦不能替代特定领域专家意见
        </div>
      </div>
    </main>
    <login-modal ref="loginModal" />
  </div>
</template>

<script>
const maxCount = 10;
import showToast from "@/utils/toast.js";
import { getGasData, likeGas, dissGas } from "@/api/request.js"; // carLikeOrDiss
import Actions from "../components/actions.vue";
import LoginModal from "@/components/layouts/login-modal.vue";
import { mapGetters } from "vuex";
import { isExceedLimit, addWebCount } from "@/utils/index.js";
// import LineChart from "../components/charts/LineChart.vue";
import PieChart from "../components/charts/PieChart.vue";
import BarChart from "../components/charts/BarChart.vue";
// console.log(nameObj.line.findIndex((item) => key.indexOf(item) > -1) >= 0);
export default {
  name: "buy-car",
  props: {},
  components: { Actions, LoginModal, PieChart, BarChart },
  data() {
    return {
      searchValue: "",
      curRecommendIndex: 1,
      curRecommandname: -1,
      recommendList: [
        {
          content: "2020年各省LNG加气站数量",
          index: 1,
          renderChartData(data) {
            const xAxisData = data.map((item) => item["省份"]);
            const series = [
              {
                name: "2020年数量",
                type: "bar",
                data: data.map((item) => item["2020年数量"]),
              },
            ];
            return {
              series,
              xAxisData,
            };
          },
        },
        {
          content: "2020-02-16内蒙地区LNG送到价是多少？",
          index: 1,
        },
        {
          content: "2021年8月天然气消费结构",
          index: 1,
          renderChartData(data) {
            const series = [
              {
                name: "2021年8月天然气消费结构",
                type: "pie",
                data: Object.keys(data[0]).map((key) => {
                  return {
                    name: key,
                    value: data[0][key],
                  };
                }),
              },
            ];
            return {
              series,
            };
          },
        },
        {
          content: "河北省2019-2021每年LNG加气站的数量变化趋势",
          index: 1,
          renderChartData(data) {
            const xAxisData = data.map((item) => item["年份"]);
            const series = [
              {
                name: "加气站数量",
                data: data.map((item) => item["数量"]),
                type: "bar",
                smooth: true,
                barWidth: "25",
              },
            ];
            return {
              xAxisData,
              series,
            };
          },
        },
        {
          content: "2021年黑龙江CNG加气站数量",
          index: 2,
          renderChartData(data) {
            const xAxisData = ["2020年"];
            const series = [
              {
                name: "数量",
                data: data.map((item) => item["2020年数量"]),
                type: "bar",
                smooth: true,
                barWidth: "25",
              },
              {
                name: "同比变化率(%)",
                data: data.map((item) => item["同比变化率(%)"]),
                type: "line",
                lineStyle: {
                  width: 2,
                },
                yAxisIndex: 1,
              },
            ];
            return {
              xAxisData,
              series,
              yAxis: [
                {
                  type: "value",
                  name: "进口量",
                },
                {
                  type: "value",
                  name: "同比变化率(%)",
                  max: 100,
                },
              ],
            };
          },
        },
        {
          content: "2016年1月至2017年9月内蒙兴圣每日价格",
          index: 2,
          renderChartData(data) {
            const xAxisData = data.map((item) => item["日期"]);
            const series = [
              {
                name: "价格",
                data: data.map((item) => item["价格"]),
                type: "line",
                lineStyle: {
                  width: 2,
                },
                smooth: true,
              },
            ];
            return {
              xAxisData,
              series,
            };
          },
        },
        {
          content: "2020年中国液化天然气(LNG)进口量",
          index: 2,
          renderChartData(data) {
            const xAxisData = ["2020年"];
            const series = [
              {
                name: "进口量(亿立方米)",
                data: data.map((item) => item["2020年LNG进口量"]),
                type: "bar",
                smooth: true,
                barWidth: "25",
              },
              {
                name: "同比变化率(%)",
                data: data.map((item) => item["同比变化率(%)"]),
                type: "line",
                lineStyle: {
                  width: 2,
                },
                yAxisIndex: 1,
              },
            ];
            return {
              xAxisData,
              series,
              yAxis: [
                {
                  type: "value",
                  name: "进口量",
                },
                {
                  type: "value",
                  name: "同比变化率(%)",
                  max: 100,
                },
              ],
            };
          },
        },
        {
          content: "预测2025年中国的LNG接收站产能是多少？",
          index: 2,
        },
      ],
      fields: [],
      resultObj: {
        id: "",
        result: [],
        attitude: 0,
      },
      tableData: [],
      resultContent: "",
      curType: "result", // sql
      loading: false,
      searchProgress: 0,
      isShowProgress: false,
      timer: null,
      chartType: "none",
      newChartData: {},
    };
  },
  created() {
    window.onresize = () => {
      this.$refs?.pieChart?.chart.resize();
      this.$refs?.barChart?.chart.resize();
    };
  },
  beforeDestroy() {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  },
  mounted() {},
  watch: {},
  computed: {
    ...mapGetters(["userInfo"]),
    oneWordWidth() {
      return parseFloat(getComputedStyle(document.documentElement).fontSize);
    },
  },
  methods: {
    onSearch(item) {
      if (this.loading) return;
      if (!this.searchValue)
        return showToast({
          content: "请输入你想了解的天然气信息",
          type: "warning",
        });
      // 在未登录时 判断是否超过提问次数超过就弹出登录框
      if (!this.userInfo.phoneNumber && isExceedLimit("chatGas")) {
        this.$refs.loginModal.show();
        return showToast({
          content: `您今日的提问次数已达上限${maxCount}次`,
          type: "danger",
        });
      }
      this.loading = true;
      this.curType = "result";
      this.searchProgress = 0;
      this.isShowProgress = true;
      this.timer = setInterval(() => {
        if (this.searchProgress >= 95) {
          window.clearInterval(this.timer);
          this.timer = null;
          return;
        }
        this.searchProgress += 1;
      }, 50);
      getGasData({ text: this.searchValue })
        .then((res) => {
          addWebCount("chatGas");
          const { data, id, sql, chart } = res.data;
          this.chartType = chart;
          if (chart !== "none") {
            const newChartData = item.renderChartData(data);
            this.newChartData = newChartData;
          }
          if (data && data.length) {
            const obj = data[0];
            delete obj.id;
            this.fields = Object.keys(obj);
          } else {
            this.fields = [];
          }
          if (data && data.length) {
            this.$refs.resultWrap.style.height = `calc(${
              data.length > 5 ? 5 * 3 : data.length * 3
            }rem + 50px)`;
          } else {
            this.$refs.resultWrap.style.height = "6rem";
          }
          this.resultObj = { result: data, msgId: id, sql, attitude: 0 };
          this.$nextTick(() => {
            this.$refs.table.doLayout();
          });
        })
        .finally(() => {
          this.loading = false;
          this.$refs.bprogress.$el.classList.add("animate__fadeOut");
          // 把进度条置为100并清除进度条定时器
          this.searchProgress = 100;
          if (this.timer) {
            window.clearInterval(this.timer);
            this.timer = null;
          }
          setTimeout(() => {
            this.isShowProgress = false;
          }, 1000);
        })
        .catch(() => {
          console.log("error");
        });
    },
    onKeydown() {},
    onSelectRecommend(item) {
      if (this.loading) return;
      this.searchValue = item.content;
      this.onSearch(item);
    },
    onRefresh() {
      console.log(this.curRecommendIndex);
      if (this.curRecommendIndex === 2) {
        this.curRecommendIndex = 1;
        return;
      }
      this.curRecommendIndex += 1;
    },
    showSql() {
      this.curType = "sql";
    },
    showResult() {
      this.curType = "result";
    },
    onLike(resultObj) {
      likeGas({
        msgId: resultObj.msgId,
        userId: this.userInfo.id,
      }).then(() => {
        resultObj.attitude = 1;
      });
    },
    onDiss(resultObj) {
      dissGas({
        msgId: resultObj.msgId,
        userId: this.userInfo.id,
      }).then(() => {
        resultObj.attitude = -1;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  h4 {
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    margin-bottom: 0;
    height: 3rem;
    // margin-left: -5.3rem;
    // padding: 0 0 0.6rem;
    img {
      width: 2.1rem;
      margin-right: 12px;
    }
  }

  main {
    background: #f0f0f0;
    min-height: calc(100vh - 3rem);
    .main-content {
      margin: 0 auto;
      .search-wrapper {
        top: 3rem;
        width: 100%;
        padding-top: 1rem;
        z-index: 2;
        position: sticky;
        background: #f0f0f0;
      }
      .submit-wrapper {
        height: 2.8rem;
        // border: 1px solid gray;
        overflow: hidden;
        background: #ffffff;
        border-radius: 5px;
        // margin-top: 0.5rem;
        display: flex;
        input {
          height: 2.8rem;
          border: none;
          width: 100%;
          background: transparent;
          color: #000;
          padding: 0 0.8rem;
          outline: none;
          flex: 1;
          font-size: 0.9rem;
          box-shadow: 0 0 20px -12px #80808061, 0 0 20px -12px #80808061,
            0 0 20px -12px #80808061, 0 0 20px -12px #80808061,
            0 0 20px -12px #80808061;
        }
        input::placeholder {
          color: #666;
        }
        .send-img {
          width: 3rem;
          height: 2.8rem;
          cursor: pointer;
        }

        .send-btn {
          color: #fff;
          // position: absolute;
          width: 2.8rem;
          height: 2.8rem;
          // right: 0.5rem;
          // top: 0;
          cursor: not-allowed;
          background: #254cd8;
        }
      }
      .count-wrapper {
        align-items: center;
        justify-content: flex-end;
        display: flex;
        font-size: 0.9rem;
        margin-top: 0.2rem;
        img {
          width: 1.2rem;
          margin-right: 0.2rem;
          cursor: pointer;
        }
        span {
          // width: 60px;
        }
      }
      .recommend-wrapper {
        display: flex;
        flex-direction: column;
        // overflow: hidden;
        padding-top: 1rem;
        h5 {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          margin-bottom: 0;
        }
        .refresh {
          font-size: 0.9rem;
          // height: 1.8rem;
          // line-height: 1.8rem;
          padding: 0.2rem 0.6rem;
          border-radius: 15px;
          background: #fff;
          margin-left: 12px;
          cursor: pointer;
          img {
            width: 16px;
            margin-left: 6px;
          }
        }
        .recommend-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .recommend-item {
            width: 49%;
            padding: 0.6rem 0.6rem;
            background: #f0f0f0;
            border: 1px solid #bdbdbd;
            border-radius: 5px;
            color: #000;
            margin-top: 1rem;
            cursor: pointer;
            text-align: left;
            line-height: 1.2rem;
            font-size: 0.9rem;
            &:hover {
              background: #d6d8db;
            }
            &.active {
              background: #d6d8db;
            }
          }
        }
        .result-wrap {
          // flex: 1;
          min-height: 6rem;
          // max-height: 15rem;
          background: #ffffff;
          border: 1px solid #254cd8;
          border-radius: 5px;
          position: relative;
          overflow: hidden;
          .result-content {
            height: 100%;
            overflow: auto;
            text-align: left;
            padding: 12px;
          }
          .spinner {
            position: absolute;
            left: 49%;
            top: 20%;
            z-index: 1;
          }
        }
        .sql {
          // right: 6px;
          // top: 6px;
          // position: absolute;
          text-align: right;
          font-size: 0.6rem;
          button {
            margin: 1.4rem 0 0.5rem;
            padding: 0 8px;
            // line-height: 12px;
          }
        }
      }
    }
  }
  .chart-wrapper {
    background: #fff;
    margin-top: 1rem;
    border: 1px solid #254cd8;
    border-radius: 5px;
  }
}
.tips {
  color: #717171;
  font-size: 0.8rem;
  padding: 0.3rem 0;
  line-height: 1.2rem;
}

@media (min-width: 767px) {
  .wrapper {
    h4 {
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

@media (max-width: 767px) {
  .wrapper {
    h4 {
      padding: 0.7rem 0;
      position: sticky;
      top: 0;
      background: #fff;
      margin-left: 0;
    }
    main {
      .main-content {
        position: relative;
        .recommend-wrapper {
          .recommend-list {
            .recommend-item {
              width: 100% !important;
              // line-height: 20px;
            }
          }
          .result-wrap {
            // height: 10rem;
          }
        }
      }
    }
  }
}

/deep/ .table thead th {
  white-space: nowrap;
}
/deep/ .table tr td {
  white-space: nowrap;
}
/deep/.b-table-sticky-header.table-responsive {
  max-height: 100%;
}

/deep/.el-table {
  font-size: 0.9rem;
  // .sort-caret.ascending {
  //   border-bottom-color: #606266;
  // }
  // .sort-caret.descending {
  //   border-top-color: #606266;
  // }

  /*滚动条整体样式*/
  // .el-table__body-wrapper::-webkit-scrollbar {
  //   width: 0.5rem;
  //   /*高宽分别对应横竖滚动条的尺寸*/
  //   height: 0.5rem;
  // }

  // .el-table__body-wrapper::-webkit-scrollbar-thumb {
  //   /*滚动条里面小方块*/
  //   border-radius: 10px;
  //   box-shadow: inset 0 0 5px #254cd8;
  //   background: #254cd8;
  // }

  // .el-table__body-wrapper::-webkit-scrollbar-track {
  //   /*滚动条里面轨道*/
  //   box-shadow: inset 0 0 5px transparent;
  //   border-radius: 10px;
  //   background: #fff;
  // }
  .cell {
    // line-height: 1.2rem;
  }
  thead {
    tr th {
      background: #ebeef5;
    }
  }
  .el-table__cell {
    padding: 0.5rem 0;
  }
  th.el-table__cell {
    & > .cell {
      color: #212529;
    }
  }
}
/deep/ .progress-bar.progress-bar-striped.progress-bar-animated {
  color: transparent;
}
</style>