<template>
  文章删除
  <el-button @click="logout">退出登陆</el-button>
  <el-button @click="seeRoute">查看当前所有路由</el-button>
</template>


<script setup>
import { useRouter } from "vue-router";

import asyncRoutes from "@/router/asyncRoutes";

const Router = useRouter();
const logout = () => {
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

const seeRoute = () => {
  console.log("Router.getRoutes()", Router.getRoutes());
};
</script>
