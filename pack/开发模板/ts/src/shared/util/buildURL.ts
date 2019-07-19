import { isUndef } from './index'
import _ from 'lodash'

/**
 * Created by slipkinem on 4/16/2018 at 3:15 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export function isURLSearchParams (val: any): boolean {
  return !_.isUndefined(window.URLSearchParams) && val instanceof window.URLSearchParams
}

export function encode (val: string): string {
  return encodeURIComponent(val)
      .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']')
}

export function buildURL (url: string, params?: object): string {
  if (!params) {
    return url
  }

  let serializedParams = ''
  if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    let parts: Array<any> = []

    _.forEach(params, (val: any, key) => {
      if (isUndef(val)) return

      if (_.isArray(val)) {
        key += '[]'
      }

      if (!_.isArray(val)) {
        val = [val]
      }

      val.forEach((v: any) => {
        if (v instanceof Date) {
          v = v.toISOString()
        } else if (_.isObject(v)) {
          v = JSON.stringify(v)
        } else {
          v = v.toString()
        }
        parts.push(`${encode(key)}=${encode(v)}`)
      })
    })

    serializedParams = parts.join('&')
  }

  if (serializedParams) {
    url += (_.includes(url, '?') ? '&' : '?') + serializedParams
  }

  return url
}
