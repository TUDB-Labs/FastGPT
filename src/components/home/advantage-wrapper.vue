<template>
  <div class="main-middle01">
    <h4 class="middle01-title"><strong>我们的优势</strong></h4>
    <div class="web middle01-content">
      <div
        v-for="(item, index) in advantageList"
        :key="index"
        class="wow middle01_li animate__animated"
        :class="{
          animate__fadeInLeft: index % 2 === 0,
          animate__fadeInRight: index % 2 === 1,
        }"
      >
        <img class="middle01_l" :src="item.leftImg" :alt="'index' + index" />
        <div class="middle01_m">
          <img :src="item.lineImg" alt="line" />
        </div>
        <div class="middle01_r">
          <div class="left_img">
            <img :src="item.rightImg" :alt="item.title" />
          </div>
          <div class="left_con">
            <h4>
              <strong>{{ item.title }}</strong>
            </h4>
            <p class="text_desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="phone middle01-content">
      <div
        v-for="(item, index) in advantageList"
        :key="index"
        class="wow middle01_li animate__animated"
        :class="{
          animate__fadeInLeft: index % 2 === 0,
          animate__fadeInRight: index % 2 === 1,
        }"
      >
        <div class="middle01_l">
          <img :src="item.leftImg" :alt="'index' + index" />
          <span class="line"><img :src="item.lineImg" alt="line" /></span>
          <img :src="item.rightImg" :alt="item.title" />
        </div>
        <div class="middle01_r">
          <h4>
            <strong>{{ item.title }}</strong>
          </h4>
          <p class="text_desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WOW } from "wowjs";
export default {
  name: "advantage-wrapper",
  props: {},
  components: {},
  data() {
    return {
      //优势
      advantageList: [
        {
          leftImg: require("../../assets/images/advant1_01.png"),
          lineImg: require("../../assets/images/advant1_02.png"),
          rightImg: require("../../assets/images/advant1_03.png"),
          title: "完善的定制化模型解决方案",
          desc: "开源大模型数量众多，各模型的适用场景，配置要求及模型缺陷差异很大，中科知道通过近一年的测试，形成了完善的定制化模型解决方案",
        },
        {
          leftImg: require("../../assets/images/advant2_01.png"),
          lineImg: require("../../assets/images/advant2_02.png"),
          rightImg: require("../../assets/images/advant2_03.png"),
          title: "与知识图谱结合，有效提升模型可控性",
          desc: "将垂直领域知识图谱与大模型技术相结合，有效保留大模型能力，降低概率模型带来的不确定性，实现了专业领域中AIGC的真正商业化",
        },
        {
          leftImg: require("../../assets/images/advant3_01.png"),
          lineImg: require("../../assets/images/advant3_02.png"),
          rightImg: require("../../assets/images/advant3_03.png"),
          title: "知识蒸馏降低训练成本",
          desc: "通过通用大模型知识蒸馏，收集海量对话语料，为客户有效降低模型训练成本，中科知道定制化模型在细分领域准确率可达到90%",
        },
        {
          leftImg: require("../../assets/images/advant4_01.png"),
          lineImg: require("../../assets/images/advant4_02.png"),
          rightImg: require("../../assets/images/advant4_03.png"),
          title: "自研AIOS技术有效降低配置成本",
          desc: "通过自研AIOS技术，使用较低配置的显卡来解决算力不足的问题，有效降低中小企业大模型私有化部署硬件成本60%-80%",
        },
        {
          leftImg: require("../../assets/images/advant5_01.png"),
          lineImg: require("../../assets/images/advant5_02.png"),
          rightImg: require("../../assets/images/advant5_03.png"),
          title: "拥有领域顶尖技术专家",
          desc: "国际化的大模型专家团队与国内经验丰富的商业化运营团队携手推进大模型私有化部署，充分保障方案的商业化能力",
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
  methods: {},
};
</script>

<style lang="less" scoped>
// 优势
.main-middle01 {
  // height: 1100px;
  margin: 40px auto 0;
  background-color: #f3f3f3;
  padding: 0 15% 16px;
  .middle01-title {
    height: 130px;
    font-size: 2rem;
    font-family: PingFangSC-Semibold;
    text-align: center;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    letter-spacing: 4px;
  }
  .middle01-content {
    // height: 900px;
    margin: 0 auto;
    padding-bottom: 16px;
    // overflow: hidden;
    .middle01_li {
      width: 85%;
      // height: 150px;
      // padding: 24px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      //   transition: all 0.5s;
      .middle01_l {
        width: 7%;
      }
      .middle01_m {
        width: 15%;
      }
      .middle01_r {
        // width: 74%;
        padding: 24px 1.5rem;
        // height: 100%;
        background-color: #fff;
        border-radius: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: left;
        transition: all 0.5s;
        .left_img {
          // width: 12%;
          border-radius: 50%;
          img {
            display: block;
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
          }
        }
        .left_con {
          // width: 65%;
          margin-left: 1rem;
          h4 {
            margin-bottom: 0.8rem;
          }
        }
      }
    }
    // .middle01_li:hover {
    //   transform: scale(1.05);
    // }
  }
  .middle01_li:nth-child(2n) {
    margin-left: 13%;
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
  .main-middle01 {
    padding: 0 0% 16px;
    .middle01-title {
      height: 90px;
    }
  }
  .phone.middle01-content {
    display: block !important;
    display: flex;
    flex-direction: column;
    .middle01_li {
      background-color: #fff;
      border-radius: 8px;
      padding: 24px 12px;
      margin-left: 4% !important;
      width: 88% !important;
      margin-bottom: 20px;
      align-items: self-start !important;
      .middle01_l {
        width: 50px !important;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 30px;
        }
        .line {
          transform: rotate(90deg);
          flex: 1;
          margin: 6px 0;
        }
      }
      .middle01_r {
        flex: 1;
        width: auto !important;
        height: auto !important;
        display: block !important;
        border-radius: 0 !important;
        padding: 0 0;
        h4 {
          // font-size: 16px;
        }
      }
    }
    .middle01_li:nth-child(2n) {
      margin-left: 8% !important;
    }
  }
}
</style>