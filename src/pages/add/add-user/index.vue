<template>
  <div class="add-user">
    新增用户
    <el-input placeholder="请输入手机号" v-model="phoneNumber"></el-input>
    <el-input placeholder="请输入验证码" v-model="code"></el-input>
    <el-button type="primary" round @click="sendMsg">发送验证码</el-button>
    <el-button type="primary" round @click="verifyCode">验证</el-button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
const phoneNumber = ref();
const code = ref();
const sendMsg = () => {
  const telReg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

  if (!telReg.test(phoneNumber.value))
    return ElMessage({
      message: "请输入正确的手机号",
      type: "warning",
    });

  // 验证通过
};

const verifyCode = () => {
  console.log('验证通过')
}

</script>