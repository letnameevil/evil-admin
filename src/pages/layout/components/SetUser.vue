<template>
  <div class="toolbar">
    <el-dropdown>
      <el-icon style="margin-right: 8px; margin-top: 1px"><setting /></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span>Tom</span>
  </div>
</template>

<script setup>
import { Setting } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import asyncRoutes from "@/router/asyncRoutes";
const Router = useRouter();
const logout = () => {
  // 执行退出登录操作
  // 清空所有记录
  localStorage.clear();
  // 跳转到登陆界面
  Router.replace("/login");
  // 清空路由记录
  // Router.removeRoute()
  asyncRoutes.forEach((item) => {
    Router.removeRoute(item.name);
  });
};
</script>