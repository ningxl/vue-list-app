<template>
  <div class="loginBox">
    <div class="logoImg">
      <el-image :src="src" class="logo"></el-image>
    </div>

    <el-input v-model="input" placeholder="请输入用户名"></el-input>
    <el-button class="loginButton" type="primary" @click="login()">登录</el-button>
  </div>
</template>

<script>
import src from "@/assets/logo.png";
export default {
  data() {
    return {
      input: "",
      src: src
    };
  },
  methods: {
    login() {
      if (!(this.input == "")) {
        this.$router.replace("/navCon/mainPage");
        this.$store.state.username = this.input;
      }
    }
  }
};
</script>

<style>
.loginBox {
  text-align: center;
}
.el-input {
  width: 200px;
  display: inline-block;
}
.loginButton {
  display: inline-block;
}
.logoImg {
  margin: 0 auto;
  margin-top: 100px;
}
</style>
