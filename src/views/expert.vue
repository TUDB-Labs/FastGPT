<template>
  <div class="wrapper">
    <h1 class="content-width">
      <strong>专家咨询</strong>
    </h1>
    <div class="content">
      <div class="form">
        <p class="form-item">
          <span class="label">
            <img src="@/assets/images/phone.png" alt="" />
            联系方式</span
          >
          <input
            type="text"
            v-model="formData.phoneNumber"
            placeholder="请输入您的电话或邮箱 (必填)"
          />
        </p>
        <p class="form-item">
          <span class="label">
            <img src="@/assets/images/message.png" alt="" />咨询内容</span
          >
          <textarea
            v-model="formData.problem"
            :rows="5"
            maxlength="200"
            placeholder="请输入您想了解的内容(选填)"
          />
        </p>
        <div class="percent">{{ formData.problem?.length || 0 }} / 200</div>
      </div>
      <div class="action">
        <b-button @click="onSubmit">提 交</b-button>
        <b-button class="back" style="" @click="onBack">返 回</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { insertSolution, insertClickrecord } from "@/api/request.js";
import showToast from "@/utils/toast.js";
export default {
  name: "expert",
  props: {},
  components: {},
  data() {
    return {
      formData: {},
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    onSubmit() {
      let testStr = this.formData.phoneNumber;
      if (!testStr) {
        return showToast(this, {
          content: "请输入您的联系方式",
          type: "danger",
        });
      }
      var regPhone = /^[1][3-9][0-9]{9}$/;
      var regEMail = /^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
      if (!regPhone.test(testStr) && !regEMail.test(testStr) && testStr != "") {
        return showToast(this, {
          content: "请输入您的正确联系方式",
          type: "danger",
        });
      } else {
        insertSolution(this.formData)
          .then((res) => {
            if (res.data.code == 200) {
              showToast(this, {
                content: "已提交，我们会及时联系您",
              });
              //按钮点击记录
              let params = {
                clickedItem: "提交",
                clickedCookie: this.$cookies.get("token"),
              };
              insertClickrecord(params)
                .then(() => {})
                .catch(() => {});
            } else {
              showToast(this, {
                content: res.message,
                type: "danger",
              });
            }
          })
          .catch(() => {});
      }
    },
    onBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  h1 {
    background: url(../assets/images/zjzx.png);
    background-size: 100% 100%;
    height: 400px;
    color: #fff;
    margin: 24px auto 0;
    border-radius: 24px;
    position: relative;
    strong {
      position: absolute;
      left: 13%;
      top: 43%;
    }
  }
  .content {
    padding: 50px 0 100px;
    .form {
      width: 60%;
      margin: 0 auto;
      position: relative;
      .form-item {
        display: flex;
        &:not(:last-child) {
          margin-bottom: 30px;
        }
        .label {
          margin-right: 12px;
          margin-top: 5px;
          height: 26px;
          display: flex;
          align-items: center;
          color: #4f4f4f;
          img {
            margin-right: 6px;
          }
        }
        input {
          background-color: #f0f0f0;
          border-radius: 20px;
          border: 1px solid #dcdfe6;
          outline: none;
          padding: 6px 15px;
          flex: 1;
        }
        textarea {
          background-color: #f0f0f0;
          border-radius: 20px;
          border: 1px solid #dcdfe6;
          outline: none;
          padding: 6px 15px;
          flex: 1;
        }
      }
      .percent {
        position: absolute;
        right: 0;
        bottom: -30px;
      }
    }
    .action {
      margin-top: 50px;
      .back {
        margin-left: 24px;
        background: transparent;
        border-color: #bdbdbd;
        color: #bdbdbd !important;
      }
      &:hover {
        background-color: transparent;
        border-color: #dcdfe6;
      }

      &:focus {
        background-color: transparent;
      }
    }
  }
  button {
    width: 120px;
  }
}
</style>