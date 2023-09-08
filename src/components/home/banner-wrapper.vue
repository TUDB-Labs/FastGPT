<template>
  <div class="banner-wrapper">
    <div class="web banner-content content-width">
      <div style="margin-left: 1.5rem">
        <p class="main-title" style="font-size: 2.5rem; line-height: 40px">
          <strong>生成式AI企业级解决方案</strong>
        </p>
        <div class="tips">高性能，低成本，可定制</div>
        <b-button @click="startBtn">
          <span>获取解决方案</span>
          <img src="@/assets/images/send-fill.png" alt="" />
        </b-button>
      </div>
      <el-row :gutter="24" class="card-list content-width">
        <el-col v-for="item in cardList" class="" :key="item.label" :span="8">
          <div class="item">
            <img src="" alt="" />
            <div class="info">
              <el-row class="name">{{ item.label }}</el-row>
              <el-row class="desc">{{ item.desc }}</el-row>
            </div>
          </div>
        </el-col>
      </el-row>
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
      <b-button @click="startBtn"><strong>获取解决方案</strong></b-button>
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
      cardList: [
        {
          label: "定制企业级AI解决方案",
          desc: "结合领域专业数据或企业私有数据，微调 LLM，打造符合企业个性化需求的AI解决方案",
          icon: "ai",
        },
        {
          label: "AI核心能力",
          desc: "不同业务场景下，将AI对话，AI写作，AI分析，AI绘图能力高效落地",
          icon: "ai",
        },
        {
          label: "私有化部署",
          desc: "快速部署一个类似于ChatGPT的企业级 LLM应用，保证企业数据的安全性和隐私性",
          icon: "ai",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
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
    }
    .tips {
      color: #000;
      font-size: 1.2rem;
      margin: 0.9rem 0 4.8rem;
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
    .card-list {
      position: absolute;
      width: 100%;
      bottom: -3rem;
      left: 0;
      color: #000;
      z-index: 1;
      .item {
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
        border-radius: 0.5rem;
        padding: 1rem 1.2rem;
        display: flex;
        .info {
          .name {
            font-weight: 550;
            font-size: 1.2rem;
          }
          .desc {
            font-size: 0.75rem;
            color: #254cd8;
            margin-top: 0.5rem;
            position: relative;
            padding-left: 1rem;
            font-weight: 550;
            &::before {
              content: "";
              // display: inline-block;
              position: absolute;
              left: 0;
              top: 0.3rem;
              width: 0.4rem;
              border-radius: 0.3rem;
              height: 1.8rem;
              background-color: #254cd8;
            }
          }
        }
      }
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