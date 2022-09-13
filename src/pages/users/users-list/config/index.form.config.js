export const formConfig = [
  {
    label: '用户名',
    filed: 'name',
    type: 'input',
    placeholder: '请输入用户名',
  },
  {
    label: '用户密码',
    filed: 'password',
    type: 'password',
    placeholder: '请输入用户密码',
  },
  {
    label: '用户昵称',
    filed: 'nickName',
    type: 'input',
    placeholder: '请输入用户昵称',
  },
  {
    label: '请选择用户角色',
    filed: 'roles',
    type: 'select',
    placeholder: '请选择用户角色',
    selectionOpt: [
      {
        label: '管理员',
        value: 'admin',
      },
      {
        label: '普通用户',
        value: 'user',
      },
    ],
  },
]

export const rules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 8, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' },
    { min: 3, max: 8, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: '请选择用户角色',
      trigger: 'change',
    },
  ],
}
