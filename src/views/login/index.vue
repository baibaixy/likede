<template>
  <div id="app">
    <div class="login-container">
      <div class="login-form">
        <img src="~@/assets/login/logo.png" class="login-logo" />
        <el-form
          label-width="auto"
          class="demo-ruleForm"
          ref="loginForm"
          :model="loginForm"
          :rules="loginFormRules"
        >
          <el-form-item prop="admin">
            <i class="iconfont icon-shouji_o"></i>
            <el-input v-model="loginForm.admin"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <i class="iconfont icon-suo"></i>
            <el-input
              :type="passwordType"
              v-model="loginForm.password"
            ></el-input>
            <span @click="openEyesFn">
              <i class="iconfont icon-guanbi-yanjing" v-if="CloseEyes"></i>
              <i class="iconfont icon-yanjing" v-else></i>
            </span>
          </el-form-item>
          <el-form-item prop="verifyCode">
            <i class="iconfont icon-dunpai-"></i>
            <el-input v-model="loginForm.verifyCode">
              <template #suffix>
                <img
                  :src="verifyCodeImg"
                  class="imgclass"
                  @click="changeVerifyCode"
                />
              </template>
            </el-input>
          </el-form-item>
          <el-button
            type="primary"
            @click="submitForm"
            @keydown.enter="submitForm"
            >登录</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } =
  createNamespacedHelpers('user')
export default {
  data() {
    return {
      input: '',
      CloseEyes: true,
      passwordType: 'password',
      loginForm: {
        admin: 'admin',
        password: 'admin',
        verifyCode: '',
        flag: false
      },
      loginFormRules: {
        admin: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
            message: '用户名格式不正确,至少四位最多十六位',
            trigger: 'blur'
          }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapUserActions(['getverifyCode', 'getUserInfo']),
    async submitForm() {
      try {
        await this.$refs.loginForm.validate()
        const data = {
          loginName: this.loginForm.admin,
          password: this.loginForm.password,
          code: this.loginForm.verifyCode,
          clientToken: this.ClientToken,
          loginType: 0
        }
        this.getUserInfo(data)
      } catch (error) {}
    },
    openEyesFn() {
      this.CloseEyes = !this.CloseEyes
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
    changeVerifyCode() {
      if (this.flag) return
      this.flag = setTimeout(() => {
        this.getverifyCode()
        this.flag = false
      }, 1000)
    }
  },
  computed: {
    ...mapUserState(['verifyCodeImg', 'ClientToken', 'UserInfo'])
  },
  created() {
    this.getverifyCode()
  }
}
</script>

<style scoped lang="scss">
.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url('~@/assets/login/background.png');
  background-repeat: no-repeat;
  background-size: cover;
  .login-form {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
    .login-logo {
      position: absolute;
      width: 96px;
      height: 96px;
      top: -46px;
      left: 50%;
      margin-left: -48px;
    }
    .el-form-item {
      width: 100%;
      height: 52px;
      margin-bottom: 24px;
      background: #fff;
      border: 1px solid #e2e2e2;
      border-radius: 4px;
      .iconfont {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
        font-size: 18px;
      }
      .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        ::v-deep.el-input__inner {
          height: 47px;
          background: transparent;
          border: 0;
          border-radius: 0;
          padding: 12px 5px 12px 15px;
          color: #999;
          caret-color: #999;
          -webkit-appearance: none;
        }
      }
      .imgclass {
        position: absolute;
        top: 0px;
        right: -43px;
        width: 125px;
        height: 50px;
        background-color: #fff;
        border-radius: 1px solid #999;
      }
    }
    .imgClass {
      width: 130px;
      height: 50px;
      background-color: #000;
    }
    .el-button {
      width: 100%;
      height: 52px;
      background: linear-gradient(262deg, #2e50e1, #6878f0);
      opacity: 0.91;
      border-radius: 8px;
      color: #fff;
      text-shadow: 0 7px 22px #cfcfcf;
    }
  }
}
</style>
