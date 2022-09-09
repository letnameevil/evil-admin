<script setup>
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
import { useUserStore,useConfigStore } from "@/store/userStore";
import { useRoute } from "vue-router";
import {ref} from 'vue'

const isCollapse = ref(true)

const userStore = useUserStore();
const configStore = useConfigStore()


const currentRoute = useRoute();

// console.log(userStore.sideBarMenus);
</script>

<template>
  <el-menu router :default-active="currentRoute.path" :collapse="configStore.isCollapse">
    <template v-for="keyMenu in userStore.sideBarMenus">
      <el-sub-menu
        :index="keyMenu.link"
        v-if="keyMenu.children && !keyMenu.hidden"
        :key="keyMenu.title"
      >
        <template #title>
          <i class="iconfont icon-style" :class="keyMenu.icon"></i>
          <span>{{ keyMenu.title }}</span>
        </template>

        <template v-for="subMenu in keyMenu.children" :key="subMenu.title">
          <el-menu-item :index="subMenu.link" v-if="!subMenu.hidden">{{
            subMenu.title
          }}</el-menu-item>
        </template>

        <!-- <el-menu-item index="/article/article-del">删除文章</el-menu-item> -->
      </el-sub-menu>

      <el-menu-item
        v-else-if="!keyMenu.hidden"
        :key="keyMenu.title"
        :index="keyMenu.link"
      >
        <template #title>
          <el-icon><message /></el-icon>{{ keyMenu.title }}
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style lang="less" scoped>

.icon-style {
  margin-right: 5px;
}
  
</style>



