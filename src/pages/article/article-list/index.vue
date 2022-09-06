<template>
  <div class="article-list">
    <el-card>
      <ev-table
        :tableProps="tableProps"
        :tableData="articleLists"
        :pageConfig="pageConfig"
        isShowPagination
        selection
        @getList="getArticleListsHandler"
        @selectList="selectList"
      >
        <template #opt="{ data }">
          <el-popconfirm
            title="Are you sure to delete this?"
            @confirm="confirmEvent(data.$index, data.row)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </ev-table>
    </el-card>
    <el-button @click="delSelect">批量删除</el-button>
  </div>
</template>

<script  setup>
import { reactive, onMounted, toRefs } from "vue";
import { ElNotification } from "element-plus";
import { getArticleLists, delArticle } from "@/api/article";

import EvTable from "@/base-ui/EvTable";
import tableProps from "./config/index.table.config";

const articleListInfo = reactive({
  articleLists: [],
});

let { articleLists } = toRefs(articleListInfo);

const pageConfig = reactive({
  pageSize: 10,
  pageNumber: 1,
  total: 0,
});

// 表格中选中的项的值
let selectionArr = [];

const selectList = (v1) => {
  selectionArr = v1;
};

const delSelect = async () => {
  if (selectionArr.length === 0)
    return ElNotification({
      title: "提示！",
      message: "请至少选中一项",
      duration: 1500,
    });

  const tempArr = [];
  selectionArr.forEach((item) => {
    tempArr.push(item.articleId);
  });

  let ret = await delArticle({
    articleId: tempArr,
  });


  ElNotification({
    title: "提示！",
    message: ret.message,
    duration: 500,
  });

  if (ret.status === 200) {
    getArticleListsHandler();
  }
};

const getArticleListsHandler = () => {
  getArticleLists({
    pageNumber: pageConfig.pageNumber,
    pageSize: pageConfig.pageSize,
  }).then((res) => {
    articleLists.value = res.records;
    pageConfig.total = res.total;
  });
};

onMounted(() => {
  getArticleListsHandler();
});

const handleEdit = (index, row) => {
  console.log(index, row);
};

const confirmEvent = async (index, row) => {
  let ret = await delArticle({
    articleId: row.articleId,
  });

  ElNotification({
    title: "提示！",
    message: ret.message,
    duration: 1500,
  });

  if (ret.status === 200) {
    getArticleListsHandler();
  }
};
</script>