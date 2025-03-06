<template>
  <div>
    <el-menu
      :default-active="route.fullPath"
      class="el-menu"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/news">新闻</el-menu-item>
      <el-menu-item index="/product">产品</el-menu-item>
      <el-menu-item index="" @click="toLogin">登录</el-menu-item>
    </el-menu>
    <h4 class="right">企业门户官网</h4>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const toLogin = () => {
  window.location = "http://localhost:5173/#/login";
};
</script>

<style lang="scss" scoped>
.el-menu {
  position: sticky;
  top: 0;
}
.right {
  position: absolute;
  right: 40px;
  top: 0;
  height: 60px;
  line-height: 60px;
}
</style>