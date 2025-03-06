<template>
  <div>
    <el-row>
      <el-col :span="17" :offset="1">
        <div class="news-title">
          <h3>{{ newsDate.title }}</h3>
        </div>
        <div class="news-time">{{ timeFormatter(newsDate.editTime) }}</div>
        <el-divider />
        <div class="news-content" v-html="newsDate.content"></div>
      </el-col>
      <el-col :span="4" :offset="1" :pull="1">
        <el-card style="max-width: 480px">
          <template #header>
            <div class="card-header">
              <h3>最新动态</h3>
            </div>
          </template>
          <p
            v-for="item in topList"
            :key="item._id"
            style="padding: 10px"
            @click="handleChangepage(item._id)"
          >
            <span
              ><h4>{{ item.title }}</h4></span
            >
            <span class="news-time">{{ timeFormatter(item.editTime) }}</span>
          </p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, watchEffect, onBeforeUnmount } from "vue";
import router from "@/router";
import moment from "moment";
const route = useRoute();
const newsDate = ref({});
const topList = ref([]);
const stop = watchEffect(async () => {
  if (!route.params.id) return;
  const res = await axios.get(`/webapi/news/getnewslist/${route.params.id}`);
  const res2 = await axios.get(`/webapi/news/gettoplist?limit=4`);
  newsDate.value = res.data.data[0];
  topList.value = res2.data.data;
});
onBeforeUnmount(() => {
  stop();
});
const timeFormatter = (editTime) => {
  return moment(editTime).format("YYYY-MM-DD HH:mm:ss");
};
const handleChangepage = (id) => {
  router.push(`/newsitem/${id}`);
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 20px;
}
.news-title {
  font-size: 25px;
  font-weight: bold;
}
.news-time {
  font-size: 14px;
  color: #999;
}
.news-content {
  font-size: 16px;
  line-height: 1.5;
}
</style>