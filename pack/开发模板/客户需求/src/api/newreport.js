import $api from './index'
// 显示报备带看资料
export function showDetail (id) {
  const url = `/pro/getMarqueeData?type=${id}`
  return $api.get(url)
}