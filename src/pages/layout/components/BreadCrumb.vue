<template>
  <el-breadcrumb separator="/">
    <template v-for="routeItem in route.matched" :key="routeItem.path">
      <el-breadcrumb-item :to="{ path: routeItem.path }">{{
        routeItem.meta.title
      }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup>
import { useUserStore } from "@/store/userStore";
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route.matched, 999);
// const userStore = useUserStore();
// console.log(userStore.sideBarMenus);
</script>