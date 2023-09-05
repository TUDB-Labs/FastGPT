<template>
  <div class="banner-wrapper">
    <div class="web banner-content content-width">
      <p class="main-title" style="font-size: 2.2rem; line-height: 40px">
        <strong>生成式AI企业级解决方案</strong>
      </p>
      <p class="tips" style="margin: 1.2rem 0 3rem">高性能，低成本，可定制</p>
      <b-button @click="startBtn">
        <span>获取解决方案</span>
        <img src="@/assets/images/url-send.png" alt="">
      </b-button>
    </div>
    <div class="phone banner-content">
      <div class="logo">
        <span class="company-name text-bold"> <strong>中科知道</strong> </span>
        <el-divider direction="vertical"></el-divider>
        <span> <strong>AIGC</strong> </span>
      </div>
      <!-- <img src="https://cdn.tudb.work/aios/web/images/zd_logo.png" class="logo" alt="logo" /> -->
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
  margin: 0 auto 1rem;
  color: #fff;
  .banner-content {
    background: url(https://cdn.tudb.work/aios/web/images/banner.png) no-repeat;
    // background: url(~@/assets/images/banner.png) no-repeat;
    position: relative;
    height: 21rem;
    overflow: hidden;
    background-size: 100% 100%;
    // border-radius: 20px;
    padding-top: 4.8rem;
    text-align: left;
    .main-title {
      color: #254cd8;
    }
    .tips {
      color: #000;
    }
    button {
      height: 2.8rem;
      width: 24.5rem;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
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
    padding: 0;
    color: #000;
    .phone.banner-content {
      // background: url(https://cdn.tudb.work/aios/web/images/phone-banner.png)
      //   no-repeat;
      background: url(~@/assets/images/phone-banner.png) no-repeat;
      background-size: 100% 100%;
      display: block;
      padding: 24px 0 0;
      text-align: center;
      height: 600px;
      position: relative;
      border-radius: 0;
      .logo {
        // margin: 30px 0;
      }
      h4 {
        color: #254cd8;
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

  .logo {
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #15274f;
    cursor: pointer;
    .company-name {
      font-style: italic;
      font-size: 1.7rem;
      transform: scaleY(1.1);
      margin-right: 3px;
      color: #16264a;
    }
    .el-divider {
      height: 1.2rem;
      background-color: #313131;
    }
  }
}
</style>