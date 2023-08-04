<template>
  <div class="wrapper">
    <!-- 头部 -->
    <!-- <HeaderView /> -->
    <!-- 主体 -->
    <main class="content">
      <!-- 1V1咨询/DEMO体验 -->
      <BannerWrapper @buttonClick="buttonClick" />
      <!-- DEMO体验 -->
      <DemoWrapper @buttonClick="buttonClick" />
      <!-- 优势 -->
      <AdvantageWrapper />
      <!-- 团队介绍 -->
      <TeamIntroduction />
      <!-- 应用 -->
      <ApplyWrapper />
      <!-- 联系我们 -->
      <ContactWrapper @buttonClick="buttonClick" />
    </main>
    <!-- 底部 -->
    <!-- <FooterView /> -->
  </div>
</template>
<script>
// import HeaderView from "@/components/layouts/header-view.vue";
// import FooterView from "@/components/layouts/footer-view.vue";
import BannerWrapper from "@/components/home/banner-wrapper.vue";
import DemoWrapper from "@/components/home/demo-wrapper.vue";
import AdvantageWrapper from "../components/home/advantage-wrapper.vue";
import ApplyWrapper from "../components/home/apply-wrapper.vue";
import ContactWrapper from "../components/home/contact-wrapper.vue";
import { insertClickrecord } from "@/api/request.js";
import TeamIntroduction from "../components/home/team-Introduction.vue";
export default {
  components: {
    // FooterView,
    // HeaderView,
    BannerWrapper,
    DemoWrapper,
    AdvantageWrapper,
    ApplyWrapper,
    ContactWrapper,
    TeamIntroduction,
  },
  name: "home",
  data() {
    return {
      //专家
      hideRequired: true, //必填标识
      ruleForm: {
        phoneNumber: "",
        problem: "",
      },
      //demo弹窗
      dialogTableVisible: false,
      visible: false,
      platform: "web",
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 敬请期待
    demoVisible() {
      //   this.dialogTableVisible = true;
    },
    //按钮点击记录
    buttonClick(val) {
      let params = {
        clickedItem: val,
        clickedCookie: this.$cookies.get("token"),
      };
      insertClickrecord(params)
        .then(() => {})
        .catch(() => {});
    },
  },
};
</script>

<style scoped lang="less">
.wrapper {
  .content {
    width: 100%;
    height: auto;
    color: #000;
    text-align: center;
  }
}
</style>