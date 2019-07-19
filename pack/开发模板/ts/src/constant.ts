/**
 * Created by slipkinem on 9/8/2017 at 3:55 PM.
 */
export const errorHandle = {
  401: {
    path: '/login',
    message: '您的授权已过期或者失败，请重新登录'
  },
  500: {
    path: ''
  }
}

export const baseURL = process.env.NODE_ENV === 'production' ? '/api' : '/api'

export enum MagicCode {
  SuccessCode = 0,
  MobileTypeCode = 2,
  CardTypeCode = 1,
  // 终端类型
  Source = 1
}

export const displaySuffix = '##Display'
