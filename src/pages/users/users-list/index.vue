<template>
  <div class="users-list">
    <el-card>
      <el-button @click="isShow = true">新增用户</el-button>
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
import { reactive, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import EvTable from "@/base-ui/EvTable";
import EvForm from "@/base-ui/EvForm";
import tableProps from "./config/index.table.config";
import { formConfig, rules } from "./config/index.form.config";

// api
import { getUserList, addUser } from "@/api/users";

const userList = ref([]);

// 封装一个方法获取用户列表
const handlerUserList = async () => {
  const ret = await getUserList();
  userList.value = ret.records;
};

onMounted(() => {
  handlerUserList();
});

const ruleForm = reactive({
  name: "",
  password: "",
  nickName: "",
  roles: [],
});

const isShow = ref(false);

const evFormRef = ref();

const reset = () => {
  evFormRef.value.resetForm();
};

const close = () => {
  reset();
};

// 提交表单
const makeSubmit = async () => {
  const ret = await evFormRef.value.submitForm(); // 结果为true代表表单校验成功， 可以发请求了
  if (ret) {
    let res = await addUser(ruleForm);
    if (res.status === 200) {
      ElMessage({
        message: "新增用户成功",
        type: "success",
      });
      // 重置表单
      reset();
      isShow.value = false;
      // 重新获取数据
      handlerUserList();
    }
  }
};
</script>