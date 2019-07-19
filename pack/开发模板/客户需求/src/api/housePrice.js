import $api from './index'

export function getProjectList(start, length, province, city, district, type, pricemin, pricemax, projectName) {
  const url = '/pro/getprojectlistBydistrict'

  const data = {
    city,
    district,
    length,
    pricemax,
    pricemin,
    project_name: projectName,
    province,
    start,
    type
  }

  return $api.get(url, data)
}

export function getTypeList() {
  const url = `/pro/house2price/getHseTypeList`

  return $api.get(url)
}

export function getProvincelist() {
  const url = `/pro/house2price/getProvince`

  return $api.get(url)
}

export function getDistirctlist(city) {
  const url = `/pro/house2price/getDistrictByCity?city=${city}`

  return $api.get(url)
}

export function getCitylist(data) {
  const url = `/pro/house2price/getCityByProvince?province=${data}`

  return $api.get(url)
}

export function getDianyong() {
  const url = `/pro/getDianyong`

  return $api.get(url)
}

export function getBannerImg(projectName, start, length) {
  const url = `/pro/house2price/getHoue2PriceByProjectName?project_name=${projectName}&start=${start}&length=${length}`

  return $api.get(url)
}

export function searchPorjectList(projectName, start, length) {
  const url = `/pro/house2price/getHoue2PriceByProjectName?project_name=${projectName}&start=${start}&length=${length}`

  return $api.get(url)
}

export function getProjectLists(start, length, province, city, district, type, pricemin, pricemax, allPricemin, allPricemax) {
  const url = `/pro/house2price/getHoue2PriceByArea?city=${city}&start=${start}&length=${length}&province=${province}&district=${district}&type=${type}&pricemin=${pricemin}&pricemax=${pricemax}&allPricemin=${allPricemin}&allPricemax=${allPricemax}`

  return $api.get(url)
}

export function countNum() {
  const url = `/user/addViewLog?type=12`

  return $api.get(url)
}