<template>
  <div v-if="isShowGoTop" class="go-top">
    <div id="popover-target-robot" class="item" @click="toggleKefu">
      <img
        v-if="!isShowKefu"
        src="@/assets/images/robot.png"
        class="robot"
        alt="phone1"
      />
      <img
        v-if="isShowKefu"
        src="@/assets/images/close.png"
        class="close-robot"
        alt="phone1"
      />
    </div>
    <div id="popover-target-phone" class="item">
      <img src="@/assets/images/phone.png" class="phone" alt="phone1" />
    </div>
    <div class="item" @click="goTop">
      <img src="@/assets/images/cc-top.png" class="top" alt="go-top" />
    </div>
    <b-popover
      id="contract-modal"
      target="popover-target-phone"
      triggers="hover"
      placement="left"
    >
      <div class="pop-content">
        <img src="@/assets/images/telephone.png" alt="微信公众号" />
        <div>
          <div style=""><strong>联系销售</strong></div>
          <div @click="gotel('010-64998301')">010-64998301</div>
          <!-- <p @click="gotel('010-69835689')">010-69835689</p> -->
        </div>
      </div>
    </b-popover>
    <div v-show="isShowKefu" class="kefu">
      <div class="header">
        <img src="@/assets/images/logo.png" alt="" />
        <span>智能客服</span>
      </div>
      <robot-chat />
    </div>
  </div>
</template>

<script>
import RobotChat from "./robot-chat.vue";
export default {
  name: "controls",
  props: {},
  components: { RobotChat },
  data() {
    return {
      isShowGoTop: true,
      isShowKefu: false,
    };
  },
  created() {
    // window.onscroll = () => {
    //   this.isShowGoTop =
    //     (document.body.scrollTop || document.documentElement.scrollTop) > 10;
    // };
  },
  beforeDestroy() {
    // window.onscroll = null;
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
    toggleKefu() {
      this.isShowKefu = !this.isShowKefu;
    },
  },
};
</script>

<style lang="less" scoped>
.go-top {
  position: fixed;
  bottom: 1.2rem;
  right: 0.8rem;
  z-index: 1000;
  .item {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    // padding: 7.5px;
    background: #ffffff;
    box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.22);
    border-radius: 50%;
    margin: 0.8rem 0;
    // box-sizing: content-box;
    img.top {
      width: 1.6rem;
      height: 1.6rem;
    }
    img.phone {
      width: 1.2rem;
      height: 1.2rem;
    }
    .robot {
      width: 1.2rem;
      height: 1.2rem;
    }
    .close-robot {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
}
#contract-modal {
  /deep/.popover-body {
    padding: 12px;
  }
}
#robot-modal {
  max-width: 500px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.2);
  /deep/.arrow {
    display: none;
  }
  /deep/.popover-body {
    width: 500px;
    padding: 0;
  }
  .header {
    background: #192a51;
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    color: #f5b228;
    font-weight: 550;
    font-size: 1rem;
    img {
      width: 50px;
      height: 18px;
    }
  }
}
.kefu {
  width: 27rem;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 8.5rem;
  right: 3.9rem;
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.22);
  /deep/.arrow {
    display: none;
  }
  /deep/.popover-body {
    width: 500px;
    padding: 0;
  }
  .header {
    background: #192a51;
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    color: #f5b228;
    font-weight: 550;
    font-size: 1rem;
    align-items: center;
    font-family: Noto Sans S Chinese;
    img {
      width: 50px;
      height: 18px;
    }
  }
}
/deep/.pop-content {
  display: flex;
  font-size: 1.33rem;
  img {
    margin-right: 6px;
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>