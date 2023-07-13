<template>
  <div
    class="wrapper"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="正在分析中请稍候..."
  >
    <div class="loading"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getShareDocInfo, createConversation } from "@/api/request.js";
export default {
  name: "share",
  props: {},
  components: {},
  data() {
    return {
      loading: true,
    };
  },
  created() {
    this.getShareDocInfo();
  },
  mounted() {},
  watch: {},
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    getShareDocInfo() {
      getShareDocInfo({ uuid: this.$route.params.id })
        .then((res) => {
          this.createConversation(res.data);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    createConversation({ name, uuid }) {
      this.analyzeLoading = true;
      createConversation({ name, docUuid: uuid })
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
            params: {
              id: res.data.uuid,
            },
            name: "PdfViewDetails",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 2003;
}
.loading {
  width: 50px;
  height: 50px;
}
</style>