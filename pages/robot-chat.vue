<template>
  <div>
    <robot-chat />
  </div>
</template>

<script>
import RobotChat from "@/components/robot-chat.vue";
export default {
  name: "robot-chat-view",
  props: {},
  components: {
    RobotChat
  },
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
/deep/.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .chat-list {
    flex: 1;
    min-height: auto;
    max-height: auto;
  }
}
</style>