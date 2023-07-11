<template>
  <header>
    <div class="web flex-row content-width">
      <div class="logo" @click="() => $router.push('/')">
        <img
          src="https://cdn.tudb.work/aios/web/images/zd_logo.png"
          alt="logo"
        />
      </div>
      <!-- <img id="popover-target-1" src="https://cdn.tudb.work/aios/web/images/weixin01.png" alt="" /> -->
      <div class="actions">
        <b-button
          v-if="['/law', '/buy-car'].includes(curPath)"
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
    <div class="phone flex-row content-width">
      <img src="https://cdn.tudb.work/aios/web/images/zd_logo.png" alt="logo" />
    </div>
    <login-modal ref="loginModal" @success="loginSuccess" />
  </header>
</template>

<script>
import LoginModal from "./login-modal.vue";
import { mapGetters, mapActions } from "vuex";
import showToast from "@/utils/toast.js";
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
        })
        .catch(() => {});
    },
    loginSuccess() {
      // this.userInfo = userInfo;
    },
  },
};
</script>

<style lang="less" scoped>
header {
  height: 4rem;
  color: #000;
  text-align: center;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 5;
  .user-info {
    color: #192a51;
    font-weight: bold;
    margin-left: 1rem;
  }
  button.login-btn {
    margin-left: 1rem;
    padding: 6px 2rem !important;
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
.actions {
  & > button {
    width: 7.3rem;
  }
}
.flex-row {
  height: 4rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  width: 174px;
  height: 30px;
}
.logo img {
  width: 170px;
  // width: 100%;
  // height: 100%;
}
button.fllow {
  background: rgb(26 41 82);
  border-color: rgb(26 41 82);
  font-size: 1rem;
  padding: 6px 12px;
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