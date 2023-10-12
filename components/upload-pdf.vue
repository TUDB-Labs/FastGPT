<template>
  <el-upload
    ref="upload"
    drag
    :action="uploadUrl"
    :show-file-list="false"
    accept=".pdf"
    :headers="{ Authorization: token }"
    :before-upload="onBeforeUpload"
    :on-progress="onProgress"
    :on-error="onError"
    :on-success="onSuccess"
  >
    <slot />
    <!-- <div class="acion-upload">
      <img src="@/assets/images/upload-file.png" alt="" />
      <p>选择PDF文件</p>
    </div>
    <p class="drag-upload">或将PDF拖到此处</p> -->
    <login-modal ref="loginModal" />
  </el-upload>
</template>

<script>
import { mapGetters } from "vuex";
import LoginModal from "@/components/layouts/login-modal.vue";
import { isExceedLimit, addWebCount } from "@/utils/index.js";
export default {
  name: "upload-pdf",
  props: {},
  components: {
    LoginModal,
  },
  data() {
    return {
      fileInfo: {},
      uploadUrl: `${process.env.VUE_APP_WEBSITE_SERVER}/api/pdf/document/upload`,
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {
    ...mapGetters(["token", "userInfo"]),
  },
  methods: {
    onBeforeUpload(file) {
      // 只能上传pdf
      if (file.type !== "application/pdf") {
        this.$message.warning("只能上传PDF文件");
        return false;
      }
      // 文件大小不能超过1M
      if (file.size / 1024 / 1024 > 1) {
        this.$message.warning("PDF文件大小超出限制");
        return false;
      }
      if (!this.userInfo.phoneNumber && isExceedLimit("pdfUploadNoAuth")) {
        this.$message.warning("您今日的上传次数已达上限3次");
        this.$refs.loginModal.show();
        return false;
      }
      if (this.userInfo.phoneNumber && isExceedLimit("pdfUpload")) {
        this.$message.warning("您今日的上传次数已达上限5次");
        return false;
      }
      this.fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        percent: 0,
      };
      this.curStatus = "uploading";
      this.$emit("before-upload", this.fileInfo);
      return true;
    },
    onProgress(event) {
      this.$emit("on-progress", event);
      // this.$set(this.fileInfo, "percent", Math.floor(event.percent));
    },
    onError() {
      this.$message.error("文件上传失败,请稍后重试");
      this.$emit("on-error");
    },
    onSuccess(event = {}) {
      console.log("on-success");
      if (!this.userInfo.phoneNumber) {
        addWebCount("pdfUploadNoAuth");
      }
      if (this.userInfo.phoneNumber) {
        addWebCount("pdfUpload");
      }
      this.$emit("on-success", event);
    },
    close() {
      this.$refs.upload.abort();
    },
  },
};
</script>

<style scoped>
.wrapper {
}
</style>