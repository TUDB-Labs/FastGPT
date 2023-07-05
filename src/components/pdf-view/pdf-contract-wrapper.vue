<template>
  <div class="wrapper">
    <PdfTools
      ref="pdfTools"
      :pdfBaseInfo="pdfBaseInfo"
      :chatList="chatList"
      style="padding: 0.8rem"
    />
    <div class="chat-list">
      <div v-for="(chat, index) in chatList" :key="index" class="chat-item">
        <div v-if="chat.type !== 'summary'" class="answer chat-content-wrapper">
          <span class="content">
            {{ chat.answer }}
          </span>
        </div>
        <div
          v-loading="true && chat.type === 'summary'"
          element-loading-spinner="el-icon-loading"
          element-loading-customClass="summary-icon"
          class="question chat-content-wrapper"
        >
          <span class="content">
            {{ chat.question }}
          </span>
        </div>
      </div>
      <el-empty
        v-if="!chatList.length"
        :image-size="60"
        description="暂无数据"
      />
    </div>
    <div class="fix-bottom">
      <div class="recommand-list">
        <div v-for="(item, index) in recommandList" :key="index" class="item">
          {{ item.name }}
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
        <img
          src="https://cdn.tudb.work/aios/web/images/send-btn.png"
          alt="send-img"
          class="send-img"
          @click="onSend"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PdfTools from "./pdf-tools.vue";
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
    // BlinkAnimation,
  },
  data() {
    return {
      answerValue: "",
      chatList: [
        {
          type: "summary",
          question:
            "亲爱的用户，欢迎阅读我们的隐私政策！本政策旨在向您说明我们如何收集、使用和保护您的个人信息。我们重视您的隐私，并将尽力保护您的个人信息安全。如果您有任何疑问或需要进一步了解，请阅读以下问题：",
        },
        {
          answer: "nihao",
          question: "您好！有什么问题我可以帮您解答吗？",
          id: "1111",
        },
        {
          answer: "你是谁",
          question: "您好！有什么问题我可以帮您解答吗？",
          id: "2222",
        },
        {
          answer: "nihao",
          question: "您好！有什么问题我可以帮您解答吗？",
          id: "5444",
        },
        {
          answer:
            "我们如何收集、使用、储存和分享这些信息，以及我们为您提供的访问",
          question: "您好！有什么问题我可以帮您解答吗？",
          id: "23344",
        },
        {
          answer: "nihao",
          question: "您好！有什么问题我可以帮您解答吗？",
          id: "111133",
        },
        {
          answer: "你是谁",
          question: "您好！有什么问题我可以帮您解答吗？",
          id: "2222232",
        },
      ],
      recommandList: [
        {
          id: "1223",
          name: "样例PDF名称样例PDF名称",
        },
        {
          id: "45332",
          name: "样例PDF名称样例PDF名称",
        },
        {
          id: "wf2333",
          name: "样例PDF名称样例PDF名称",
        },
      ],
      // pdf总结内容
      pdfInfo: {},
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    onKeydown() {},
    onSend() {},
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
    height: calc(100% - 9.5rem);
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
    width: calc(100% - 1.6rem);
    padding: 0 0.8rem;
    .recommand-list {
      .item {
        display: flex;
        align-items: center;
        // border: 1px solid #4f79f6;
        // border-radius: 11px;
        // padding: 12px;
        color: #000;
        font-weight: 500;
        // margin-top: 0.9rem;
        cursor: pointer;
        // background: #d6d8db;
        &:hover {
          background: #f5f7fa;
        }
        img {
          margin-right: 8px;
          width: 1rem;
        }
      }
    }
    .submit-wrapper {
      height: 2rem;
      // border: 1px solid gray;
      overflow: hidden;
      background: #ffffff;
      border-radius: 5px;
      margin-top: 0.5rem;
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
        width: 2.3rem;
        cursor: pointer;
      }

      .send-btn {
        color: #fff;
        // position: absolute;
        width: 2.3rem;
        height: 2.3rem;
        // right: 0.5rem;
        // top: 0;
        cursor: not-allowed;
        background: #254cd8;
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