<template>
  <div class="wrapper">
    <h4>
      <img src="@/assets/images/tianranqi.png" alt="" />
      <strong>ChatGas </strong>
    </h4>
    <main>
      <div class="main-content content-width">
        <div class="search-wrapper">
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
              @click="onSelectRecommend(item)"
            >
              {{ item.content }}
            </div>
          </div>
          <p class="sql">
            <b-button v-if="curType === 'result'" @click="showSql"
              >SQL</b-button
            >
            <b-button v-if="curType === 'sql'" @click="showResult"
              >结果</b-button
            >
          </p>
          <div class="result-wrap">
            <!-- <b-spinner
              v-if="loading"
              variant="primary"
              label="Busy"
              class="spinner"
              style="margin-top: 5rem"
            /> -->
            <template v-if="curType === 'result'">
              <el-table
                v-show="!resultObj.id && resultObj.sql"
                height="100%"
                stripe
                border
                :data="resultObj.result"
              >
                <el-table-column
                  v-for="field in fields"
                  :key="field"
                  :prop="field"
                  :label="field"
                  sortable
                  width="180"
                />
              </el-table>
              <div v-show="!resultObj.id && resultObj.sql">
                <!-- 暂无结果内容，请输入您想了解的购车信息进行查询" -->
                您的问题不准确或者含有歧义，请简洁描述下想要查询的车型。
              </div>
            </template>
            <div
              v-if="curType === 'sql'"
              style="text-align: left; margin: 1rem; font-size: 0.9rem"
            >
              {{
                resultObj.sql || "暂无sql内容，请输入您想了解的购车信息进行查询"
              }}
            </div>
            <!-- <div class="result-content">{{ resultContent }}</div> -->
          </div>
          <Actions
            v-if="resultObj.id"
            :attitude="resultObj.attitude"
            @like="upvote(1)"
            @diss="upvote(-1)"
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
import { getGasData, carLikeOrDiss } from "@/api/request.js"; // carLikeOrDiss
import Actions from "../components/actions.vue";
import LoginModal from "@/components/layouts/login-modal.vue";
import { mapGetters } from "vuex";
export default {
  name: "buy-car",
  props: {},
  components: { Actions, LoginModal },
  data() {
    return {
      searchValue: "",
      curRecommendIndex: 1,
      recommendList: [
        { content: "2021年8月天然气消费结构", index: 1 },
        { content: "2020年黑龙江CNG加气站数量", index: 1 },
        { content: "2016年8月广汇淖毛湖（疆外）平均价格", index: 1 },
        { content: "2021年中国城市燃气消费量", index: 1 },
        { content: "2021年9月天然气消费量", index: 2 },
        { content: "2016年1月至2017年9月内蒙兴圣每日价格", index: 2 },
        { content: "2020年青海液化天然气 (LNG) 加气站数量", index: 2 },
        { content: "2020年中国液化天然气 (LNG) 进口量", index: 2 },
        // { content: "2021年河北LNG加气站数量", index: 3 },
        // { content: "2022年5月天然气消费结构", index: 3 },
        // { content: "2021年10月天然气消费结构占比", index: 3 },
        // { content: "2020年CNG加气站数量", index: 3 },
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
      gasCountInfo: localStorage.getItem("gasCountInfo")
        ? JSON.parse(localStorage.getItem("gasCountInfo"))
        : {
            date: new Date().toLocaleDateString(),
            num: 0,
          },
      searchProgress: 0,
      isShowProgress: false,
      timer: null,
    };
  },
  created() {
    this.getCountInfo();
  },
  beforeDestroy() {
    console.log(this.timer);
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  },
  mounted() {},
  watch: {},
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    getCountInfo() {
      const str = localStorage.getItem("gasCountInfo");
      const today = new Date().toLocaleDateString();
      if (str) {
        const gasCountInfo = JSON.parse(str);
        // 如果已经访问过切是今天就不需要重置
        if (today === gasCountInfo.date) {
          this.gasCountInfo = gasCountInfo;
          return;
        }
      }
      this.gasCountInfo = {
        date: today,
        num: 0,
      };
      this.setCountInfo();
    },
    setCountInfo() {
      localStorage.setItem("gasCountInfo", JSON.stringify(this.gasCountInfo));
    },
    onSearch() {
      // 在未登录时 判断是否超过提问次数超过就弹出登录框
      if (!this.userInfo.phoneNumber && this.gasCountInfo.num === maxCount) {
        this.$refs.loginModal.show();
        return showToast({
          content: `您今日的提问次数已达上限${maxCount}次`,
          type: "danger",
        });
      }
      if (this.loading) return;
      if (!this.searchValue)
        return showToast({
          content: "请输入你想了解的购车信息",
          type: "warning",
        });
      this.loading = true;
      this.curType = "result";

      // 如果未登录需要记录查询次数
      if (!this.userInfo.phoneNumber) {
        this.gasCountInfo.num += 1;
        this.setCountInfo();
      }
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
          // if (!res.flag) {
          //   return this.$confirm(res.message, "提示", {
          //     confirmButtonText: "确定",
          //     cancelButtonText: "取消",
          //     type: "warning",
          //     showCancelButton: false,
          //   })
          //     .then(() => {})
          //     .catch(() => {});
          // }
          // showToast({
          //   content: res.message,
          //   type: "danger",
          // });
          const { data, id, sql } = res.data;
          this.resultObj = { result: data, id, sql, attitude: 0 };
          if (data && data.length) {
            const obj = data[0];
            delete obj.id;
            this.fields = Object.keys(obj);
          } else {
            this.fields = [];
          }
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
        .catch((res) => {
          console.log("error");
          this.$confirm(res.message, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            showCancelButton: false,
          })
            .then(() => {})
            .catch(() => {});
        });
    },
    onKeydown() {},
    onSelectRecommend(item) {
      if (this.loading) return;
      this.searchValue = item.content;
      this.onSearch();
    },
    onRefresh() {
      console.log(this.curRecommendIndex);
      if (this.curRecommendIndex === 2) {
        this.curRecommendIndex = 1;
        return;
      }
      this.curRecommendIndex += 1;
      // if (this.curRecommendIndex === 1) {
      //   return (this.curRecommendIndex = 2);
      // }
      // if (this.curRecommendIndex === 2) {
      //   return (this.curRecommendIndex = 1);
      // }
    },
    upvote(record) {
      const { id, attitude } = this.resultObj;
      if (attitude === record) return;
      carLikeOrDiss({
        record: record,
        id: id,
      }).then((res) => {
        if (res.status === "success") {
          this.resultObj.attitude = record;
        } else {
          showToast({
            content: record === 1 ? "点赞失败" : "踩失败",
            type: "danger",
          });
        }
      });
    },
    showSql() {
      this.curType = "sql";
    },
    showResult() {
      this.curType = "result";
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  h4 {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    margin-bottom: 0;
    height: 4rem;
    // margin-left: -5.3rem;
    // padding: 0 0 0.6rem;
    img {
      width: 3rem;
      margin-right: 12px;
    }
  }

  main {
    background: #f0f0f0;
    .main-content {
      margin: 0 auto;
      padding: 0;
      .search-wrapper {
        top: 4rem;
        width: 100%;
        padding-top: 1rem;
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
        font-size: 14px;
        margin-top: 4px;
        img {
          margin-right: 6px;
          cursor: pointer;
        }
        span {
          width: 60px;
          margin-top: 2px;
        }
      }
      .recommend-wrapper {
        margin-top: 1.2rem;
        h5 {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          margin-bottom: 0;
        }
        .refresh {
          font-size: 14px;
          height: 30px;
          line-height: 30px;
          width: 90px;
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
            margin-top: 1.3rem;
            cursor: pointer;
            text-align: left;
            line-height: 1.2rem;
            font-size: 0.9rem;
            &:hover {
              background: #d6d8db;
            }
          }
        }
        .result-wrap {
          height: 30rem;
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
      .tips {
        color: #717171;
        font-size: 14px;
        padding: 0.6rem 0;
      }
    }
  }
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
            height: 35rem;
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