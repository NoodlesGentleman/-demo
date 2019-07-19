/**
 * Created by slipkinem on 3/23/2018 at 1:43 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../../ext-nb'
import MainComponent from '../../../main'
import TableColumn from '../../../main/model/Table'
import { Prop } from 'vue-property-decorator'
import { LimitType } from '../../../../enum/LimitType'
import { DateType } from '../../../../enum/DateType'
import { DirectPayModel } from '../../model/DirectPayModel'
import { SpecialTypeEnum } from '../../../../enum/SpecialType'
import { RuleEnum } from '../../../../enum/Rule'
import { genderDirectPayInsuTypeLimitList } from '../../service'
import { Getter } from 'vuex-class'
import DirectPaySpecialRule from './special-rule'

@Component({
  components: {
    MainComponent,
    DirectPaySpecialRule
  }
})
export default class DirectPay extends Vue {
  @Prop({
    default: () => new DirectPayModel()
  })
  directPay: DirectPayModel

  LimitType = LimitType
  DateType = DateType
  SpecialTypeEnum = SpecialTypeEnum

  previewColumns: TableColumn[] = [
    {
      label: '限定说明',
      prop: 'mark'
    },
    {
      label: '限定关系',
      prop: 'limitType'
    }
  ]

  selectDate = []

  @Getter slipDisabledGetters: boolean

  $refs: {
    specialRule: DirectPaySpecialRule
  }

  private tabActive = 'first'

  async created () {
    this.directPay.base.insuLimitTypeList = genderDirectPayInsuTypeLimitList()
  }

  // 限额
  get quotas () {
    return this.directPay.base.insuLimitTypeList.filter((v) => {
      v.tableType = RuleEnum.DirectPay
      return v.type === LimitType.Quota
    })
  }

  // 免赔
  get deductions () {
    return this.directPay.base.insuLimitTypeList.filter((v) => v.type === LimitType.Deduction)
  }

  // 判断是否是特殊限定添加
  get isSpecial () {
    return this.tabActive === 'special'
  }

  get specialRules () {
    return this.$refs.specialRule.specialRules
  }

  // 时间选择
  selectDateChange () {
    if (this.selectDate) {
      this.directPay.base.limitBegindate = this.selectDate[0]
      this.directPay.base.limitEnddate = this.selectDate[1]
    } else {
      this.directPay.base.limitBegindate = ''
      this.directPay.base.limitEnddate = ''
    }
  }

}
