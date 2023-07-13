<template>
  <div class="wrapper">
    <div class="pdf-view-wrapper">
      <div class="action-wrapper">
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
                element-loading-text="分析中..."
                element-loading-spinner="el-icon-loading"
                class="upload-wrapper"
              >
                <UploadPdf
                  v-show="!analyzeLoading"
                  class="upload-demo acion-upload-wrapper"
                  @on-error="onError"
                  @before-upload="onBeforeUpload"
                  @on-success="onSuccess"
                >
                  <p class="acion-upload">添加新的文件</p>
                  <p class="drag-upload">将PDF拖到此处</p>
                </UploadPdf>
              </div>
              <div class="recommand-list">
                <div
                  v-for="(pdf, index) in conversationList"
                  :key="index"
                  class="item"
                  :class="{ active: $route.params.id === pdf.uuid }"
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
      <router-view class="view" />
    </div>
    <p class="tips">
      本公司不对服务内容与结果的真实性，准确性进行陈述与保证，相关内容亦不能替代特定领域专家意见
    </p>
  </div>
</template>

<script>
// import ActionWrapper from "../components/pdf-view/action-wrapper.vue";
import {
  createConversation,
  getConversationList,
  saveConversation,
} from "@/api/request.js";
import { mapGetters } from "vuex";
import eventBus from "@/utils/event-bus.js";
import UploadPdf from "@/components/upload-pdf.vue";
export default {
  name: "pdf-view",
  props: {},
  components: { UploadPdf },
  data() {
    return {
      pdfBaseInfo: {},
      conversationList: [],
      isCollapsed: false,
      analyzeLoading: false,
    };
  },
  created() {
    eventBus.$on("logined", () => {
      // 将本地对话加入到该用户
      if (!this.conversationList.length) return this.getConversationList();
      saveConversation({
        conversations: this.conversationList.map((item) => item.uuid),
      }).then(() => {
        this.getConversationList();
      });
    });
    eventBus.$on("loginOut", () => {
      console.log("loginOut");
    });
    eventBus.$on("delete", (id) => {
      const index = this.conversationList.findIndex((item) => item.uuid === id);
      this.conversationList.splice(index, 1);
      //如果没登录，就更新缓存
      if (!this.userInfo.phoneNumber) {
        localStorage.setItem(
          "pdf-conversation-list",
          JSON.stringify(this.conversationList)
        );
      }
      // 如果删除后没有pdf文件了，就退出
      if (!this.conversationList.length) {
        return this.$router.replace("/pdf-upload");
      }
      // 选中第一个
      this.selectPdf(this.conversationList[0]);
    });
    this.getConversationList();
  },
  mounted() {},
  beforeDestroy() {
    eventBus.$off("logined");
    eventBus.$off("loginOut");
    eventBus.$off("delete");
  },
  watch: {},
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    getConversationList() {
      // 如果没有登录就从缓存中去取
      if (!this.userInfo.phoneNumber) {
        const list = localStorage.getItem("pdf-conversation-list");
        const conversationList = list ? JSON.parse(list) : [];
        this.conversationList = conversationList;
        return;
      }
      getConversationList()
        .then((res) => {
          this.conversationList = res.data || [];
        })
        .finally(() => {});
    },
    // 打开pdf详情
    selectPdf(pdf) {
      this.$router.replace({
        params: {
          id: pdf.uuid,
        },
      });
    },
    // 收起展开操作栏
    onToggle() {
      // setTimeout(() => {
      this.isCollapsed = !this.isCollapsed;
      // }, 500);
    },
    // 添加会话
    addConversation({ name, uuid }) {
      const data = {
        name,
        docUuid: uuid,
      };
      this.analyzeLoading = true;
      createConversation(data)
        .then((res) => {
          // 如果没有登录就存入缓存
          if (!this.userInfo.phoneNumber) {
            const list = localStorage.getItem("pdf-conversation-list");
            const conversationList = list ? JSON.parse(list) : [];
            conversationList.unshift(res.data);
            localStorage.setItem(
              "pdf-conversation-list",
              JSON.stringify(conversationList)
            );
            this.conversationList = conversationList;
          } else {
            this.getConversationList();
          }
          // 跳转到新的详情页
          this.$router.push({
            params: {
              id: res.data.uuid,
            },
          });
        })
        .finally(() => {
          this.analyzeLoading = false;
        });
    },
    onBeforeUpload() {
      this.analyzeLoading = true;
    },
    onError() {
      this.analyzeLoading = false;
    },
    onSuccess(event = {}) {
      console.log("onSuccess");
      this.addConversation(event.data);
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  .pdf-view-wrapper {
    display: flex;
    width: 85%;
    margin: 0 auto;
    background: #f0f0f0;
    border: 1px solid #bdbdbd;
    border-radius: 6px;
    overflow: hidden;
    .action-wrapper {
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
          height: 5.3rem;
          border-radius: 6px;
          overflow: hidden;
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
        background-color: rgba(255, 255, 255, 0.2);
        .el-loading-spinner {
          margin-top: -1.6rem;
          i {
            font-size: 2rem;
          }
        }
      }
    }
  }
  .view {
    width: calc(100% - 14rem);
  }
  .tips {
    text-align: center;
    color: #717171;
    margin: 0.7rem 0 0.7rem;
    font-size: 12px;
  }
}
</style>