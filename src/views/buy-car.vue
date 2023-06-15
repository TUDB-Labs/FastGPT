<template>
  <div class="wrapper">
    <h4>
      <img src="https://cdn.tudb.work/aios/web/images/demo2.png" alt="" />
      <strong>购车咨询</strong>
    </h4>
    <main>
      <div class="main-content content-width">
        <div class="submit-wrapper">
          <input
            v-model.trim="searchValue"
            type="text"
            placeholder="请输入您想了解的购车信息......"
            maxlength="100"
            @keydown="onKeydown"
          />
          <img
            src="https://cdn.tudb.work/aios/web/images/send-btn.png"
            alt="send-img"
            class="send-img"
            @click="onSearch"
          />
        </div>
        <div class="count-wrapper">
          <img
            src="https://cdn.tudb.work/aios/web/images/delete.png"
            alt="clear"
            @click="searchValue = ''"
          />
          {{ searchValue.length }} / 100
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
              v-for="(item, index) in recommendList"
              :key="index"
              class="recommend-item"
              @click="onSelectRecommend(item)"
            >
              {{ item.content }}
            </div>
          </div>
          <p class="sql"><b-button>SQL</b-button></p>
          <div class="result-wrap">
            <div class="result-content">{{ resultContent }}</div>
          </div>
          <Actions />
        </div>
        <div class="tips">
          本公司不对服务内容与结果的真实性，准确性进行陈述与保证，相关内容亦不能替代特定领域专家意见
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Actions from "../components/actions.vue";
export default {
  name: "buy-car",
  props: {},
  components: { Actions },
  data() {
    return {
      searchValue: "",
      recommendList: [
        { content: "今年新上市的奔驰SUV有哪些？" },
        { content: "续航大于700公里的电动车有哪些？" },
        { content: "2023年上市的20万-30万的四驱车型有哪些？" },
        { content: "查询2023年上市的长度大于5米的电动车" },
      ],
      resultContent: "",
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    onSearch() {},
    onKeydown() {},
    onSelectRecommend(item) {
      console.log(item);
      this.searchValue = "北京市2022年上半年，销量前10的汽车品牌是什么?";
      this.onSearch();
    },
    onRefresh() {},
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  h4 {
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0 12px;
    img {
      width: 3.2rem;
      margin-right: 12px;
    }
  }

  main {
    background: #f0f0f0;
    .main-content {
      margin: 0 auto;
      padding: 1.5rem 0;
      .submit-wrapper {
        height: 3rem;
        // border: 1px solid gray;
        overflow: hidden;
        background: #ffffff;
        border-radius: 5px;
        margin-top: 1.5rem;
        display: flex;
        input {
          height: 3rem;
          border: none;
          width: 100%;
          background: transparent;
          color: #000;
          padding: 0 16px;
          outline: none;
          flex: 1;
          box-shadow: 0 0 20px -12px #80808061, 0 0 20px -12px #80808061,
            0 0 20px -12px #80808061, 0 0 20px -12px #80808061,
            0 0 20px -12px #80808061;
        }
        input::placeholder {
          color: #666;
        }
        .send-img {
          width: 3rem;
          cursor: pointer;
        }
      }
      .count-wrapper {
        align-items: center;
        justify-content: flex-end;
        display: flex;
        font-size: 14px;
        margin-top: 6px;
        img {
          margin-right: 6px;
        }
      }
      .recommend-wrapper {
        margin-top: 2rem;
        h5 {
          display: flex;
          align-items: center;
          font-size: 1.7rem;
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
            padding: 0.8rem 0.6rem;
            background: #f0f0f0;
            border: 1px solid #bdbdbd;
            border-radius: 5px;
            color: #000;
            margin-top: 1.3rem;
            cursor: pointer;
            text-align: left;
            line-height: 1.2rem;
          }
        }
        .result-wrap {
          height: 479px;
          background: #ffffff;
          border: 1px solid #254cd8;
          border-radius: 5px;
          position: relative;
          .result-content {
            height: 100%;
            overflow: auto;
            text-align: left;
            padding: 12px;
          }
        }
        .sql {
          // right: 6px;
          // top: 6px;
          // position: absolute;
          text-align: right;
          button {
            margin: 2.4rem 0 0.5rem;
            padding: 6px 12px;
            line-height: 12px;
          }
        }
      }
      .tips {
        color: #717171;
        font-size: 14px;
        margin-top: 26px;
      }
    }
  }
}

@media (max-width: 767px) {
  .wrapper {
    h4 {
      padding: 12px 0;
    }
    main {
      .main-content {
        .recommend-wrapper {
          .recommend-list {
            .recommend-item {
              width: 100% !important;
              // line-height: 20px;
            }
          }
          .result-wrap {
            height: 300px;
          }
        }
      }
    }
  }
}
</style>