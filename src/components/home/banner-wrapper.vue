<template>
  <div class="banner-wrapper">
    <div class="web banner-content content-width">
      <div style="margin-left: 1.5rem">
        <h2 class="main-title" style="font-size: 2.3rem; line-height: 40px">
          <strong>生成式AI企业级解决方案</strong>
        </h2>
        <h3 class="tips">高性能，低成本，可定制</h3>
        <b-button @click="startBtn">
          <span>获取解决方案</span>
          <img src="@/assets/images/send-fill.png" style="width: 1rem" alt="" />
        </b-button>
      </div>
      <el-row class="card-list content-width">
        <el-col v-for="item in cardList" class="" :key="item.label" :span="8">
          <div class="item">
            <img :src="item.icon" alt="" />
            <div class="info">
              <h4 class="name">{{ item.label }}</h4>
              <el-row class="desc">{{ item.desc }}</el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="phone banner-content">
      <h1 class="logo">
        <span class="company-name text-bold"> <strong>中科知道</strong> </span>
        <el-divider direction="vertical"></el-divider>
        <strong>AIGC</strong>
      </h1>
      <!-- <img src="https://cdn.tudb.work/aios/web/images/zd_logo.png" class="logo" alt="logo" /> -->
      <div class="slogan-box">
        <h2><strong class="slogan-text">生成式AI<br />企业级解决方案</strong></h2>
        <h3 class="slogan-tips">高性能，低成本，可定制</h3>
      </div>
      <b-button @click="startBtn"><strong>获取解决方案</strong></b-button>
      <b-carousel
        id="carousel-2"
        v-model="slide1"
        :interval="40000"
        indicators
        class="card-list content-width"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          v-for="(item, index) in cardList"
          :key="index"
          img-blank
          img-alt="Blank image"
        >
          <div class="item">
            <div class="info">
              <el-row class="name">{{ item.label }}</el-row>
              <el-row class="desc-box">
                <img :src="item.icon" alt="" />
                <div class="desc">{{ item.desc }}</div>
              </el-row>
            </div>
          </div>
        </b-carousel-slide>
      </b-carousel>
    </div>
    <solution-dialog ref="solutionDialog" />
  </div>
</template>

<script>
import SolutionDialog from "../layouts/solution-dialog.vue";
export default {
  name: "banner-wrapper",
  props: {},
  components: { SolutionDialog },
  data() {
    return {
      slide1: 0,
      cardList: [
        {
          label: "定制企业级AI解决方案",
          desc: "结合领域专业数据或企业私有数据，微调 LLM，打造符合企业个性化需求的AI解决方案",
          icon: require("@/assets/images/ai.png"),
        },
        {
          label: "AI核心能力",
          desc: "不同业务场景下，将AI对话，AI写作，AI分析，AI绘图能力高效落地",
          icon: require("@/assets/images/hexin.png"),
        },
        {
          label: "私有化部署",
          desc: "快速部署一个类似于ChatGPT的企业级 LLM应用，保证企业数据的安全性和隐私性",
          icon: require("@/assets/images/siyouhua.png"),
        },
      ],
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    //1V1定位
    startBtn() {
      this.$refs.solutionDialog.show();
      // this.$emit("buttonClick", "免费1V1咨询");
      // document
      //   .querySelector(".main-bottom")
      //   .scrollIntoView({ block: "start", behavior: "smooth" });
    },
  },
};
</script>

<style lang="less" scoped>
.banner-wrapper {
  margin: 0 auto 6.5rem;
  color: #fff;
  .banner-content {
    background: url(https://cdn.tudb.work/aios/web/images/banner.png) no-repeat;
    // background: url(~@/assets/images/banner.png) no-repeat;
    position: relative;
    height: 27rem;
    // overflow: hidden;
    background-size: 100% 100%;
    // border-radius: 20px;
    padding-top: 5rem;
    // margin-left:3rem;
    text-align: left;
    .main-title {
      color: #254cd8;
      letter-spacing: 3px;
    }
    .tips {
      color: #000;
      font-size: 1.2rem;
      margin: 0.9rem 0 4.8rem;
      letter-spacing: 3px;
    }
    button {
      height: 2.8rem;
      width: 24.5rem;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
      letter-spacing: 3px;
      font-size: 1rem;
    }
    a {
      color: #1890ff;
      text-decoration: none;
      background-color: transparent;
      outline: none;
      cursor: pointer;
      transition: color 0.3s;
      -webkit-text-decoration-skip: objects;
    }
  }
}

@media (min-width: 767px) {
  .web {
    display: block;
    .card-list {
      position: absolute;
      width: calc(100% + 1rem);
      bottom: -3.2rem;
      left: 0;
      color: #000;
      z-index: 1;
      margin-left: -1rem;
      .item {
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
        border-radius: 0.5rem;
        padding: 1rem 1.2rem;
        display: flex;
        align-items: center;

        margin-left: 1rem;
        img {
          width: 3rem;
          height: 3rem;
          margin-right: 1.2rem;
        }
        .info {
          .name {
            font-weight: 550;
            font-size: 1.1rem;
          }
          .desc {
            font-size: 0.7rem;
            color: #254cd8;
            margin-top: 0.5rem;
            height: 52px;
            position: relative;
            padding-left: 1rem;
            font-weight: 550;
            &::before {
              content: "";
              // display: inline-block;
              position: absolute;
              left: 0;
              top: 0.2rem;
              width: 0.3rem;
              border-radius: 0.3rem;
              height: 1.8rem;
              background-color: #254cd8;
            }
          }
        }
      }
    }
  }
  .phone {
    display: none;
  }
}

@media (max-width: 767px) {
  .web {
    display: none;
  }
  .banner-wrapper {
    width: 100% !important;
    padding: 0;
    color: #000;
    .phone.banner-content {
      background: url(https://cdn.tudb.work/aios/web/images/phone-banner.png)
        no-repeat;
      // background: url(~@/assets/images/phone-banner.png) no-repeat;
      background-size: 100% 100%;
      display: block;
      padding: 0 0 0;
      text-align: center;
      height: 50rem;
      position: relative;
      border-radius: 0;
      .logo {
        // margin: 30px 0;
        margin-bottom: 0;
        font-weight: 550;
        padding-top: 1.5rem;
      }
      .slogan-box {
        text-align: left;
        font-size: 2.1rem;
        margin: 1.2rem 18vw 0;
        .slogan-text {
          color: #254cd8;
          margin: 1.2rem 0 0.8rem;
          display: block;
          line-height: 3rem;
        }
        .slogan-tips {
          // font-size: 2.1rem!important;
        }
      }
      button {
        position: absolute;
        width: 22rem;
        bottom: 7rem;
        font-size: 1.2rem;
        text-align: center;
        height: 3rem;
        left: 50%;
        transform: translateX(-50%);
        justify-content: center;
        letter-spacing: 3px;
      }
      // background-size: 100%;
    }

    .card-list {
      position: absolute;
      width: 100%;
      bottom: -5rem;
      color: #000;
      .item {
        display: flex;

        .info {
          .name {
            font-weight: 550;
            font-size: 1.6rem;
            color: #000;
            font-weight: 550;
          }
          .desc-box {
            display: flex;
            align-items: center;
            img {
              width: 2.3rem;
              margin-right: 1rem;
            }
            .desc {
              font-size: 0.9rem;
              color: #254cd8;
              margin-top: 0.5rem;
              position: relative;
              padding-left: 1rem;
              text-align: left;
              font-weight: 550;
              &::before {
                content: "";
                // display: inline-block;
                position: absolute;
                left: 0;
                top: 0.3rem;
                width: 0.2rem;
                border-radius: 0.3rem;
                height: 80%;
                background-color: #254cd8;
              }
            }
          }
        }
      }
    }
  }
  /deep/.carousel-indicators {
    // bottom: -3.5rem;
    li {
      background-color: #bdbdbd;
      width: 5px;
      height: 5px;
      border-radius: 6px !important;
      border: none;
      // margin: 1rem 3px 0!important;
      position: relative;
      top: 0.1rem;
      &.active {
        background-color: #4f79f6;
        border-radius: 6px !important;
      }
    }
  }
  /deep/.carousel-inner {
    height: 8.8rem !important;
    border-radius: 0.4rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    padding: 0.6rem 1.2rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    .carousel-caption {
      right: 0;
      left: 0;
      top: 0;
      padding: 0;
    }
  }

  .logo {
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #15274f;
    cursor: pointer;
    .company-name {
      font-size: 1.6rem;
      transform: skewX(-6deg) scaleY(1.2);
      margin-right: 3px;
      color: #16264a;
      margin-top: -3px;
    }
    .el-divider {
      height: 1.2rem;
      background-color: #313131;
    }
  }
}
</style>