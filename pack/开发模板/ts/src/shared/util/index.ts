/**
 * Created by slipkinem on 9/26/2017 at 4:35 PM.
 */

export function isUndef (v: any): boolean {
  return v === undefined || v === null
}

export function isDef (v: any): boolean {
  return v !== undefined && v !== null
}

export const toStr = (obj: any) => Object.prototype.toString.call(obj)

export function isPromise<T = any> (value: any): value is Promise<T> {
  return toStr(value) === '[object Promise]'
}

export const isIE: boolean = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0)
