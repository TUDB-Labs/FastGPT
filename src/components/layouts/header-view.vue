<template>
  <header>
    <div class="web flex-row content-width">
      <div class="logo">
        <img src="@/assets/images/zd_logo.png" alt="logo" />
      </div>
      <!-- <img id="popover-target-1" src="@/assets/images/weixin01.png" alt="" /> -->
      <b-button
        v-if="['/law', '/buy-car'].includes(curPath)"
        @click="goGuidance"
      >
        <span class="" style="margin-right: 3px">立即咨询</span>
      </b-button>
      <b-button v-else id="popover-target-1" class="fllow" style="">
        <span class="" style="margin-right: 3px">关注我们</span>
        <img id="popover-target-1" src="@/assets/images/weixin1.png" alt="" />
      </b-button>
      <b-popover target="popover-target-1" triggers="hover" placement="bottom">
        <img
          src="@/assets/images/code2.png"
          style="width: 155px; height: 196px"
          alt="微信公众号"
        />
      </b-popover>
    </div>
    <div class="phone flex-row content-width">
      <img src="@/assets/images/zd_logo.png" alt="logo" />
    </div>
  </header>
</template>

<script>
export default {
  name: "header-view",
  props: {},
  components: {},
  data() {
    return {
      curPath: "",
    };
  },
  created() {
    this.curPath = this.$route.path;
  },
  mounted() {},
  watch: {
    "$route.path"(val) {
      this.curPath = this.$route.path;
      console.log(val);
    },
  },
  computed: {},
  methods: {
    goGuidance() {
      this.$router.push("/expert");
    },
  },
};
</script>

<style lang="less" scoped>
header {
  height: 4rem;
  color: #000;
  text-align: center;
}
.flex-row {
  height: 4rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  width: 174px;
  height: 30px;
}
.logo img {
  // width: 100%;
  // height: 100%;
}
button.fllow {
  background: rgb(26 41 82);
  border-color: rgb(26 41 82);
  font-size: 1rem;
  padding: 6px 12px;
}

@media (min-width: 767px) {
  .web {
    display: flex;
  }
  .phone {
    display: none;
  }
}

@media (max-width: 767px) {
  header {
    display: none;
  }
  .web {
    display: none;
  }
  .phone {
    display: flex;
    .flex-row {
      justify-content: center;
    }
  }
}
</style>