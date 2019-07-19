import $api from './index'
// 显示资料
export function showDetail (id) {
  const url = `/report/perfectDatum?reportid=${id}`
  return $api.get(url)
}
// 驳回
export function rejectMsg (url, data) {
  // const url = `/report/audit`
  return $api.post(url, data)
}
// 发放
export function postMsg (url, data) {
  // const url = `/report/audit`
  return $api.post(url, data)
}