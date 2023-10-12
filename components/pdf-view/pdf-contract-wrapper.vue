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
      <div
        v-if="summaryLoading"
        v-loading="summaryLoading"
        element-loading-spinner="el-icon-loading"
        element-loading-customClass="summary-icon"
        class="summary-loading"
      />
      <div v-for="(chat, index) in chatList" :key="index" class="chat-item">
        <div
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
              v-if="!chat.otherType && chat.type === 4 && !chat.content"
              color="#000"
            />
            <p
              v-if="chat.otherType === 'summary' && chat.content"
              class="summary-title"
            >
              内容概要:
            </p>
            <span>{{ chat.content.replace(/\\n{1,}/g, "\n").replace(/\n{1,}/g, "\n") }}</span>
          </span>
        </div>
      </div>
      <el-empty
        v-if="!summaryLoading && !chatList.length"
        :image-size="60"
        description="暂无对话信息"
      />
    </div>
    <div class="fix-bottom">
      <p
        v-if="recommandList.length"
        class="more"
        @click="isCollapsed = !isCollapsed"
      >
        {{ !isCollapsed ? "展开" : "收起" }}示例问题
        <i
          :class="[
            !isCollapsed ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right',
          ]"
        ></i>
      </p>
      <b-collapse v-model="isCollapsed" id="collapse-recommand">
        <div class="recommand-list">
          <div
            v-for="(item, index) in recommandList"
            :key="index"
            class="item"
            @click="onSelectRecommend(item)"
          >
            <img src="@/assets/images/hand-pointer.png" alt="" />
            <span class="text-cut"> {{ item }}</span>
          </div>
        </div>
      </b-collapse>

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
import PdfTools from "./pdf-tools.vue";
import { SSE, isExceedLimit, addWebCount } from "@/utils/index.js";
import { mapGetters } from "vuex";
import LoginModal from "@/components/layouts/login-modal.vue";
import BlinkAnimation from "@/components/blink-animation.vue";
export default {
  name: "pdf-contract-wrapper",
  props: {
    pdfBaseInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    chatList: {
      type: Array,
      default: () => [],
    },
    recommandList: {
      type: Array,
      default: () => [],
    },
    summaryLoading: {
      type: Boolean,
      default: false,
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
      eventSource: null,
      answerStatus: "", // stop ing
      isCollapsed: true,
    };
  },
  created() {
    console.log("creater");
  },
  mounted() {},
  watch: {
    "$route.params.id"() {
      this.isCollapsed = true;
      if (this.eventSource) {
        this.eventSource.close();
        this.isQuestionIng = false;
        this.answerStatus = "";
        this.eventSource = null;
      }
    },
  },
  computed: {
    ...mapGetters(["userInfo", "token"]),
  },
  methods: {
    // 通过sse监听服务端返回的内容
    async getQuestion() {
      // process.env.VUE_APP_LAW_SERVER
      const url = `/api/pdf/message/ask`;

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
        this.eventSource = null;
      });
      eventSource.addEventListener("load", () => {
        if (!this.userInfo.phoneNumber) {
          addWebCount("pdfContactNoAuth");
        }
        if (this.userInfo.phoneNumber) {
          addWebCount("pdfContact");
        }
        this.isQuestionIng = false;
        this.answerStatus = "";
        this.eventSource = null;
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
      this.isCollapsed = false;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;

  .chat-list {
    // height: calc(100% - 11.5rem);
    flex: 1;
    overflow: auto;
    padding: 0 0.8rem 0.7rem;
    .summary-loading {
      width: 3rem;
      height: 3rem;
      border-radius: 12px;
      overflow: hidden;
    }
    .chat-item {
      &:not(:last-child) {
        margin-bottom: 0.7rem;
      }
      .summary-title {
        font-weight: bold;
        color: #000;
      }
      .chat-content-wrapper {
        text-align: left;
        min-width: 3rem;
        white-space: pre-wrap;
        &.summary {
          min-height: 2.6rem;
        }
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
          // margin: 0.7rem 0;
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
    // position: absolute;
    // bottom: 0.6rem;
    width: calc(100% - 0.1rem);
    color: #192a51;
    font-weight: 550;
    .more {
      padding: 0.2rem 0;
      border-top: 1px solid #bdbdbd;
      cursor: pointer;
      i {
        transform: rotate(90deg);
      }
    }
    .recommand-list {
      padding: 0rem 0.8rem 0rem;
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
        background: #808080eb;
        color: #fff;
        padding: 0.2rem 0.3rem;
        width: min-content;
        max-width: 100%;
        margin-bottom: 0.4rem;
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
      margin: 0rem 0.8rem 0.5rem;
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
  margin-top: -0.7rem;
  i {
    font-size: 1.5rem;
  }
}
</style>