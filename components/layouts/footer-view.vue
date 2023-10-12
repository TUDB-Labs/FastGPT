<template>
  <footer>
    <div
      class="content content-width"
      :class="{ pdf: $route.path.indexOf('/pdf-view') > -1 }"
    >
      <h2 class="logo">
        <span class="company-name text-bold">中科知道</span>
        <span class="deliver">I</span>
        AIGC
      </h2>
      <div class="weixin">
        <img
          src="https://cdn.tudb.work/aios/web/images/new_code.png"
          style="width: 10rem; height: 10rem"
          alt="微信公众号"
        />
        <p class="tips">
          关注<span>中科知道</span> 微信公众号<br />获取更多资讯
        </p>
      </div>
      <div class="web footer-info">
        <div v-for="(item, index) in infoList" :key="index">
          <a
            v-if="item.key === '备案'"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802042559"
            target="_blank"
            >{{ item.content }}</a
          >
          <span v-else>{{ item.content }}</span>
        </div>
      </div>
      <div class="phone footer-info">
        <div>Copyright 2019-2023 中科知道（北京）科技有限公司 版权所有</div>
        <div>
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802042559"
            target="_blank"
            >京ICP备 2022018609号-5</a
          >
        </div>
        <div>
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802042559"
            target="_blank"
            >京公网安备 11010802042584号</a
          >
        </div>
        <div>电子营业执照</div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footer-view",
  props: {},
  components: {},
  data() {
    return {
      //底部信息
      infoList: [
        {
          content: "关于中科知道",
          key: "",
        },
        {
          content: "Copyright 2019-2023 中科知道（北京）科技有限公司 版权所有",
          key: "",
        },
        {
          content:
            "京ICP备2022018609号-5 京公网安备 11010802042584号 电子营业执照",
          key: "备案",
        },
        {
          content: "地址：北京市大兴区经济开发区科苑路9号3号楼三层T024室",
          key: "",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>

<style scoped lang="less">
footer {
  // height: 170px;
  background-color: #e1dee6;
  color: #16284f;
  padding: 1.6rem 0;
  .logo {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    margin-bottom: 0;
    font-weight: 550;
    .company-name {
      font-size: 1.2rem;
      transform: skewX(-6deg) scaleY(1.2);
      margin-right: 3px;
      color: #16264a;
    }
  .deliver {
    font-weight: 300;
    margin: 0 0.5rem
  }
  }
  .content {
    margin: 0 auto;
    height: 100%;
    display: flex;
    margin: 0 auto;
    // width: 96% !important;
    justify-content: space-between;
    align-items: center;
    &.pdf {
      padding: 0 7.5vw;
    }
    .footer-info {
      flex: 1;
      text-align: right;
      font-size: 0.7rem;
      a {
        text-decoration: none;
        color: #16284f;
      }
    }
  }
}
@media (min-width: 767px) {
  .web {
    display: block !important;
  }
  .weixin {
    display: none;
  }
  .phone {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .web {
    display: none !important;
  }
  footer {
    background-color: #182a52;
    .content {
      display: block;
      text-align: center;
      .logo {
        display: none;
      }
      .footer-info {
        color: #4a5c84;
        text-align: center;
        margin-top: 12px;
        a {
          color: #4a5c84;
        }
      }
      .tips {
        font-size: 1.6rem;
        color: #fff;
        margin: 16px 0;
        span {
          color: #f5b228;
        }
      }
    }
  }
}
</style>