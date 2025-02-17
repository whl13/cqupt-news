<template>
  <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="changeImg"
  >
    <img v-if="props.avatar" :src="updateAvatar" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue";
import { computed } from "vue";
const props = defineProps({
  avatar: { type: String, default: "" },
});
const emit = defineEmits(["changeImg"]);
const changeImg = (file) => {
  emit("changeImg", file.raw);
};
const updateAvatar = computed(() => {
  return props.avatar.includes("blob")
    ? props.avatar
    : " http://localhost:3000" + props.avatar;
});
</script>

<style lang="scss" scoped>
.avatar {
  width: 178px;
  height: 178px;
}
.avatar-uploader {
  width: 178px;
  height: 178px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>