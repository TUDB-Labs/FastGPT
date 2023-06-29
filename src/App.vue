<template>
  <div id="app" :class="[platform]">
    <!-- 头部 -->
    <HeaderView />
    <router-view />
    <!-- 底部 -->
    <FooterView />
    <controls />
  </div>
</template>

<script>
import HeaderView from "@/components/layouts/header-view.vue";
import FooterView from "@/components/layouts/footer-view.vue";
import { getIp, insertPvVu } from "@/api/request.js";
import Controls from "./components/controls.vue";
export default {
  name: "App",
  components: { HeaderView, FooterView, Controls },
  data() {
    return {
      platform: "admin-web",
    };
  },
  created() {
    this.setPlatform(document.body.offsetWidth);
    window.onresize = () => {
      this.setPlatform(document.body.offsetWidth);
    };
    this.webSubmit();
  },
  mounted() {},
  beforeDestroy() {},
  watch: {},
  methods: {
    // 整站记录
    //pv/uv相关
    webSubmit() {
      // 获取ip
      getIp()
        .then((res) => {
          this.ipAddress = res.trim().replace("\n", "");
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
        })
        .catch(() => {});
    },
    setPlatform(offsetWidth) {
      if (offsetWidth < 1100) {
        this.platform = "admin-phone";
      } else {
        this.platform = "admin-web";
      }
    },
  },
};
</script>

<style lang="less" scoped>
#app {
  font-family: Noto Sans S Chinese;
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
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 1rem;
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
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 1rem;
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
  font-size: 13px;
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

.admin-web {
  /deep/.content-width {
    width: 70%;
  }
}
.admin-phone {
  /deep/ .content-width {
    width: 90%;
  }
}
</style>
