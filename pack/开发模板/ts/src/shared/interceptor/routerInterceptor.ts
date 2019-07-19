/**
 * Created by slipkinem on 9/11/2017 at 1:46 PM.
 */
import { errorHandle } from '../../constant'
import { locals } from '../util/Storage'
import _ from 'lodash'
import { RawLocation, Route } from 'vue-router'
import Vue from 'vue'

// 路由拦截
export function routerBeforeEach (to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void): void {
  let notAuthPath = errorHandle[401].path

  if (_.isEqual(to.path, notAuthPath)) {
    return next()
  }

  if (_.isEmpty(locals.get('loginInfo'))) {
    return next(notAuthPath)
  }

  next()
}
