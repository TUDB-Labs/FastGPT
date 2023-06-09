<template>
  <div class="banner-wrapper content-width">
    <div class="web banner-content">
      <p class="" style="font-size: 36px; line-height: 40px">
        <strong>AIGC<br />企业私有化部署方案</strong>
      </p>
      <p style="margin: 24px 0 60px"><strong>高安全，低成本，可定制</strong></p>
      <b-button @click="startBtn">免费1V1咨询</b-button>
    </div>
    <div class="phone banner-content">
      <h5 class="">
        <span style="font-style: italic">中科知道</span> <strong>AIGC</strong>
      </h5>
      <!-- <img src="@/assets/images/zd_logo.png" class="logo" alt="logo" /> -->
      <h4 class="">
        <strong>AIGC企业私有化<br />部署方案</strong>
      </h4>
      <h5 class="">高安全，低成本，可定制</h5>
      <b-button @click="startBtn"><strong>免费1V1咨询</strong></b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "banner-wrapper",
  props: {},
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    //1V1定位
    startBtn() {
      this.$emit("buttonClick", "免费1V1咨询");
      document
        .querySelector(".main-bottom")
        .scrollIntoView({ block: "start", behavior: "smooth" });
    },
  },
};
</script>

<style lang="less" scoped>
.banner-wrapper {
  margin: 0 auto;
  color: #fff;
  .banner-content {
    background: url(../../assets/images/banner.png) no-repeat;
    position: relative;
    height: 400px;
    overflow: hidden;
    background-size: 100% 100%;
    border-radius: 20px;
    padding: 60px 40px;
    text-align: left;
    button {
      font-size: 24px;
      height: 50px;
    }
    .text-wrapper_1 {
      display: inline-block;
      height: 48px;
      margin-top: 60px;
      width: 120px;
      color: #fff;
      font-size: 18px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      line-height: 48px;
      background-color: #396fff;
      border-radius: 6px;
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
    .phone.banner-content {
      background: url(../../assets/images/phone-banner.png) no-repeat;
      background-size: 100% 100%;
      display: block;
      padding: 24px 0 0;
      text-align: center;
      height: 600px;
      position: relative;
      border-radius: 0;
      .logo {
        margin: 30px 0;
      }
      .text_1 {
        font-size: 24px;
        margin-bottom: 0;
        br {
          display: none;
        }
      }
      h4 {
        color: #fff;
        margin: 24px 0;
      }
      button {
        position: absolute;
        width: 273px;
        bottom: 24px;
        font-size: 20px;
        height: 42px;
        left: 50%;
        transform: translateX(-50%);
      }
      // background-size: 100%;
    }
  }
}
</style>