import $api from './index'

export function getPrizeList () { // 页面加载数据
  const url = '/lottery/getActivity?activityId=1'
  return $api.get(url)
}
export function getResultIndex (data) { // 转盘按钮点击后中奖数据获取
  const url = `/lottery/clicklucky?activityId=1`
  return $api.post(url, data)
}
export function setTurnplateId (data) {
  const url = `/lottery/getprizebyopenid`
  return $api.post(url, data)
}