<template>
  <div>上传图片</div>
  <!-- <ev-upload
    ref="evuplodRef"
    :action="`http://localhost:8888/upload/upAvatar`"
    name="avatar"
    @sendResponseMessage="getResponseMessage"
  >
  </ev-upload> -->
  <!-- <el-button @click="btnClick">点击测试</el-button> -->
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="头像上传：">
      <ev-upload
        ref="evuplodRef"
        :action="`http://localhost:8888/upload/upAvatar`"
        name="avatar"
        @sendResponseMessage="getResponseMessage"
      >
      </ev-upload>
    </el-form-item>
    <el-form-item label="密码：" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Submit</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>


<script setup>
import { ref, reactive } from "vue";
import EvUpload from "@/components/EvUpload";
import { checkboxGroupEmits } from "element-plus";

const evuplodRef = ref();
const ruleFormRef = ref();

const ruleForm = reactive({
  pass: "",
  imageUrl: "",
});


const submitForm = (formEl) => {
  if (!formEl) return;
  // 发请求拿到数据
  evuplodRef.value.submit();
};

const resetForm = (formEl) => {
  console.log(formEl, 999)
  if (!formEl) return;
  formEl.resetFields();
  evuplodRef.value.clearFiles();
};

const getResponseMessage = (res = []) => {
  for (let i = 0; i < res.length; i++) {
    if (res.status > 200) return console.log("上传失败");
  }
  console.log(res);
  ruleForm.imageUrl = res[0].message;

  // 赋值以后发请求 然后重置表单
  setTimeout(() => {
    console.log(ruleForm);
    resetForm(ruleFormRef.value)
  });
};


</script>


<style lang="less" scoped>
</style>