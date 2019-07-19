import $api from './index'

// 判断是否是首次访问启动蒙层
export function getFirstVisited(page) {
  const url = `/visit/getFirstVisited?url=${page}`

  return $api.get(url)
}
