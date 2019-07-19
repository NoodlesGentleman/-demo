// 系统配置参数
const config = {
  // 配置默认接口地址
  url: process.env.NODE_ENV === 'production'
    ? 'http://fangsir007.com:9999/'
    : '',
  // 每页显示条数
  limit: 20
}

export default config
