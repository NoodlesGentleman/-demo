/**
 * Created by slipkinem on 6/1/2017 at 12:04 PM.
 */

import _ from 'lodash'
import { debouncePromise } from '../util/debounce-promise'
import { baseURL, MagicCode } from '../../constant'
import axios, { AxiosRequestConfig } from 'axios'
import { request, requestError, response, responseError } from './httpInterceptor'
import { Cache } from '../util/Cache'

export class HttpResponse<T> {
  responseData: T
  responseCode: number
  responseMessage: string
}

/**
 * http 扩展
 * @type {{postParams: (function(*, *, *=)), postParamsClick, postClick}}
 */
class HttpExtension {
  private cache = new Cache<any>()
  private _postParamsClick = debouncePromise<HttpResponse<any>>(this.postParams.bind(this))

  private _postClick = debouncePromise<HttpResponse<any>>(this.post.bind(this))

  get postParamsClick (): Function {
    return this._postParamsClick
  }

  get postClick (): Function {
    return this._postClick
  }

  constructor () {
    axios.interceptors.response.use(response, responseError)
    axios.interceptors.request.use(request, requestError)
    // http配置
    _.merge(axios.defaults, {
      baseURL,
      headers: {
        common: {
          Authorization: 'AUTH_TOKEN',
          source: MagicCode.Source
        },
        post: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    })
  }

  async requestCache<T, N = any> (url: string, params?: N, config?: AxiosRequestConfig): Promise<T> {
    let key = url
    _.forEach(params, (v) => {
      key += `/${v}`
    })

    if (!_.isEmpty(this.cache.get(key))) return _.cloneDeep(this.cache.get(key))
    this.cache.set(key, await this.postParams<T, N>(url, params, Object.assign({ method: 'GET' }, config)))
    return _.cloneDeep(this.cache.get(key))
  }

  postParams<T, N = any> (url: string, params?: N, config?: AxiosRequestConfig): Promise<T> {
    return this.request<HttpResponse<T>>(url, _.assignIn({
      method: 'post',
      params
    }, config))
        .then(res => res.data.responseData)
  }

  get<T, N = any> (url: string, params?: N, config?: AxiosRequestConfig): Promise<T> {
    return axios.get<HttpResponse<T>>(url, _.assignIn({
      params
    }, config))
        .then(res => res.data.responseData)
  }

  post<T, N = any> (url: string, data?: N, config?: AxiosRequestConfig): Promise<T> {
    return axios.post<HttpResponse<T>>(url, data, config)
        .then(res => res.data.responseData)
  }

  request<N> (url: string, config?: AxiosRequestConfig) {
    return axios.request(_.assignIn({
      url
    }, config))
  }
}
export const httpExtension = new HttpExtension()
