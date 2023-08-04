<template>
  <header
    class="content-width"
    :class="{ pdf: $route.path.indexOf('/pdf-view') > -1 }"
  >
    <div class="web flex-row">
      <!-- <div class="logo" @click="() => $router.push('/')">
        <img
          src="https://cdn.tudb.work/aios/web/images/zd_logo.png"
          alt="logo"
        />
      </div> -->
      <div class="logo pointer" @click="$router.push('/')">
        <span class="company-name text-bold"> <strong>中科知道</strong> </span>
        <el-divider direction="vertical"></el-divider>
        <span> <strong>AIGC</strong> </span>
      </div>
      <div v-if="curPath === '/'" class="tabs">
        <span class="item" @click="goPosition('.demo-wrapper')">DEMO 体验</span>
        <span class="item" @click="goPosition('.our-advantage')">技术优势</span>
        <span class="item" @click="goPosition('.team-introduction')"
          >团队介绍</span
        >
      </div>
      <!-- <img id="popover-target-1" src="https://cdn.tudb.work/aios/web/images/weixin01.png" alt="" /> -->
      <div class="actions">
        <b-button
          v-if="
            [
              '/law',
              '/buy-car',
              '/pdf-upload',
              '/natural-gas',
              '/dental-consultation',
            ].includes(curPath) || curPath.indexOf('/pdf-view') > -1
          "
          class="dark-btn"
          @click="goGuidance"
        >
          立即咨询
        </b-button>
        <b-button v-else id="popover-target-1" class="fllow dark-btn" style="">
          <span class="" style="margin-right: 3px">关注我们</span>
          <img
            id="popover-target-1"
            src="https://cdn.tudb.work/aios/web/images/weixin1.png"
            alt=""
          />
        </b-button>
        <b-popover
          target="popover-target-1"
          triggers="hover"
          placement="bottom"
        >
          <img
            src="https://cdn.tudb.work/aios/web/images/code2.png"
            style="width: 155px; height: 196px"
            alt="微信公众号"
          />
        </b-popover>
        <span v-if="userInfo.phoneNumber" class="user-info">
          <!-- 欢迎：{{ userInfo.phoneNumber }} -->
          <span class="loginout" slot="reference" @click="onLoginout">
            <img src="@/assets/images/loginout.png" alt="" />退出
          </span>
        </span>
        <b-button
          v-else
          class="login-btn"
          variant="outline-primary"
          @click="showLoginModal"
          >登录</b-button
        >
      </div>
    </div>
    <div class="phone flex-row">
      <img src="https://cdn.tudb.work/aios/web/images/zd_logo.png" alt="logo" />
    </div>
    <login-modal ref="loginModal" @success="loginSuccess" />
  </header>
</template>

<script>
import LoginModal from "./login-modal.vue";
import { mapGetters, mapActions } from "vuex";
import showToast from "@/utils/toast.js";
import eventBus from "@/utils/event-bus.js";
export default {
  name: "header-view",
  props: {},
  components: { LoginModal },
  data() {
    return {
      // 当前路由
      curPath: "",
    };
  },
  created() {
    this.curPath = this.$route.path;
    // 判断当前是否登录且是否过期超过7天
    // 如果已过期，退出登录
    if (
      this.userInfo.expirationTime &&
      this.userInfo.expirationTime < new Date().getTime()
    ) {
      this.setUserInfo({});
    }

    window.onstorage = (event) => {
      if (event.storageArea === localStorage && event.key === "userInfo") {
        // LocalStorage 发生变化
        this.setUserInfo(JSON.parse(event.newValue));
      }
    };
  },
  mounted() {},
  watch: {
    "$route.path"() {
      this.curPath = this.$route.path;
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    ...mapActions(["setUserInfo", "setToken"]),
    goGuidance() {
      this.$router.push("/expert");
    },
    showLoginModal() {
      this.$refs.loginModal.show();
    },
    onLoginout() {
      this.$confirm("是否要退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          showToast({
            content: "退出登录成功",
            type: "success",
          });
          this.setUserInfo({});
          this.setToken("");
          eventBus.$emit("loginOut");
        })
        .catch(() => {});
    },
    loginSuccess() {
      eventBus.$emit("logined");
      // this.userInfo = userInfo;
    },
    goPosition(className) {
      document.querySelector(className).scrollIntoView({
        block: "start",
        behavior: "smooth",
        // inline: "start",
      });
    },
  },
};
</script>

<style lang="less" scoped>
header {
  height: 3rem;
  color: #000;
  text-align: center;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 5;
  margin: 0 auto;
  border-bottom: 1px solid #f3f3f3;
  &.pdf {
    padding: 0 7.5vw;
  }
  .user-info {
    color: #192a51;
    font-weight: bold;
    margin-left: 1rem;
  }
  button.login-btn {
    margin-left: 1rem;
    // padding: 0.4rem 2rem !important;
    border-color: #192a51;
    color: #192a51 !important;

    &:hover {
      border-color: #192a51 !important;
      color: #192a51 !important;
    }

    &:focus {
      background: transparent !important;
      border-color: #192a51;
      box-shadow: none;
      color: #192a51 !important;
    }
  }
  .loginout {
    margin-left: 0.5rem;
    cursor: pointer;
    img {
      width: 1.2rem;
      margin-top: -3px;
    }
  }
}

.tabs {
  display: flex;
  font-size: 0.9rem;
  .item {
    margin: 0 0.7rem;
    cursor: pointer;
    color: #192a51;
    &:hover {
      font-weight: 550;
      // color: #254cd8;
    }
  }
}
.actions {
  width: 16rem;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & > button {
    padding: 4px 0px !important;
    font-size: 0.8rem !important;
    width: 6rem;
  }
}
.flex-row {
  height: 3rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  text-align: left;
  width: 16rem;
  // width: 8rem;
  // height: 30px;
}
.logo {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  color: #15274f;
  cursor: pointer;
  .company-name {
    font-style: italic;
    font-size: 1.2rem;
    transform: scaleY(1.1);
    margin-right: 3px;
    color: #16264a;
  }
  .el-divider {
    height: 0.8rem;
    background-color: #313131;
  }
}
.logo img {
  width: 9rem;
  // width: 100%;
  // height: 100%;
}
button.fllow {
  background: rgb(26 41 82);
  border-color: rgb(26 41 82);
  font-size: 1rem;
  // padding: 0.4rem 0.8rem;
}

@media (min-width: 767px) {
  .web {
    display: flex;
  }
  .phone {
    display: none;
  }
}

@media (max-width: 767px) {
  header {
    display: none;
  }
  .web {
    display: none;
  }
  .phone {
    display: flex;
    .flex-row {
      justify-content: center;
    }
  }
}
</style>