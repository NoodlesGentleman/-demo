import $api from './index'
// 显示资料
export function showDetail (id) {
  const url = `/report/perfectDatum?reportid=${id}`
  return $api.get(url)
}
// 上传图片
export function uploadImg (data) {
  const url = `/report/uploadCheckoutCommissionData`
  return $api.post(url, data)
}
export function msgsubmit (data) {
  const url = `/report/commitCheckoutCommissionData`
  return $api.post(url, data)
}