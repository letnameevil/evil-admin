<template>
  <el-upload
    ref="uploadRef"
    v-model:file-list="fileList"
    :action="action"
    :headers="{
      Authorization: Lockr.get('userInfo')?.token || token,
    }"
    :name="name"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-change="handleChange"
    :on-success="handleSuccess"
    :auto-upload="false"
    :multiple="multiple"
    :drag="drag"
  >
    <el-icon><Plus /></el-icon>
    <template #tip>
      <div class="el-upload__tip">{{ tips }}</div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script  setup name="Evupload">
import { reactive, ref, nextTick } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import * as Lockr from "lockr";

const props = defineProps({
  // 传的地址
  action: {
    type: String,
    required: true,
  },
  token: String,
  name: {
    type: String,
    default: "file",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  drag: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: 1,
  },
  tips: {
    type: String,
    default: "",
  },
});

const uploadRef = ref();

const fileList = ref([]);

// 临时的一个文件
const sendFiles = ref([]);

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove = (uploadFile, uploadFiles) => {
  if (uploadFile.response) {
    const idx = sendFiles.value.findIndex((item) => {
      return item.message === uploadFile.response.message;
    });
    sendFiles.value.splice(idx, 1);
  }
};

// 做一个限制
const handleChange = (v1, v2) => {
  nextTick(() => {
    if (fileList.value.length > props.limit) {
      fileList.value.shift();
    }
  });
};

const emit = defineEmits(["sendResponseMessage"]);

const handleSuccess = (v1, v2) => {
  if (v1.status === 401) {
    throw new Error("token无效");
  }
  // 记录一下上传之前的文件的长度
  const fileListLength = fileList.value.length;
  sendFiles.value.push(v1);
  if (fileListLength === sendFiles.value.length)
    emit("sendResponseMessage", sendFiles.value);
};

const submit = () => {
  if (fileList.value.length === 0) {
    ElMessage("请至少传一个文件吧");
  }
  uploadRef.value.submit();
};

const clearFiles = () => {
  uploadRef.value.clearFiles();
  sendFiles.value = [];
};

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};

defineExpose({ submit, clearFiles });
</script>


<style lang="less" scoped>
::v-deep(.el-upload-dragger) {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
