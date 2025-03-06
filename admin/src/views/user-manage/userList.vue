<template>
  <div>
    <el-card>
      <el-page-header icon="" title="企业门户管理系统">
        <template #content>
          <span class="text-large font-600 mr-3"> 新闻列表 </span>
        </template>
      </el-page-header>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="username" label="用户名" />
        <el-table-column prop="avatar" label="头像"
          ><template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar
                :size="50"
                :src="'http://localhost:3000' + scope.row.avatar"
              />
            </div>
            <div v-else>
              <el-avatar
                :size="50"
                :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
              />
            </div> </template
        ></el-table-column>
        <el-table-column label="角色">
          <template #default="scope">
            <div v-if="scope.row.role === 1">
              <el-tag type="primary">管理员</el-tag>
            </div>
            <div v-else>
              <el-tag type="success">编辑</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button type="warning" plain @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="确认删除吗?"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button type="danger" plain>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogFormVisible" title="编辑用户" width="500">
      <el-form
        ref="userFormRef"
        style="max-width: 400px"
        :model="userForm"
        status-icon
        :rules="userRules"
        label-width="100"
        class="userForm-body"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="userForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="个人简介" prop="introduction">
          <el-input
            type="textarea"
            v-model="userForm.introduction"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="editConfirm()"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
  
  <script  setup>
import axios from "axios";
import { onMounted, ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { InfoFilled } from "@element-plus/icons-vue";
onMounted(() => {
  getUserlist();
});
const dialogFormVisible = ref(false);
const tableData = ref([]);
const userForm = ref({
  username: "",
  password: "",
  introduction: "",
  role: "",
  avatar: "",
  file: "",
});
const userFormRef = ref();
const userRules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" },
  ],
  role: [{ required: true, message: "请选择角色", trigger: "change" }],
  introduction: [
    { required: true, message: "请输入个人简介", trigger: "blur" },
  ],
});
const options = [
  {
    value: 0,
    label: "编辑",
  },
  {
    value: 1,
    label: "管理员",
  },
];
const getUserlist = async () => {
  const res = await axios.get("/adminapi/user/getuserlist");
  tableData.value = res.data.data;
};
const handleDelete = async (data) => {
  await axios.delete(`/adminapi/user/deluser/${data._id}`).then((res) => {
    if (res.data.code === 200) {
      getUserlist();
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
  dialogFormVisible.value = true;
  axios.get(`/adminapi/user/getuserlist/${data._id}`).then((res) => {
    userForm.value = res.data.data[0];
  });
};
const editConfirm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      await axios
        .put(`/adminapi/user/getuserlist/${userForm.value._id}`, userForm.value)
        .then((res) => {
          if (res.data.code === 200) {
            getUserlist();
            ElMessage({
              message: "修改成功",
              type: "success",
            });
          } else {
            ElMessage.error("修改失败");
          }
        });
      dialogFormVisible.value = false;
    }
  });
};
</script>
<style scoped lang="scss">
.el-page-header {
  margin-bottom: 20px;
}
</style>