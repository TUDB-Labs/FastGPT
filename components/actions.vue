<template>
  <p class="actions">
    <!-- <img src="https://cdn.tudb.work/aios/web/images/copy.png" alt="copy" @click="onCopy" /> -->
    <img
      class=""
      :class="[showLikeAnimat ? 'like-button' : null]"
      :src="
        attitude === 1
          ? require('@/assets/images/like-active.png')
          : require('@/assets/images/like.png')
      "
      alt="like"
      @click="onLike"
    />
    <img
      :src="
        attitude === -1
          ? require('@/assets/images/diss-active.png')
          : require('@/assets/images/diss.png')
      "
      :class="[showNoLikeAnimat ? 'diss-button' : null]"
      alt="diss"
      @click="onNoLike"
    />
  </p>
</template>

<script>
export default {
  name: "actions",
  props: {
    content: {
      type: String,
      default: "",
    },
    attitude: {
      type: Number,
      default: 0,
    },
  },
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
      const text = this.content;

      const textarea = document.createElement("textarea");
      textarea.value = text;

      document.body.appendChild(textarea);

      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    },
    onLike() {
      if (this.attitude === 1) return;
      this.showLikeAnimat = true;
      this.$emit("like");
      setTimeout(() => {
        this.showLikeAnimat = false;
      }, 1000);
    },
    onNoLike() {
      if (this.attitude === -1) return;
      this.showNoLikeAnimat = true;
      this.$emit("diss");
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
  img {
    margin-left: 8px;
    width: 1.2rem;
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
.diss-button {
  animation-name: like;
  animation-duration: 1s;
  animation-timing-function: ease-out;
}
</style>