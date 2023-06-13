<template>
  <div id="app" :class="[platform]">
    <!-- 头部 -->
    <HeaderView />
    <router-view />
    <!-- 底部 -->
    <FooterView />
    <div v-if="isShowGoTop" class="go-top">
      <div id="popover-target-top" class="item">
        <img src="@/assets/images/phone-1.png" alt="phone1" />
      </div>
      <div class="item" @click="goTop">
        <img src="@/assets/images/go-top.png" alt="go-top" />
      </div>
      <b-popover target="popover-target-top" triggers="hover" placement="left">
        <div class="pop-content">
          <img src="@/assets/images/phone-2.png" alt="微信公众号" />
          <div>
            <p style=""><strong>联系销售</strong></p>
            <p @click="gotel('010-87968357')">010-87968357</p>
            <p @click="gotel('010-69835689')">010-69835689</p>
          </div>
        </div>
      </b-popover>
    </div>
  </div>
</template>

<script>
import HeaderView from "@/components/layouts/header-view.vue";
import FooterView from "@/components/layouts/footer-view.vue";
export default {
  name: "App",
  components: { HeaderView, FooterView },
  data() {
    return {
      platform: "admin-web",
      isShowGoTop: false,
    };
  },
  created() {
    this.setPlatform(document.body.offsetWidth);
    window.onresize = () => {
      this.setPlatform(document.body.offsetWidth);
    };
  },
  mounted() {
    window.onscroll = () => {
      this.isShowGoTop =
        (document.body.scrollTop || document.documentElement.scrollTop) > 10;
    };
  },
  beforeDestroy() {
    window.onscroll = null;
  },
  watch: {},
  methods: {
    setPlatform(offsetWidth) {
      if (offsetWidth < 1100) {
        this.platform = "admin-phone";
      } else {
        this.platform = "admin-web";
      }
    },
    goTop() {
      var top = document.body.scrollTop || document.documentElement.scrollTop;
      scrollTo(0, 0);
      this.animateGoTop(top);
    },
    animateGoTop(top) {
      window.requestAnimationFrame(() => {
        top -= 100;
        if (top <= 0) top = 0;
        scrollTo(0, top);
        if (top === 0) return;
        this.animateGoTop(top);
      });
    },
    gotel(phoneNumber) {
      if (!/mobile/i.test(navigator.userAgent)) return;
      window.location.href = "tel:" + phoneNumber;
    },
  },
};
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.go-top {
  position: fixed;
  top: 75%;
  right: 12px;
  z-index: 9999;
  .item {
    width: 45px;
    height: 45px;
    padding: 7.5px;
    background: #ffffff;
    box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.22);
    border-radius: 50%;
    margin: 12px 0;
    // box-sizing: content-box;
    img {
      width: 30px;
      height: 30px;
    }
  }
}
/deep/.pop-content {
  display: flex;
  font-size: 1.33rem;
  img {
    margin-right: 6px;
    width: 20px;
    height: 20px;
  }
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
/deep/ button {
  background: #254cd8;
  border-color: #254cd8;
  color: #fff !important;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 1.2rem;
  padding: 6px 24px;
  font-weight: 400;

  &:hover {
    background-color: #1e83ff;
    border-color: transparent;
  }

  &:focus {
    background-color: #254cd8;
    border-color: transparent;
    box-shadow: none;
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
