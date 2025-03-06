<template>
  <el-carousel height="calc(100vh - 60px)">
    <el-carousel-item v-for="item in productList" :key="item._id">
      <div
        class="productitem"
        :style="{
          backgroundImage: `url( http://localhost:3000${item.cover})`,
        }"
      >
        <h2 class="producttitle">{{ item.title }}</h2>
      </div>
    </el-carousel-item>
  </el-carousel>
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
.el-carousel__item h3 {
  color: #475669;
  line-height: 600px;
  opacity: 0.75;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.productitem {
  width: 100%;
  height: 100%;
  background-size: cover;
  .producttitle {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 10px;
    font-size: 30px;
  }
}
</style>