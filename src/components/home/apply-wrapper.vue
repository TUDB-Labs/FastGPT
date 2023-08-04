<template>
  <div class="main-middle">
    <div class="middle-title">
      <p class="one">
        <strong>AIGC私有化部署已应用于多个企业</strong>
      </p>
      <p>
        <strong>成为优质企业信赖之选</strong>
      </p>
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
          leftImg: "https://cdn.tudb.work/aios/web/images/ai.png",
          title: "智能客服",
          desc: "AIGC私有化部署，让企业更好的利用内部数据和知识库，提高智能客服的回答质量和满意度",
          rightList: [
            {
              img: "https://cdn.tudb.work/aios/web/images/ai_01.png",
              title: "硬件公司",
            },
            {
              img: "https://cdn.tudb.work/aios/web/images/ai_02.png",
              title: "出海游戏",
            },
            {
              img: "https://cdn.tudb.work/aios/web/images/ai_03.png",
              title: "牙医门诊",
            },
          ],
        },
        {
          leftImg: "https://cdn.tudb.work/aios/web/images/data.png",
          title: "数据分析",
          desc: "保证企业数据全生命周期安全性，支持个性化数据分析，让企业对数据应用更灵活，更自主，更信任",
          rightList: [
            {
              img: "https://cdn.tudb.work/aios/web/images/data_01.png",
              title: "汽车企业",
            },
            {
              img: "https://cdn.tudb.work/aios/web/images/data_02.png",
              title: "烟草企业",
            },
          ],
        },
        {
          leftImg: "https://cdn.tudb.work/aios/web/images/work.png",
          title: "办公助手",
          desc: "从海量文本中，归纳核心内容，提取结构化信息，帮助企业高效挖掘文本价值，构建个性化知识库",
          rightList: [
            {
              img: "https://cdn.tudb.work/aios/web/images/work_01.png",
              title: "学术机构",
            },
            {
              img: "https://cdn.tudb.work/aios/web/images/work_02.png",
              title: "政务机构",
            },
            {
              img: "https://cdn.tudb.work/aios/web/images/work_03.png",
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
  background-color: #f3f3f3;
  padding-bottom: 24px;
  .middle-title {
    height: 12rem;
    font-size: 2rem;
    text-align: center;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    letter-spacing: 4px;
    .one {
    }
  }
  .middle-content {
    // height: 780px;
    margin: 0 auto;
    // padding: 0 20vw;
    .middle_li {
      width: 100%;
      height: 10rem;
      margin-bottom: 20px;
      // background-image: url(https://cdn.tudb.work/aios/web/images/applyBj.png);
      background-image: url(~@/assets/images/applyBj.png);
      background-size: 100% 100%;
      overflow: hidden;
      border-radius: 0.3rem;
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
            width: 4rem;
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
        // color: #fff;
        font-size: 1rem;
        .right_li {
          margin: 0 6px;
          .image {
            width: 4rem;
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
      height: 11rem;
      padding-top: 50px;
      .one {
        font-size: 1.2rem;
      }
    }
    .phone.middle-content {
      display: block !important;

      padding: 0 3vw;
      .middle_li {
        display: block !important;
        height: auto;
        background-image: none;
        .middle_left {
          width: 100%;
          background: #fff;
          padding: 2rem 1rem;
          border-radius: 0.3rem;
          .left_img {
            img {
              width: 3.5rem;
            }
          }
          h4 {
            font-size: 1.4rem;
            // font-size: 2rem !important;
          }
        }
        .middle_right {
          width: 90%;
          background: #e6e6e6;
          border-radius: 0 0 0.4rem 0.4rem;
          margin: 0 5%;
          // font-size: 13px;
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