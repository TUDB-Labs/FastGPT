<template>
  <div class="our-advantage main-middle01 content-width">
    <h4 class="middle01-title"><strong>我们的优势</strong></h4>
    <el-row class="middle01-content" :gutter="20">
      <el-col
        v-for="(item, index) in advantageList"
        :key="index"
        :span="8"
        class="wow middle01_li animate__animated"
        :class="{
          animate__fadeInLeft: index % 2 === 0,
          animate__fadeInRight: index % 2 === 1,
        }"
      >
        <div class="left_img">
          <img :src="item.rightImg" :alt="item.title" />
        </div>
        <div class="middle01_r">
          <div class="left_con">
            <h6>
              <strong>{{ item.title }}</strong>
            </h6>
            <p class="text_desc">{{ item.desc }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
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
          leftImg: "https://cdn.tudb.work/aios/web/images/advant1_01.png",
          lineImg: "https://cdn.tudb.work/aios/web/images/advant1_02.png",
          rightImg: "https://cdn.tudb.work/aios/web/images/advant1_03.png",
          title: "完善的定制化模型解决方案",
          desc: "开源大模型数量众多，各模型的适用场景，配置要求及模型缺陷差异很大，中科知道通过近一年的测试，形成了完善的定制化模型解决方案",
        },
        {
          leftImg: "https://cdn.tudb.work/aios/web/images/advant2_01.png",
          lineImg: "https://cdn.tudb.work/aios/web/images/advant2_02.png",
          rightImg: "https://cdn.tudb.work/aios/web/images/advant2_03.png",
          title: "与知识图谱结合，有效提升模型可控性",
          desc: "将垂直领域知识图谱与大模型技术相结合，有效保留大模型能力，降低概率模型带来的不确定性，实现了专业领域中AIGC的真正商业化",
        },
        {
          leftImg: "https://cdn.tudb.work/aios/web/images/advant3_01.png",
          lineImg: "https://cdn.tudb.work/aios/web/images/advant3_02.png",
          rightImg: "https://cdn.tudb.work/aios/web/images/advant3_03.png",
          title: "知识蒸馏降低训练成本",
          desc: "通过通用大模型知识蒸馏，收集海量对话语料，为客户有效降低模型训练成本，中科知道定制化模型在细分领域准确率可达到90%",
        },
        {
          leftImg: "https://cdn.tudb.work/aios/web/images/advant4_01.png",
          lineImg: "https://cdn.tudb.work/aios/web/images/advant4_02.png",
          rightImg: "https://cdn.tudb.work/aios/web/images/advant4_03.png",
          title: "自研AIOS技术有效降低配置成本",
          desc: "通过自研AIOS技术，使用较低配置的显卡来解决算力不足的问题，有效降低中小企业大模型私有化部署硬件成本60%-80%",
        },
        {
          leftImg: "https://cdn.tudb.work/aios/web/images/advant5_01.png",
          lineImg: "https://cdn.tudb.work/aios/web/images/advant5_02.png",
          rightImg: "https://cdn.tudb.work/aios/web/images/advant5_03.png",
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
  margin: 0rem auto 2rem;
  background-color: #f3f3f3;
  padding-top: 3rem;
  .middle01-title {
    height: 5rem;
    font-size: 2rem;
    font-family: PingFangSC-Semibold;
    text-align: center;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    letter-spacing: 4px;
    // margin-top: 2rem;
  }
  .middle01-content {
    // height: 900px;
    margin: 2rem auto 0;
    padding-bottom: 0.8rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    // overflow: hidden;
    .middle01_li {
      // width: 33%;
      // height: 150px;
      // padding: 24px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 50px;
      position: relative;
      //   transition: all 0.5s;
      .middle01_l {
        // width: 7%;
      }
      .middle01_m {
        width: 15%;
      }
      .left_img {
        // width: 12%;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -39%);
        img {
          // display: block;
          width: 4rem;
          // height: 5rem;
          border-radius: 50%;
        }
      }
      .middle01_r {
        // width: 74%;
        padding: 1rem;
        // height: 100%;
        background-color: #fff;
        border-radius: 0.3rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: left;
        transition: all 0.5s;
        .left_con {
          // width: 65%;
          // margin-left: 1rem;
          margin-top: 2.7rem;
          text-align: center;
          h4 {
            margin-bottom: 0.8rem;
          }
        }
        .text_desc {
          // font-size: 1.08rem;
          margin-top: 1rem;
        }
      }
    }
    // .middle01_li:hover {
    //   transform: scale(1.05);
    // }
  }
  // .middle01_li:nth-child(2n) {
  //   margin-left: 13%;
  // }
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
  .main-middle01 {
    padding: 0 0% 16px;
    .middle01-title {
      height: 90px;
    }
    .middle01-content {
      display: block !important;
      padding: 0 3vw;
      margin-left: 0 !important;
      margin-right: 0 !important;
      .middle01_li {
        background-color: #fff;
        border-radius: 0.3rem;
        // padding: 24px 12px;
        padding: 0.8rem 1.2rem 1.8rem !important;
        width: 100%;
        .left_img {
          transform: translate(-50%, -50%);
        }
        h6 {
          font-size: 1.35rem;
        }
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
          .text_desc {
            font-size: 1.08rem;
            text-align: left;
            // margin-top: 2rem;
          }
          h4 {
            // font-size: 16px;
          }
        }
      }
    }
  }
}
</style>