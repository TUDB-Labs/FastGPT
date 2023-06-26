<template>
  <div v-if="isShowGoTop" class="go-top">
    <div id="popover-target-top" class="item">
      <img src="@/assets/images/telephone.png" class="phone" alt="phone1" />
    </div>
    <div id="" class="item">
      <img src="@/assets/images/telephone.png" class="phone" alt="phone1" />
    </div>
    <div class="item" @click="goTop">
      <img src="@/assets/images/cc-top.png" class="top" alt="go-top" />
    </div>
    <b-popover target="popover-target-top" triggers="hover" placement="left">
      <div class="pop-content">
        <img src="@/assets/images/telephone.png" alt="微信公众号" />
        <div>
          <p style=""><strong>联系销售</strong></p>
          <p @click="gotel('010-64998301')">010-64998301</p>
          <!-- <p @click="gotel('010-69835689')">010-69835689</p> -->
        </div>
      </div>
    </b-popover>
  </div>
</template>

<script>
export default {
  name: "controls",
  props: {},
  components: {},
  data() {
    return {
      isShowGoTop: false,
    };
  },
  created() {
    window.onscroll = () => {
      this.isShowGoTop =
        (document.body.scrollTop || document.documentElement.scrollTop) > 10;
    };
  },
  beforeDestroy() {
    window.onscroll = null;
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    goTop() {
      var top = document.body.scrollTop || document.documentElement.scrollTop;
      scrollTo(0, 0);
      this.animateGoTop(top);
    },
    animateGoTop(top) {
      window.requestAnimationFrame(() => {
        top -= 100;
        if (top <= 0) top = 0;
        scrollTo(0, top);
        if (top === 0) return;
        this.animateGoTop(top);
      });
    },
    gotel(phoneNumber) {
      if (!/mobile/i.test(navigator.userAgent)) return;
      window.location.href = "tel:" + phoneNumber;
    },
  },
};
</script>

<style lang="less" scoped>
.go-top {
  position: fixed;
  bottom: 10%;
  right: 12px;
  z-index: 1000;
  .item {
    width: 45px;
    height: 45px;
    // padding: 7.5px;
    background: #ffffff;
    box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.22);
    border-radius: 50%;
    margin: 12px 0;
    // box-sizing: content-box;
    img.top {
      width: 22px;
      height: 22px;
      margin-top: 12px;
    }
    img.phone {
      width: 33px;
      height: 33px;
      margin-top: 6px;
    }
  }
}
/deep/.pop-content {
  display: flex;
  font-size: 1.33rem;
  img {
    margin-right: 6px;
    width: 3.3rem;
    height: 3.3rem;
  }
}
</style>