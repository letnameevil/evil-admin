<template>
  <div class="add-article">
    <!-- <ev-form
      ref="evFormRef"
      :formConfig="formConfig"
      :formData="ruleForm"
      :rules="rules"
    >
      <template #footer>
        <div class="footer-btn">
          <el-button type="primary" @click="makeSubmit">确定</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
      </template>
    </ev-form> -->
    <el-dialog v-model="isShow" title="新增用户">
      <ev-form
        ref="evFormRef"
        :formConfig="formConfig"
        :formData="ruleForm"
        :rules="rules"
        :colLayout="{ span: 24 }"
        @sendUrlList="getUrlList"
      >
        <template #footer>
          <div class="footer-btn">
            <el-button type="primary" @click="makeSubmit">确定</el-button>
            <el-button @click="reset">重置</el-button>
          </div>
        </template>
      </ev-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

import { formConfig, rules } from "./config/index.form.config";
import EvForm from "@/base-ui/EvForm";

const ruleForm = reactive({
  name: "",
  region: "",
  time: "",
  picList: [],
});

const isShow = ref(true);

const evFormRef = ref();

const makeSubmit = async () => {
  const ret = await evFormRef.value.submitForm();
};

const getUrlList = async (res) => {
  // 这里需要做任何判断，表单是否验证成功，因为只有表单验证成功，才会走这个方法
  if (res) {
    ruleForm.picList = res; // 发请求
    console.log(ruleForm, 9999)
  } else {
    console.log("图片上传出错");
  }
};

const reset = () => {
  evFormRef.value.resetForm();
};
</script>

<style lang="less" scoped>
.footer-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>