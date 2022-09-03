import { cloneDeep } from 'lodash'
function getMenus(arr) {
  // 这里需要做一层深拷贝
  arr = cloneDeep(arr)

  const newArr = []
  arr.forEach((item, idx) => {
    newArr.push({
      link: item.path,
      title: item.meta.title,
      hidden: item.hidden,
    })

    if (item.children) {
      item.children.forEach((item) => {
        item.path = newArr[idx].link + '/' + item.path
      })

      let children = getMenus(item.children)

      newArr[idx].children = children
    } else {
      return newArr
    }
  })
  return newArr
}

export { getMenus }
