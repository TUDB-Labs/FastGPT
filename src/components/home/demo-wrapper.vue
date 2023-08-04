<template>
  <div class="demo-wrapper content-width">
    <div class="main-tt-title">
      <strong><span>AIGC</span> &nbsp;DEMO体验</strong>
    </div>
    <div class="phone tabs">
      <span
        v-for="(typeItem, typeIndex) in newDemoObjList"
        :key="typeIndex"
        class="item"
        :class="{ active: curTabIndex === typeIndex }"
        @click="curTabIndex = typeIndex"
      >
        <strong>{{ typeItem.name }}</strong>
      </span>
    </div>
    <div class="phone main-tt-content">
      <b-carousel
        id="carousel-1"
        v-model="slide1"
        :interval="4000"
        indicators
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          v-for="(item, index) in newDemoObjList[curTabIndex].children"
          :key="index"
          img-blank
          img-alt="Blank image"
        >
          <div class="main-card-wrapper">
            <div class="main-card">
              <div class="image">
                <img :src="item.img" :alt="item.name" />
              </div>
              <div class="card-desc">
                <h4 style="">
                  <strong>{{ item.name }}</strong>
                </h4>
                <div class="descContent">
                  <p class="text_desc">{{ item.desc }}</p>
                </div>
                <!-- 
            v-b-popover.hover.top="item.hopeCon"
            title="" -->
                <b-button @click="showDemoDetail(item)">
                  <span>体验 DEMO</span> <i class="el-icon-right"></i
                ></b-button>
              </div>
            </div>
          </div>
        </b-carousel-slide>
      </b-carousel>
    </div>
    <div class="web main-box">
      <div
        v-for="(typeItem, typeIndex) in newDemoObjList"
        :key="typeIndex"
        class="type-item"
      >
        <div class="type">
          <strong>{{ typeItem.name }}</strong>
        </div>
        <div
          v-for="(item, index) in typeItem.children"
          :key="index"
          class="demo-item"
        >
          <div class="info">
            <img :src="item.img" :alt="item.title" />
            <div class="base">
              <p class="name">{{ item.name }}</p>
              <p class="text_desc">{{ item.desc }}</p>
            </div>
          </div>
          <el-button class="demo-btn" size="mini" @click="showDemoDetail(item)">
            <span>体验 DEMO</span>
            <i class="el-icon-right"></i>
          </el-button>
        </div>
      </div>
    </div>
    <b-modal
      ref="myModal"
      size="xl"
      id="modal-scoped"
      centered
      hide-header
      hide-footer
      title=""
      class="fill-screen"
    >
      <video
        src="https://cdn.tudb.work/aios/web/images/virtual-demo.mp4"
        autoplay
        muted
        controls
        loop
        style="width: 100%"
      ></video>
    </b-modal>
  </div>
</template>

<script>
import { WOW } from "wowjs";
export default {
  name: "demo-wrapper",
  props: {},
  components: {},
  data() {
    return {
      slide1: 0,
      sliding: null,
      //demo
      newDemoObjList: [
        {
          name: "智能机器人",
          children: [
            {
              img: "https://cdn.tudb.work/aios/web/images/demo1.png",
              name: "法律咨询",
              desc: "根据您的具体情况，提供专业法律咨询服务，回答企业和个人都关心的法律问题",
              path: "law",
            },
            {
              img: require("@/assets/images/pdf.png"),
              name: "PDF 助手",
              desc: "PDF助手可以帮助您快速阅读PDF文档，获取内容概要和您关心的重点信息，提高您的办公和学习效率",
              path: "pdf-upload",
            },
            {
              img: require("@/assets/images/yayi.png"),
              name: "牙医问诊",
              desc: "提供专业的口腔诊前咨询服务，既可以解答口腔患者的疑问，同时辅助口腔医生的诊断治疗",
              path: "dental-consultation",
            },
          ],
        },
        {
          name: "数据库问答",
          children: [
            {
              img: "https://cdn.tudb.work/aios/web/images/demo2.png",
              name: "购车攻略",
              desc: "帮助您全面了解不同车型的价格，配置，优缺点等，为您的购车体验保驾护航",
              path: "buy-car",
            },
            {
              img: require("@/assets/images/tianranqi.png"),
              name: "天 然 气",
              desc: "拥有丰富的天然气行业数据，高效赋能天然气领域工作人员的信息收集，数据分析和可视化工作",
              path: "natural-gas",
            },
          ],
        },
        {
          name: "虚拟数字人",
          children: [
            {
              img: "https://cdn.tudb.work/aios/web/images/demo3.png",
              name: "虚 拟 人",
              desc: "为企业，院校，个人提供虚拟人技术解决方案，并将其应用于多种场景，如：企业宣传，知识讲解，直播间互动等",
            },
          ],
        },
      ],
      curTabIndex: 0,
    };
  },
  created() {},
  mounted() {
    new WOW({
      live: false,
    }).init();
  },
  watch: {},
  computed: {},
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    showDemoDetail(item) {
      this.$emit("buttonClick", item.name || item.title);
      if (item.path) {
        const routeUrl = this.$router.resolve(item.path);
        window.open(routeUrl.href, "_blank");
      } else {
        this.$refs["myModal"].show();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.demo-wrapper {
  margin: 0 auto;
  padding-top: 3rem;
  padding-bottom: 1rem;
  margin-top: -3rem;
  .main-tt-title {
    width: 100%;
    // height: 4rem;
    margin-top: 1rem;
    color: #000;
    font-size: 2rem;
    font-family: PingFangSC-Semibold;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: #254cd8;
    }
  }
  .tabs {
    overflow: hidden;
    margin-top: 1.5rem;
    .item {
      width: 8.5rem;
      height: 3rem;
      line-height: 3rem;
      display: inline-block;
      background: #efefef;
      font-size: 1.1rem;
      font-weight: 550;
      color: #254bd7;
      &.active {
        background-color: #254bd7;
        color: #fff;
      }
      &:first-child {
        border-radius: 0.4rem 0 0 0;
      }
      &:last-child {
        border-radius: 0 0.4rem 0 0;
      }
    }
  }
  .main-box {
    // margin-top: -2rem;
    .type-item {
      display: flex;
      margin: 0.8rem 0;
      .type {
        background-color: #f3f3f3;
        border-radius: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 9rem;
        color: #254cd8;
        border: 1px solid #f3f3f3;
        border: 1px solid #f3f3f3;
      }
      .demo-item {
        // flex: 1;
        margin-left: 1rem;
        border: 1px solid #f3f3f3;
        border-radius: 0.3rem;
        padding: 0.8rem 0.8rem 3.2rem;
        width: calc((100% - 9rem - 3rem) / 3);
        cursor: pointer;
        position: relative;
        // min-height: 7.5rem;
        transition: 0.3s;
        &:hover {
          transform: scale(1.05);
        }
        .info {
          display: flex;
          text-align: left;
          img {
            width: 2.5rem;
            height: 2.5rem;
          }
          .base {
            margin-left: 0.5rem;
            .name {
              color: #254cd8;
            }
            .text_desc {
              font-size: 0.6rem;
            }
          }
        }
        /deep/.demo-btn {
          // width: 100%;
          margin-top: 0.5rem;
          background-color: #254cd8;
          border-color: transparent;
          color: #fff;
          border-radius: 0.3rem;
          font-size: 0.8rem;
          position: absolute;
          bottom: 0.8rem;
          left: 0.8rem;
          right: 0.8rem;
          &:hover {
            background-color: #192a51;
          }
          & > span {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100% !important;
            text-align: left;
            i {
              font-weight: 550;
              float: right;
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }
  .main-tt-content {
    width: 100%;
    height: calc(100vh-80) px;
    display: flex;
    justify-content: space-between;
    border: 1px solid #ebeef5;
    border-radius: 0.6rem;
    align-items: center;
    .main-card-wrapper {
      width: 30%;
      height: 33rem;
      .main-card {
        width: 100%;
        height: 100%;
        padding: 20px !important;
        transition: 0.3s;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        // background-color: #f3f3f3 !important;
        position: relative;
        .image {
          width: 100%;
          height: 13rem;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 7.5rem;
            display: block;
          }
        }
        .card-desc {
          height: 144px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .descContent {
            height: 44px;
            margin: 10px 0 20px;
          }
        }
        .bottom {
          margin-top: 14px;
          line-height: 12px;
        }
        .clearfix:before,
        .clearfix:after {
          display: table;
          content: "";
        }

        .clearfix:after {
          clear: both;
        }
        button {
          position: absolute;
          height: 3rem;
          bottom: 40px;
          font-weight: 550;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.2rem;
          i {
            font-weight: 550;
            font-size: 1.5rem;
          }
        }
      }
    }
    .main-card:hover {
      // transform: scale(1.05);
    }
  }
}

@media (min-width: 767px) {
  .web {
    display: block !important;
  }
  .phone {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .web {
    display: none !important;
  }
  .demo-wrapper {
    padding-left: 4vw;
    padding-right: 4vw;
    padding-bottom: 3rem;
    .phone {
      display: block !important;
      &.main-tt-content {
        border: 1px solid #ebeef5;
      }
      .main-card-wrapper {
        width: 100% !important;
        .main-card {
          h4 {
          }
          .image img {
            width: 9rem !important;
          }
          button {
            // width: 14rem !important;
            margin-bottom: 1.5rem;
            width: calc(100% - 42px);
          }
          .text_desc {
            font-size: 1.08rem;
          }
        }
      }
      /deep/.carousel-indicators {
        // bottom: -3.5rem;
        li {
          background-color: #bdbdbd;
          &.active {
            background-color: #4f79f6;
          }
        }
      }
      /deep/.carousel-inner {
        height: 33rem !important;
        border-radius: 0.2rem;
        .carousel-caption {
          right: 0;
          left: 0;
          top: 0;
          padding: 0;
        }
      }
    }
  }
}
</style>