<template>
  <div class="wrapper">
    <robot-chat />
  </div>
</template>

<script>
import RobotChat from "@/components/robot-chat.vue";
export default {
  name: "robot-chat-view",
  props: {},
  components: { RobotChat },
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

<style scoped>
.wrapper {
}
</style>