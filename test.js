let obj = {
  name: 'cheng',
}

let oo = new Proxy(obj, {
  get(targe, key) {
    console.log(Reflect.get(targe, key), '触发了码')
    return Reflect.get(targe, key)
  },
  set(targe, key, newValue) {
    console.log('触发了码-------')
    console.log(targe === obj)
    Reflect.set(targe, key, newValue)
  },
})

// console.log((oo.name = 'shi'))
oo.name = 'xiaocheng'
oo.age = 22
obj.name = 'huau'
console.log(obj, oo)
// console.log(oo.name)
// console.log(obj.name)
