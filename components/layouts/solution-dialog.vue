<template>
  <b-modal
    v-model="isShowSolutionModal"
    ref="myModal"
    size="lg"
    id="login-modal"
    centered
    no-close-on-backdrop
    hide-footer
    title="登录"
  >
    <template #modal-header="{}">
      <!-- 自定义头部 -->
      <h5>
        <img src="@/assets/images/logo.png" alt="" />
      </h5>
      <span class="close-btn" @click="onClose"> + </span>
    </template>
    <div class="login-content">
      <el-row class="title-1">联系专家团队</el-row>
      <el-row class="title-2">为您定制专属解决方案</el-row>
      <el-form
        ref="ruleForm"
        label-width="90px"
        inline
        :model="solutionForm"
        :rules="rules"
        size="small"
      >
        <el-form-item label="手机号码:" prop="phoneNumber">
          <el-input
            v-model="solutionForm.phoneNumber"
            maxlength="11"
            placeholder="请输入您的手机号码"
          />
        </el-form-item>
        <el-form-item label="" prop="userName">
          <span slot="label"
            >姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span
          >
          <el-input
            v-model="solutionForm.userName"
            maxlength="15"
            placeholder="请输入您的姓名"
          />
        </el-form-item>
        <el-form-item label="公司名称:" prop="companyName">
          <el-input
            v-model="solutionForm.companyName"
            maxlength="50"
            placeholder="请输入您的公司名称"
          />
        </el-form-item>
        <el-form-item label="所在行业:" prop="industry">
          <el-input
            v-model="solutionForm.industry"
            maxlength="50"
            placeholder="请输入您公司的所在行业"
          />
        </el-form-item>
        <el-form-item prop="job">
          <span slot="label"
            >职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务:</span
          >
          <el-input
            v-model="solutionForm.job"
            maxlength="50"
            placeholder="请输入您的职务"
          />
        </el-form-item>
        <el-form-item label="公司规模:" prop="companySize">
          <el-select
            v-model="solutionForm.companySize"
            placeholder="请选择您所在公司规模"
          >
            <el-option
              v-for="e in companySizeList"
              :key="e.value"
              :label="e.label"
              :value="e.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="合作需求:" prop="demand" class="full-width demand">
          <el-input
            v-model="solutionForm.demand"
            :rows="4"
            placeholder="请简述您的合作需求"
            type="textarea"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <el-row class="confirm-btn-wrapper">
        <b-button
          class="dark-btn confirm-btn"
          :style="{ cursor: saveLoading ? 'not-allowed' : 'auto' }"
          @click="onSave"
        >
          <b-spinner v-if="saveLoading" small></b-spinner>
          提交信息
        </b-button>
      </el-row>
    </div>
  </b-modal>
</template>

<script>
// import showToast from "@/utils/toast.js";
import { mapActions } from "vuex";
export default {
  name: "solution-dialog",
  props: {},
  components: {},
  data() {
    return {
      solutionForm: {},
      rules: {
        phoneNumber: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            validator(rule, value, callback) {
              const regPhone = /^[1][3-9][0-9]{9}$/;
              if (!regPhone.test(value)) {
                return callback(new Error("手机号码格式错误，请更换后重试"));
              }
              callback();
            },
            trigger: "blur",
          },
        ],
        userName: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
      },
      saveLoading: false,
      companySizeList: [
        { label: "0-20人", value: "0-20人" },
        { label: "20-99人", value: "20-99人" },
        { label: "100-499人", value: "100-499人" },
        { label: "500-999人", value: "500-999人" },
        { label: "1000人及以上", value: "1000人及以上" },
      ],
      isShowSolutionModal: false
    };
  },
  asyncData() {
    // 这里可以进行异步数据获取、初始化等操作
    return {
      isShowSolutionModal: false, // 初始化时不展示
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    ...mapActions(["setUserInfo", "setToken"]),
    show() {
      this.$refs.myModal.show();
    },
    onSave() {
      this.$refs.ruleForm.validate((valida) => {
        if (!valida) return;
        this.saveLoading = true;
        this.$request.insertConsultingSolutions(this.solutionForm)
          .then(() => {
            this.$message.success(
              "您的合作需求已提交成功，请耐心等待工作人员的联系"
            );
            this.onClose();
          })
          .finally(() => {
            this.saveLoading = false;
          })
          .catch(() => {});
      });
    },
    onClose() {
      this.$refs.myModal.hide();
      this.solutionForm = {};
      this.isWaiting = false;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/#login-modal {
  .modal-content {
    border: none;
  }
  .modal-dialog {
    // width: 45rem;
    // max-width: initial;
  }
  .el-form {
    display: flex;
    flex-wrap: wrap;
  }
  .el-form-item {
    width: 50%;
    margin-bottom: 1rem !important;
    display: flex;
    margin-right: 0;
    .el-form-item__error {
      top: initial;
    }
    .el-form-item__content {
      flex: 1;
    }
    .el-input,
    .el-select {
      width: 100%;
    }
    .el-textarea__inner {
      padding: 5px 10px;
    }
    .el-input__count {
      bottom: -20px;
      right: 0;
      line-height: 20px;
      background-color: transparent;
    }
    .el-form-item__label {
      font-weight: 549;
      color: #000;
    }
    input {
      color: #000;
    }
  }
  .modal-header {
    position: relative;
    padding: 0;
    height: 3rem;
    display: flex;
    background: #192a51;
    color: #fff;
    h5 {
      text-align: center;
      width: 100%;
      height: 3rem;
      line-height: 2.6rem;
    }
    .close-btn {
      position: absolute;
      right: 0rem;
      height: 23px;
      font-size: 2.3rem;
      top: 0rem;
      transform: rotate(45deg);
      cursor: pointer;
    }
  }
  .login-content {
    padding: 0 2rem 1.2rem;
    .title-1 {
      color: #192a51;
      font-weight: 550;
      font-size: 1.3rem;
      margin-top: 0.5rem;
    }
    .title-2 {
      color: #192a51;
      font-weight: 550;
      font-size: 1.7rem;
      color: #254cd8;
      margin: 0.2rem 0 1.5rem;
    }
    .custom-col {
      width: 50%;
    }
    .el-form-item {
      margin-bottom: 26px;
    }
    .phone-item {
      .el-input-group__append,
      .el-input-group__prepend {
        padding: 0 0.6rem;
      }
    }
    .form-item {
      display: flex;
      height: 40px;
      margin-bottom: 0;
      .el-input {
        flex: 1;
      }
      .get-cod-btn {
        margin-left: 1rem;
      }
    }
    .full-width {
      width: 100% !important;
    }
    .confirm-btn-wrapper {
      text-align: center;
      .confirm-btn {
        // width: 100%;
        width: 15rem;
        margin-top: 1.5rem;
      }
    }
    .dark-btn {
      background: #192a51;

      &:hover {
        background-color: #192a51;
        border-color: #192a51;
        // color: #000;
      }

      &:focus {
        background-color: #192a51;
        border-color: #192a51;
        box-shadow: none;
        // color: #000;
      }
    }
    .tips-item {
      .el-form-item__content {
        line-height: normal;
      }
    }
    .tips {
      font-size: 1rem;
      display: flex;
      margin: 0.5rem 0 0;
      color: #717171;
      a {
        color: #192a51;
        text-decoration: none;
      }
    }
    .custom-control-input:checked ~ .custom-control-label::before {
      background-color: #192a51;
      border-color: #192a51;
    }
  }
}
@media (max-width: 767px) {
  /deep/#login-modal {
    .modal-content {
      border: none;
      border-radius: 0.6rem;
      outline: 0;
      overflow: hidden;
      background-color: #f0f0f0;
    }
    .modal-body {
      padding: 1rem 1.3rem 1rem 1rem;
    }
    .modal-header {
      img {
        width: 4rem;
      }
      .close-btn {
        top: -0.1rem;
      }
    }
    .login-content {
      padding: 0 0 1.2rem;
      .title-1,
      .title-2 {
        text-align: center;
      }
      .el-form-item {
        width: 100%;
      }
      .demand {
        .el-form-item__label {
          display: none;
        }
      }
      .confirm-btn-wrapper .confirm-btn {
        margin-top: 1.5rem;
      }
    }
  }
}
</style>