import $api from './index'

export function getrotation (id) {
  const url = `/pro/getrotationcontent?id=${id}`

  return $api.get(url)
}