<template>
  <div class="wrapper">
    <h4>
      <i class="el-icon-back" @click="$router.go(-1)"></i>
      <strong>智能机器人</strong>
      <span></span>
    </h4>
    <div ref="chatList" class="chat-list">
      <div class="chat-item question first">
        <div class="header-img-wrapper">
          <img src="@/assets/images/header-img.png" alt="" class="header-img" />
        </div>
        <div class="content">
          <div>您好！请问有什么可以帮助到您？</div>
        </div>
      </div>
      <template v-for="(item, index) in chatList">
        <!-- answer -->
        <div :key="'answer' + index" class="chat-item answer">
          <div class="header-img-wrapper"></div>
          <div class="content">
            <div v-html="item.answer"></div>
          </div>
        </div>
        <div :key="'question' + index" class="chat-item question">
          <div class="header-img-wrapper">
            <img
              src="@/assets/images/robot-icon.png"
              alt=""
              class="header-img"
            />
          </div>
          <div class="content">
            <blink-animation v-if="!item.question" />
            <div
              v-else
              v-html="
                item.question.replace(/\\n{1,}/g, '\n').replace(/\n{1,}/g, '\n')
              "
            />
          </div>
        </div>
      </template>
      <!-- <div v-if="!chatList.length" class="no-message">
            您好，我是LegalGPT
            <br />请问有什么可以帮助到您？
          </div> -->
    </div>
    <div class="input-wrapper">
      <input
        v-model="searchValue"
        maxlength="100"
        placeholder="请输入您的问题，按Enter发送"
        @keydown="onKeydown"
      />
    </div>
    <div class="actions">
      <div>
        <!-- 智能客服无法解决您的问题？<span
          style="color: #4f79f6; cursor: pointer"
          @click="changeUserModel"
          >立即转接人工</span
        > -->
      </div>
      <div class="submit">
        <span>{{ searchValue.length }} / 100</span>
        <b-button class="dark-btn send-btn" size="mini">
          <div v-if="answerStatus" class="loading">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span v-else @click="onSend">发送</span>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
// import showToast from "@/utils/toast.js";
import { mapGetters } from "vuex";
import BlinkAnimation from "./blink-animation.vue";
import showToast from "@/utils/toast.js";
export default {
  name: "robot-chat",
  props: {},
  components: { BlinkAnimation },
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
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    changeUserModel() {},
    // 通过sse监听服务端返回的内容
    async getQuestion() {
      const url = `${process.env.VUE_APP_GWQA_SERVER}/api/chat?question=${this.searchValue}&userId=${this.userInfo.id}`;
      // 输入框清空
      this.searchValue = "";
      this.answerStatus = "ing";
      // 新增一条空白回复
      const curChat = this.chatList.slice(-1)[0];
      const xhr = new XMLHttpRequest();
      this.xhr = xhr;
      xhr.open("GET", url);
      xhr.send();
      xhr.addEventListener("progress", () => {
        if (xhr.status !== 200) {
          xhr.abort();
          this.isQuestionIng = false;
          this.answerStatus = "";
          return showToast({
            content: `远端服务器错误,请稍后再试`,
            type: "danger",
          });
        }
        let str = xhr.responseText;
        // 发现EOF，就结束链接
        if (str.includes("EOF")) {
          str = str.replace("EOF", "");
          this.isQuestionIng = false;
          this.answerStatus = "";
        }
        // 向回复内容里写值
        curChat.question = str
          .replace(/data:/g, "")
          .replace(/\n/g, "")
          .replace(/\b\d+\.\s/g, "\n$&");
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
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  background: #f0f0f0;
  h4 {
    font-size: 1.5rem;
    display: none;
    align-items: center;
    justify-content: space-between;
    z-index: 2;
    margin-bottom: 0;
    height: 4rem;
    padding: 0 1rem;
    background: #fff;
    strong {
      flex: 1;
    }
    span {
      width: 2rem;
    }
    i {
      // font-weight: bold;
      font-size: 2rem;
    }
  }
  .chat-list {
    // flex: 1;
    max-height: calc(100vh - 340px);
    min-height: 40vh;
    overflow-y: auto;
    padding: 1rem 1.2rem;
    position: relative;
    .first {
      .content {
      }
    }
    .chat-item {
      display: flex;
      position: relative;

      .header-img-wrapper {
        width: 2.2rem;
        height: 2.2rem;
        .header-img {
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 50%;
        }
        .self {
          width: 2.2rem;
          height: 2.2rem;
          font-weight: bold;
          color: #ffffff;
          font-size: 1.9rem;
          background: #f5b228;
          border-radius: 4px;
          line-height: 2.2rem;
          text-align: center;
        }
      }
      .content {
        background: #fff;
        color: #303133;
        // flex: 1;
        max-width: calc(100% - 50px);
        min-width: 50px;
        margin: 0 0 0 0.6rem;
        position: relative;
        border-radius: 4px;
        padding: 0.5rem;
        // min-height: 2.2rem;
        font-size: 13px;
        text-align: left;
        > div {
          white-space: pre-wrap;
          line-height: 1.2rem;
        }
      }
      &.question {
        justify-content: left;
        .content {
          position: relative;
          background: #4f79f6;
          color: #fff;
          // padding-bottom: 25px !important;
          .action-wrapper {
            position: absolute;
            right: 6px;
            bottom: 3px;
          }

          /deep/a {
            color: #192a51;
            &:hover {
              color: #192a51;
            }
          }
        }
      }
      &.answer {
        justify-content: right;
        .content {
          // background: #e0dde6;
        }
      }
    }
    .chat-item:not(:first-child) {
      margin-top: 0.8rem;
    }
  }
  .input-wrapper {
    border-top: 1px solid #bdbdbd;
    input {
      border: none;
      outline: none;
      background: transparent;
      width: 100%;
      font-size: 13px;
      padding: 0.7rem 0.7rem 2rem;
      &::placeholder {
        color: #717171;
      }
    }
    /deep/textarea {
      resize: none;
      border: none;
      background: transparent;
      &::placeholder {
        color: #717171;
      }
    }
  }
  .actions {
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.7rem;
    button {
      height: 1.5rem;
      line-height: 1.5rem;
      padding: 0 0.8rem;
      margin-left: 6px;
      font-size: 13px;
    }
    /deep/button.dark-btn {
      background: #192a51;

      &:hover {
        background-color: 192a51;
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
    .submit {
      display: flex;
      align-items: center;
      .send-btn {
        position: relative;
        width: 4.2rem;
        .loading {
          display: inline-block;
          top: 50%;
          left: 50%;
          // padding: 1rem 0;
          transform: translate(-50%, -50%);
          position: absolute;
          // width: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            background-color: #fff;
            width: 0.5rem;
            height: 0.5rem;
            margin-left: 4px;
            border-radius: 50%;
            animation: loading 1.2s infinite ease-in-out;
          }
          span:nth-child(1) {
            // left: 0;
            animation-delay: -0.24s;
          }
          span:nth-child(2) {
            // left: 12px;
            animation-delay: -0.12s;
          }
          span:nth-child(3) {
            // left: 24px;
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
  }
}

@media (max-width: 767px) {
  .wrapper {
    h4 {
      display: flex;
    }
    .actions {
      button {
        height: 2rem;
        line-height: 2rem;
      }
    }
    .chat-list {
      padding: 1rem 0.7rem;
      max-height: calc(100vh - 11.9rem);
      min-height: calc(100vh - 11.9rem);
    }
  }
}
</style>