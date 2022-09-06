<template>
  <div class="article-list">
    <el-card>
      <ev-table
        :tableProps="tableProps"
        :tableData="articleLists"
        :pageConfig="pageConfig"
        isShowPagination
        @getList="getArticleListsHandler"
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
  </div>
</template>

<script  setup>
import { ref, reactive, onMounted, toRefs } from "vue";
import { ElNotification } from "element-plus";
import { getArticleLists, delArticle } from "@/api/article";

import EvTable from "@/base-ui/EvTable";

const articleListInfo = reactive({
  articleLists: [],
});

const pageConfig = reactive({
  pageSize: 10,
  pageNumber: 1,
  total: 0,
});

let { articleLists } = toRefs(articleListInfo);

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

// const handleDelete = async (index, row) => {
//   console.log(row.articleId);
//   let ret = await delArticle({
//     articleId: row.articleId,
//   });
//   console.log(ret);
// };

const confirmEvent = async (index, row) => {
  let ret = await delArticle({
    articleId: row.articleId,
  });
  // console.log(ret.status === 200);

  ElNotification({
    title: "提示！",
    message: ret.message,
    duration: 500,
  });

  if (ret.status === 200) {
    getArticleListsHandler();
  }
};

const tableProps = [
  {
    label: "文章id",
    filed: "articleId",
  },
  {
    label: "文章标题",
    filed: "articleTitle",
  },
  {
    label: "文章内容",
    filed: "content",
  },
  {
    label: "文章作者",
    filed: "nickName",
  },
  {
    label: "发布时间",
    filed: "publicAt",
  },
  {
    label: "操作",
    opt: true,
  },
];

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>