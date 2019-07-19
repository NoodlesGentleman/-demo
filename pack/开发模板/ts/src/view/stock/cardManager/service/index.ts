import CardManagerModel from '../model/CardManagerModel'
import { Vue } from '../../../../ext-nb'
import { assignPure } from '../../../../shared/util/assignPure'

/**
 * Created by slipkinem on 5/14/2018 at 1:43 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
export const updateCardLose = (card: CardManagerModel) => {
  return Vue.http.post<number>('/stock/updateCardLose', assignPure(new CardManagerModel(), card))
}

export const updateCardDeleted = (card: CardManagerModel) => {
  return Vue.http.post<number>('/stock/updateCardDeleted', assignPure(new CardManagerModel(), card))
}
