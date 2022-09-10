<script setup name="login">
import { reactive, ref } from "vue";
import {useRouter} from 'vue-router'
import { ElMessage } from "element-plus";
import { login as userLogin } from "@/api/user";
import * as Lockr from "lockr";

import { useUserStore } from "@/store/userStore";

const userStore = useUserStore();
const Router = useRouter()

const ruleFormRef = ref(null);

const formData = reactive({
  name: "user_2",
  password: "123456",
});

const rules = reactive({
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});

const seeRoutes = () => {
  console.log('Router.getRoutes()',Router.getRoutes())
}

// 登陆按钮
const login = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 验证通过
      userLogin({
        name: formData.name,
        password: formData.password,
      }).then((res) => {
        if (res.status >= 200) {
          // 给一个登陆成功的提示
          ElMessage({
            message: "登陆成功",
            type: "success",
          });

          // console.log(res)
          const { name, roles, token, userId } = res;
          // 拿到用户数据，存到状态管理和本地存储中.....
          userStore.userInfo = {
            name,
            roles,
            token,
            userId,
          };
          // 本地存储
          Lockr.set("userInfo", { name, roles, token, userId });
          // 处理路由
          userStore.handlerRoutes();
          // 跳转路由
          Router.replace('/home')



        } else {
          ElMessage({
            message: "登陆失败，请重试...",
            type: "error",
          });
        }
      });
    } else {
      // 验证失败
      ElMessage("请输入正确的用户名和密码");
    }
  });
};
</script>


<template>
  <div class="login-plane">
    <div class="login-admin">
      <el-form
        ref="ruleFormRef"
        label-position="top"
        label-width="100px"
        :model="formData"
        :rules="rules"
        style="max-width: 100%"
        status-icon
      >
        <el-form-item label="用户名:" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="formData.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login(ruleFormRef)">登录</el-button>
          <el-button type="primary" @click="seeRoutes">查看当前所有路由</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-plane {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("@/assets/images/login-bg.webp") no-repeat;
  background-size: 100% 100%;
}

.login-admin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  height: 450px;
  padding: 60px;
  box-sizing: border-box;
  background-color: #fff;
}
</style>