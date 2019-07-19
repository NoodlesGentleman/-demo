/**
 * Created by slipkinem on 10/10/2017 at 3:27 PM.
 */
import { buildURL } from './buildURL'

/**
 * 带有params的跳转，用于下载
 * @param url
 * @param params
 */
export function locationHref (url: string, params?: object): void {
  window.location.href = buildURL(url, params)
}
