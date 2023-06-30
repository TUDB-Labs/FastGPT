<template>
  <div class="wrapper">
    <h4>
      <img src="https://cdn.tudb.work/aios/web/images/demo1.png" alt="" />
      <strong>法律咨询</strong>
    </h4>
    <main class="">
      <div class="main-content">
        <div ref="chatList" class="chat-list">
          <div class="chat-item question first">
            <div class="header-img-wrapper">
              <img
                src="https://cdn.tudb.work/aios/web/images/jqr.png"
                alt=""
                class="header-img"
              />
            </div>
            <div class="content">
              <div>
                您好，我是您的法律助手，可以为您提供专业的法律咨询服务，有什么问题可以帮您解决？
              </div>
              <div class="indicator"></div>
            </div>
            <div class="header-img-wrapper"></div>
          </div>
          <template v-for="(item, index) in chatList">
            <!-- answer -->
            <div :key="'answer' + index" class="chat-item answer">
              <div class="header-img-wrapper"></div>
              <div class="content">
                <div>{{ item.answer }}</div>
                <div class="indicator"></div>
              </div>
              <div class="header-img-wrapper">
                <div class="self">U</div>
                <!-- <img v-if="index%2===0" src="./static/images/header-img.jpg" alt="" class="header-img"> -->
              </div>
            </div>
            <div :key="'question' + index" class="chat-item question">
              <div class="header-img-wrapper">
                <img
                  src="https://cdn.tudb.work/aios/web/images/jqr.png"
                  alt=""
                  class="header-img"
                />
              </div>
              <div class="content">
                <!-- <div v-html="item.question" /> -->
                <blink-animation v-if="!item.question" color="#000" />
                <div v-else>
                  {{
                    item.question
                      .replace(/\\n{1,}/g, "\n")
                      .replace(/\n{1,}/g, "\n")
                  }}
                </div>
                <Actions
                  v-if="item.msgId"
                  :attitude="item.attitude"
                  :content="item.question"
                  class="action-wrapper"
                  @like="onLike(item)"
                  @diss="onDiss(item)"
                />
                <div class="indicator"></div>
              </div>
              <div class="header-img-wrapper"></div>
            </div>
          </template>
          <!-- <div v-if="!chatList.length" class="no-message">
            您好，我是LegalGPT
            <br />请问有什么可以帮助到您？
          </div> -->
        </div>
        <p
          v-if="answerStatus === 'ing'"
          class="stop-wrapper"
          @click="stopQuestion"
        >
          <span>口 停止生成</span>
        </p>
        <p
          v-if="answerStatus === 'stop'"
          class="stop-wrapper"
          @click="reloadQuestion"
        >
          <span>口 重新生成</span>
        </p>
        <div class="submit-wrapper">
          <input
            v-model.trim="searchValue"
            type="text"
            placeholder="请输入您想咨询的问题..."
            @keydown="onKeydown"
          />
          <div class="send-btn" v-if="isQuestionIng">
            <div class="loading">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <img
            v-else
            src="https://cdn.tudb.work/aios/web/images/send-img.png"
            alt="send-img"
            class="send-img"
            @click="onSend"
          />
        </div>
      </div>
      <div class="tips">
        本公司不对服务内容与结果的真实性，准确性进行陈述与保证，相关内容亦不能替代特定领域专家意见
      </div>
    </main>
    <login-modal ref="loginModal" />
  </div>
</template>

<script>
const maxCount = 10;
import showToast from "@/utils/toast.js";
import Actions from "@/components/actions.vue";
import { likeLaw, dissLaw } from "@/api/request.js";
import LoginModal from "@/components/layouts/login-modal.vue";
import { mapGetters } from "vuex";
import BlinkAnimation from "../components/blink-animation.vue";
export default {
  name: "law",
  props: {},
  components: { Actions, LoginModal, BlinkAnimation },
  data() {
    return {
      // 是否正在返回查询结果
      isQuestionIng: false,
      isStop: false,
      searchValue: "",
      // 聊天信息列表
      chatList: [
        // {
        //   id: "12233",
        //   answer: "",
        //   question: "",
        // },
      ],
      xhr: null,
      answerStatus: "", // stop ing
      lawCountInfo: localStorage.getItem("lawCountInfo")
        ? JSON.parse(localStorage.getItem("lawCountInfo"))
        : {
            date: new Date().toLocaleDateString(),
            num: 0,
          },
    };
  },
  created() {
    this.getCountInfo();
  },
  mounted() {},
  watch: {},
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    getCountInfo() {
      const str = localStorage.getItem("lawCountInfo");
      const today = new Date().toLocaleDateString();
      if (str) {
        const lawCountInfo = JSON.parse(str);
        // 如果已经访问过切是今天就不需要重置
        if (today === lawCountInfo.date) {
          this.lawCountInfo = lawCountInfo;
          return;
        }
      }
      this.lawCountInfo = {
        date: today,
        num: 0,
      };
      this.setCountInfo();
    },
    setCountInfo() {
      localStorage.setItem("lawCountInfo", JSON.stringify(this.lawCountInfo));
    },
    // 通过sse监听服务端返回的内容
    async getQuestion() {
      const url = `${process.env.VUE_APP_LAW_SERVER}/api/chat?question=${this.searchValue}&userId=${this.userInfo.id}`;
      // 输入框清空
      this.searchValue = "";
      this.answerStatus = "ing";
      // 新增一条空白回复
      const curChat = this.chatList.slice(-1)[0];
      const xhr = new XMLHttpRequest();
      this.xhr = xhr;
      // 如果未登录需要记录查询次数
      if (!this.userInfo.phoneNumber) {
        this.lawCountInfo.num += 1;
        this.setCountInfo();
      }
      xhr.open("GET", url);
      xhr.send();
      xhr.addEventListener("progress", () => {
        if (xhr.status !== 200) {
          xhr.abort();
          this.isQuestionIng = false;
          this.answerStatus = "";
          return showToast(this, {
            content: `远端服务器错误,请稍后再试`,
            type: "danger",
          });
        }
        if (!curChat.msgId) {
          const msgId = xhr.getResponseHeader("x-msgid");
          curChat.msgId = msgId;
        }
        let str = xhr.responseText;
        // 发现EOF，就结束链接
        if (str.includes("EOF")) {
          str = str.replace("EOF", "");
          this.isQuestionIng = false;
          this.answerStatus = "";
        }
        // 向回复内容里写值
        curChat.question = str;
        this.chatList.splice(-1, 1, curChat);
        this.scrollBottom();
      });
      xhr.addEventListener("error", (error) => {
        console.log(error);
        xhr.abort();
        this.isQuestionIng = false;
      });
    },
    stopQuestion() {
      this.answerStatus = "stop";
      this.xhr.abort();
      this.isQuestionIng = false;
    },
    reloadQuestion() {
      this.searchValue = this.chatList.slice(-1)[0].answer;
      this.onSend();
    },
    onKeydown(e) {
      var theEvent = window.event || e;
      var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
      if (code == 13) {
        this.onSend();
      }
    },
    // 滚动到底部
    scrollBottom() {
      const chatBox = this.$refs.chatList;
      this.$nextTick(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
      });
    },
    onSend() {
      // 在未登录时 判断是否超过提问次数超过就弹出登录框
      if (!this.userInfo.phoneNumber && this.lawCountInfo.num === maxCount) {
        this.$refs.loginModal.show();
        return showToast(this, {
          content: `您今日的提问次数已达上限${maxCount}次`,
          type: "danger",
        });
      }
      // 输入框无值
      if (!this.searchValue) return;
      // 已提问还未回复，不能继续提问
      if (this.isQuestionIng) return;
      this.isQuestionIng = true;
      this.chatList.push({
        answer: this.searchValue,
        attitude: 0,
        question: "",
      });
      this.scrollBottom();
      this.getQuestion();
    },
    onLike(item) {
      likeLaw({
        msgId: item.msgId,
        userId: this.userInfo.id,
      }).then(() => {
        item.attitude = 1;
      });
    },
    onDiss(item) {
      dissLaw({
        msgId: item.msgId,
        userId: this.userInfo.id,
      }).then(() => {
        item.attitude = -1;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  h4 {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    z-index: 2;
    margin-bottom: 0;
    height: 4rem;
    position: fixed;
    left: 50%;
    margin-left: -5.3rem;

    // padding: 0 0 0.6rem;
    img {
      width: 2.5rem;
      margin-right: 0.8rem;
    }
  }
  main {
    background: #f0f0f0;
    .main-content {
      margin: 0 auto;
      // height: calc(100vh - 387px);
      width: 70%;
      display: flex;
      flex-direction: column;
      .stop-wrapper {
        display: flex;
        justify-content: center;
        margin: 1rem 0 0;
        span {
          width: 8rem;
          height: 2rem;
          line-height: 2rem;
          border: 1px solid #717171;
          border-radius: 20px;
          color: #717171;
          cursor: pointer;
        }
      }
    }
    .chat-list {
      // flex: 1;
      min-height: calc(100vh - 14rem);
      max-height: calc(100vh - 10rem);
      overflow-y: auto;
      padding: 0.6rem;
      margin-top: 1rem;
      position: relative;
      .first {
        .content {
          // padding-bottom: 25px;
        }
      }
      .chat-item {
        display: flex;
        position: relative;

        .header-img-wrapper {
          width: 2.5rem;
          height: 2.5rem;
          .header-img {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 4px;
          }
          .self {
            width: 2.5rem;
            height: 2.5rem;
            font-weight: bold;
            color: #ffffff;
            font-size: 1.5rem;
            background: #f5b228;
            border-radius: 4px;
            line-height: 2.5rem;
            text-align: center;
          }
        }
        .content {
          background: #ffffff;
          color: #000;
          flex: 1;
          margin: 0 1.2rem;
          position: relative;
          border-radius: 4px;
          padding: 0.5rem;
          text-align: left;
          line-height: 1.5rem;
          font-size: 0.9rem;
          > div {
            white-space: pre-wrap;
          }
        }
        &.question {
          .indicator {
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid #fff;
            position: absolute;
            left: -0.5rem;
            top: 0.6rem;
            box-shadow: 0 0 20px -8px #74eaff, 0 0 20px -8px #74eaff,
              0 0 20px -8px #74eaff, 0 0 20px -8px #74eaff,
              0 0 20px -8px #74eaff;
          }
          .content {
            position: relative;
            // padding-bottom: 25px !important;
            // padding-bottom: 25px;
            &:not(:first) {
            }
            .action-wrapper {
              margin-top: -1rem;
            }
          }
        }
        &.answer {
          .content {
            background: #e0dde6;
          }
          .indicator {
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-left: 10px solid #e0dde6;
            position: absolute;
            right: -0.5rem;
            top: 0.6rem;
            box-shadow: 0 0 20px -8px #74eaff, 0 0 20px -8px #74eaff,
              0 0 20px -8px #74eaff, 0 0 20px -8px #74eaff,
              0 0 20px -8px #74eaff;
          }
        }
      }
      .chat-item:not(:first-child) {
        margin-top: 1.1rem;
      }
    }
    .submit-wrapper {
      position: relative;
      height: 3rem;
      // border: 1px solid gray;
      overflow: hidden;
      background: #ffffff;
      border-radius: 5px;
      margin-top: 1rem;
      input {
        height: 3rem;
        border: none;
        width: 100%;
        background: transparent;
        color: #000;
        padding: 0 1rem;
        outline: none;
        font-size: 0.9rem;
        box-shadow: 0 0 20px -12px #80808061, 0 0 20px -12px #80808061,
          0 0 20px -12px #80808061, 0 0 20px -12px #80808061,
          0 0 20px -12px #80808061;
      }
      input::placeholder {
        color: #666;
      }
      .send-img {
        position: absolute;
        width: 1.5rem;
        right: 0.9rem;
        top: 0.7rem;
        cursor: pointer;
      }
      .send-btn {
        color: #fff;
        position: absolute;
        width: 3rem;
        height: 3rem;
        right: 0.5rem;
        top: 0;
        cursor: not-allowed;
        .loading {
          display: inline-block;
          position: relative;
          width: 3rem;
          height: 3rem;
          span {
            position: absolute;
            top: 1.25rem;
            background-color: #000;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            animation: loading 1.2s infinite ease-in-out;
          }
          span:nth-child(1) {
            left: 0;
            animation-delay: -0.24s;
          }
          span:nth-child(2) {
            left: 12px;
            animation-delay: -0.12s;
          }
          span:nth-child(3) {
            left: 24px;
            animation-delay: 0;
          }

          @keyframes loading {
            0% {
              transform: scale(0);
            }

            50% {
              transform: scale(1);
            }

            100% {
              transform: scale(0);
            }
          }
        }
      }
    }
    .tips {
      color: #717171;
      font-size: 13px;
      padding: 1rem;
    }
    .no-message {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
      font-size: 1.4rem;
      font-weight: bold;
    }
  }
}
@media (max-width: 767px) {
  .wrapper {
    h4 {
      padding: 12px 0 12px;
    }
    main {
      .main-content {
        width: 90%;
      }
      .chat-list {
        // min-height: 300px;
        padding: 0;
        .chat-item {
          // .header-img-wrapper {
          //   width: 3rem;
          //   height: 3rem;
          //   .header-img {
          //     width: 3rem;
          //     height: 3rem;
          //   }
          //   .self {
          //     width: 3rem;
          //     height: 3rem;
          //     line-height: 3rem;
          //   }
          // }
          .content {
          }
        }
      }
    }
  }
}
</style>