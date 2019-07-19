## 项目说明

### 运行项目

1.下载依赖
```bash
  > npm install 
```
**npm > 8.2**  
或
```bash
  > yarn
```

2. 启动
```bash
  > npm run dev
```

### 技术栈
typescript + vue + vuex + elementUI + tslint + jest + webpack + scss + postcss

### MOCK
json-server + faker data

### 测试说明
1. 单元测试： 推荐在需测试文件同级建立 xx.spec.ts
2. 端对端测试： 使用nightwatch

### 目录说明
* src  
  - assets: img + scss  
  - components: 业务相关组件  
  - model: 数据模型，以class为主  
  - packages: 业务无关组件（可共享）  
  - router: 路由（不用配置，统一在``nav-list.ts``中配置）  
  - shared:  
    - interceptor: 路由和HTTP拦截器以及HTTP配置  
    - mixin: vue mixin  
    - util  
  - store: vuex相关  
  - typings: typescript自定义类型，以接口为主  
  - view: 页面  
  - nav-list.ts: 路由及菜单
  - source: 外部引入css类库及js原型库
  - polufills: 兼容js
  - vue-shim: vue兼容typescript

### 其他
* 使用了TS + TSLint比较严格，可能会导致前期代码速度降低
* 能不用any类型尽量不用
* 尽量少写复杂类型，错误示范：
```javascript
  export function routerBeforeEach (to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void): any {}
```
* 参考资源
  * [vue](https://cn.vuejs.org/)
  * [element-ui](http://element-cn.eleme.io/#/zh-CN)
  * [vuex](https://vuex.vuejs.org/zh-cn/)
  * [webpack](http://webpack.github.io/)
  * [axios](https://github.com/axios/axios)
  * [postCSS](https://github.com/postcss/postcss/blob/HEAD/README.cn.md)
  * [typescript](https://www.tslang.cn/)
  * [vue-router](https://router.vuejs.org/zh-cn/)
  * [scss](https://www.sass.hk/)