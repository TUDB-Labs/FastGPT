<template>
  <div class="demo-wrapper content-width">
    <div class="main-tt-title">
      <strong><span>AIGC</span> &nbsp;DEMO体验</strong>
    </div>
    <div class="phone main-tt-content">
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        indicators
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          v-for="(item, index) in demoList"
          :key="index"
          img-blank
          img-alt="Blank image"
        >
          <div class="main-card-wrapper">
            <div class="main-card">
              <div class="image">
                <img :src="item.img" :alt="item.title" />
              </div>
              <div class="card-desc">
                <h4 style="">
                  <strong>{{ item.title }}</strong>
                </h4>
                <div class="descContent">
                  <p class="text_desc">{{ item.desc }}</p>
                </div>
                <!-- 
            v-b-popover.hover.top="item.hopeCon"
            title="" -->
                <b-button @click="showDemoDetail(item)"> 体验 DEMO </b-button>
              </div>
            </div>
          </div>
        </b-carousel-slide>
      </b-carousel>
    </div>
    <div class="web main-tt-content">
      <div
        v-for="(item, index) in demoList"
        :key="index"
        class="wow main-card-wrapper animate__animated"
        :class="{
          animate__lightSpeedInLeft: index === 0,
          animate__lightSpeedInRight: index === 2,
          animate__fadeInDown: index === 1,
        }"
      >
        <div class="main-card">
          <div class="image">
            <img :src="item.img" :alt="item.title" />
          </div>
          <div class="card-desc">
            <h4 style="">
              <strong>{{ item.title }}</strong>
            </h4>
            <div class="descContent">
              <p class="text_desc">{{ item.desc }}</p>
            </div>
            <!-- 
            v-b-popover.hover.top="item.hopeCon"
            title="" -->
            <b-button @click="showDemoDetail(item)"> 体验 DEMO </b-button>
          </div>
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
      slide: 0,
      sliding: null,
      //demo
      demoList: [
        {
          img: "https://cdn.tudb.work/aios/web/images/demo1.png",
          title: "法律咨询",
          desc: "根据您的具体情况，提供专业法律咨询服务，回答企业和个人都关心的法律问题",
          demoName: "",
          hopeCon: "敬请期待!",
          visible: false,
          path: "law",
        },
        {
          img: "https://cdn.tudb.work/aios/web/images/demo2.png",
          title: "购车攻略",
          desc: "帮助您全面了解不同车型的价格，配置，优缺点等，为您的购车体验保驾护航",
          demoName: "",
          hopeCon: "敬请期待!",
          visible: false,
          path: "buy-car",
        },
        {
          img: "https://cdn.tudb.work/aios/web/images/demo3.png",
          title: "虚拟数字人",
          desc: "为企业，院校，个人提供虚拟人技术解决方案，并将其应用于多种场景，如：企业宣传，知识讲解，直播间互动等",
          demoName: "",
          hopeCon: "敬请期待!",
          visible: false,
          path: "pdf-upload",
        },
      ],
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
      this.$emit("buttonClick", item.title);
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
  .main-tt-title {
    width: 100%;
    height: 8rem;
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
  .main-tt-content {
    width: 100%;
    height: calc(100vh-80) px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .main-card-wrapper {
      width: 30%;
      height: 460px;
      .main-card {
        width: 100%;
        height: 100%;
        padding: 20px !important;
        border-radius: 20px;
        transition: 0.3s;
        border: 1px solid #ebeef5;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        background-color: #f3f3f3 !important;
        position: relative;
        .image {
          width: 100%;
          height: 180px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 7.5rem;
            display: block;
          }
        }
        .card-desc {
          margin-top: 20px;
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
          bottom: 40px;
        }
      }
    }
    .main-card:hover {
      transform: scale(1.05);
    }
  }
}

@media (min-width: 767px) {
  .web {
    display: flex !important;
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
    .phone {
      display: block !important;
      .main-card-wrapper {
        width: 100% !important;
        .main-card {
          h4 {
          }
          .image img {
            width: 9rem !important;
          }
          button {
            width: 14rem !important;
          }
        }
      }
      /deep/.carousel-indicators {
        bottom: -50px;
        li {
          background-color: #bdbdbd;
          &.active {
            background-color: #4f79f6;
          }
        }
      }
      /deep/.carousel-inner {
        height: 460px !important;
        border-radius: 20px;
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