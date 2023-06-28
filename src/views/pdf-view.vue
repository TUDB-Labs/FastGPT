<template>
  <div class="wrapper">
    <div class="pdf-view-wrapper">
      <action-wrapper class="action-wrapper" />
      <pdf-preview class="pdf-preview" />
      <pdf-contract-wrapper class="pdf-contract-wrapper" />
    </div>
    <p class="tips">
      本公司不对服务内容与结果的真实性，准确性进行陈述与保证，相关内容亦不能替代特定领域专家意见
    </p>
  </div>
</template>

<script>
import ActionWrapper from "../components/pdf-view/action-wrapper.vue";
import PdfContractWrapper from "../components/pdf-view/pdf-contract-wrapper.vue";
import PdfPreview from "../components/pdf-view/pdf-preview.vue";
export default {
  name: "pdf-view",
  props: {},
  components: { ActionWrapper, PdfPreview, PdfContractWrapper },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>

<style lang="less" scoped>
.wrapper {
  .pdf-view-wrapper {
    display: flex;
    width: 80%;
    margin: 0 auto;
    background: #f0f0f0;
    border: 1px solid #bdbdbd;
    border-radius: 6px;
    overflow: hidden;
    .action-wrapper {
      width: 300px;
    }
    .pdf-preview,
    .pdf-contract-wrapper {
      flex: 1;
    }
  }
  .tips {
    text-align: center;
    color: #717171;
    margin: 0.7rem 0 0.7rem;
    font-size: 12px;
  }
}
</style>