import $api from './index'

export function getWallPaper (id) {
  const url = `/pro/getrotationcontent?id=${id}`

  return $api.get(url)
}