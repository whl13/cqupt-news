<template>
  <div>
    <el-page-header icon="" title="企业门户管理系统">
      <template #content>
        <span class="text-large font-600 mr-3"> 添加用户 </span>
      </template>
    </el-page-header>
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
          v-model="userForm.introduction"
          type="textarea"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <imgUpload
          :avatar="userForm.avatar"
          @changeImg="changeAvatar"
        ></imgUpload>
      </el-form-item>
      <el-button type="primary" @click="submitForm()" class="update-btn">
        添加用户
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import upload from "@/utils/upload";
import imgUpload from "@/components/upload/imgUpload.vue";
import router from "@/router";
const userForm = reactive({
  username: "",
  password: "",
  introduction: "",
  role: 0,
  avatar: "",
  file: "",
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
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});
//更改头像
const changeAvatar = (file) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await upload("/adminapi/user/adduser", userForm);
      if (res.data.code === 200) {
        ElMessage({
          message: "添加成功",
          type: "success",
        });
        router.push("./userList");
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.userForm-body {
  margin: 20px auto;
  text-align: center;
}
</style>