import $api from './index'

export function getProjectDetail (id) {
  const url = `/projectnewest/getproject?id=${id}`

  return $api.get(url)
}

export function getCommentlist (id) {
  const url = `/pro/getCommentlist?projectid=${id}`

  return $api.get(url)
}

export function addComment (projectid, content) {
  const url = `/pro/addComment`

  const data = {
    content,
    projectid
  }
  return $api.post(url, data)
}

// 蒙层
