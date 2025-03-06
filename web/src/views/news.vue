<template>
  <div class="container">
    <div class="top"></div>
    <el-popover
      placement="bottom"
      title="搜索结果"
      :width="500"
      :visible="visible"
    >
      <template #reference>
        <el-input
          v-model="input"
          placeholder="请输入关键词"
          :prefix-icon="Search"
          size="large"
          @focus="visible = true"
          @blur="visible = false"
        />
      </template>
      <div v-if="searchNewsList.length">
        <div
          class="search-item"
          v-for="item in searchNewsList"
          :key="item._id"
          @click="handleChangepage(item._id)"
        >
          {{ item.title }}
        </div>
      </div>
      <div v-else>
        <el-empty description="暂无搜索结果" :image-size="100" />
      </div>
    </el-popover>
    <div class="news-list">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in topNewsList" :key="item._id"
          ><el-card
            :body-style="{ padding: '0' }"
            shadow="hover"
            @click="handleChangepage(item._id)"
          >
            <div
              class="news-bg"
              :style="{
                backgroundImage: `url( http://localhost:3000${item.cover})`,
              }"
            ></div>
            <div class="news-body">
              <div class="news-title">
                {{ item.title }}
              </div>
              <div class="news-time">
                {{ timeFormatter(item.editTime) }}
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-tabs v-model="activeName" type="card" class="news-tabs">
      <div v-for="item in tabList" :key="item.name">
        <el-tab-pane :label="item.label" :name="item.name">
          <el-row :gutter="20">
            <el-col :span="18">
              <div v-for="data in tabNews[item.name]" :key="data._id">
                <el-card shadow="hover" @click="handleChangepage(data._id)">
                  <div
                    class="tabnews-bg"
                    :style="{
                      backgroundImage: `url( http://localhost:3000${data.cover})`,
                    }"
                  ></div>
                  <div class="tabnews-title">{{ data.title }}</div>
                  <div class="tabnews-time">
                    {{ timeFormatter(data.editTime) }}
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="6">
              <el-timeline style="max-width: 600px">
                <el-timeline-item
                  v-for="(activity, index) in tabNews[item.name]"
                  :key="index"
                  :timestamp="timeFormatter(activity.editTime)"
                >
                  {{ activity.title }}
                </el-timeline-item>
              </el-timeline>
            </el-col>
          </el-row>
        </el-tab-pane>
      </div>
    </el-tabs>
    <el-backtop :visibility-height="100" />
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref, onMounted, computed } from "vue";
import router from "@/router";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
const activeName = ref(1);
const visible = ref(false);
const input = ref("");
const newsList = ref([]);
const searchNewsList = computed(() => {
  if (!input.value) return [];
  return newsList.value.filter((item) => item.title.includes(input.value));
});
const topNewsList = computed(() => {
  return newsList.value.slice(0, 4);
});
onMounted(async () => {
  await getnewslist();
});
const getnewslist = async () => {
  const res = await axios.get("/webapi/news/getnewslist");
  newsList.value = res.data.data;
};
const timeFormatter = (editTime) => {
  return moment(editTime).format("YYYY-MM-DD HH:mm:ss");
};
const tabNews = computed(() => {
  return _.groupBy(newsList.value, "category");
});
const tabList = ref([
  {
    label: "最新动态",
    name: 1,
    content: tabNews.value[1],
  },
  {
    label: "典型案例",
    name: 2,
    content: tabNews.value[2],
  },
  {
    label: "通知公告",
    name: 3,
    content: tabNews.value[3],
  },
]);
const handleChangepage = (id) => {
  console.log(id);
  router.push(`/newsitem/${id}`);
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.top {
  height: 500px;
  background: url("https://tp.daxuejiayou.com/article/20240615/1aa4330b51292d3b.jpg")
    no-repeat center / 100% 100%;
}
.el-input {
  position: absolute;
  top: 450px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
}
.search-item {
  height: 50px;
  line-height: 50px;
  &:hover {
    background: #f5f7fa;
  }
}
.news-list {
  margin: 20px;
  .news-bg {
    width: 100%;
    height: 200px;
    background-size: 100% 100%;
  }
  .news-body {
    padding: 10px;
  }
  .news-title {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0;
  }
  .news-time {
    color: #999;
    font-size: 14px;
  }
}
.news-tabs {
  margin: 20px;
  .el-card {
    margin: 10px 0;
  }
  .tabnews-bg {
    float: left;
    margin-right: 10px;
    width: 100px;
    height: 100px;
    background-size: 100% 100%;
  }
  .tabnews-title {
    font-size: 20px;
    margin: 5px;
  }
  .tabnews-time {
    color: #999;
    font-size: 10px;
  }
}
</style>