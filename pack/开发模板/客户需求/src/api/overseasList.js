import $api from './index'

export function getProjectList (start, length) {
  const url = '/abroad/getprojectlistBydistrict'

  const data = {
    length,
    start
  }
  return $api.post(url, data)
}

export function getoverdetails (id) {
  const url = `/abroad/getProjectDetail?id=${id}`
  return $api.get(url)
}
