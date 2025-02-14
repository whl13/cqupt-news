<template>
  <el-header>
    <div class="left">
      <el-icon @click="changeCollapse"><Grid /></el-icon
      ><span>企业门户管理系统</span>
    </div>
    <div class="right">
      <span>欢迎{{ store.state.userInfo.username }}回家</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon><Avatar /></el-icon
        ></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script setup>
import { Grid, Avatar } from "@element-plus/icons-vue";
import store from "@/store";
import { useRouter } from "vue-router";
const changeCollapse = () => {
  store.commit("setCollapse", store.state.isCollapse);
};
const router = useRouter();
const logout = () => {
  localStorage.removeItem("token");
  store.commit("clearUserInfo");
  router.push("/login");
};
const toCenter = () => {
  router.push("/center");
};
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #1a2d3c;
  color: #fff;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left,
  .right {
    display: flex;
    align-items: center;
    font-size: 20px;
    .el-icon {
      color: #fff;
      margin: auto 5px;
      cursor: pointer;
      font-size: 20px;
    }
    span {
      font-weight: bold;
    }
  }
}
</style>
