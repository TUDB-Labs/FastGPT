<template>
  <el-row class="">
    <el-col :span="13">
      <pdf-preview class="pdf-preview" :pdfBaseInfo="pdfBaseInfo" />
    </el-col>
    <el-col :span="11">
      <pdf-contract-wrapper
        :pdfBaseInfo="pdfBaseInfo"
        :chatList="chatList"
        :recommandList="recommandList"
        :summaryLoading="summaryLoading"
        class="pdf-contract-wrapper"
      />
    </el-col>
  </el-row>
</template>

<script>
import PdfContractWrapper from "../components/pdf-view/pdf-contract-wrapper.vue";
import PdfPreview from "../components/pdf-view/pdf-preview.vue";
import { getConversationDetails } from "@/api/request.js";
import eventBus from "@/utils/event-bus.js";
export default {
  name: "pdf-view-details",
  props: {},
  components: { PdfPreview, PdfContractWrapper },
  data() {
    return {
      pdfBaseInfo: {},
      chatList: [],
      recommandList: [],
      summaryLoading: false,
    };
  },
  created() {
    eventBus.$on("rename", (newName) => {
      console.log("rename", newName);
      this.pdfBaseInfo.name = newName;
    });
  },
  mounted() {},
  beforeDestroy() {
    // eventBus.$off("rename");
  },
  watch: {
    "$route.params.id": {
      handler(id) {
        console.log("uuid", id);
        this.getConversationDetails(id);
      },
      immediate: true,
    },
  },
  computed: {},
  methods: {
    // 获取对话内容
    getConversationDetails(uuid) {
      this.summaryLoading = true;
      const chatItem = {
        type: 4,
        otherType: "summary",
        content: "",
      };
      this.chatList = [];
      getConversationDetails({ uuid })
        .then((res) => {
          // 历史对话记录
          const qa = res.data.qa || [];
          if (res.data.summary) {
            chatItem.content = res.data.summary;
            this.chatList.push(chatItem);
          } else {
            this.chatList.splice(0, 1);
          }
          this.chatList.push(...qa);
          this.recommandList = (res.data.examples || []).slice(0, 3);
          this.pdfBaseInfo = {
            docUrl: res.data.docUrl,
            name: res.data.name,
            uuid: res.data.uuid,
            docUUid: res.data.docUUid,
          };
          console.log(this.chatList);
        })
        .finally(() => {
          this.summaryLoading = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.action-wrapper {
  // width: 240px;
}
.el-col {
  height: 100%;
}
.pdf-preview {
  height: 100%;
  position: relative;
}
// .pdf-contract-wrapper {
//   flex: 1;
// }
</style>