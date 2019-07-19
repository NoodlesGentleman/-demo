/**
 * Created by slipkinem on 9/8/2017 at 5:08 PM.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import actions from './actions'
import { State } from './model/state'
import { getters } from './getters'

Vue.use(Vuex)

// 需要保持全局状态属性
const state: State = {
  slipOperation: 'edit'
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
