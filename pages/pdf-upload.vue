<template>
  <div class="wrapper">
    <h4>
      <img src="@/assets/images/pdf-icon.png" alt="" />
      <strong>PDF助手</strong>
    </h4>
    <div class="main-wrapper content-width">
      <div
        v-loading="analyzeLoading"
        element-loading-spinner="el-icon-loading"
        element-loading-text="正在分析中请稍后..."
        class="upload-wrapper"
      >
        <template>
          <UploadPdf
            ref="uploadPdf"
            v-show="curStatus === 'action'"
            class="acion-upload-wrapper"
            @before-upload="onBeforeUpload"
            @on-progress="onProgress"
            @on-error="onError"
            @on-success="onSuccess"
          >
            <div class="acion-upload">
              <img src="@/assets/images/upload-file.png" alt="" />
              <p>选择PDF文件</p>
            </div>
            <p class="drag-upload">或将PDF拖到此处</p>
          </UploadPdf>
          <div
            v-show="curStatus === 'action'"
            class="url-upload"
            @click="onUrlUpload"
          >
            <p>通过url上传</p>
          </div>
        </template>
        <div
          v-show="curStatus === 'url'"
          v-loading="uploadUrlLoading"
          element-loading-spinner="el-icon-loading"
          class="url-upload-wrapper"
        >
          <div class="form-wrapper">
            <p class="title">
              <span>输入PDF的URL</span>
              <i class="close-icon el-icon-close" @click="onCloseUrl"></i>
            </p>
            <div class="input-wrapper">
              <img src="@/assets/images/link.png" alt="" class="ling-icon" />
              <input v-model="pdfUrl" placeholder="输入PDF的URL" type="text" />
              <img
                src="@/assets/images/url-send.png"
                alt=""
                class="send"
                @click="onUploadbyUrl"
              />
            </div>
          </div>
        </div>
        <div v-show="curStatus === 'uploading'" class="uploading-wrapper">
          <div class="uploading">
            <p class="title">{{ fileInfo.name }} {{ fileInfo.percent }}</p>
            <div class="progress-wrapper">
              <el-progress
                color="#254cd8"
                define-back-color="#fff"
                :percentage="fileInfo.percent || 0"
              />
              <i class="el-icon-circle-close" @click="onCloseUpload"></i>
            </div>
          </div>
        </div>
      </div>
      <p class="tips">PDF文档不得超过1MB，暂不支持同时上传多个PDF</p>

      <div class="recommand-list">
        <div
          v-for="(item, index) in recommandList"
          :key="index"
          class="item"
          @click="goChat(item)"
        >
          <img src="@/assets/images/paf-fix.png" alt="" />{{ item.name }}
        </div>
      </div>
    </div>
    <login-modal ref="loginModal" />
  </div>
</template>

<script>
import UploadPdf from "../components/upload-pdf.vue";
import LoginModal from "@/components/layouts/login-modal.vue";
import { isExceedLimit, addWebCount } from "@/utils/index.js";
import { mapGetters } from "vuex";
// import { SSE } from "@/utils/index.js";
export default {
  name: "pdf-upload",
  props: {},
  components: { UploadPdf, LoginModal },
  data() {
    return {
      curStatus: "action", // action url uploading
      recommandList: [
        {
          uuid: "d2f993b05bfd4865bf28a3c5895fe2d1",
          name: "中华人民共和国国民经济和社会发展第十四个五年规划(第二篇).pdf",
          url: "aios/pdf/d2f993b05bfd4865bf28a3c5895fe2d1.pdf",
        },
        {
          uuid: "cf47d0fc3f894fefb3c8deb445bd1587",
          name: "《西方经济学》知识点总结(部分).pdf",
          url: "aios/pdf/cf47d0fc3f894fefb3c8deb445bd1587.pdf",
        },
      ],
      fileInfo: {},
      analyzeLoading: false,
      pdfUrl: "",
      uploadUrlLoading: false,
      uploadUrl: `${process.env.VUE_APP_WEBSITE_SERVER}/api/pdf/document/upload`,
    };
  },
  created() {},
  mounted() {
    // this.onSuccess();
  },
  watch: {},
  computed: {
    ...mapGetters(["userInfo", "token"]),
  },
  methods: {
    onUrlUpload() {
      this.curStatus = "url";
    },
    onCloseUrl() {
      this.curStatus = "action";
    },
    onCloseUpload() {
      this.$refs.uploadPdf.close();
      this.fileInfo = {};
      this.curStatus = "action";
    },
    onBeforeUpload(file) {
      this.fileInfo = {
        ...file,
      };
      this.curStatus = "uploading";
    },
    onProgress(event) {
      this.$set(this.fileInfo, "percent", Math.floor(event.percent));
    },
    onError() {
      this.fileInfo = {};
      this.curStatus = "action";
    },
    onSuccess(event = {}) {
      this.createConversation(event.data);
    },
    goChat(item) {
      this.createConversation(item);
    },
    // 分析文档
    analyzeDocument(event) {
      this.analyzeLoading = true;
      this.$request.analyzeDocument({ uuid: event.data.uuid })
        .then(() => {
          this.$router.push({
            name: "pdf-view",
            params: {
              id: event.data.uuid,
              ...event.data,
              isAdd: true,
            },
          });
          this.fileInfo = {};
          this.curStatus = "action";
        })
        .finally(() => {
          this.analyzeLoading = false;
        }).catch(() => {});
    },
    onUploadbyUrl() {
      // 判断链接是否有效
      if (!this.isURLValid(this.pdfUrl))
        return this.$message.warning("请输入有效链接");
      if (!this.userInfo.phoneNumber && isExceedLimit("pdfUploadNoAuth")) {
        this.$message.warning("您今日的上传次数已达上限3次");
        this.$refs.loginModal.show();
        return;
      }
      if (this.userInfo.phoneNumber && isExceedLimit("pdfUpload")) {
        this.$message.warning("您今日的上传次数已达上限5次");
        return;
      }
      this.uploadUrlLoading = true;
      this.$request.uploadPdfByUrl({ url: this.pdfUrl })
        .then((res) => {
          addWebCount();
          this.createConversation(res.data);
        })
        .finally(() => {
          this.uploadUrlLoading = false;
        }).catch(() => {});
    },
    createConversation({ name, uuid }) {
      this.analyzeLoading = true;
      this.$request.createConversation({ name, docUuid: uuid })
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
          }
          // 跳转到详情页
          this.$router.push({
            name: "pdf-view-index-id",
            params: {
              id: res.data.uuid,
            },
          });
        })
        .finally(() => {
          this.analyzeLoading = false;
          this.fileInfo = {};
          this.curStatus = "action";
        }).catch(() => {});
    },
    isURLValid(url) {
      const pattern = /^((http(s)?:\/\/)?[a-z0-9]+(\.[a-z0-9]+)+([/?].*)?)$/i;
      try {
        const validURL = new URL(url);
        return pattern.test(validURL.href);
      } catch (error) {
        return false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  h4 {
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    margin-bottom: 0;
    height: 3rem;
    margin-left: -5.3rem;
    img {
      width: 2.1rem;
      margin-right: 12px;
    }
  }
  .main-wrapper {
    font-size: 14px;
    margin: 0.9rem auto;

    .upload-wrapper {
      background: rgba(230, 230, 230, 0.6);
      // height: 294px;\
      font-size: 0.9rem;
      padding: 12px 12px;
      /deep/.acion-upload-wrapper {
        color: #717171;
        // border: 2px dashed #ffffff;
        // border-radius: 23px;
        .el-upload {
          width: 100%;
          // padding: 2rem 0;
          .el-upload-dragger {
            width: 100%;
            height: 100%;
            border: 2px dashed #fff;
            padding: 1.5rem 0;
            background: transparent;
            &:hover {
              border: 2px dashed #409eff;
            }
            &.is-dragover {
              border: 2px dashed #409eff;
            }
          }
        }
        .acion-upload {
          width: 25rem;
          padding: 0.9rem;
          background: #4f79f6;
          border-radius: 0.3rem;
          margin: 0 auto 12px;
          color: #fff;
          font-size: 18px;
          img {
            width: 2.5rem;
          }
          p {
            margin-top: 12px;
          }
        }
        .drag-upload {
          color: #717171;
        }
      }
      .url-upload {
        padding: 2rem 0;
        color: #4f79f6;
        cursor: pointer;
      }
    }
    .url-upload-wrapper {
      border: 2px dashed #ffffff;
      border-radius: 0.3rem;
      padding: 2rem 3rem;
      .form-wrapper {
        background: #4f79f6;
        border-radius: 0.3rem;
        padding: 1rem 0;
        .title {
          color: #fff;
          text-align: center;
          .close-icon {
            float: right;
            color: #fff;
            margin-right: 12px;
            margin-top: -2px;
            font-size: 20px;
          }
        }
        .input-wrapper {
          display: flex;
          align-items: center;
          position: relative;
          padding: 0 50px;
          margin-top: 24px;
          .ling-icon {
            width: 1.2rem;
            color: #fff;
          }
          input {
            flex: 1;
            margin: 0 10px;
            outline: none;
            border: none;
            padding: 6px 40px 6px 12px;
            border-radius: 0.3rem;
          }
          .send {
            color: #000;
            position: absolute;
            right: 65px;
            padding: 0.5rem;
            cursor: pointer;
          }
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

  .tips {
    text-align: right;
    color: #717171;
    margin: 0.7rem 0 2.5rem;
  }
  .recommand-list {
    .item {
      display: flex;
      align-items: center;
      border: 1px solid #4f79f6;
      border-radius: 0.3rem;
      padding: 12px;
      color: #000;
      font-weight: 500;
      margin-top: 0.9rem;
      text-align: left;
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
}
@media (min-width: 767px) {
  .wrapper {
    h4 {
      position: fixed;
      top: 0;
      left: 50%;
      margin-left: -5.3rem;
    }
  }
}

@media (max-width: 767px) {
  .wrapper {
    h4 {
      padding: 12px 0 12px;
    }
    .main-wrapper {
      width: 90%;
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