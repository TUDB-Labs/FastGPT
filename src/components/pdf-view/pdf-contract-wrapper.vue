<template>
  <div class="wrapper">
    <PdfTools
      ref="pdfTools"
      :pdfBaseInfo="pdfBaseInfo"
      :chatList="chatList"
      :recommandList="recommandList"
      style="padding: 0.8rem"
      @delete="$emit('delete')"
    />
    <div ref="chatList" class="chat-list">
      <div v-for="(chat, index) in chatList" :key="index" class="chat-item">
        <!-- <div v-if="chat.type !== 'summary'" class="answer chat-content-wrapper">
          <span class="content">
            {{ chat.content }}
          </span>
        </div> -->
        <div
          v-loading="chat.otherType === 'summary' && summaryLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-customClass="summary-icon"
          class="chat-content-wrapper"
          :class="{
            answer: chat.type === 3,
            question: chat.type === 4,
          }"
        >
          <span
            class="content"
            :class="{ summary: chat.otherType === 'summary' }"
          >
            <BlinkAnimation
              v-if="chat.type === 4 && !chat.content"
              color="#000"
            />
            {{
              chat.content.replace(/\\n{1,}/g, "\n").replace(/\n{1,}/g, "\n")
            }}
          </span>
        </div>
      </div>
      <el-empty
        v-if="!chatList.length"
        :image-size="60"
        description="暂无对话信息"
      />
    </div>
    <div class="fix-bottom">
      <div class="recommand-list">
        <div
          v-for="(item, index) in recommandList.slice(0, 3)"
          :key="index"
          class="item"
          @click="onSelectRecommend(item)"
        >
          <img src="@/assets/images/hand-pointer.png" alt="" />
          <span class="text-cut"> {{ item }}</span>
        </div>
      </div>
      <div class="submit-wrapper">
        <input
          v-model.trim="answerValue"
          type="text"
          placeholder="请输入您的问题..."
          maxlength="100"
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
          src="https://cdn.tudb.work/aios/web/images/send-btn.png"
          alt="send-img"
          class="send-img"
          @click="onSend"
        />
      </div>
    </div>
    <login-modal ref="loginModal" />
  </div>
</template>

<script>
const maxCount = 20;
import PdfTools from "./pdf-tools.vue";
import showToast from "@/utils/toast.js";
import { getConversationDetails } from "@/api/request.js";
import { SSE, isExceedLimit } from "@/utils/index.js";
import { mapGetters } from "vuex";
import LoginModal from "@/components/layouts/login-modal.vue";
import BlinkAnimation from "@/components/blink-animation.vue";
// import BlinkAnimation from "@/components/blink-animation.vue";
export default {
  name: "pdf-contract-wrapper",
  props: {
    pdfBaseInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    PdfTools,
    LoginModal,
    BlinkAnimation,
  },
  data() {
    return {
      // 是否正在返回查询结果
      isQuestionIng: false,
      answerValue: "",
      chatList: [],
      recommandList: [],
      // pdf总结内容
      pdfInfo: {},
      summaryLoading: false,
      eventSource: null,
      answerStatus: "", // stop ing
    };
  },
  created() {},
  mounted() {},
  watch: {
    pdfBaseInfo: {
      handler(val) {
        console.log(val);
        if (!val.uuid) return;
        this.getConversationDetails();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(["userInfo", "token"]),
  },
  methods: {
    // 获取对话内容
    getConversationDetails() {
      this.summaryLoading = true;
      const chatItem = {
        type: 4,
        otherType: "summary",
        content: "",
      };
      this.chatList = [chatItem];
      getConversationDetails({ uuid: this.pdfBaseInfo.uuid })
        .then((res) => {
          // 历史对话记录
          const qa = res.data.qa || [];
          chatItem.content = res.data.summary;
          this.chatList.push(...qa);
          this.recommandList = res.data.examples || [];
        })
        .finally(() => {
          this.summaryLoading = false;
        });
    },
    // 通过sse监听服务端返回的内容
    async getQuestion() {
      // process.env.VUE_APP_LAW_SERVER
      const url = `${process.env.VUE_APP_PDF_SERVER}/api/pdf/message/ask`;

      // 新增一条空白回复
      const curChat = {
        content: "",
        type: 4,
      };
      this.chatList.push(curChat);

      const eventSource = new SSE(url, {
        method: "POST",
        payload: {
          uuid: this.pdfBaseInfo.uuid,
          message: this.answerValue,
        },
        token: this.token,
      });
      // 输入框清空
      this.answerValue = "";
      this.answerStatus = "ing";
      eventSource.addEventListener("message", (responseText) => {
        let str = responseText;
        // 向回复内容里写值
        curChat.content = str.replace(/\n/g, "").replace(/\b\d+\.\s/g, "\n$&");

        this.chatList.splice(-1, 1, curChat);
        this.scrollBottom();
      });
      eventSource.addEventListener("error", () => {
        this.isQuestionIng = false;
        this.answerStatus = "";
      });
      eventSource.addEventListener("load", () => {
        console.log("load");
        this.isQuestionIng = false;
        this.answerStatus = "";
      });
      this.eventSource = eventSource;
    },
    onKeydown(e) {
      var theEvent = window.event || e;
      var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
      if (code == 13) {
        this.onSend();
      }
    },
    onSelectRecommend(content) {
      this.answerValue = content;
      this.onSend();
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
      if (!this.answerValue) return;
      // 已提问还未回复，不能继续提问
      if (this.isQuestionIng) return;

      // 在未登录时 判断是否超过提问次数超过就弹出登录框
      if (!this.userInfo.phoneNumber && isExceedLimit("pdfContactNoAuth")) {
        this.$refs.loginModal.show();
        return this.$message.warning("您今日的提问次数已达上限20次");
      }
      if (this.userInfo.phoneNumber && isExceedLimit("pdfContact")) {
        return this.$message.warning("您今日的提问次数已达上限50次");
      }

      this.isQuestionIng = true;
      this.chatList.push({
        content: this.answerValue,
        type: 3,
      });
      this.scrollBottom();
      this.getQuestion();
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  font-size: 12px;
  position: relative;
  box-sizing: border-box;
  // height: 100%;

  height: 90vh;

  .chat-list {
    height: calc(100% - 12rem);
    overflow: auto;
    padding: 0 0.8rem;
    .chat-item {
      // &:not(:first-child) {
      //   margin-top: 0.9rem;
      // }
      .chat-content-wrapper {
        text-align: left;
        min-width: 3rem;
        white-space: pre-wrap;
        .content {
          display: inline-block;
          border-radius: 4px;
          padding: 0.3rem 0.3rem;
          text-align: left;
        }
        &.question {
          .content {
            background: #ffffff;
          }
        }
        &.answer {
          margin: 0.7rem 0;
          text-align: right;
          .content {
            color: #fff;
            background: #4f79f6;
          }
        }
      }
    }
  }
  .fix-bottom {
    position: absolute;
    bottom: 0.6rem;
    width: calc(100% - 0.1rem);
    padding: 0 0.8rem;
    .recommand-list {
      .item {
        // border: 1px solid #4f79f6;
        // border-radius: 11px;
        // padding: 12px;
        color: #000;
        // margin-top: 0.9rem;
        cursor: pointer;
        text-align: left;
        // background: #d6d8db;
        border-radius: 0.3rem;
        display: flex;
        align-items: center;
        margin: 0.4rem 0;
        background: #808080eb;
        color: #fff;
        padding: 0.2rem 0.3rem;
        width: min-content;
        max-width: 100%;
        &:hover {
          background: gray;
        }
        img {
          // margin-right: 8px;
          width: 1rem;
        }
        span {
          flex: 1;
        }
      }
    }
    .submit-wrapper {
      height: 2rem;
      // border: 1px solid gray;
      overflow: hidden;
      background: #ffffff;
      border-radius: 5px;
      // margin-top: 0.5rem;
      display: flex;
      border: 1px solid #4f79f6;
      input {
        height: 2rem;
        border: none;
        width: 100%;
        background: transparent;
        color: #000;
        padding: 0 8px;
        outline: none;
        flex: 1;
        box-shadow: 0 0 20px -12px #80808061, 0 0 20px -12px #80808061,
          0 0 20px -12px #80808061, 0 0 20px -12px #80808061,
          0 0 20px -12px #80808061;
      }
      input::placeholder {
        color: #666;
      }
      .send-img {
        width: 2.5rem;
        cursor: pointer;
      }

      .send-btn {
        color: #fff;
        // position: absolute;
        width: 2.5rem;
        height: 2.3rem;
        // right: 0.5rem;
        // top: 0;
        cursor: not-allowed;
        background: #254cd8;
        .loading {
          display: inline-block;
          position: relative;
          width: 2.5rem;
          height: 2.3rem;
          left: 0.3rem;
          span {
            position: absolute;
            top: 0.8rem;
            background-color: #fff;
            width: 0.4rem;
            height: 0.4rem;
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
  }
}

/deep/.el-loading-spinner {
  margin-top: -1rem;
  i {
    font-size: 2rem;
  }
}
</style>