/**
 * Created by slipkinem on 9/8/2017 at 5:08 PM.
 */

import * as types from './mutation-type'
import { slipOperationType, State } from './model/state'

export const mutations = {
  [types.SET_SLIP_OPERATION] (state: State, paload: slipOperationType) {
    state.slipOperation = paload
  }
}
