<template>
  <div>
    <el-card>
      <el-page-header icon="" title="企业门户管理系统">
        <template #content>
          <span class="text-large font-600 mr-3"> 产品列表 </span>
        </template>
      </el-page-header>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="title" label="产品名称" />
        <el-table-column fixed label="产品简要描述">
          <template #default="scope">
            {{ scope.row.introduction }}
          </template>
        </el-table-column>
        <el-table-column fixed label="产品详细描述">
          <template #default="scope">
            {{ scope.row.detail }}
          </template>
        </el-table-column>
        <el-table-column fixed label="更新时间">
          <template #default="scope">
            {{ time.timeFormatter(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column fixed label="操作">
          <template #default="scope">
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
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import time from "@/utils/time";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { Delete, Edit, InfoFilled } from "@element-plus/icons-vue";
const tableData = ref([]);
const router = useRouter();
onMounted(() => {
  getProductlist();
});
const getProductlist = async () => {
  const res = await axios.get("/adminapi/product/getlist");
  tableData.value = res.data.data;
};

const handleDelete = async (data) => {
  await axios.delete(`/adminapi/product/delete/${data._id}`).then((res) => {
    if (res.data.code === 200) {
      getProductlist();
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
  router.push(`/product-manage/productEdit/${data._id}`);
};
</script>
  
  <style lang="scss" scoped>
.el-page-header {
  margin-bottom: 20px;
}
</style>