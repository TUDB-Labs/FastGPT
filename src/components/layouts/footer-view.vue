<template>
  <footer>
    <div class="content content-width">
      <div class="logo">
        <img
          src="https://cdn.tudb.work/aios/web/images/zd_logo.png"
          alt="logo"
          @click="() => $router.push('/')"
        />
      </div>
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
      <div class="footer-info">
        <div v-for="(item, index) in infoList" :key="index">
          <a
            v-if="item.key === '备案'"
            href="https://beian.miit.gov.cn"
            target="_blank"
            >{{ item.content }}</a
          >
          <span v-else>{{ item.content }}</span>
        </div>
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
            "京ICP备XXXX1111号-2 京公网安备 XXXX0000007777号 电子营业执照",
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
  padding: 36px 0;
  .logo {
    img {
      width: 170px;
    }
  }
  .content {
    margin: 0 auto;
    height: 100%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    .footer-info {
      flex: 1;
      text-align: right;
      font-size: 13px;
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