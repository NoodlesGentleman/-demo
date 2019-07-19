/**
 * Created by slipkinem on 3/28/2018 at 10:25 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../../ext-nb'
import { Prop } from 'vue-property-decorator'
import { DateType } from '../../../../enum/DateType'
import { LimitType } from '../../../../enum/LimitType'
import { PublicCoverageAmt } from '../../model/PublicCoverageAmt'
import { RuleEnum } from '../../../../enum/Rule'
import { genderInsuTypeLimitList } from '../../service'
import { Getter } from 'vuex-class'

@Component
export default class PublicCoverage extends Vue {
  @Prop({
    default: () => new PublicCoverageAmt()
  })
  publicAmt: PublicCoverageAmt

  DateType = DateType

  LimitType = LimitType

  @Getter slipDisabledGetters: boolean

  get quotas () {
    return this.publicAmt.insuLimitTypeList.filter(v => {
      v.tableType = RuleEnum.PublicCoverage
      return v.type === LimitType.Quota
    })
  }

  get timesLimit () {
    return this.publicAmt.insuLimitTypeList.filter(v => v.type === LimitType.Times)
  }

  get deductions () {
    return this.publicAmt.insuLimitTypeList.filter(v => v.type === LimitType.Deduction)
  }

  get compensates () {
    return this.publicAmt.insuLimitTypeList.filter((v, k) => {
      v.$$index = k
      return v.type === LimitType.Compensate
    })
  }

  created () {
    this.publicAmt.insuLimitTypeList = genderInsuTypeLimitList()
  }
}
