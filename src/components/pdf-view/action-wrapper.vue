<template>
  <div class="wrapper">
    <transition name="collapse">
      <div class="content" :class="[isCollapsed ? 'collapsed' : 'expand']">
        <h4>
          <img src="@/assets/images/pdf-icon.png" alt="" />
          <strong v-show="!isCollapsed">PDF助手</strong>
        </h4>
        <div
          class="icon-plus"
          v-show="isCollapsed"
          @click="isCollapsed = false"
        >
          <i class="el-icon-plus"></i>
        </div>
        <main v-show="!isCollapsed">
          <div
            v-loading="analyzeLoading"
            element-loading-spinner="el-icon-loading"
            class="upload-wrapper"
          >
            <template v-if="curStatus === 'action'">
              <UploadPdf
                class="upload-demo acion-upload-wrapper"
                @on-error="onError"
                @before-upload="onBeforeUpload"
                @on-success="onSuccess"
              >
                <p class="acion-upload">添加新的文件</p>
                <p class="drag-upload">将PDF拖到此处</p>
              </UploadPdf>
            </template>
            <div v-if="curStatus === 'uploading'" class="uploading-wrapper">
              <div class="uploading">
                <p class="title">样例PDF名称样例PDF名称样例PDF名称样例.pdf</p>
                <div class="progress-wrapper">
                  <el-progress
                    color="#254cd8"
                    define-back-color="#fff"
                    :percentage="50"
                  />
                  <i class="el-icon-circle-close" @click="onCloseUpload"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="recommand-list">
            <div
              v-for="(pdf, index) in conversationList"
              :key="index"
              class="item"
              :class="{ active: curPdfInfo.uuid === pdf.uuid }"
              @click="selectPdf(pdf)"
            >
              <img src="@/assets/images/wechat.png" alt="" />
              <span class="name">{{ pdf.name }}</span>
            </div>
          </div>
        </main>
      </div>
    </transition>
    <div class="toggle" @click="onToggle">
      <i
        :class="[
          !isCollapsed ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right',
        ]"
      ></i>
    </div>
  </div>
</template>

<script>
import {
  createConversation,
  getConversationList,
  analyzeDocument,
} from "@/api/request.js";
import { mapGetters } from "vuex";
import eventBus from "@/utils/event-bus.js";
import UploadPdf from "../upload-pdf.vue";
export default {
  name: "action-wrapper",
  props: {},
  components: { UploadPdf },
  data() {
    return {
      curStatus: "action", // action url uploading
      conversationList: [],
      curPdfInfo: {},
      isCollapsed: false,
      analyzeLoading: false,
      uploadFileInfo: {},
    };
  },
  async created() {
    const { isAdd, uuid, name } = this.$route.params;
    // 如果是新增就需要新建绘画
    if (isAdd) {
      return this.addConversation(name, uuid);
    }
    this.getConversationList();

    eventBus.$on("delete", (id) => {
      console.log("delete", id);
      if (!this.userInfo.phoneNumber) {
        const index = this.conversationList.findIndex(
          (item) => item.uuid === id
        );
        this.conversationList.splice(index, 1);
        if (!this.conversationList.length) return;
        this.curPdfInfo = this.conversationList[0];
        this.selectPdf(this.conversationList[0]);
        localStorage.setItem(
          "pdf-conversation-list",
          JSON.stringify(this.conversationList)
        );
        return;
      }
      this.getConversationList();
    });
  },
  mounted() {},
  beforeDestroy() {
    eventBus.$off("delete");
  },
  watch: {},
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    getConversationList(item) {
      if (!this.userInfo.phoneNumber) {
        const list = localStorage.getItem("pdf-conversation-list");
        const conversationList = list ? JSON.parse(list) : [];
        if (item) {
          conversationList.unshift(item);
          localStorage.setItem(
            "pdf-conversation-list",
            JSON.stringify(conversationList)
          );
        }
        this.conversationList = conversationList;
        if (!conversationList.length) return;
        this.curPdfInfo = this.conversationList[0];
        this.selectPdf(this.conversationList[0]);
        return;
      }
      getConversationList()
        .then((res) => {
          this.conversationList = res.data || [];
          this.curPdfInfo = this.conversationList[0];
          this.selectPdf(this.conversationList[0]);
        })
        .finally(() => {});
    },
    selectPdf(pdf) {
      this.curPdfInfo = pdf;
      this.$emit("select", pdf);
    },
    onToggle() {
      // setTimeout(() => {
      this.isCollapsed = !this.isCollapsed;
      // }, 500);
    },
    addConversation(name, uuid) {
      const data = {
        name,
        docUuid: uuid,
      };
      createConversation(data)
        .then((res) => {
          this.getConversationList(res.data);
        })
        .finally(() => {});
    },
    onBeforeUpload() {
      // this.uploadFileInfo = {
      //   ...file,
      // };
      this.analyzeLoading = true;
    },
    onError() {
      // this.fileInfo = {};
      // this.curStatus = "action";
      this.analyzeLoading = false;
    },
    onSuccess(event = {}) {
      // this.fileInfo = {};
      // this.curStatus = "action";
      this.analyzeDocument(event);
    },
    // 分析文档
    analyzeDocument(event) {
      analyzeDocument({ uuid: event.data.uuid })
        .then(() => {
          this.addConversation(event.data.name, event.data.uuid);
        })
        .finally(() => {
          this.analyzeLoading = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  background: #192a51;
  color: #fff;
  padding: 0.8rem 0;
  height: 90vh;
  position: relative;
  z-index: 3;
  .content {
    width: 14rem;
    height: 100%;
    // transition: width 0.3s;
    &.collapsed {
      width: 3.5rem;
      img {
        margin: 0;
      }
    }
    &.expand {
      width: 14rem;
    }
  }
  .icon-plus {
    border: 2px dashed #ffffff;
    width: 2rem;
    height: 2rem;
    line-height: 1.8rem;
    margin: 1.5rem auto;
    cursor: pointer;
    border-radius: 0.4rem;
  }
  .toggle {
    position: absolute;
    right: -0.9rem;
    height: 3rem;
    line-height: 2.8rem;
    top: 50%;
    width: 0.9rem;
    background: #717171;
    border-radius: 0 0.4rem 0.4rem 0;
    i {
      color: #fff;
      font-size: 0.8rem;
      transform: scaleY(1.5);
    }
  }

  h4 {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0;
    color: #fff;
    height: 2rem;
    img {
      width: 2rem;
      margin-right: 12px;
    }
  }
  main {
    font-size: 14px;
    margin: 0 auto;
    padding: 0.9rem;
    height: calc(100% - 50px);

    .upload-wrapper {
      // height: 294px;\
      font-size: 0.9rem;
      /deep/.acion-upload-wrapper {
        color: #717171;
        // border: 2px dashed #ffffff;
        border-radius: 23px;
        .el-upload {
          width: 100%;
          // padding: 1.5rem 0;
          .el-upload-dragger {
            width: 100%;
            height: 100%;
            padding: 0.8rem 0;
            // border: none;
            background: transparent;
            border: 2px dashed #fff;
            &:hover {
              border: 2px dashed #409eff;
            }
            &.is-dragover {
              border: 2px dashed #409eff;
            }
          }
        }
        .acion-upload {
          color: #fff;
          font-size: 1.3rem;
          font-weight: 550;
          img {
            width: 2.5rem;
          }
          p {
            margin-top: 12px;
          }
        }
        .drag-upload {
          color: #fff;
        }
      }
    }
    .uploading-wrapper {
      padding: 2rem 3rem;
      .progress-wrapper {
        margin: 32px auto 0;
        width: 70%;
        display: flex;
        /deep/.el-progress {
          width: 100%;
          .el-progress__text {
            display: none;
          }
        }
        .el-icon-circle-close {
          font-size: 22px;
          color: #254cd8;
          margin-top: -3px;
          cursor: pointer;
          position: relative;
        }
      }
    }
  }

  .recommand-list {
    height: calc(100% - 80px);
    overflow: auto;
    margin-top: 0.9rem;
    .item {
      display: flex;
      align-items: center;
      border-radius: 8px;
      padding: 8px 10px;
      color: #ffffffca;
      &:not(:first-child) {
        margin-top: 0.9rem;
      }
      &:hover {
        color: #ffffff;
      }
      &.active {
        color: #ffffff;
        background: #4f79f6;
      }
      font-size: 12px;
      cursor: pointer;
      display: flex;
      // background: #d6d8db;
      &:hover {
        // background: #f5f7fa;
      }
      img {
        margin-right: 8px;
        width: 1rem;
      }
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  /deep/ .el-loading-mask {
    background-color: #000000e0;
    .el-loading-spinner {
      margin-top: -1rem;
      i {
        font-size: 2rem;
      }
    }
  }
}

// .collapse-enter-active,
// .collapse-leave-active {
//   transition: width 1s linear 0s; /* 动画持续时间 */
// }

// .collapse-enter,
// .collapse-leave-to {
//   width: 0px;
//   overflow: hidden;
// }
</style>