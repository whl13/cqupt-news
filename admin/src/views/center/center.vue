<template>
  <div>
    <el-page-header icon="" title="企业门户管理系统">
      <template #content>
        <span class="text-large font-600 mr-3"> 个人中心 </span>
      </template>
    </el-page-header>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card style="max-width: 100%; text-align: center">
          <el-avatar :size="80" :src="avatarUrl" />
          <h3>{{ store.state.userInfo.username }}</h3>
          <h3>{{ store.state.userInfo.role === 1 ? "管理员" : "编辑" }}</h3>
        </el-card></el-col
      >
      <el-col :span="18"
        ><el-card style="max-width: 100%">
          <template #header>
            <div class="card-header" style="text-align: center">
              <span>个人信息</span>
            </div>
          </template>
          <el-form
            ref="userFormRef"
            style="max-width: 400px"
            :model="userForm"
            status-icon
            :rules="userRules"
            label-width="auto"
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
            <el-form-item label="性别" prop="sex">
              <el-select v-model="userForm.sex">
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
            <el-form-item label="头像" prop="avatar">
              <avatarUpload
                :avatar="userForm.avatar"
                @changeImg="changeAvatar"
              ></avatarUpload>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm()"
                class="update-btn"
              >
                更新
              </el-button>
            </el-form-item>
          </el-form>
        </el-card></el-col
      >
    </el-row>
  </div>
</template>
<script setup>
import store from "@/store";
import { computed, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import upload from "@/utils/upload";
import avatarUpload from "@/components/upload/imgUpload.vue";
const avatarUrl = computed(() => {
  return store.state.userInfo.avatar
    ? " http://localhost:3000" + store.state.userInfo.avatar
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
});
const changeAvatar = (file) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};
const { username, password, sex, introduction, avatar } = store.state.userInfo;
const userForm = reactive({
  username,
  password,
  introduction,
  avatar,
  sex,
  file: "",
});
console.log(userForm);

const userFormRef = ref();
const options = [
  {
    value: "1",
    label: "男",
  },
  {
    value: "2",
    label: "女",
  },
  {
    value: "0",
    label: "保密",
  },
];
const userRules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  password: [
    { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" },
  ],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  introduction: [
    { required: true, message: "请输入个人简介", trigger: "blur" },
  ],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});

const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await upload("/adminapi/user/update", userForm);
      if (res.data.code === 200) {
        ElMessage({
          message: "更新成功",
          type: "success",
        });
        store.commit("setUserInfo", res.data.data);
        console.log(store.state.userInfo);
      }
    }
  });
};
</script>
<style lang="scss" scoped>
.el-row {
  margin-top: 20px;
}
.userForm-body,
.update-btn {
  margin: 0 auto;
}
</style>