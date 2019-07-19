/**
 * Created by slipkinem on 12/12/2017 at 3:43 PM.
 */
const readline = require('readline-sync')

let beforeHooks = {
  when: 'pull',
  fn (module, env, next) {
    console.log('我正在发布 ' + env + ' 环境')
    module.ssh.password = readline.question(`@${module.ssh.host}:please input password: `, {
      hideEchoBack: true
    })
    next()
  }
}
module.exports = {
  modules: [
    {
      name: '测试环境',
      env: 'test',
      ssh: {
        host: '118.190.155.134',
        port: 22,
        username: 'root',
        // rc版本的user选项和userName选项请在未来统一配置为username
        password: ''
      },
      buildCommand: 'npm run build',
      localPath: 'dist',
      remotePath: '/usr/local/nginx/html/webpos/dist',
      beforeHooks
    },
    {
      name: '正式环境',
      env: 'production',
      ssh: {
        host: '118.190.203.231',
        port: 22,
        username: 'root',
        // rc版本的user选项和userName选项请在未来统一配置为username
        password: ''
      },
      buildCommand: 'npm run build',
      localPath: 'dist',
      remotePath: '/usr/share/nginx/html/webpos/dist',
      beforeHooks
    },
    {
      name: '本地测试209环境',
      env: 'testLocal',
      ssh: {
        host: '114.215.101.209',
        port: 22,
        username: 'root',
        // rc版本的user选项和userName选项请在未来统一配置为username
        password: ''
      },
      buildCommand: 'npm run build',
      localPath: 'dist',
      remotePath: '/usr/local/nginx/html/webpos/dist',
      beforeHooks
    },
    {
      name: '本地测试190环境',
      env: 'test190',
      ssh: {
        host: '118.190.19.190',
        port: 22,
        username: 'root',
        // rc版本的user选项和userName选项请在未来统一配置为username
        password: ''
      },
      buildCommand: 'npm run build',
      localPath: 'dist',
      remotePath: '/home/webadmin/nginx/html/webpos/dist',
      beforeHooks
    }
  ]
}
