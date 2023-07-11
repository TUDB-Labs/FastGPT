<template>
  <div
    class="wrapper"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
  >
    <div class="loading"></div>
  </div>
</template>

<script>
import { getShareDocInfo } from "@/api/request.js";
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
    console.log(this.$route);
    this.getShareDocInfo();
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    getShareDocInfo() {
      getShareDocInfo({ uuid: this.$route.params.id }).then((res) => {
        this.$router.replace({
          params: {
            id: res.data.uuid,
            ...res.data,
            isAdd: true,
          },
          name: "PdfView",
        });
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