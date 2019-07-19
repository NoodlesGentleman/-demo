import $api from './index'

export function isShowAdvertising() {
  const url = '/pro/isShowAdvertising'
  return $api.get(url)
}

export function addPageMarkLog() {
  const url = '/pro/addPageMarkLog'
  return $api.get(url)
}