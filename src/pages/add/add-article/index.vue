<template>
  <div class="add-article">
    <ev-form
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
    </ev-form>
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
});

const evFormRef = ref();

const makeSubmit = async () => {
  // 结果就是表单验证的结果
  const ret = await evFormRef.value.submitForm();
  console.log(ret);
  console.log('ruleForm',ruleForm)
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