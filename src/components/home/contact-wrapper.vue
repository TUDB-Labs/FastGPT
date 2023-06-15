<template>
  <div class="main-bottom content-width">
    <div class="main-bottom-left">
      <div class="image">
        <img
          src="https://cdn.tudb.work/aios/web/images/star.png"
          alt="专家团队"
        />
      </div>
      <div class="imgDesc">
        <strong
          >联系
          <span>专家团队</span>
          <br />为您制定解决方案</strong
        >
      </div>
    </div>
    <div class="main-bottom-right">
      <div class="main-bottom-form">
        <div class="input-wrapper">
          <input
            v-model="formData.phoneNumber"
            placeholder="请输入您的电话或邮箱 (必填)"
            type="text"
          />
        </div>
        <div class="textarea-wrapper">
          <textarea
            v-model="formData.problem"
            :rows="5"
            maxlength="200"
            placeholder="请输入您想了解的内容(选填)"
          />
          <div class="percent">{{ formData.problem?.length || 0 }} / 200</div>
        </div>
        <div class="submit-btn">
          <b-button @click="submitForm">提 交</b-button>
        </div>
      </div>
    </div>
    <div class="zd_code">
      <img
        src="https://cdn.tudb.work/aios/web/images/code2.png"
        alt="公众号二维码"
      />
    </div>
  </div>
</template>

<script>
import { insertSolution } from "@/api/request.js";
import showToast from "@/utils/toast.js";
export default {
  name: "contact-wrapper",
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
    //提交
    submitForm() {
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
              this.$emit("buttonClick", "提交");
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
  },
};
</script>

<style lang="less" scoped>
// 专家
.main-bottom {
  margin: 40px auto;
  display: flex;
  justify-content: space-between;
  .main-bottom-left {
    height: 100%;
    text-align: right;
    .image {
      width: 100%;
      height: 130px;
      text-align: right;
      img {
        width: 100px;
        height: 100px;
      }
    }
    .imgDesc {
      font-size: 2.1rem;
      font-family: PingFangSC-Semibold;
      text-align: right;
      span {
        color: #f7b024;
      }
    }
  }
  .main-bottom-right {
    flex: 1;
    height: 100%;
    font-size: 14px;
    margin: 0 5%;
    .main-bottom-form {
      width: 100%;
      height: 70%;
      // padding-left: 80px;
      input {
        background-color: #f0f0f0;
        border-radius: 20px;
        border: 1px solid #dcdfe6;
        outline: none;
        padding: 6px 15px;
        width: 100%;
      }
      .textarea-wrapper {
        margin: 30px 0 20px;
        textarea {
          background-color: #f0f0f0;
          border-radius: 20px;
          border: 1px solid #dcdfe6;
          outline: none;
          padding: 6px 15px;
          width: 100%;
        }
        .percent {
          text-align: right;
        }
      }
      .submit-btn {
        text-align: left;
        button {
          width: 120px;
        }
      }
    }
  }
  .zd_code {
    // width: 25%;
    // height: 81%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    img {
      // width: 150px;
      // height: 150px;
      // display: block;
    }
  }
}

@media (min-width: 767px) {
  .web {
    display: block !important;
  }
  .phone {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .main-bottom {
    display: block;
    .zd_code {
      display: none;
    }
    .main-bottom-left {
      .image {
        text-align: center;
        height: 60px;
        img {
          height: 60px;
          width: 60px;
        }
      }
      .imgDesc {
        margin-top: 6px;
        font-size: 1.8rem;
        text-align: center;
      }
    }
    .main-bottom-right {
      margin: 24px 0 0;
      .textarea-wrapper {
        margin-top: 16px !important;
      }
    }
    .submit-btn {
      text-align: center !important;
      button {
        font-size: 1rem;
      }
    }
  }
}
</style>