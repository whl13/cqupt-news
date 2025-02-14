<template>
  <div>
    <el-page-header icon="" title="企业门户管理系统">
      <template #content>
        <span class="text-large font-600 mr-3"> 添加产品 </span>
      </template>
    </el-page-header>
    <el-form
      ref="productFormRef"
      style="max-width: 600px"
      :model="productForm"
      status-icon
      :rules="productRules"
      label-width="auto"
      class="productForm-body"
    >
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="productForm.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="产品简要描述" prop="introduction">
        <el-input
          v-model="productForm.introduction"
          type="textarea"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="产品详细描述" prop="detail">
        <el-input
          v-model="productForm.detail"
          type="textarea"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="产品图片" prop="cover">
        <imgUpload
          :avatar="productForm.cover"
          @changeImg="changeCover"
        ></imgUpload>
      </el-form-item>
      <el-button type="primary" @click="submitForm()" class="update-btn">
        添加产品
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
const productForm = reactive({
  title: "",
  introduction: "",
  detail: "",
  cover: "",
  file: "",
});

const productFormRef = ref();
const productRules = reactive({
  title: [
    { required: true, message: "请输入产品名称", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  introduction: [
    { required: true, message: "请输入产品简要描述", trigger: "blur" },
  ],
  detail: [{ required: true, message: "请输入产品详细描述", trigger: "blur" }],
  cover: [{ required: true, message: "请上传产品图片", trigger: "blur" }],
});

const changeCover = (file) => {
  productForm.cover = URL.createObjectURL(file);
  productForm.file = file;
};
const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await upload("/adminapi/product/addproduct", productForm);
      if (res.data.code === 200) {
        ElMessage({
          message: "添加成功",
          type: "success",
        });
        router.push("./productList");
      }
    }
  });
};
</script>
  
  <style lang="scss" scoped>
.productForm-body {
  margin: 20px auto;
  text-align: center;
}
</style>