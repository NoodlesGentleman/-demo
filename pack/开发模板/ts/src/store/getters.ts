/**
 * Created by slipkinem on 9/8/2017 at 5:08 PM.
 */
import { State } from './model/state'

export const getters = {
  slipDisabledGetters (state: State) {
    console.log(state)
    return state.slipOperation !== 'edit'
  }
}
