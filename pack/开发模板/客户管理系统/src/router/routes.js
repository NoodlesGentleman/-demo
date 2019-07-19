// 登录
const Login = resolve => {
  require(['@/pages/login'], resolve)
}

// 布局
const Layout = resolve => {
  require(['@/pages/layout'], resolve)
}

// 主页
const Home = resolve => {
  require(['@/pages/home'], resolve)
}

//404
const NotFound = resolve => {
  require(['@/pages/notFound'], resolve)
}

const routes = [
  {
    path: '*',
    component: NotFound
  }, {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      }
    ]
  }, {
    path: '/login',
    component: Login
  }
]

export default routes
