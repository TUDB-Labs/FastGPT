<template>
  <div class="wrapper">
    <p class="title">
      <span>PDF助手</span>
      <span class="controls">
        <img src="@/assets/images/share.png" alt="" />
        <img src="@/assets/images/download.png" alt="" />
        <img src="@/assets/images/reset.png" alt="" />
        <img src="@/assets/images/pdf-delete.png" alt="" />
      </span>
    </p>
    <div class="chat-list">
      <div class="chat-item"></div>
    </div>
    <div class="fix-bottom">
      <div class="recommand-list">
        <div v-for="(item, index) in recommandList" :key="index" class="item">
          {{ item.name }}
        </div>
      </div>
      <div class="submit-wrapper">
        <input
          v-model.trim="searchValue"
          type="text"
          placeholder="请输入您的问题..."
          maxlength="100"
          @keydown="onKeydown"
        />
        <img
          src="https://cdn.tudb.work/aios/web/images/send-btn.png"
          alt="send-img"
          class="send-img"
          @click="onSearch"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pdf-contract-wrapper",
  props: {},
  components: {},
  data() {
    return {
      recommandList: [
        {
          id: "1223",
          name: "样例PDF名称样例PDF名称",
        },
        {
          id: "45332",
          name: "样例PDF名称样例PDF名称",
        },
        {
          id: "wf2333",
          name: "样例PDF名称样例PDF名称",
        },
      ],
    };
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
  padding: 0.8rem;
  font-size: 12px;
  position: relative;
  box-sizing: border-box;
  .title {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    font-weight: bold;
  }
  .controls {
    img {
      width: 20px;
      margin: 0 6px;
    }
  }
  .fix-bottom {
    position: absolute;
    bottom: 20px;
    width: calc(100% - 1.6rem);
    .recommand-list {
      .item {
        display: flex;
        align-items: center;
        // border: 1px solid #4f79f6;
        // border-radius: 11px;
        // padding: 12px;
        color: #000;
        font-weight: 500;
        // margin-top: 0.9rem;
        cursor: pointer;
        // background: #d6d8db;
        &:hover {
          background: #f5f7fa;
        }
        img {
          margin-right: 8px;
          width: 1rem;
        }
      }
    }
    .submit-wrapper {
      height: 2.2rem;
      // border: 1px solid gray;
      overflow: hidden;
      background: #ffffff;
      border-radius: 5px;
      margin-top: 0.5rem;
      display: flex;
      border: 1px solid #4f79f6;
      input {
        height: 2.2rem;
        border: none;
        width: 100%;
        background: transparent;
        color: #000;
        padding: 0 8px;
        outline: none;
        flex: 1;
        box-shadow: 0 0 20px -12px #80808061, 0 0 20px -12px #80808061,
          0 0 20px -12px #80808061, 0 0 20px -12px #80808061,
          0 0 20px -12px #80808061;
      }
      input::placeholder {
        color: #666;
      }
      .send-img {
        width: 3rem;
        cursor: pointer;
      }

      .send-btn {
        color: #fff;
        // position: absolute;
        width: 3rem;
        height: 3rem;
        // right: 0.5rem;
        // top: 0;
        cursor: not-allowed;
        background: #254cd8;
      }
    }
  }
}
</style>