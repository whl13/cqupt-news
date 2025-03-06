<template>
  <div>
    <el-page-header icon="" title="企业门户管理系统">
      <template #content>
        <span class="text-large font-600 mr-3"> 首页 </span>
      </template>
    </el-page-header>
    <el-card style="max-width: 100%">
      <el-row>
        <el-col :span="4"><el-avatar :size="60" :src="avatarUrl" /> </el-col>
        <el-col :span="20">
          <p class="text-item">
            欢迎回来，{{ store.state.userInfo.username }}，{{ welcomeWord }}
          </p></el-col
        >
      </el-row>
    </el-card>
    <el-card style="max-width: 100%; height: 600px">
      <template #header>
        <div class="card-header">
          <span>公司产品</span>
        </div>
      </template>
      <el-carousel :interval="5000" arrow="always" height="600px">
        <el-carousel-item v-for="item in loopList" :key="item._id">
          <div
            class="productitem"
            :style="{
              backgroundImage: `url(http://localhost:3000${item.cover})`,
            }"
          >
            <h3 text="2xl" justify="center">{{ item.title }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>
<script setup>
import store from "@/store";
import { computed, onMounted, ref } from "vue";
import axios from "axios";
const avatarUrl = computed(() => {
  return store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
});
const welcomeWord = computed(() => {
  return new Date().getHours() < 12 ? "早上好!" : "下午好!";
});
const loopList = ref([]);
onMounted(() => {
  getProductlist();
});
const getProductlist = async () => {
  const res = await axios.get("/adminapi/product/getlist");
  loopList.value = res.data.data;
  console.log(loopList.value);
};
</script>
<style lang="scss" scoped>
.el-card {
  margin-top: 40px;
  .text-item {
    font-size: 20px;
    line-height: 60px;
  }
}

.productitem {
  background-size: 100% 100%;
  height: 100%;
}

.el-carousel__item h3 {
  color: #fff;
  opacity: 0.75;
  line-height: 600px;
  margin: 0;
  text-align: center;
}
</style>