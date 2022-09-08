export const formConfig = [
  {
    label: '用户名',
    filed: 'name',
    type: 'input',
    placeholder: '请输入用户名',
  },
  {
    label: '学校类型',
    filed: 'region',
    type: 'select',
    placeholder: '请选择学校类型',
    selectionOpt: [
      {
        label: '小学',
        value: 0,
      },
      {
        label: '初中',
        value: 1,
      },
    ],
  },
  {
    label: '时间范围',
    filed: 'time',
    type: 'datetimerange', // datetime 或者是
    options: {
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      format: 'YYYY/MM/DD hh:mm:ss',
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
]

export const rules = {
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 8, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
}
