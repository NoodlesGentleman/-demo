/**
 * Created by slipkinem on 3/23/2018 at 3:50 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../../../ext-nb'
import { Prop } from 'vue-property-decorator'
import { TPAReplenishModel } from '../../../model/TPAReplenishModel'
import { LimitType } from '../../../../../enum/LimitType'
import { DateType } from '../../../../../enum/DateType'
import { RuleEnum } from '../../../../../enum/Rule'
import { genderInsuTypeLimitList } from '../../../service'
import { Getter } from 'vuex-class'

@Component
export default class TPAReplenish extends Vue {
  @Prop({
    default: () => new TPAReplenishModel()
  })
  tpaReplenish: TPAReplenishModel

  DateType = DateType

  LimitType = LimitType

  @Getter slipDisabledGetters: boolean

  created () {
    this.tpaReplenish.insuLimitTypeList = genderInsuTypeLimitList()
  }

  get replenish () {
    let tpaReplenish = this.tpaReplenish
    tpaReplenish.isMyselfRatio = !!tpaReplenish.isMyselfRatio
    tpaReplenish.isClassbRatio = !!tpaReplenish.isClassbRatio
    return tpaReplenish
  }

  get quotas () {
    return this.tpaReplenish.insuLimitTypeList.filter(v => {
      v.tableType = RuleEnum.PublicCoverage
      return v.type === LimitType.Quota
    })
  }

  get timesLimit () {
    return this.tpaReplenish.insuLimitTypeList.filter(v => v.type === LimitType.Times)
  }

  get deductions () {
    return this.tpaReplenish.insuLimitTypeList.filter(v => v.type === LimitType.Deduction)
  }

  get compensates () {
    return this.tpaReplenish.insuLimitTypeList.filter((v, k) => {
      v.$$index = k
      return v.type === LimitType.Compensate
    })
  }
}

