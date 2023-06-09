<template>
  <p class="actions">
    <img src="@/assets/images/copy.png" alt="copy" @click="onCopy" />
    <img
      class=""
      :class="[showLikeAnimat ? 'like-button' : null]"
      src="@/assets/images/like.png"
      alt="like"
      @click="onLike"
    />
    <img
      src="@/assets/images/no-like.png"
      :class="[showNoLikeAnimat ? 'no-like-button' : null]"
      alt="no-like"
      @click="onNoLike"
    />
  </p>
</template>

<script>
export default {
  name: "actions",
  props: {},
  components: {},
  data() {
    return {
      showLikeAnimat: false,
      showNoLikeAnimat: false,
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    onCopy() {
      const text = this.resultContent;

      const textarea = document.createElement("textarea");
      textarea.value = text;

      document.body.appendChild(textarea);

      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    },
    onLike() {
      this.showLikeAnimat = true;
      setTimeout(() => {
        this.showLikeAnimat = false;
      }, 1000);
    },
    onNoLike() {
      this.showNoLikeAnimat = true;
      setTimeout(() => {
        this.showNoLikeAnimat = false;
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
}
.actions {
  text-align: right;
  margin-top: 12px;
  img {
    margin-left: 12px;
    cursor: pointer;
  }
}
@keyframes like {
  0% {
    transform: scale(1) rotate(0);
  }
  50% {
    transform: scale(1.5) rotate(-45deg);
  }
  100% {
    transform: scale(1) rotate(0);
  }
}

/* 添加动画属性 */
.like-button {
  animation-name: like;
  animation-duration: 1s;
  animation-timing-function: ease-out;
}
.no-like-button {
  animation-name: like;
  animation-duration: 1s;
  animation-timing-function: ease-out;
}
</style>