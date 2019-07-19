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

  // 设置请求头
  // return axios.post(url, data, {headers: {'Accept': 'XMLHttpRequest'}})
  return $api.post(url, data)
}

// 物业类型
export function getTypeList() {
  const url = `/projectnewest/getwuye`

  return $api.get(url)
}

// 省
export function getProvincelist() {
  const url = `/projectnewest/getprovince`

  return $api.get(url)
}

// 市
export function getCitylist(data) {
  const url = `/projectnewest/getcity?proCode=${data}`

  return $api.get(url)
}

// 区
export function getDistirctlist(province, city) {
  const url = `/projectnewest/getdistrict?cityCode=${city}`

  return $api.get(url)
}

export function getDianyong() {
  const url = `/pro/getDianyong`

  return $api.get(url)
}

export function getBannerImg() {
  const url = `/pro/getrotation`

  return $api.get(url)
}

// 求分销
export function projectnewest(projectName, projectid) {
  const data = {
    projectid,
    projectName
  }
  const url = `/projectnewest/needproject`

  return $api.post(url, data)
}
// 显示mock数据
export function getlist() {
  const url = `/pro/getMarqueeData`

  return $api.get(url)
}

// banner打点
export function viewLog(id) {
  const url = `/user/addViewLog?type=${id * 100}`

  return $api.get(url)
}
