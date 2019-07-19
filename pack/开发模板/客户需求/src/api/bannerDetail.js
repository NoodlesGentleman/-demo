import $api from './index'

export function countNum () {
  const url = `/user/addViewLog?type=11`

  return $api.get(url)
}