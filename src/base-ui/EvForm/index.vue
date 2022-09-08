<template>
  <div class="form-container">
    <el-form
      class="demo-ruleForm"
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-width="auto"
      status-icon
    >
      <el-row :gutter="20">
        <template v-for="item in formConfig" :key="item.filed">
          <el-col v-bind="colLayout">
            <!-- 普通输入框 -->
            <el-form-item
              v-if="item.type === 'input'"
              :label="item.label"
              :prop="item.filed"
              :label-width="item.labelWidth"
            >
              <el-input
                v-model="formData[item.filed]"
                :placeholder="item.placeholder"
              />
            </el-form-item>

            <!-- 下拉框 -->
            <el-form-item
              :label="item.label"
              :prop="item.filed"
              v-if="item.type === 'select'"
            >
              <el-select
                v-model="formData[item.filed]"
                :placeholder="item.placeholder"
              >
                <el-option
                  v-for="selectItem in item.selectionOpt"
                  :key="selectItem.value"
                  :label="selectItem.label"
                  :value="selectItem.value"
                />
              </el-select>
            </el-form-item>

            <!-- 时间范围选择器 -->
            <el-form-item
              :label="item.label"
              :prop="item.filed"
              v-if="item.type === 'datetimerange' || item.type === 'datetime'"
            >
              <el-date-picker
                v-model="formData[item.filed]"
                type="datetimerange"
                v-bind="item.options"
              />
            </el-form-item>

            <!-- 上传图片 -->
            <el-form-item :label="item.label" v-if="item.type === 'uploadFile'">
              <!-- 图片上传  -->
              <ev-upload
                ref="upLoadRef"
                v-bind="item.upOptions"
                @sendResponseMessage="getResponseMessage"
              />
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

import EvUpload from "@/components/EvUpload";

const ruleFormRef = ref();
const upLoadRef = ref();

const props = defineProps({
  formConfig: {
    type: Array,
    required: true,
  },
  formData: {
    type: Object,
    required: true,
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  // 由于el-col的响应式是根据窗口大小配置的，有时候需要手动配置el-col的属性 例如span="24"
  colLayout: {
    type: Object,
    default: () => {
      return {
        xl: 6, // 24/6 = 4
        lg: 8, // 24/8 = 3
        md: 12, // 24/12 = 2
        sm: 24, // 24/24 = 1
        xs: 24, // 24/24 = 1
      };
    },
  },
});

const emits = defineEmits("sendUrlList");

const submitForm = (formEl = ruleFormRef.value) => {
  if (!formEl) return;

  return new Promise((resolver, reject) => {
    formEl.validate((valid, fields) => {
      if (valid) {
        upLoadRef.value[0].submit();
        resolver(true);
      } else {
        console.log("error submit!", fields);
        resolver(false);
      }
    });
  });
};

const resetForm = (formEl = ruleFormRef.value) => {
  if (!formEl) return;
  formEl.resetFields();
  upLoadRef.value[0].clearFiles();
};

const getResponseMessage = (res = []) => {
  for (let i = 0; i < res.length; i++) {
    if (res.status > 200) return emits("sendUrlList", false);
  }

  emits("sendUrlList", res);
};

defineExpose({
  resetForm,
  submitForm,
});
</script>

<style lang="less" scoped>
.el-select.el-select--default {
  width: 100%;
}
</style>