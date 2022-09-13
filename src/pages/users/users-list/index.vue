<template>
  <div class="users-list">
    <el-card>
      <el-button @click="addUser">新增用户</el-button>
    </el-card>

    <el-card>
      <ev-table :tableProps="tableProps" :tableData="userList">
        <!-- 
        :pageConfig="pageConfig"
        isShowPagination
        selection
        @getList="getArticleListsHandler"
        @selectList="selectList"
       -->
        <template #tag="{ data }">
          <el-tag
            size="small"
            v-for="(item, idx) in data.row.roles"
            :key="idx"
            >{{ item }}</el-tag
          >
        </template>
      </ev-table>
    </el-card>

    <el-dialog v-model="isShow" title="新增用户">
      <ev-form
        ref="evFormRef"
        :formConfig="formConfig"
        :formData="ruleForm"
        :rules="rules"
        :colLayout="{ span: 24 }"
      >
        <template #footer>
          <div class="footer-btn">
            <el-button type="primary" @click="makeSubmit">确定</el-button>
            <el-button @click="reset">重置</el-button>
          </div>
        </template>
      </ev-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import EvTable from "@/base-ui/EvTable";
import EvForm from "@/base-ui/EvForm";
import tableProps from "./config/index.table.config";
import { formConfig, rules } from "./config/index.form.config";

// api
import { getUserList } from "@/api/users";

const userList = ref([]);

getUserList().then((res) => {
  console.log(res.records);
  userList.value = res.records;
});

const addUser = () => {};

const btnClick = (v1) => {
  console.log(v1.row);
};

const ruleForm = reactive({
  name: "",
  password: "",
  nickName: "",
  roles: [],
});

const isShow = ref(true);

const evFormRef = ref();

const makeSubmit = async () => {
  const ret = await evFormRef.value.submitForm(); // 结果为true代表表单校验成功， 可以发请求了

  if (ret) {
    console.log(ruleForm);
  }
};

const reset = () => {
  evFormRef.value.resetForm();
};
</script>