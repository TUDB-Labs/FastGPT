<template>
  <div class="banner-wrapper content-width">
    <div class="web banner-content">
      <p class="" style="font-size: 2.2rem; line-height: 40px">
        <strong>AIGC<br />企业私有化部署方案</strong>
      </p>
      <p style="margin: 24px 0 60px"><strong>高安全，低成本，可定制</strong></p>
      <b-button @click="startBtn">免费1V1咨询</b-button>
    </div>
    <div class="phone banner-content">
      <h3 class="" style="">
        <span style="font-style: italic">中科知道</span>

        <strong
          ><span
            style="
              font-size: 1.3rem;
              margin: 0 8px;
              position: relative;
              top: -4px;
            "
            >|</span
          >AIGC</strong
        >
      </h3>
      <!-- <img src="@/assets/images/zd_logo.png" class="logo" alt="logo" /> -->
      <h4 class="" style="font-size: 2.3rem">
        <strong>AIGC企业私有化<br />部署方案</strong>
      </h4>
      <h4 class="">高安全，低成本，可定制</h4>
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
      height: 50px;
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
      h4 {
        color: #fff;
        margin: 24px 0;
      }
      button {
        position: absolute;
        width: 273px;
        bottom: 24px;
        font-size: 1.3rem;
        height: 42px;
        left: 50%;
        transform: translateX(-50%);
      }
      // background-size: 100%;
    }
  }
}
</style>