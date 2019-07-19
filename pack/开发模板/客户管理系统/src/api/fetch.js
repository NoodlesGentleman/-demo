import axios from 'axios'
import config from './config'
import { Message } from 'iview'
import router from '@/router'
import store from '@/store'

// 配置默认接口地址
axios.defaults.baseURL = config.url
// 请求凭证
axios.defaults.withCredentials = true
// 配置默认请求超时
axios.defaults.timeout = 12000

// GET请求
export const GET = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then(res => {
        if (res) {
          resolve(res.data)
        }
      }, err => {
        reject(err)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// POST请求
export const POST = (url, params, headers, transformRequest) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        if (res) {
          resolve(res.data)
        }
      }, err => {
        reject(err)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// FORM请求
export const FORM = (url, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url,
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
    })
      .then(res => {
        if (res) {
          resolve(res.data)
        }
      }, err => {
        reject(err)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 响应拦截器
axios.interceptors.response.use(res => {
  // 在这里对返回的数据进行处理
  if (res.data.code === 0 || res.data.draw === 0 || res.data.draw === 1) {
    return res
  } else {
    Message.error(res.data.msg)
    if (res.data.msg === '用户未登录') {
      router.push('/')
      store.state.userInfo = null
      localStorage.removeItem('userInfo')
    }
    return Promise.reject(res)
  }
}, err => {
  return Promise.reject(err)
})

const fetch = { GET, POST, FORM, axios, config }

export default fetch
