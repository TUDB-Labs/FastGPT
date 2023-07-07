<template>
  <div class="wrapper">
    <!-- <iframe
      src="https://gztz.idmakers.cn/passapi/file-server/files/view/dde88e07e7c0456aabac230c62145fab"
      frameborder="0"
    ></iframe> -->
    <div class="tool-bars">
      <div class="name-box">
        <img src="@/assets/images/pdf-file.png" alt="" />
        <span class="name flex-sub text-cut">中科知道AIGC中科知道AIGC.pdf</span>
      </div>
      <div class="page-box">
        <el-input-number
          v-model="pageInfo.current"
          size="mini"
          :controls="false"
          :min="1"
          :precision="0"
          :max="pageInfo.total"
          @change="pageNumberChange"
        />
        /
        {{ pageInfo.total }}
      </div>
    </div>
    <div
      v-loading="pdfLoading"
      element-loading-spinner="el-icon-loading"
      ref="pdfContainer"
      class="pdfViewer pdf-container"
    ></div>
  </div>
</template>

<script>
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

// pdfjsLib.GlobalWorkerOptions.workerSrc = import(
//   '"pdfjs-dist/legacy/build/pdf.worker.min.js.js"'
// );
import * as pdfjsViewer from "pdfjs-dist/legacy/web/pdf_viewer.js";
import "pdfjs-dist/legacy/web/pdf_viewer.css";

export default {
  name: "pdf-preview",
  props: {
    pdfBaseInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {},
  data() {
    return {
      pdfViewer: null,
      pageInfo: {
        current: 1,
        total: 4,
      },
      pdfLoading: false,
    };
  },
  created() {
    // fetch(
    //   "https://gztz.idmakers.cn/passapi/file-server/files/view/dde88e07e7c0456aabac230c62145fab"
    // )
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     const link = document.createElement("a");
    //     link.href = URL.createObjectURL(blob);
    //     link.download = "pdf对话.txt";
    //     link.click();
    //     URL.revokeObjectURL(link.href);
    //   })
    //   .catch((error) => console.error("下载文件时发生错误:", error));
    window.onresize = () => {
      if (!this.pdfViewer) return;
      console.log("onresize");
      this.pdfViewer.currentScaleValue = "auto";
      this.pdfViewer.update();
    };
  },
  beforeDestroy() {
    window.onresize = null;
  },
  mounted() {
    this.$nextTick(() => {
      this.initPdfViewer();
      // this.renderPdf();
    });
  },
  watch: {
    pdfBaseInfo: {
      handler() {
        if (!this.pdfViewer) return;
        this.renderPdf();
        console.log(this.pdfBaseInfo);
      },
      deep: true,
    },
  },
  computed: {},
  methods: {
    // 初始化pdfviewer
    initPdfViewer() {
      // 获取全局 eventBus 对象
      const eventBus = new pdfjsViewer.EventBus();
      // 设置 Worker 的路径
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
      const pdfContainer = this.$refs.pdfContainer;
      const pdfViewer = new pdfjsViewer.PDFViewer({
        container: pdfContainer,
        viewer: pdfContainer,
        eventBus,
      });

      // 将 currentScaleValue 设置为自动适应页面宽度
      eventBus.on("pagesloaded", () => {
        this.pdfViewer.currentScaleValue = "auto"; // 设置为自动适应页面宽度
        this.pdfViewer.update(); // 更新视图
      });
      // 监听滚动到第几页
      eventBus.on("pagechanging", (event) => {
        const { pageNumber } = event; // 获取当前页数
        this.pageInfo.current = pageNumber;
      });

      this.pdfViewer = pdfViewer;
      // 渲染pdf到页面
      this.renderPdf();
    },
    // 显示pdf到页面
    renderPdf() {
      const docUrl = this.pdfBaseInfo.docUrl;
      this.pdfLoading = true;
      pdfjsLib
        .getDocument(docUrl)
        .promise.then((pdf) => {
          // 获取并设置总页数
          this.pageInfo.total = pdf.numPages;
          // 初始化翻页
          this.pageInfo.current = 1;
          this.pdfViewer.setDocument(pdf);
        })
        .finally(() => {
          this.pdfLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 手动切换页数
    pageNumberChange(val) {
      if (!this.pdfViewer) return;
      this.pdfViewer.scrollPageIntoView({
        pageNumber: val,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  border-right: 1px solid #bdbdbd;
  padding: 0 0.5rem;
  iframe {
    width: 100%;
    height: 100%;
  }
  .tool-bars {
    display: flex;
    font-size: 1rem;
    align-items: center;
    padding: 0.5rem;
    justify-content: space-between;
    .name-box {
      display: flex;
      align-items: center;
      width: calc(100% - 4.5rem);
      .name {
        font-weight: bold;
        text-align: left;
        flex: 1;
      }
      img {
        width: 1rem;
        margin-right: 0.4rem;
      }
    }
    .page-box {
      display: flex;
      align-items: center;
      color: #717171;
      .el-input-number {
        width: 2.5rem;
        margin-right: 0.3rem;
        /deep/.el-input__inner {
          padding: 0 0.5rem;
          font-size: 0.8rem;
          background: #5e84b1;
          color: #fff;
          border: none;
          text-align: center;
        }
      }
    }
  }
  .pdf-container {
    position: absolute;
    width: calc(100% - 0.5rem);
    height: calc(100% - 3rem);
    overflow: auto;
    padding-right: 0.6rem;
    /deep/.canvasWrapper {
      // overflow: hidden;
      // width: 100%;
      // height: 100%;
      // z-index: 1;
      // display: none;
    }
    /deep/ .page {
      margin-bottom: 0.5rem;
      border: none;
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