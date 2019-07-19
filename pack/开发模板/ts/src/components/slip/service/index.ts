import { LimitType } from '../../../enum/LimitType'
import { DateType } from '../../../enum/DateType'
import { InsuLimitType } from '../model/InsuLimitType'
import * as _ from 'lodash'
import { Vue } from '../../../ext-nb'
import { SpecialSetting } from '../model/SpecialSetting'
import { SpecialRule } from '../model/SpecialRule'
import { InsuDuty } from '../model/InsuDuty'
/**
 * Created by slipkinem on 4/2/2018 at 5:39 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
// tpa和公共保额相关
export const genderInsuTypeLimitList = (): InsuLimitType[] => _.cloneDeep([
  {
    type: LimitType.Quota,
    limitType: DateType.Year
  },
  {
    type: LimitType.Quota,
    limitType: DateType.Month
  },
  {
    type: LimitType.Quota,
    limitType: DateType.Day
  },
  {
    type: LimitType.Quota,
    limitType: DateType.Times
  },
  {
    type: LimitType.Deduction,
    limitType: DateType.Year
  },
  {
    type: LimitType.Deduction,
    limitType: DateType.Month
  },
  {
    type: LimitType.Deduction,
    limitType: DateType.Day
  },
  {
    type: LimitType.Deduction,
    limitType: DateType.Times
  },
  {
    type: LimitType.Times,
    limitType: DateType.Year
  },
  {
    type: LimitType.Times,
    limitType: DateType.Day
  },
  {
    type: LimitType.Compensate
  }
])
// 直付相关
export const genderDirectPayInsuTypeLimitList = () => _.cloneDeep([
  {
    type: LimitType.Quota,
    limitType: DateType.Year
  },
  {
    type: LimitType.Quota,
    limitType: DateType.Month
  },
  {
    type: LimitType.Quota,
    limitType: DateType.Day
  },
  {
    type: LimitType.Quota,
    limitType: DateType.Times
  },
  {
    type: LimitType.Deduction,
    limitType: DateType.Year
  },
  {
    type: LimitType.Deduction,
    limitType: DateType.Month
  },
  {
    type: LimitType.Deduction,
    limitType: DateType.Day
  },
  {
    type: LimitType.Deduction,
    limitType: DateType.Times
  }
])

export const addSpecialRuleSet = (specialSetting: SpecialSetting) =>
    Vue.http.post<number>('/duty/addSpecialRuleSet', specialSetting)

export const updateInsuSpecialSet = (specialSetting: SpecialSetting) =>
    Vue.http.post<number>('/duty/updateInsuSpecialSet', specialSetting)

export const addSpecialRule = (specialRule: SpecialRule[]) =>
    Vue.http.post<number>('/duty/addSpecialRule', specialRule)

export const getInsuSpecialSet = (dutyType: number, dutyId: number) =>
    Vue.http.postParams<SpecialSetting[]>('/duty/getInsuSpecialSet', {
      dutyType,
      dutyId
    })

export const getDutyByPlanId = (planId: number) =>
    Vue.http.postParams<InsuDuty[]>('/duty/getDuty', { planId })

