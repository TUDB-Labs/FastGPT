<template>
  <div class="wrapper">
    <h4>
      <img src="@/assets/images/pdf-icon.png" alt="" />
      <strong>pdf助手</strong>
    </h4>
    <main>
      <div class="upload-wrapper">
        <template v-if="curStatus === 'action'">
          <el-upload
            class="upload-demo acion-upload-wrapper"
            drag
            action="#"
            :show-file-list="false"
            :auto-upload="false"
          >
            <div class="acion-upload">
              <img src="@/assets/images/upload-file.png" alt="" />
              <p>选择PDF文件</p>
            </div>
            <p class="drag-upload">或将PDF拖到此处</p>
          </el-upload>
          <div class="url-upload" @click="onUrlUpload">
            <p>通过url上传</p>
          </div>
        </template>
        <div v-if="curStatus === 'url'" class="url-upload-wrapper">
          <div class="form-wrapper">
            <p class="title">
              <span>输入PDF的URL</span>
              <i class="close-icon el-icon-close" @click="onCloseUrl"></i>
            </p>
            <div class="input-wrapper">
              <img src="@/assets/images/link.png" alt="" class="ling-icon" />
              <input placeholder="输入PDF的URL" type="text" />
              <img src="@/assets/images/url-send.png" alt="" class="send" />
            </div>
          </div>
        </div>
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
      <p class="tips">PDF文档不得超过1MB，暂不支持同时上传多个PDF</p>

      <div class="recommand-list">
        <div v-for="(item, index) in recommandList" :key="index" class="item">
          <img src="@/assets/images/paf-fix.png" alt="" />{{ item.name }}
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "pdf-upload",
  props: {},
  components: {},
  data() {
    return {
      curStatus: "uploading", // action url uploading
      recommandList: [
        {
          id: "1223",
          name: "样例PDF名称样例PDF名称样例PDF名称样例PDF名称样例PDF名称样例PDF名称样例PDF名称.pdf",
        },
        {
          id: "45332",
          name: "样例PDF名称样例PDF名称样例PDF名称样例PDF名称样例PDF名称样例PDF名称样例PDF名称.pdf",
        },
        {
          id: "wf2333",
          name: "样例PDF名称样例PDF名称样例PDF名称样例PDF名称样例PDF名称样例PDF名称样例PDF名称.pdf",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    onUrlUpload() {
      this.curStatus = "url";
    },
    onCloseUrl() {
      this.curStatus = "action";
    },
    onCloseUpload() {
      this.curStatus = "action";
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  h4 {
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0 12px;
    img {
      width: 3rem;
      margin-right: 12px;
    }
  }
  main {
    font-size: 14px;
    width: 71%;
    margin: 0 auto;
    padding: 0.9rem;

    .upload-wrapper {
      background: rgba(230, 230, 230, 0.6);
      // height: 294px;\
      font-size: 0.9rem;
      padding: 12px 12px;
      /deep/.acion-upload-wrapper {
        color: #717171;
        border: 2px dashed #ffffff;
        border-radius: 23px;
        .el-upload {
          width: 100%;
          padding: 2rem 0;
          .el-upload-dragger {
            width: 100%;
            height: 100%;
            border: none;
            background: transparent;
          }
        }
        .acion-upload {
          width: 25rem;
          padding: 0.9rem;
          background: #4f79f6;
          border-radius: 11px;
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
      border-radius: 23px;
      padding: 2rem 3rem;
      .form-wrapper {
        background: #4f79f6;
        border-radius: 12px;
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
            border-radius: 20px;
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
    margin-bottom: 6rem;
    .item {
      display: flex;
      align-items: center;
      border: 1px solid #4f79f6;
      border-radius: 11px;
      padding: 12px;
      color: #000;
      font-weight: 500;
      margin-top: 0.9rem;
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

@media (max-width: 767px) {
  .wrapper {
    h4 {
      padding: 12px 0 12px;
    }
    main {
      width: 90%;
    }
  }
}
</style>