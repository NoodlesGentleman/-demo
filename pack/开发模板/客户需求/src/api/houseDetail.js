import $api from './index'

export function getProjectDetail (name) {
  const url = `/pro/house2price/getHoue2PriceByProject?name=${name}`

  return $api.get(url)
}
