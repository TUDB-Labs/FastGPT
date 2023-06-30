<template>
  <span class="content-loading" :style="{ background: color }"></span>
</template>

<script>
export default {
  name: "blink-animation",
  props: {
    color: {
      type: String,
      default: "#fff",
    },
  },
  components: {},
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
.content-loading {
  display: inline-block;
  width: 3px;
  height: 18px;
  // border-radius: 2px;
  // position: absolute;
  animation: blink 1s infinite;
  vertical-align: middle;
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>