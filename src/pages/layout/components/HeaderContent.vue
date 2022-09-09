<script setup>
import { useConfigStore } from "@/store/userStore";

import BreadCrumb from "./BreadCrumb.vue";
import SetUser from "./SetUser.vue";
const configStore = useConfigStore();
const changeCollapse = () => {
  // 批量更新用这个方法，且不会影响到state中的其他属性
  configStore.$patch({
    isCollapse: !configStore.isCollapse,
  });
};
</script>

<template>
  <div class="header-container">
    <div class="left">
      <div class="collapse-container" @click="changeCollapse">
        <i
          class="iconfont collapse"
          :class="[configStore.isCollapse ? 'icon-zhedie2' : 'icon-zhedie1']"
        ></i>
      </div>
      <div>
        <bread-crumb></bread-crumb>
      </div>
    </div>
    <div class="right">
      <set-user></set-user>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header-container,
.left {
  display: flex;
  align-items: center;
}

.header-container {
  width: 100%;
  justify-content: space-between;
}

.collapse-container {
  cursor: pointer;
  margin-right: 10px;
  .collapse {
    font-size: 30px;
  }
}
</style>