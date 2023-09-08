<template>
  <div class="layout">
    <!-- 头部 -->
    <HeaderView v-if="$route.path.indexOf('share') === -1" />
    <router-view />
    <!-- 底部 -->
    <!-- 不是手机端 是手机但是不是法律-->
    <FooterView v-if="this.$route.path === '/'" />
    <controls v-if="$route.path.indexOf('/pdf-view') === -1" />
  </div>
</template>

<script>
import HeaderView from "@/components/layouts/header-view.vue";
import FooterView from "@/components/layouts/footer-view.vue";
import { insertPvVu } from "@/api/request.js";
import Controls from "./components/controls.vue";
import jsonp from "jsonp";
import BrowserLogger from "alife-logger";
export default {
  name: "App",
  components: { HeaderView, FooterView, Controls },
  data() {
    return {};
  },
  created() {
    // 统计 pv
    BrowserLogger.singleton({
      pid: "ggi9bf8kwx@711bf2e52a0fb4c",
      appType: "web",
      imgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
      sendResource: true,
      enableLinkTrace: true,
      behavior: true,
    });

    this.webSubmit();
  },
  mounted() {},
  beforeDestroy() {},
  computed: {
    isPhone() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    },
  },
  watch: {},
  methods: {
    // 整站记录
    //pv/uv相关
    webSubmit() {
      jsonp("https://api.ipify.org?format=jsonp", (err, data) => {
        if (err) {
          // 处理错误
          console.error(err);
        } else {
          // 处理返回的数据
          this.ipAddress = data.ip.trim().replace("\n", "");
          if (this.ipAddress) {
            let params = {
              recordPv: this.ipAddress,
            };
            insertPvVu(params)
              .then(() => {})
              .catch((error) => {
                console.log(error);
              });
          }
          console.log(data);
        }
      });
      // 获取ip
      // getIp()
      //   .then((res) => {
      //     this.ipAddress = res.trim().replace("\n", "");
      //     if (this.ipAddress) {
      //       let params = {
      //         recordPv: this.ipAddress,
      //       };
      //       insertPvVu(params)
      //         .then(() => {})
      //         .catch((error) => {
      //           console.log(error);
      //         });
      //     }
      //   })
      //   .catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  // font-family: 微软雅黑, Arial, sans-serif;
  // font-family: Noto Sans S Chinese;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body,
/deep/p {
  margin: 0;
  padding: 0;
}
/deep/ h4 {
  color: #000;
}
// 通用按钮
/deep/ button.btn-secondary {
  background: #254cd8;
  border-color: #254cd8;
  color: #fff !important;
  border-radius: 0.3rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  // padding: 6px 24px;
  font-weight: 400;

  &:hover {
    background-color: #254cd8;
    border-color: transparent;
  }

  &:focus {
    background-color: #254cd8;
    border-color: transparent;
    box-shadow: none;
  }
}

.main-body {
}

/deep/button.dark-btn {
  background: #192a51;
  border-color: #192a51;

  &:hover {
    background-color: #192a51;
    border-color: #192a51;
    // color: #000;
  }

  &:focus {
    background-color: #192a51;
    border-color: #192a51;
    box-shadow: none;
    // color: #000;
  }
}

/deep/ button.btn-outline-primary {
  // background: #254cd8;
  // border-color: #254cd8;
  color: #254cd8 !important;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.9rem;
  // padding: 6px 24px;
  font-weight: 400;

  &:hover {
    background-color: #fff;
    border-color: #254cd8;
    color: #000;
  }

  &:focus {
    background-color: #fff;
    border-color: #254cd8;
    box-shadow: none;
    color: #000;
  }
}

/deep/.text_desc {
  font-size: 0.4rem;
  color: #000;
}

// 通用标题
/deep/ .text_1 {
  width: 600px;
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 54px;
  font-family: PingFangSC-Semibold;
  text-align: left;
  white-space: nowrap;
  overflow-wrap: break-word;
  letter-spacing: 4px;
}
/deep/ .text_2 {
  width: 260px;
  font-size: 24px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 86px;
}

/deep/.content-width {
  padding: 0 12vw;
}

@media (max-width: 1000px) {
  /deep/ .content-width {
    padding: 0 3vw;
  }
}
</style>
