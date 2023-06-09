<template>
  <div class="wrapper">
    <h4>
      <img src="@/assets/images/demo1.png" alt="" /> <strong>法律咨询</strong>
    </h4>
    <main class="">
      <div class="main-content">
        <div ref="chatList" class="chat-list">
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
                <img src="@/assets/images/jqr.png" alt="" class="header-img" />
              </div>
              <div class="content">
                <div v-html="item.question" />
                <Actions
                  v-if="item.msgId"
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
          <div v-if="!chatList.length" class="no-message">
            您好，我是LegalGPT
            <br />请问有什么可以帮助到您？
          </div>
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
            src="@/assets/images/send-img.png"
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
  </div>
</template>

<script>
const maxCount = 20;
import showToast from "@/utils/toast.js";
import Actions from "@/components/actions.vue";
import { likeLaw, dissLaw } from "@/api/request.js";
const { v4: uuidv4 } = require("uuid");
// 生成 UUID
let uuid = localStorage.getItem("uuid");
if (!uuid) {
  uuid = uuidv4();
  localStorage.setItem("uuid", uuid);
}
console.log("uuid:", uuid);
export default {
  name: "law",
  props: {},
  components: { Actions },
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
      answerCount: localStorage.getItem("answerCount")
        ? Number(localStorage.getItem("answerCount"))
        : 0,
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    // 通过sse监听服务端返回的内容
    async getQuestion() {
      const url = `https://legal.sco.tudb.work/api/chat?question=${this.searchValue}&userId=${uuid}`;
      // 输入框清空
      this.searchValue = "";
      this.answerStatus = "ing";
      // 新增一条空白回复
      const curChat = this.chatList.slice(-1)[0];
      const xhr = new XMLHttpRequest();
      this.xhr = xhr;
      this.answerCount += 1;
      localStorage.setItem("answerCount", this.answerCount);
      xhr.open("GET", url);
      xhr.send();
      xhr.addEventListener("progress", () => {
        let str = xhr.responseText;
        // 发现EOF，就结束链接
        if (str.includes("EOF")) {
          const msgId = xhr.getResponseHeader("x-msgid");
          curChat.msgId = msgId;
          str = str.replace("EOF", "");
          xhr.abort();
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
      this.answerStatus = "";
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
      // 判断是否超过提问次数
      if (this.answerCount === maxCount)
        return showToast(this, {
          content: "您今日的提问次数已达上限20次",
          type: "danger",
        });
      // 输入框无值
      if (!this.searchValue) return;
      // 已提问还未回复，不能继续提问
      if (this.isQuestionIng) return;
      this.isQuestionIng = true;
      this.chatList.push({
        answer: this.searchValue,
      });
      this.scrollBottom();
      this.getQuestion();
    },
    getAnswerCount() {
      // const answerCount = localStorage.getItem("answerCount") || 0;
    },
    onLike() {
      likeLaw({
        msgId: "YevMlIgBBskDWLwj4t7J",
        userId: uuid,
      }).then(() => {});
    },
    onDiss() {
      dissLaw({
        msgId: "YevMlIgBBskDWLwj4t7J",
        userId: uuid,
      }).then(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  h4 {
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 0 12px;
    img {
      width: 56px;
      margin-right: 12px;
    }
  }
  main {
    background: #f0f0f0;
    .main-content {
      margin: 0 auto;
      // height: calc(100vh - 387px);
      width: 50%;
      display: flex;
      flex-direction: column;
      .stop-wrapper {
        display: flex;
        justify-content: center;
        margin: 25px 0 0;
        span {
          width: 150px;
          height: 40px;
          line-height: 40px;
          border: 1px solid #717171;
          border-radius: 20px;
          color: #717171;
          cursor: pointer;
        }
      }
    }
    .chat-list {
      // flex: 1;
      max-height: 500px;
      min-height: calc(100vh - 472px);
      overflow-y: auto;
      padding: 12px;
      margin-top: 24px;
      position: relative;
      .chat-item {
        display: flex;
        position: relative;

        .header-img-wrapper {
          width: 50px;
          height: 50px;
          .header-img {
            width: 50px;
            height: 50px;
            border-radius: 4px;
          }
          .self {
            width: 50px;
            height: 50px;
            font-weight: bold;
            color: #ffffff;
            font-size: 24px;
            background: #f5b228;
            border-radius: 4px;
            line-height: 50px;
            text-align: center;
          }
        }
        .content {
          background: #ffffff;
          color: #000;
          flex: 1;
          margin: 0 30px;
          position: relative;
          border-radius: 4px;
          padding: 12px;
          line-height: 26px;
          min-height: 26px;
          text-align: left;
        }
        &.question {
          .indicator {
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid #fff;
            position: absolute;
            left: -8px;
            top: 16px;
            box-shadow: 0 0 20px -8px #74eaff, 0 0 20px -8px #74eaff,
              0 0 20px -8px #74eaff, 0 0 20px -8px #74eaff,
              0 0 20px -8px #74eaff;
          }
          .content {
            position: relative;
            padding-bottom: 25px !important;
            .action-wrapper {
              position: absolute;
              right: 6px;
              bottom: 6px;
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
            right: -8px;
            top: 16px;
            box-shadow: 0 0 20px -8px #74eaff, 0 0 20px -8px #74eaff,
              0 0 20px -8px #74eaff, 0 0 20px -8px #74eaff,
              0 0 20px -8px #74eaff;
          }
        }
      }
      .chat-item:not(:first-child) {
        margin-top: 20px;
      }
    }
    .submit-wrapper {
      position: relative;
      height: 50px;
      // border: 1px solid gray;
      box-shadow: 0 0 20px -12px #80808061, 0 0 20px -12px #80808061,
        0 0 20px -12px #80808061, 0 0 20px -12px #80808061,
        0 0 20px -12px #80808061;
      overflow: hidden;
      background: #ffffff;
      border-radius: 5px;
      margin-top: 25px;
      input {
        height: 50px;
        border: none;
        width: 100%;
        background: transparent;
        color: #000;
        padding: 0 16px;
        outline: none;
      }
      input::placeholder {
        color: #666;
      }
      .send-img {
        position: absolute;
        width: 27px;
        right: 15px;
        top: 13px;
        cursor: pointer;
      }
      .send-btn {
        color: #fff;
        position: absolute;
        width: 27px;
        height: 27px;
        right: 15px;
        top: 17px;
        cursor: not-allowed;
        .loading {
          display: inline-block;
          position: relative;
          width: 27px;
          height: 27px;
          top: -3px;
          span {
            position: absolute;
            top: 0;
            background-color: #000;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            animation: loading 1.2s infinite ease-in-out;
            margin-top: 8px;
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
      font-size: 14px;
      padding: 26px 0;
    }
    .no-message {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
      font-size: 32px;
      font-weight: bold;
    }
  }
}
@media (max-width: 767px) {
  .wrapper {
    main {
      .main-content {
        width: 90%;
      }
      .chat-list {
        // min-height: 300px;
        .content {
          font-size: 13px;
          line-height: 20px !important;
        }
      }
      .no-message {
        font-size: 24px;
      }
    }
  }
}
</style>