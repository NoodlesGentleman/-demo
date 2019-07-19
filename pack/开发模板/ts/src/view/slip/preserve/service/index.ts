/**
 * Created by slipkinem on 4/10/2018 at 3:42 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Vue } from '../../../../ext-nb'
import { CustomerService } from '../model/CustomerService'

export const operateSlipFull = ({ slipFullId, slipFullState }: CustomerService, operationState: number) =>
    Vue.http.postParams('/slipFull/operationSlipFull', {
      slipFullId,
      slipFullState,
      operationState
    })
