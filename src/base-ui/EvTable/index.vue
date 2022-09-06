<template>
  <div class="article-list">
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="30"
        align="center"
        v-if="selection"
      />
      <!-- 选择框 -->
      <template v-for="itemData in tableProps" :key="itemData.filed">
        <el-table-column
          :label="itemData.label"
          :prop="itemData.filed"
          align="center"
        >
          <template #default="scope" v-if="itemData.opt">
            <slot name="opt" :data="scope"> 请在插槽中输入内容 </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
  <!-- 分页 -->
  <div class="demo-pagination-block" v-if="isShowPagination">
    <el-pagination
      small
      background
      v-model:currentPage="pageConfig.pageNumber"
      v-model:page-size="pageConfig.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :total="pageConfig.total"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script  setup>
import { ref, reactive, onMounted, toRefs } from "vue";

defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
  tableProps: {
    type: Array,
    default: () => [],
  },
  isShowPagination: {
    type: Boolean,
    default: false,
  },
  pageConfig: {
    type: Object,
    default: () => {
      return {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
      };
    },
  },
  selection: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["getList", "selectList"]);

const handleCurrentChange = (v1, v2) => {
  emits("getList");
};

const handleSizeChange = (v1) => {
  emits("getList");
};

const handleSelectionChange = (v1) => {
  emits("selectList", v1);
};
</script>

<style scoped>
.demo-pagination-block {
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>