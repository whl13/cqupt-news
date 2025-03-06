<template>
  <el-aside width="$store.state.isCollapse?64px:200px">
    <el-menu
      :collapse="$store.state.isCollapse"
      :router="true"
      :default-active="route.fullPath"
    >
      <el-menu-item index="/index">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon><Avatar /></el-icon>
        <span>个人中心</span>
      </el-menu-item>
      <el-sub-menu index="/user-manage" v-admin>
        <template #title>
          <el-icon><UserFilled /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user-manage/useradd">添加用户</el-menu-item>
          <el-menu-item index="/user-manage/userlist">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><Histogram /></el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/news-manage/newsadd">创建新闻</el-menu-item>
          <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon><Menu /></el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/product-manage/productadd"
            >添加产品</el-menu-item
          >
          <el-menu-item index="/product-manage/productlist"
            >产品列表</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  .el-menu {
    height: 100vh;
  }
}
</style>
<script setup>
import {
  HomeFilled,
  UserFilled,
  Avatar,
  Histogram,
  Menu,
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import store from "@/store";
const route = useRoute();

const vAdmin = {
  /**
   * 在组件挂载完成后执行的生命周期钩子
   * 用于根据用户角色决定是否从DOM中移除当前元素
   *
   * @param {HTMLElement} e - 触发该方法的元素节点
   */
  mounted(e) {
    // 检查当前用户的角色是否不是管理员（角色代码为1）
    if (store.state.userInfo.role !== 1) {
      // 如果用户不是管理员，则从DOM中移除当前元素
      e.parentNode.removeChild(e);
    }
  },
};
</script>