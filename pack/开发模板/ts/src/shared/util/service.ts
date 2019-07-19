/**
 * Created by slipkinem on 3/15/2018 at 3:26 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Vue } from '../../ext-nb'
import { OptionItem } from './model/OptionItem'

export async function getOptionItems (keyword: string) {
  return Vue.http.requestCache<OptionItem[]>('/System/getOptionItemsByKeyword', { keyword })
}

// 去掉Promise<OptionItem[]>返回值会导致类型推导变难
// 性别
export const getGenders = () => getOptionItems('user.gender')
// 证件类型
export const getCertificateTypes = async (): Promise<OptionItem[]> => getOptionItems('customer.certificateType')
// 客户修改字段
export const getChangeFields = async (): Promise<OptionItem[]> => getOptionItems('change.customer.field')

export const getSignedStatuses = async (): Promise<OptionItem[]> => getOptionItems('brand.signedStatus')

export const getSystemType = async (): Promise<OptionItem[]> => getOptionItems('brand.systemType')

export const getBrandState = async (): Promise<OptionItem[]> => getOptionItems('brand.state')

export const getDockingType = async (): Promise<OptionItem[]> => getOptionItems('insurance.dockingType')

export const getInsuranceTotaltype = async (): Promise<OptionItem[]> => getOptionItems('insurance.status')

export const gettpaType = async (): Promise<OptionItem[]> => getOptionItems('insurance.tpaType')

export const getCorpStatus = async (): Promise<OptionItem[]> => getOptionItems('corp.status')

export const getSex = async (): Promise<OptionItem[]> => getOptionItems('contact.sex')

export const getSlipState = async (): Promise<OptionItem[]> => getOptionItems('insurance.slip.state')

export const getMerchantState = async (): Promise<OptionItem[]> => getOptionItems('merchant.state')

export const getMerchantTestStatus = async (): Promise<OptionItem[]> => getOptionItems('merchant.testStatus')
// 门店类型
export const getShopTypes = async (): Promise<OptionItem[]> => getOptionItems('shop.type')

export const getShopType = async (): Promise<OptionItem[]> => getOptionItems('shop.type')
// 医院级别
export const getHospitalLevel = async (): Promise<OptionItem[]> => getOptionItems('hospital.level')
// 医院等级
export const getHospitalGrade = async (): Promise<OptionItem[]> => getOptionItems('hospital.grade')
// 性质一
export const getHospitalNatureA = async (): Promise<OptionItem[]> => getOptionItems('hospital.natureA')
// 性质二
export const getHospitalNatureB = async (): Promise<OptionItem[]> => getOptionItems('hospital.natureB')

export const getHospitalType = () => getOptionItems('hospital.type')

export const getHospitalLevela = () => getOptionItems('hospital.levela')
export const getHospitalLevelb = () => getOptionItems('hospital.levelb')
export const getHospitalLevelc = () => getOptionItems('hospital.levelc')

export const getHospitalFixedPoint = () => getOptionItems('hospital.fixed.point')

// 疾病类型
export const getDiseaseType = async (): Promise<OptionItem[]> => getOptionItems('disease.type')

export const getContractType = async (): Promise<OptionItem[]> => getOptionItems('contract.contractType')

export const getInsuranceType = async (): Promise<OptionItem[]> => getOptionItems('insurance.type')

export const getShopLabels = async (): Promise<OptionItem[]> => getOptionItems('shop.labels')

export const getShopIsShow = async (): Promise<OptionItem[]> => getOptionItems('shop.isShow')

export const getShopIsDemo = async (): Promise<OptionItem[]> => getOptionItems('shop.isDemo')
// 卡bin状态
export const getCardBinStatus = async (): Promise<OptionItem[]> => getOptionItems('cardBin.status')

export const getOrderStatus = async (): Promise<OptionItem[]> => getOptionItems('order.status')

export const getSlipFullHideState = async (): Promise<OptionItem[]> => getOptionItems('insurance.slipFull.hideState')

export const getSlipFullState = async (): Promise<OptionItem[]> => getOptionItems('insurance.slipFull.state')

export const getSlipFullType = async (): Promise<OptionItem[]> => getOptionItems('insurance.slipFull.type')

export const getQuotaAscription = async (): Promise<OptionItem[]> => getOptionItems('insurance.slipFull.quotaAscription')

export const getActivationState = async (): Promise<OptionItem[]> => getOptionItems('customerAccount.activation.state')

export const getFrozenState = async (): Promise<OptionItem[]> => getOptionItems('customerAccount.frozen.state')

export const getHandleType = async (): Promise<OptionItem[]> => getOptionItems('insurance.slip.handle.type')

export const getPayType = async (): Promise<OptionItem[]> => getOptionItems('order.pay.type')

export const getSpecialSetLimitType = () => getOptionItems('insurance.slip.special.set.limit.type')

export const getStockStatus = async (): Promise<OptionItem[]> => getOptionItems('stockBatch.status')

export const getStockType = async (): Promise<OptionItem[]> => getOptionItems('stockBatch.stockType')

export const getDownload = async (): Promise<OptionItem[]> => getOptionItems('stockBatch.download')

export const getOptionStatus = async (): Promise<OptionItem[]> => getOptionItems('option.status')

export const getStockCardStatus = async (): Promise<OptionItem[]> => getOptionItems('stockCard.status')

export const getStockCardType = async (): Promise<OptionItem[]> => getOptionItems('stockCard.type')

export const getStockCardLose = async (): Promise<OptionItem[]> => getOptionItems('stockCard.lose')

export const stockHistoryStatus = async (): Promise<OptionItem[]> => getOptionItems('stockHistory.status')

export const getStockCardDeleted = async (): Promise<OptionItem[]> => getOptionItems('stockCard.deleted')

export const getInsuranceSlipQuotaChangeType = () => getOptionItems('insurance.slip.quota.change.type')

export const getInsuranceSlipPersonChangeType = () => getOptionItems('insurance.slip.person.change.type')

export const getInsuranceSlipSystemDuty = () => getOptionItems('insurance.slip.system.duty')
