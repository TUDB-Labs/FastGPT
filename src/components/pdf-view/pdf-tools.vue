<template>
  <p class="title">
    <span>PDF助手</span>
    <span class="controls">
      <span>
        <i
          class="el-icon-share"
          v-b-modal.share-modal
          id="popover-target-share"
          @click="onShowShareModal"
        ></i>
      </span>
      <span>
        <i
          class="el-icon-edit-outline"
          v-b-modal.edit-modal
          id="popover-target-edit"
          alt=""
          @click="onEdit"
        ></i>
      </span>
      <span>
        <i
          class="el-icon-download"
          id="popover-target-download"
          alt=""
          @click="onDownload"
        ></i>
      </span>
      <span>
        <i
          class="el-icon-refresh-right"
          id="popover-target-clear"
          alt=""
          @click="onRest"
        ></i>
      </span>
      <span>
        <i
          class="el-icon-delete"
          id="popover-target-delete"
          alt=""
          @click="onDelete"
        ></i>
      </span>
    </span>

    <b-popover
      id="b-popover-class"
      target="popover-target-share"
      triggers="hover"
      placement="bottomleft"
    >
      <!-- <template #title>Popover Title</template> -->
      分享PDF
    </b-popover>
    <b-popover
      id="b-popover-class"
      target="popover-target-edit"
      triggers="hover"
      placement="bottomleft"
    >
      <!-- <template #title>Popover Title</template> -->
      修改PDF名称
    </b-popover>
    <b-popover
      id="b-popover-class"
      target="popover-target-download"
      triggers="hover"
      placement="bottomleft"
    >
      <!-- <template #title>Popover Title</template> -->
      下载对话
    </b-popover>
    <b-popover
      id="b-popover-class"
      target="popover-target-clear"
      triggers="hover"
      placement="bottomleft"
    >
      <!-- <template #title>Popover Title</template> -->
      清空对话
    </b-popover>
    <b-popover
      id="b-popover-class"
      target="popover-target-delete"
      triggers="hover"
      placement="bottomleft"
    >
      <!-- <template #title>Popover Title</template> -->
      删除PDF
    </b-popover>

    <b-modal
      ref="editModal"
      size="middle"
      id="edit-modal"
      centered
      ok-only
      title="修改PDF名称"
      @show="onShowChangeName"
      @close="onCloseChangeName"
    >
      <div>
        <el-input size="lg" v-model.trim="newPdfName" />
      </div>
      <template #modal-footer="{ ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <el-button
          type="primary"
          :loading="editLoading"
          @click="onChangeName(ok)"
        >
          确认
        </el-button>
      </template>
    </b-modal>

    <b-modal
      ref="shareModal"
      size="middle"
      id="share-modal"
      centered
      hide-footer
      title="分享PDF"
    >
      <div v-loading="shareLoading" element-loading-spinner="el-icon-loading">
        <el-input
          placeholder="请输入新的PDF名称"
          size="small"
          maxlength="50"
          :value="pdfShareLink"
          disabled
        />
        <p class="copy-link">
          <el-button size="mini" icon="el-icon-copy-document" @click="onCopy"
            >复制链接</el-button
          >
        </p>
        <p class="tips">每个访问者都会开始新的对话,对话信息不会共享</p>
      </div>
    </b-modal>
  </p>
</template>

<script>
import {
  clearConversationDetails,
  deleteConversationDetails,
  getShareInfo,
  renameConversation,
} from "@/api/request.js";
import eventBus from "@/utils/event-bus.js";
import { mapGetters } from "vuex";
export default {
  name: "pdf-tools",
  props: {
    chatList: {
      type: Array,
      default: () => [],
    },
    recommandList: {
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
      editLoading: false,
      newPdfName: "",
      // pdf分享链接
      shareLoading: false,
      shareUUid: "74b60f7c4d1e46ca8068a1105a3b41b4",
      pdfShareLink: "",
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    onEdit() {},
    onShowShareModal() {
      this.shareLoading = true;
      getShareInfo({ docUuid: this.pdfBaseInfo.docUUid })
        .then((res) => {
          this.pdfShareLink = location.origin + "/share/" + res.data.uuid;
        })
        .finally(() => {
          this.shareLoading = false;
        });
    },
    onDownload() {
      // 生成文本内容
      const arr = this.chatList.map((chat) => {
        return (
          (chat.type === 3 ? "ME: " : "PDF: ") +
          chat.content.replace(/\\n{1,}/g, "\n").replace(/\n{1,}/g, "\n")
        );
      });
      const recommandList = this.recommandList
        .map((i, index) => {
          return index + 1 + "." + i;
        })
        .join("\n");
      // 添加建议
      arr.splice(1, 0, recommandList);
      var text = arr.join("\n\n");

      // 创建 <a> 元素
      var link = document.createElement("a");
      link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
      // 匹配最后一个点符号之后的所有字符（即文件名的格式后缀），然后将其替换为空字符串
      link.download = this.pdfBaseInfo.name.replace(/\.[^/.]+$/, "") + ".txt";

      // 添加到文档中并模拟点击下载
      document.body.appendChild(link);
      this.$message.success("下载成功");
      link.click();
      document.body.removeChild(link);
    },
    onRest() {
      this.$confirm("确定要清空对话内容吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          clearConversationDetails({ uuid: this.pdfBaseInfo.uuid }).then(() => {
            this.$message.success("对话内容已清空");
            this.chatList.splice(0);
          });
        })
        .catch(() => {});
    },
    onDelete() {
      this.$confirm("确定要删除此PDF吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // if (!this.userInfo.phoneNumber) {
          //   this.$message.success("对话已删除");
          //   eventBus.$emit("delete", this.pdfBaseInfo.uuid);
          //   return;
          // }
          deleteConversationDetails({ uuid: this.pdfBaseInfo.uuid }).then(
            () => {
              this.$message.success("PDF已删除");
              eventBus.$emit("delete", this.pdfBaseInfo.uuid);
            }
          );
        })
        .catch(() => {});
    },
    onCopy() {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(this.pdfShareLink)
          .then(() => {
            this.$message.success("链接复制成功");
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
        this.$message.success("链接复制成功");
      }
    },
    onChangeName(ok) {
      if (this.pdfBaseInfo.name === this.newPdfName) return;
      if (!this.newPdfName) return this.$message.warning("PDF名称不能为空");
      this.editLoading = true;
      renameConversation({
        uuid: this.pdfBaseInfo.uuid,
        name: this.newPdfName,
      })
        .then(() => {
          ok();
          this.$message.success("PDF名称修改成功");
          eventBus.$emit("rename", this.newPdfName, this.pdfBaseInfo.uuid);
        })
        .finally(() => {
          this.editLoading = false;
        });
    },
    onCloseChangeName() {
      // this.newPdfName = this.pdfBaseInfo.name;
    },
    onShowChangeName() {
      this.newPdfName = this.pdfBaseInfo.name;
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
    padding: 0.2rem 0;
    i {
      color: #3185e9;
      font-size: 1.3rem;
      // font-weight: bold;
      margin-left: 0.6rem;
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
/deep/.el-loading-spinner {
  margin-top: -1rem;
  i {
    font-size: 2rem;
  }
}
#b-popover-class {
  background: #000;
  border-color: #000;
  /deep/.arrow::before {
    border-bottom-color: rgba(0, 0, 0);
  }
  /deep/.arrow::after {
    border-bottom-color: #000;
  }
  /deep/.popover-body {
    color: #fff;
  }
}
.el-button {
  font-size: 0.9rem;
}
</style>