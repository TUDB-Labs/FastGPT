<template>
  <div class="wrapper">
    <div style="margin-top: 40vh;">
      <div>抱歉，当前页面好像丢失了，可尝试进行刷新或返回首页</div>
      <div style="margin-top: 0.5rem;">
        <el-button size="small"
        icon="el-icon-back"
        type="primary"
        @click="$router.replace('/')">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error",
  props: {},
  components: {},
  data() { 
    return {}
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {}
}
</script>

<style lang='less' scoped>
.wrapper{
  position: fixed;
  width: 100vw;
  top: 0;
  background-color: #fff;
  z-index: 5;
  height: 100vw;
}
</style>