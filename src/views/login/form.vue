<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      :rules="loginRules"
      autocomplete="on"
      class="login-form"
      label-position="left"
      ref="loginFormRef"
    >
      <div class="title-container">
        <h3 class="title">{{ title }}</h3>
      </div>
      <el-form-item
        prop="userName"
        :class="ative === 'userName' ? 'focus' : ''"
      >
        <span class="svg-container">
          <svg-icon icon="user" :size="iconSize" />
        </span>
        <el-input
          autocomplete="on"
          name="username"
          :placeholder="placeholderUserName"
          @focus="ative = 'userName'"
          @blur="ative = ''"
          ref="userNameRef"
          tabindex="1"
          type="text"
          v-model="loginForm.userName"
        />
      </el-form-item>

      <el-tooltip
        content="大写锁定已开启"
        placement="right"
        :visible="data.capsTooltip"
      >
        <el-form-item
          prop="password"
          :class="ative === 'password' ? 'focus' : ''"
        >
          <span class="svg-container">
            <svg-icon icon="password" :size="iconSize" />
          </span>
          <el-input
            :key="data.passwordType"
            :type="data.passwordType"
            @blur="(data.capsTooltip = false), (ative = '')"
            @focus="ative = 'password'"
            @keyup.enter.native="handleLogin"
            @keyup.native="checkCapslock"
            autocomplete="on"
            name="passwordRef"
            :placeholder="placeholderPassword"
            ref="password"
            tabindex="2"
            v-model="loginForm.password"
          />
          <span @click="showPwd" class="show-pwd">
            <svg-icon
              :size="iconSize"
              :icon="data.passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="data.loading"
        @click.native.prevent="handleLogin"
        class="color-btn"
        style="width: 100%; margin-bottom: 15px"
        type="primary"
        >登 录
      </el-button>

      <div style="position: relative; padding: 10px 0">
        <!-- <div class="tips">
          <span>Username : admin</span>
          <span>Password : any</span>
        </div>-->
        <el-link @click="emit('type')" class="thirdparty-button" type="primary"
          >账号注册</el-link
        >
        <el-link
          @click="data.showDialog = true"
          class="thirdparty-button"
          type="primary"
          >忘记密码</el-link
        >
      </div>
    </el-form>

    <el-dialog :visible.sync="data.showDialog" title="Or connect with">
      Can not be simulated on local, so please combine you own business
      simulation! ! !
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { useRoute } from "vue-router";
import {
  ElLink,
  ElDialog,
  ElForm,
  ElButton,
  ElFormItem,
  ElTooltip,
  ElInput,
} from "element-plus";
// import { useUserStore } from "@/store/user";
// import SocialSign from './components/SocialSignin'
// import router from "@/router";
const route = useRoute();
// const store = useUserStore();
const store = ref();
const emit = defineEmits(["type"]);
const title = "登录";
const ative = ref("");
const placeholderPassword = "请输入登录密码";
const placeholderUserName = "请输入账户";
const iconSize = 13;
const validateUsername = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入账号"));
  } else {
    callback();
  }
};
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error("密码不能少于6位"));
  } else {
    callback();
  }
};
const loginRules = {
  userName: [{ required: true, trigger: "blur", validator: validateUsername }],
  password: [{ required: true, trigger: "blur", validator: validatePassword }],
};
const loginForm = ref({
  userName: "admin",
  password: "000000",
});
const data = reactive({
  passwordType: "password",
  capsTooltip: false,
  loading: false,
  showDialog: false,
  type: 1,
});
const userNameRef = ref();
const passwordRef = ref();
const loginFormRef = ref();
function checkCapslock(e) {
  const { key } = e;
  data.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
}
function showPwd() {
  if (data.passwordType === "password") {
    data.passwordType = "";
  } else {
    data.passwordType = "password";
  }
  nextTick(() => {
    passwordRef.value.focus();
  });
}
function handleLogin() {
  window.open("/management/pageSetting", "_blank");
  return true;
  // 下面才是正常代码 现阶段直接跳过
  loginFormRef.value.validate((valid) => {
    if (valid) {
      const form = loginForm.value;
      data.loading = true;
      store
        .login(form)
        // .dispatch('user/login', form)
        .then((res) => {
          const redirect = route.query.redirect;
          router.replace({
            path: redirect || "/",
            query: getOtherQuery(route.query),
          });
          data.loading = false;
        })
        .catch(() => {
          data.loading = false;
        });
    } else {
      console.log("error submit!!");
      return false;
    }
  });
}
function getOtherQuery(query) {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== "redirect") {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
}
function focus() {
  const form = loginForm.value;
  if (form.userName === "") {
    userNameRef.value.focus();
  } else if (form.password === "") {
    passwordRef.value.focus();
  }
}
onMounted(() => {
  document.addEventListener("keypress", checkCapslock);
});
onBeforeUnmount(() => {
  document.removeEventListener("keypress", checkCapslock);
});
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$bg: #283443; //整体背景颜色
$light_gray: #fff;
$cursor: #fff;
.login-container {
  position: relative;
  //整个登录页面
  min-height: 100%;
  width: 100%;
  // background-color: $bg;

  .login-form {
    position: fixed;
    background-color: $bg;
    right: 100px;
    top: 50%;
    transform: translateY(-50%);
    width: 347px;
    padding: 0px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 8px;
    z-index: 1;

    :deep(.el-input) {
      @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        input {
          color: $cursor;
        }
      }
      display: inline-block;
      height: 47px;
      width: 85%;
      overflow: hidden;
      box-sizing: border-box;
      .el-input__wrapper {
        background: transparent;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        box-shadow: initial;
      }

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 48px;
        caret-color: $cursor;

        &:-webkit-autofill {
          //box-shadow: 0 0 0px 1000px transparent inset !important;
          transition: background-color 5000s ease-in-out 0s;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
      &.focus {
        border-color: #94d1f1;
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    pointer-events: none;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 22px;
      color: $light_gray;
      margin: 0 auto;
      line-height: 55px;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    //position: absolute;
    //right: 0;
    //bottom: 6px;
    margin-right: 10px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }

  .color-btn {
    position: relative;
    height: 40px;
    font-size: 15px;
    background: linear-gradient(
      to right,
      rgb(119, 232, 240),
      rgb(245, 128, 245),
      rgb(188, 241, 64),
      rgb(57, 101, 233),
      rgb(157, 241, 214) /*"FF399DE9"*/
    );
    background-size: 400%;

    &:hover {
      animation: bg-move 10s linear infinite;

      :after {
        content: "";
        position: absolute;
        display: block;
        background: linear-gradient(
          to right,
          rgb(119, 232, 240),
          rgb(245, 128, 245),
          rgb(188, 241, 64),
          rgb(57, 127, 233),
          rgb(157, 241, 214)
        );

        z-index: -1;

        top: -5px;
        right: -5px;
        bottom: -5px;
        left: -5px;
        filter: blur(10px);
      }
    }
  }
}

@keyframes bg-move {
  100% {
    background-position: -400% 0;
  }
}
</style>
