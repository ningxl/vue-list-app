<template>
  <el-container>
    <el-header height="70px">
      <el-image :src="src" style="height:100%"></el-image>
      <div class="userIcon">
        <el-avatar class="el-dropdown-link" icon="el-icon-user-solid"></el-avatar>
      </div>
    </el-header>
    <el-container>
      <el-aside width="150px">
        <el-menu
          router
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#333"
          text-color="#fff"
        >
          <el-menu-item index="/navCon/mainPage">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/navCon/chart">
            <i class="el-icon-s-order"></i>
            <span slot="title">管理</span>
          </el-menu-item>
          <el-menu-item index="/navCon/config">
            <i class="el-icon-info"></i>
            <span slot="title">关于</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import src from "@/assets/element.svg";
export default {
  data() {
    return {
      src: src
    };
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}
p {
  line-height: 50px;
  color: #fff;
}
.el-aside {
  background-color: #333;
}
.el-menu {
  border: #333;
}
html,
body,
#app,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.userIcon {
  float: right;
  line-height: 70px;
  color: #e9eef3;
}
.el-avatar {
  vertical-align: middle;
  margin-right: 20px;
}
</style>
