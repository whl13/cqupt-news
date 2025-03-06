<template>
  <div>
    <el-carousel
      height="calc(100vh - 60px)"
      direction="vertical"
      motion-blur
      :autoplay="false"
    >
      <el-carousel-item v-for="item in productList" :key="item._id">
        <div
          class="productitem"
          :style="{
            backgroundImage: `url( http://localhost:3000${item.cover})`,
          }"
        >
          <el-card>
            <template #header>
              <div class="card-header">
                <h3>{{ item.title }}</h3>
              </div>
            </template>
            <p>{{ item.introduction }}</p>
            <p style="margin-top: 20px">{{ item.detail }}</p>
          </el-card>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
const productList = ref([]);
onMounted(() => {
  axios.get("/webapi/product/getproductlist").then((res) => {
    console.log(res.data.data);
    productList.value = res.data.data;
  });
});
</script>

<style lang="scss" scoped>
.productitem {
  width: 100%;
  height: 100%;
  background-size: cover;
  .el-card {
    width: 50%;
    height: 100%;
    background-color: rgba($color: #fff, $alpha: 0.4);
  }
}
</style>