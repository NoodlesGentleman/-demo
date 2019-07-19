/**
 * Created by slipkinem on 9/14/2017 at 3:49 PM.
 */


import { errorHandle, MagicCode } from '../../constant'
import Router from '../../router/index'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { HttpResponse } from './httpMeta'
import { ElMessageComponent } from 'element-ui/types/message'
import { Message } from 'element-ui'
import { NotificationSuccess } from '../util/NotificationSuccess'

declare interface IProcessHandle {
  message: ElMessageComponent
}

export const closeMessage = function () {
  o.message && o.message.close()
}

let MessageError = function (msg: string): ElMessageComponent {
  return Message.error(msg)
}

let o: IProcessHandle = {
  message: Object.create(null)
}

export function requestError (error: AxiosError) {
  return Promise.reject(error)
}

/**
 * @param config 设置
 * @returns {*}
 */
export function request (config: AxiosRequestConfig) {
  return config
}

export function response (response: AxiosResponse<HttpResponse<any>>): Promise<AxiosResponse> {
  let { data } = response
  let { notifyMessage } = response.config

  if (data.hasOwnProperty('responseCode') && data.responseCode !== MagicCode.SuccessCode) {
    o.message = MessageError(data.responseMessage || '网络错误，请重试')
    return Promise.reject(response)
  }

  notifyMessage && NotificationSuccess(notifyMessage)
  return Promise.resolve(response)
}

export function responseError (error: AxiosError) {
  if (!error.response) return Promise.reject(error)

  let { status } = error.response

  if (status === 401) {
    o.message = MessageError(errorHandle[status].message)
    Router.push(errorHandle[status].path)
  } else {
    o.message = MessageError(status + ' 网络错误，请重试')
  }
  return Promise.reject(error)
}
