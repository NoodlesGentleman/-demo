/**
 * Created by slipkinem on 3/20/2018 at 9:07 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import {
  getActivationState,
  getCardBinStatus,
  getCertificateTypes,
  getContractType,
  getDockingType,
  getFrozenState,
  getGenders,
  getInsuranceSlipPersonChangeType,
  getInsuranceSlipQuotaChangeType,
  getMerchantState,
  getMerchantTestStatus,
  getOrderStatus,
  getPayType,
  getSex,
  getShopTypes,
  getSlipFullHideState,
  getSlipFullState,
  getSlipFullType,
  getSlipState,
  getStockCardDeleted,
  getStockCardLose,
  getStockCardStatus,
  getStockCardType,
  getStockStatus,
  getStockType,
  stockHistoryStatus
} from '../../util/service'
import _ from 'lodash'
import { getAreaByAreaId, getCityById, getProvince } from '../../../components/area-cascader/service'
import { Vue } from '../../../ext-nb'
import { BaseInsuSlip } from '../../../components/slip/model/BaseInsuSlip'
import { api } from '../../../api'
import Insurance from '../../../view/client/insurance-company/model/Insurance'
import CorpModel from '../../../view/corp/manage/model/CorpModel'
import { OptionItem } from '../../util/model/OptionItem'

export class FilterMixin extends Vue {
  genOptionItemFilter (items: OptionItem[]): (state: number) => string | void {
    return (state: number) => {
      for (let item of items) {
        if (state === Number(item.value)) {
          return item.displayValue
        }
      }
    }
  }

  async activationStateFilter (state: number) {
    const certificateTypes = await getActivationState()
    for (let certificateType of certificateTypes) {
      if (state === Number(certificateType.value)) {
        return certificateType.displayValue
      }
    }
  }

  async frozenStateFilter (state: number) {
    const certificateTypes = await getFrozenState()
    for (let certificateType of certificateTypes) {
      if (state === Number(certificateType.value)) {
        return certificateType.displayValue
      }
    }
  }

  async payTypeFilter (type: number) {
    const certificateTypes = await getPayType()
    for (let certificateType of certificateTypes) {
      if (type === Number(certificateType.value)) {
        return certificateType.displayValue
      }
    }
  }

  async getCorpById (corpId: number) {
    const res = await Vue.http.postParams<CorpModel>(api.company.getCorpById, { corpId })
    if (!res || !res.name) return ''
    return res.name
  }

  async getInsuranceById (insuId: number) {
    const res = await Vue.http.postParams<Insurance>(api.company.getInsuranceById, { insuId })
    if (!res || !res.name) return ''
    return res.name
  }

  async slipStateFilter (state: number) {
    const slipState = await getSlipState()
    for (let slip of slipState) {
      if (state === Number(slip.value)) {
        return slip.displayValue
      }
    }
  }

  async slipCodeFilter (slipId: number) {
    const slip = await Vue.http.postParams<BaseInsuSlip>('/insurance/getInsuSlipByslipId', { slipId })
    return slip.slipCode
  }

  async slipFullTypeFilter (state: number) {
    const slipFullType = await getSlipFullType()
    for (let type of slipFullType) {
      if (state === Number(type.value)) {
        return type.displayValue
      }
    }
  }

  async slipFullStateFilter (state: number) {
    return this.genOptionItemFilter(await getSlipFullState())(state)
  }

  async slipFullHideStateFilter (state: number) {
    return this.genOptionItemFilter(await getSlipFullHideState())(state)
  }

  async certificateTypeFilter (state: number) {
    const certificateTypes = await getCertificateTypes()
    for (let certificateType of certificateTypes) {
      if (state === Number(certificateType.value)) {
        return certificateType.displayValue
      }
    }
  }

  async gendersFilter (state: number) {
    const genders = await getGenders()
    for (let gender of genders) {
      if (state === Number(gender.value)) {
        return gender.displayValue
      }
    }
  }

  async insuranceTypeFilter (state: number) {
    const insuranceType = await getDockingType()
    for (let gender of insuranceType) {
      if (state === Number(gender.value)) {
        return gender.displayValue
      }
    }
  }

  async contactSexFilter (state: number) {
    const sex = await getSex()
    for (let gender of sex) {
      if (state === Number(gender.value)) {
        return gender.displayValue
      }
    }
  }

  async contractFilter (state: number) {
    const contracttype = await getContractType()
    for (let gender of contracttype) {
      if (state === Number(gender.value)) {
        return gender.displayValue
      }
    }
  }

  logoFilter (val: string) {
    if (_.isEmpty(val)) {
      return '无'
    } else {
      return '有'
    }
  }

  async merchantStatusFilter (state: number) {
    const merchantStatus = await getMerchantState()
    for (let status of merchantStatus) {
      if (state === Number(status.value)) {
        return status.displayValue
      }
    }
  }

  async merchantTestFilter (state: number) {
    const merchantStatus = await getMerchantTestStatus()
    for (let status of merchantStatus) {
      if (state === Number(status.value)) {
        return status.displayValue
      }
    }
  }

  yesOrNoFilter (val: number) {
    if (val === 1) {
      return '是'
    } else {
      return '否'
    }
  }

  async shopTypeFilter (state: number) {
    const merchantStatus = await getShopTypes()
    for (let status of merchantStatus) {
      if (state === Number(status.value)) {
        return status.displayValue
      }
    }
  }

  async OrderStatusFilter (state: number) {
    const orderStatus = await getOrderStatus()
    for (let status of orderStatus) {
      if (state === Number(status.value)) {
        return status.displayValue
      }
    }
  }

  async cardbinStatusFilter (state: number) {
    const cardBinStatus = await getCardBinStatus()
    for (let status of cardBinStatus) {
      if (state === Number(status.value)) {
        return status.displayValue
      }
    }
  }

  async provinceFilter (provinceId: number) {
    const province = await getProvince()
    for (let pro of province) {
      if (provinceId === Number(pro.id)) {
        return pro.name
      }
    }
  }

  async cityFilter (cityId: number) {
    const city = await getCityById(cityId)
    if (cityId === Number(city.id)) {
      return city.name
    }
  }

  async areaFilter (areaId: number) {
    const area = await getAreaByAreaId(areaId)
    if (areaId === Number(area.id)) {
      return area.name
    }
  }

  async stockTypeFilter (stockType: number) {
    const stock = await getStockType()
    for (let type of stock) {
      if (stockType === Number(type.value)) {
        return type.displayValue
      }
    }
  }

  async stockStatusFilter (stockStatus: number) {
    const stock = await getStockStatus()
    for (let type of stock) {
      if (stockStatus === Number(type.value)) {
        return type.displayValue
      }
    }
  }

  async stockCardStatusFilter (status: number) {
    const stock = await getStockCardStatus()
    for (let type of stock) {
      if (status === Number(type.value)) {
        return type.displayValue
      }
    }
  }

  async stockHistoryStatusFilter (stockhistoryStatus: number) {
    const stock = await stockHistoryStatus()
    for (let type of stock) {
      if (stockhistoryStatus === Number(type.value)) {
        return type.displayValue
      }
    }
  }

  async stockCardTypeFilter (type: number) {
    const stock = await getStockCardType()
    for (let stocktype of stock) {
      if (type === Number(stocktype.value)) {
        return stocktype.displayValue
      }
    }
  }

  async stockCardLoseFilter (lose: number) {
    const stock = await getStockCardLose()
    for (let stocktype of stock) {
      if (lose === Number(stocktype.value)) {
        return stocktype.displayValue
      }
    }
  }

  async stockCardDeletedFilter (deleted: number) {
    const stock = await getStockCardDeleted()
    for (let stocktype of stock) {
      if (deleted === Number(stocktype.value)) {
        return stocktype.displayValue
      }
    }
  }

  async insuranceSlipPersonChangeTypeFilter (changeType: number) {
    return this.genOptionItemFilter(await getInsuranceSlipPersonChangeType())(changeType)
  }

  async insuranceSlipQuotaChangeTypeFilter (changeType: number) {
    return this.genOptionItemFilter(await getInsuranceSlipQuotaChangeType())(changeType)
  }
}

export const pipe = new FilterMixin()
