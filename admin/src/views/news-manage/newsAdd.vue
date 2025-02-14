<template>
  <div>
    <el-page-header icon="" title="企业门户管理系统">
      <template #content>
        <span class="text-large font-600 mr-3"> 创建新闻 </span>
      </template>
    </el-page-header>
    <el-form
      ref="newsFormRef"
      style="max-width: 700px"
      :model="newsForm"
      status-icon
      :rules="newsRules"
      label-width="auto"
      class="newsForm-body"
    >
      <el-form-item label="新闻标题" prop="title">
        <el-input v-model="newsForm.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新闻内容" prop="content">
        <editor @change="changeContent"></editor>
      </el-form-item>
      <el-form-item label="新闻类型" prop="category">
        <el-select v-model="newsForm.category">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="新闻封面" prop="cover">
        <imgUpload
          :avatar="newsForm.cover"
          @change-img="changeCover"
        ></imgUpload>
      </el-form-item>
      <el-button type="primary" @click="submitForm()" class="update-btn">
        创建新闻
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import editor from "@/components/editor/editor.vue";
import upload from "@/utils/upload";
import imgUpload from "@/components/upload/imgUpload.vue";
const router = useRouter();
const options = [
  { value: 1, label: "最新动态" },
  { value: 2, label: "典型案例" },
  { value: 3, label: "通知公告" },
];
const newsFormRef = ref();
const newsForm = reactive({
  title: "",
  content: "",
  category: 1, //1:最新动态 2：典型案例 3：通知公告
  cover: "",
  file: null,
  isPublish: 0, //0:未发布 1：已发布
});
const newsRules = reactive({
  title: [
    { required: true, message: "请输入新闻标题", trigger: "blur" },
    { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" },
  ],
  content: [{ required: true, message: "请输入新闻内容", trigger: "blur" }],
  category: [{ required: true, message: "请选择新闻类型", trigger: "blur" }],
  cover: [{ required: true, message: "请上传封面图", trigger: "blur" }],
});
const changeCover = (file) => {
  newsForm.cover = URL.createObjectURL(file);
  newsForm.file = file;
};
const changeContent = (e) => {
  console.log(e);
  newsForm.content = e;
};
const submitForm = () => {
  newsFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(newsForm);
      const res = await upload("/adminapi/news/addnews", newsForm);
      if (res.data.code === 200) {
        ElMessage({
          message: "创建成功",
          type: "success",
        });
        router.push("./newsList");
      } else {
        ElMessage({
          message: "创建失败",
          type: "error",
        });
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.newsForm-body {
  margin: 20px auto;
  text-align: center;
}
</style>