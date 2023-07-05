<template>
  <p class="title">
    <span>PDF助手</span>
    <span class="controls">
      <img
        src="@/assets/images/share.png"
        v-b-modal.share-modal
        alt=""
        @click="onShowShareModal"
      />
      <img src="@/assets/images/download.png" alt="" @click="onDownload" />
      <img src="@/assets/images/reset.png" alt="" @click="onRest" />
      <img src="@/assets/images/pdf-delete.png" alt="" @click="onDelete" />
    </span>

    <b-modal
      ref="shareModal"
      size="middle"
      id="share-modal"
      centered
      hide-footer
      title="分享PDF对话"
    >
      <el-input size="small" :value="pdfShareLink" disabled />
      <p class="copy-link">
        <el-button size="mini" icon="el-icon-copy-document" @click="onCopy"
          >复制链接</el-button
        >
      </p>
      <p class="tips">每个访问者都会开始新的对话，聊天信息不会共享</p>
    </b-modal>
  </p>
</template>

<script>
export default {
  name: "pdf-tools",
  props: {
    chatList: {
      type: Array,
      default: () => [],
    },
    pdfBaseInfo: {
      type: Object,
      default: () => {},
    },
  },
  components: {},
  data() {
    return {
      // pdf分享链接
      pdfShareLink: "https://www.chatpdf.com/share/5xQuz7LhFipEW76OSdQ0k",
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    onShowShareModal() {},
    onDownload() {
      // 生成文本内容
      var text = this.chatList
        .map((chat, index) => {
          return `${index > 0 ? "ME: " + chat.answer + "\n" : ""}${
            "PDF: " + chat.question
          }`;
        })
        .join("\n\n");

      // 创建 <a> 元素
      var link = document.createElement("a");
      link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
      // 匹配最后一个点符号之后的所有字符（即文件名的格式后缀），然后将其替换为空字符串
      link.download = this.pdfBaseInfo.name.replace(/\.[^/.]+$/, "") + ".txt";

      // 添加到文档中并模拟点击下载
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    onRest() {
      this.chatList = [];
      this.pdfInfo.summary = "";
    },
    onDelete() {},
    onCopy() {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(this.pdfShareLink)
          .then(() => {
            this.$message.success("分享链接复制成功");
          })
          .catch((error) => {
            console.error("复制到剪贴板失败:", error);
          });
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = this.pdfShareLink;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        this.$message.success("分享链接复制成功");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 0.8rem !important;
  .controls {
    img {
      width: 1rem;
      margin: 0 6px;
      cursor: pointer;
    }
  }
}
/deep/#share-modal {
  font-size: 0.7rem;
  input {
    cursor: text;
  }
  .tips {
    color: rgba(0, 0, 0, 0.505);
  }
  .copy-link {
    margin: 0.5rem 0 0.3rem;
  }
}
</style>