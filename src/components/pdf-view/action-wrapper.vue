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
            <p class="acion-upload">添加新的文件</p>
            <p class="drag-upload">将PDF拖到此处</p>
          </el-upload>
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
        <div v-for="(item, index) in recommandList" :key="index" class="item">
          <img src="@/assets/images/wechat.png" alt="" />
          <span class="name">{{ item.name }}</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "action-wrapper",
  props: {},
  components: {},
  data() {
    return {
      curStatus: "action", // action url uploading
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
  background: #192a51;
  color: #fff;
  padding: 0.8rem 0;
  height: 90vh;
  h4 {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0 12px;
    color: #fff;
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
        border: 2px dashed #ffffff;
        border-radius: 23px;
        .el-upload {
          width: 100%;
          padding: 1.5rem 0;
          .el-upload-dragger {
            width: 100%;
            height: 100%;
            border: none;
            background: transparent;
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
    height: calc(100% - 100px);
    overflow: auto;
    margin-top: 0.9rem;
    .item {
      display: flex;
      align-items: center;
      background: #4f79f6;
      border-radius: 8px;
      padding: 8px 10px;
      color: #fff;
      &:not(:first-child) {
        margin-top: 0.9rem;
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
}
</style>