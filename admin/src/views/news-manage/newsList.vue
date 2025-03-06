<template>
  <div>
    <el-card>
      <el-page-header icon="" title="企业门户管理系统">
        <template #content>
          <span class="text-large font-600 mr-3"> 新闻列表 </span>
        </template>
      </el-page-header>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="title" label="标题" />
        <el-table-column fixed label="分类">
          <template #default="scope">
            {{ categoryFormatter(scope.row.category) }}
          </template>
        </el-table-column>
        <el-table-column fixed label="更新时间">
          <template #default="scope">
            {{ time.timeFormatter(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column fixed label="是否发布">
          <template #default="scope">
            <el-switch
              v-model="scope.row.isPublish"
              :active-value="1"
              :inactive-value="0"
              @change="handleSwitchChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column fixed label="操作">
          <template #default="scope">
            <el-button
              type="success"
              :icon="Check"
              circle
              @click="handleCheck(scope.row)"
            />
            <el-button
              type="primary"
              :icon="Edit"
              circle
              @click="handleEdit(scope.row)"
            />
            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="确认删除吗?"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button type="danger" :icon="Delete" circle />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogFormVisible" title="新闻内容" width="500">
      <h3>{{ newsDate.title }}</h3>
      <div>{{ time.timeFormatter(newsDate.editTime) }}</div>
      <el-divider />
      <div v-html="newsDate.content"></div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import time from "@/utils/time";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { Check, Delete, Edit, InfoFilled } from "@element-plus/icons-vue";
const tableData = ref([]);
const dialogFormVisible = ref(false);
const newsDate = ref({});
const router = useRouter();
onMounted(() => {
  getNewslist();
});
const getNewslist = async () => {
  const res = await axios.get("/adminapi/news/getnewslist");
  tableData.value = res.data.data;
};
const categoryFormatter = (category) => {
  const categoryMap = {
    1: "最新动态",
    2: "典型案例",
    3: "通知公告",
  };
  return categoryMap[category];
};
const handleSwitchChange = async (item) => {
  await axios.put("/adminapi/news/updatePublish", {
    _id: item._id,
    isPublish: item.isPublish,
  });
  getNewslist();
};
const handleCheck = (item) => {
  newsDate.value = item;
  dialogFormVisible.value = true;
};
const handleDelete = async (data) => {
  console.log(data);
  await axios.delete(`/adminapi/news/delnews/${data._id}`).then((res) => {
    if (res.data.code === 200) {
      getNewslist();
      ElMessage({
        message: "删除成功",
        type: "success",
      });
    } else {
      ElMessage.error("删除失败");
    }
  });
};
const handleEdit = (data) => {
  router.push(`/news-manage/newsEdit/${data._id}`);
};
</script>

<style lang="scss" scoped>
.el-page-header {
  margin-bottom: 20px;
}
</style>