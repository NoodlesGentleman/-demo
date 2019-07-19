/**
 * Created by slipkinem on 4/16/2018 at 3:14 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { buildURL } from './buildURL'
import download from 'downloadjs'
import _ from 'lodash'
import { soon } from './soon'

const isPlainFile = (data: string) => /\.txt|\.html?|\.js|\.css/i.test(data)

export const multiDownloadFile = function (data: string | File | Blob, params?: object | string, mimeType?: string) {
  if (_.isString(data) && !isPlainFile(data)) {
    let iframe: HTMLIFrameElement
    iframe = document.createElement('iframe')
    iframe.name = 'ifr'
    iframe.style.display = 'none'
    iframe.src = buildURL(data, typeof params === 'object' ? params : undefined)
    return document.body.appendChild(iframe)
  }

  return soon(() => download(data, _.isString(params) ? params : undefined, mimeType))
}
