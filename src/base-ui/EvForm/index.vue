<template>
  <div class="add-article">
    <el-form
      class="demo-ruleForm"
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-width="auto"
      :size="formSize"
      status-icon
    >
      <el-row :gutter="20">
        <template v-for="item in formConfig" :key="item.filed">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
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

const formSize = ref("default");
const ruleFormRef = ref();

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
});

const submitForm = (formEl = ruleFormRef.value) => {
  if (!formEl) return;
  return new Promise((resolver, reject) => {
    formEl.validate((valid, fields) => {
      if (valid) {
        console.log("submit!", props.formData);
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