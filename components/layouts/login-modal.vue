<template>
  <div>
    <b-modal
      ref="myModal"
      size="md"
      id="login-modal"
      centered
      no-close-on-backdrop
      hide-footer
      title="登录"
    >
      <template #modal-header="{}">
        <!-- 自定义头部 -->
        <h5>
          <img src="@/assets/images/logo.png" alt="" />
        </h5>
        <span class="close-btn" @click="onClose"> + </span>
      </template>
      <div class="login-content">
        <h5 class="title">手机号登录</h5>
        <el-form ref="ruleForm" :model="loginForm" :rules="rules">
          <el-form-item prop="phoneNumber">
            <el-input
              v-model="loginForm.phoneNumber"
              maxlength="11"
              placeholder="请输入手机号"
            >
              <template slot="prepend">+86</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="verifyCode">
            <el-row class="form-item">
              <el-input
                v-model="loginForm.verifyCode"
                maxlength="6"
                placeholder="请输入短信验证码"
              />
              <b-button
              v-if="true"
                class="dark-btn get-cod-btn"
                :disabled="isGetCoding || isWaiting"
                :style="{
                  cursor: isWaiting || isGetCoding ? 'not-allowed' : 'auto',
                }"
                @click="onGetCode"
              >
                <template v-if="isWaiting">{{ countdownIndex }}秒后可重新获取</template>
                <template v-else>
                  <b-spinner v-if="isGetCoding" small></b-spinner> 获取验证码
                </template>
              </b-button>
            </el-row>
          </el-form-item>
          <b-button
            class="dark-btn confirm-btn"
            :disabled="isLogining"
            :style="{ cursor: isLogining ? 'not-allowed' : 'auto' }"
            @click="onLogin"
          >
            <b-spinner v-if="isLogining" small></b-spinner>
            登录
          </b-button>

          <el-form-item prop="isCheck" class="tips-item">
            <el-row class="tips">
              <b-form-checkbox
                id="checkbox-1"
                v-model="loginForm.isCheck"
                name="checkbox-1"
                :value="true"
                :unchecked-value="false"
                >同意
              </b-form-checkbox>
              <a href="#" @click="() => $refs.xieyiModal.show()"
                >《使用条款和隐私政策》</a
              >
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </b-modal>
    <b-modal
      ref="xieyiModal"
      size="xl"
      id="xieyi-modal"
      centered
      hide-footer
      no-close-on-backdrop
      title="登录"
    >
      <template #modal-header="{ close }">
        <!-- 自定义头部 -->
        <h5>条款和隐私政策</h5>
        <span class="close-btn" @click="close()"> + </span>
      </template>
      <iframe src="/xieyi.html" frameborder="0"></iframe>
    </b-modal>
  </div>
</template>

<script>
import showToast from "@/utils/toast.js";
import { mapActions } from "vuex";
export default {
  name: "login-modal",
  props: {},
  components: {},
  data() {
    return {
      loginForm: {
        isCheck: false,
      },
      countdownIndex: -1,
      timer: null,
      isWaiting: false,
      rules: {
        phoneNumber: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            validator(rule, value, callback) {
              const regPhone = /^[1][3-9][0-9]{9}$/;
              if (!regPhone.test(value)) {
                return callback(new Error("手机号码格式错误，请更换后重试"));
              }
              callback();
            },
            trigger: "blur",
          },
        ],
        verifyCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          {
            validator(rule, value, callback) {
              console.log(rule, value);
              if (value.length !== 6) {
                return callback(new Error("验证码错误"));
              }
              callback();
            },
            trigger: "blur",
          },
        ],
        isCheck: [
          {
            validator(rule, value, callback) {
              if (!value) {
                return callback(
                  new Error("请阅读并同意《使用条款和隐私政策》")
                );
              }
              callback();
            },
            trigger: "blur",
          },
        ],
      },
      isLogining: false,
      isGetCoding: false,
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    ...mapActions(["setUserInfo", "setToken"]),
    show() {
      this.$refs.myModal.show();
    },
    onGetCode() {
      // 判断电话号码是否正确
      this.$refs.ruleForm.validateField("phoneNumber", (valid) => {
        if (valid) return;
        if (this.timer)
          return showToast({
            content: "你操作太频繁了,请稍后再试",
            type: "danger",
          });
        this.isGetCoding = true;
        this.$request
          .getVerCode({ phoneNumber: this.loginForm.phoneNumber })
          .then(() => {
            showToast({
              content: "验证码发送成功",
              type: "success",
            });
            this.countdownIndex = 60;
            // 开始倒计时
            this.startCountdown();
          })
          .finally(() => {
            this.isGetCoding = false;
          })
          .catch(() => {});
      });
    },
    startCountdown() {
      this.isWaiting = true;
      this.timer = setInterval(() => {
        this.countdownIndex -= 1;
        if (this.countdownIndex === -1) {
          window.clearInterval(this.timer);
          this.timer = null;
          this.isWaiting = false;
        }
      }, 1000);
    },
    onClose() {
      this.$refs.myModal.hide();
      this.loginForm = {};
      this.isWaiting = false;
    },
    onLogin() {
      // showToast({
      //   content: "登录成功",
      //   type: "success",
      // });
      // // 存入用户信息
      // this.userInfo = {
      //   phoneNumber: 17711520562,
      //   id: "res.id",
      //   token: "e204004d59357ad44a36f8496647ba38",
      //   // 七天后过期
      //   expirationTime: new Date().getTime() + 60 * 60 * 24 * 7 * 1000,
      // };
      // this.setUserInfo(this.userInfo);
      // this.setToken("affb9e20aaac4427fac7bd9c65c6ffef");

      // this.onClose();

      // this.$emit("success", this.userInfo);

      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return;
        // 判断电话号码、验证码、条款影视政策是否选择
        const { phoneNumber, verifyCode } = this.loginForm;
        this.isLogining = true;
        this.$request
          .loginByCode({
            phoneNumber,
            verifyCode,
          })
          .then((res) => {
            showToast({
              content: "登录成功",
              type: "success",
            });
            // 存入用户信息
            this.userInfo = {
              phoneNumber,
              id: res.data.id,
              token: res.data.token,
              // 七天后过期
              expirationTime: new Date().getTime() + 60 * 60 * 24 * 7 * 1000,
            };
            this.setUserInfo(this.userInfo);
            this.setToken(res.data.token);

            this.onClose();

            this.$emit("success", this.userInfo);
          })
          .finally(() => {
            this.isLogining = false;
          })
          .catch(() => {});
      });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/#login-modal {
  .modal-dialog {
    width: 30rem;
  }
  .modal-header {
    position: relative;
    padding: 0;
    height: 4rem;
    display: flex;
    background: #192a51;
    color: #fff;
    h5 {
      text-align: center;
      width: 100%;
      height: 4rem;
      line-height: 3.6rem;
    }
    .close-btn {
      position: absolute;
      right: 0rem;
      height: 23px;
      font-size: 2.3rem;
      top: 0.4rem;
      transform: rotate(45deg);
      cursor: pointer;
    }
  }
  .login-content {
    padding: 0 2.3rem 1.6rem;
    .title {
      text-align: center;
      margin: 0.6rem 0 1.5rem;
      color: #192a51;
    }
    .el-form-item {
      margin-bottom: 26px;
    }
    .phone-item {
      .el-input-group__append,
      .el-input-group__prepend {
        padding: 0 0.6rem;
      }
    }
    .form-item {
      display: flex;
      height: 40px;
      margin-bottom: 0;
      .el-input {
        flex: 1;
      }
      .get-cod-btn {
        margin-left: 1rem;
        font-size: 0.85rem;
      }
    }
    .confirm-btn {
      width: 100%;
      margin-top: 2.5rem;
    }
    .dark-btn {
      background: #192a51;

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
    .tips-item {
      .el-form-item__content {
        line-height: normal;
      }
    }
    .tips {
      font-size: 0.9rem;
      display: flex;
      margin: 0.5rem 0 0;
      color: #717171;
      a {
        color: #192a51;
        text-decoration: none;
      }
      .custom-control-label::after,.custom-control-label::before {
        top: 0.1rem
      }
    }
    .custom-control-input:checked ~ .custom-control-label::before {
      background-color: #192a51;
      border-color: #192a51;
    }
  }
}
/deep/#xieyi-modal {
  .modal-header {
    position: relative;
    padding: 0;
    height: 4rem;
    display: flex;
    background: #192a51;
    color: #fff;
    h5 {
      text-align: center;
      width: 100%;
      height: 4rem;
      line-height: 3.6rem;
    }
    .close-btn {
      position: absolute;
      right: 0rem;
      height: 23px;
      font-size: 2.3rem;
      top: 0.4rem;
      transform: rotate(45deg);
      cursor: pointer;
    }
  }
  iframe {
    width: 100%;
    height: calc(100vh - 180px);
  }
}
</style>