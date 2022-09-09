<template>
  <div class="side-title">
    <div class="title" v-if="!configStore.isCollapse">Evil Admin</div>
    <div class="icon">
      <img class="logo" :src="logo" alt="图标" />
    </div>
  </div>
</template>

<script setup>
import { useConfigStore } from "@/store/userStore";
import logo from "@/assets/logo.png";

const configStore = useConfigStore()
</script>


<style lang="less" scoped>
.side-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: #ccc;
}

.icon {
  .logo {
    width: 40px;
    height: 40px;
  }
}
</style>