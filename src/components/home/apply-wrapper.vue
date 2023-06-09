<template>
  <div class="main-middle">
    <div class="middle-title">
      <h6>
        <strong>AIGC私有化部署已应用于个企业</strong>
      </h6>
      <h4>
        <strong>成为优质企业信赖之选</strong>
      </h4>
    </div>
    <div class="web middle-content content-width">
      <div
        v-for="(item, index) in applyList"
        :key="index"
        class="wow middle_li animate__animated"
        :class="{
          animate__fadeInTopLeft: index === 0,
          animate__fadeInBottomLeft: index === 2,
          animate__fadeInBottomRight: index === 1,
        }"
      >
        <div class="middle_left">
          <div class="left_img">
            <img :src="item.leftImg" :alt="item.title" />
          </div>
          <div class="left_con">
            <h4>
              <strong>{{ item.title }}</strong>
            </h4>
            <p class="text_desc">{{ item.desc }}</p>
          </div>
        </div>
        <div class="middle_right">
          <div
            v-for="(ele, index) in item.rightList"
            :key="index"
            class="right_li"
          >
            <img :src="ele.img" class="image" :alt="ele.title" />
            <div style="padding: 14px">
              <strong>{{ ele.title }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="phone middle-content content-width">
      <div
        v-for="(item, index) in applyList"
        :key="index"
        class="wow middle_li animate__animated"
        :class="{
          animate__fadeInTopLeft: index === 0,
          animate__fadeInBottomLeft: index === 2,
          animate__fadeInBottomRight: index === 1,
        }"
      >
        <div class="middle_left">
          <div class="left_img">
            <img :src="item.leftImg" :alt="item.title" />
          </div>
          <div class="left_con">
            <h6>
              <strong>{{ item.title }}</strong>
            </h6>
            <p class="text_desc">{{ item.desc }}</p>
          </div>
        </div>
        <div class="middle_right">
          <div
            v-for="(ele, index) in item.rightList"
            :key="index"
            class="right_li"
          >
            <img :src="ele.img" class="image" :alt="ele.title" />
            <div style="padding: 0 14px 14px">
              <strong>{{ ele.title }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WOW } from "wowjs";
export default {
  name: "apply-wrapper",
  props: {},
  components: {},
  data() {
    return {
      // 应用
      applyList: [
        {
          leftImg: require("../../assets/images/ai.png"),
          title: "智能客服",
          desc: "AIGC私有化部署，让企业更好的利用内部数据和知识库，提高智能客服的回答质量和满意度。",
          rightList: [
            {
              img: require("../../assets/images/ai_01.png"),
              title: "硬件公司",
            },
            {
              img: require("../../assets/images/ai_02.png"),
              title: "出海游戏",
            },
            {
              img: require("../../assets/images/ai_03.png"),
              title: "牙医门诊",
            },
          ],
        },
        {
          leftImg: require("../../assets/images/data.png"),
          title: "数据分析",
          desc: "保证企业数据全生命周期安全性，支持个性化数据分析，让企业对数据应用更灵活，更自在，更信任。",
          rightList: [
            {
              img: require("../../assets/images/data_01.png"),
              title: "汽车企业",
            },
            {
              img: require("../../assets/images/data_02.png"),
              title: "烟草企业",
            },
          ],
        },
        {
          leftImg: require("../../assets/images/work.png"),
          title: "办公助手",
          desc: "从海量文本中，归纳核心内容，提取结构化信息，帮助企业高效挖掘文本价值，构建个性化知识库。",
          rightList: [
            {
              img: require("../../assets/images/work_01.png"),
              title: "学术机构",
            },
            {
              img: require("../../assets/images/work_02.png"),
              title: "政务机构",
            },
            {
              img: require("../../assets/images/work_03.png"),
              title: "律师事务所",
            },
          ],
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
// 应用
.main-middle {
  width: 100%;
  // height: 1020px;
  background-color: #d6ebff;
  padding-bottom: 24px;
  .middle-title {
    height: 220px;
    font-size: 40px;
    font-family: PingFangSC-Semibold;
    text-align: center;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    letter-spacing: 4px;
  }
  .middle-content {
    // height: 780px;
    margin: 0 auto;
    .middle_li {
      width: 100%;
      height: 220px;
      margin-bottom: 20px;
      background-image: url(../../assets/images/applyBj.png);
      background-size: 100% 100%;
      overflow: hidden;
      border-radius: 12px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      transition: all 0.5s;
      .middle_left {
        width: 50%;
        height: 74%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: left;
        .left_img {
          img {
            width: 100px;
          }
        }
        .left_con {
          flex: 1;
          margin-left: 5%;
        }
      }
      .middle_right {
        width: 38%;
        // height: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 16px;
        .right_li {
          margin: 0 6px;
          .image {
            width: 90px;
          }
        }
      }
    }
    .middle_li:hover {
      transform: scale(1.05);
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

  .main-middle {
    .middle-title {
      display: block;
      height: 150px;
      padding-top: 50px;
    }
    .phone.middle-content {
      display: block !important;
      .middle_li {
        display: block !important;
        height: auto;
        background-image: none;
        .middle_left {
          width: 100%;
          background: #fff;
          padding: 12px;
          border-radius: 12px;
          .left_img {
            img {
              width: 50px;
            }
          }
        }
        .middle_right {
          width: 90%;
          background: #0f2658;
          border-radius: 0 0 30px 30px;
          margin: 0 5%;
          font-size: 13px;
          font-weight: bold;
          .right_li {
            img {
              width: 60px;
            }
          }
        }
      }
    }
  }
}
</style>