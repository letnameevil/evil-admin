<template>
  <div class="layout">
    <el-container class="layout-container-demo" style="height: 100%">
      <el-aside :width="elAsideWidth" class="el-aside-cls" ref="asideRef">
        <el-scrollbar>
          <side-title></side-title>
          <side-bar></side-bar>
        </el-scrollbar>
      </el-aside>

      <el-container>
        <el-header style="font-size: 12px; display: flex">
          <header-content></header-content>
        </el-header>

        <el-main>
          <main-container></main-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script  setup>
import { ref, watch, getCurrentInstance } from "vue";
import { useConfigStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
import SideBar from "./components/SideBar.vue";
import SideTitle from "./components/SideTitle.vue";
import HeaderContent from "./components/HeaderContent.vue";
import MainContainer from "./components/MainContainer.vue";

const configStore = useConfigStore();

const elAsideWidth = ref("200px");

const asideRef = ref();

let { isCollapse } = storeToRefs(configStore);

watch(isCollapse, (newValue) => {
  // elAsideWidth
  if (newValue === true) return (elAsideWidth.value = "60px");
  elAsideWidth.value = "200px";
});

const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};
</script>

<style scoped lang="less">
.el-aside-cls {
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.layout {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: #fff;
}

.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0px;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>