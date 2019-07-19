import $api from './index'

export function getmywarNewspaper () {
  const url = '/lottery/getresultlist'
  return $api.get(url)
}
export function getmyorder () {
  const url = `/lottery/getPrizeList`
  return $api.get(url)
}

export function isShowTurntable () {
  const url = '/lottery/isShowTurntable'
  return $api.get(url)
}
