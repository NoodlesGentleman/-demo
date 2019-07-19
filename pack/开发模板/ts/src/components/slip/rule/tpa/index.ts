/**
 * Created by slipkinem on 3/23/2018 at 1:43 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../../ext-nb'
import MainComponent from '../../../main'
import QueryForm, { Params } from '../../../main/model/Form'
import TableColumn from '../../../main/model/Table'
import { TPADuty } from '../../model/TPADuty'
import { Prop, Watch } from 'vue-property-decorator'
import { LimitType } from '../../../../enum/LimitType'
import { DateType } from '../../../../enum/DateType'
import { RuleEnum } from '../../../../enum/Rule'
import { SpecialTypeEnum } from '../../../../enum/SpecialType'
import { SpecialRule } from '../../model/SpecialRule'
import Customer from '../../../../view/customer/manage/model/Customer'
import { Disease } from '../../model/Disease'
import { Hospital } from '../../model/Hospital'
import * as _ from 'lodash'
import { getInsuSpecialSet } from '../../service'
import { SpecialDutyModel } from '../../model/SpecialDutyModel'
import { SpecialSetting } from '../../model/SpecialSetting'
import { Getter } from 'vuex-class'
import {
  getHospitalFixedPoint,
  getHospitalLevela,
  getHospitalLevelb,
  getHospitalLevelc,
  getHospitalType,
  getInsuranceSlipSystemDuty
} from '../../../../shared/util/service'
import { OptionItem } from '../../../../shared/util/model/OptionItem'

@Component({
  components: {
    MainComponent
  }
})
export default class TPARule extends Vue {
  @Prop({
    default: () => new TPADuty()
  })
  tpa: TPADuty

  currentRow: SpecialSetting

  tabActive = 'base'

  isShowDetail = false

  specialTabActive = String(SpecialTypeEnum.Person)

  SpecialTypeEnum = SpecialTypeEnum

  DateType = DateType

  LimitType = LimitType

  personForms: QueryForm[] = [
    {
      label: '姓名',
      prop: 'username'
    },
    {
      label: '证件号',
      prop: 'certificate'
    }
  ]
  personColumns: TableColumn[] = [
    {
      prop: 'username',
      label: '姓名'
    },
    {
      prop: 'certificate',
      label: '证件号'
    }
  ]

  diseaseForms: QueryForm[] = [
    {
      label: '疾病名称',
      prop: 'diseaseName'
    },
    {
      label: '疾病代码',
      prop: 'diseaseCode'
    }
  ]

  diseaseColumns: TableColumn[] = [
    {
      prop: 'diseaseName',
      label: '疾病名称'
    },
    {
      prop: 'diseaseCode',
      label: '疾病代码'
    }
  ]

  hospitalForms: QueryForm[] = [
    {
      label: '级别限定',
      prop: 'levela',
      type: 'select',
      options: getHospitalLevela()
    },
    {
      label: '',
      prop: 'levelb',
      type: 'select',
      options: getHospitalLevelb()
    },
    {
      label: '',
      prop: 'levelb',
      type: 'select',
      options: getHospitalLevelc()
    },
    {
      label: '性质',
      prop: 'type',
      type: 'select',
      options: getHospitalType()
    },
    {
      label: '定点',
      prop: 'fixedPoint',
      type: 'select',
      options: getHospitalFixedPoint()
    },
    {
      label: '医院名称',
      prop: 'hospitalName'
    },
    {
      label: '省/市/区',
      prop: 'area',
      type: 'areaCascader'
    }
  ]

  hospitalColumns: TableColumn[] = [
    {
      prop: 'hospitalName',
      label: '医院名称'
    },
    {
      prop: 'type',
      label: '医院性质'
    }
  ]

  personRules: SpecialRule[] = []
  diseaseRules: SpecialRule[] = []
  hospitalRules: SpecialRule[] = []

  insuranceSlipSystemDuty: OptionItem[] = []

  @Getter slipDisabledGetters: boolean

  get tpaDuty () {
    let tpa = this.tpa
    tpa.base.isWaitDate = !!tpa.base.isWaitDate
    tpa.base.isMyselfRatio = !!tpa.base.isMyselfRatio
    tpa.base.isClassbRatio = !!tpa.base.isClassbRatio
    tpa.specialRuleList = tpa.specialRuleList.map((special) => {
      special.limitTypeDisplay = ['单一限定', '单一满足', '同时满足'][special.limitType] || ''
      return special
    })
    console.log(tpa)
    return tpa
  }

  get quotas () {
    return this.tpa.base.insuLimitTypeList.filter(v => {
      v.tableType = RuleEnum.TPADuty
      return v.type === LimitType.Quota
    })
  }

  get timesLimit () {
    return this.tpa.base.insuLimitTypeList.filter(v => v.type === LimitType.Times)
  }

  get deductions () {
    return this.tpa.base.insuLimitTypeList.filter(v => v.type === LimitType.Deduction)
  }

  get compensates () {
    return this.tpa.base.insuLimitTypeList.filter((v, k) => {
      v.$$index = k
      return v.type === LimitType.Compensate
    })
  }

  get specialRules () {
    return this.personRules
        .concat(this.diseaseRules)
        .concat(this.hospitalRules)
  }

  // 判断是否是特殊限定添加
  get isSpecial () {
    return this.tabActive === 'special'
  }

  async created () {
    this.insuranceSlipSystemDuty = await getInsuranceSlipSystemDuty()
    this.tpa.base.insuLimitTypeList = [
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
    ]
  }

  init () {
    this.personRules = []
    this.diseaseRules = []
    this.hospitalRules = []
  }

  handleHospitalParams (params: Params) {
    if (_.isArray(params.area)) {
      params.province = _.isUndefined(params.area[0]) ? '' : params.area[0]
      params.city = _.isUndefined(params.area[1]) ? '' : params.area[1]
      params.district = _.isUndefined(params.area[2]) ? '' : params.area[2]
    }
    return params
  }

  /**
   * 人员限定
   * @param {Customer[]} persons
   */
  handlePersonChange (persons: Customer[]) {
    let specialRule = new SpecialRule()
    this.personRules = persons.map(person => {
      specialRule = new SpecialRule()
      specialRule.specialRuleType = SpecialTypeEnum.Person
      specialRule.typeTableId = person.id
      return specialRule
    })
    console.log(this.specialRules)
  }

  /**
   * 疾病限定
   * @param {Disease[]} diseases
   */
  handleDiseaseChange (diseases: Disease[]) {
    let specialRule = new SpecialRule()
    this.personRules = diseases.map(disease => {
      specialRule = new SpecialRule()
      specialRule.specialRuleType = SpecialTypeEnum.Disease
      specialRule.typeTableId = disease.diseaseId
      return specialRule
    })
    console.log(this.specialRules)
  }

  /**
   * 医院限定
   * @param {Hospital[]} hospitals
   */
  handleHospitalChange (hospitals: Hospital[]) {
    let specialRule = new SpecialRule()
    this.personRules = hospitals.map(hospital => {
      specialRule = new SpecialRule()
      specialRule.specialRuleType = SpecialTypeEnum.Hospital
      specialRule.typeTableId = hospital.hospitalId
      return specialRule
    })
    console.log(this.specialRules)
  }

  @Watch('isShowDetail')
  async onShowDetailChange (val: boolean) {
    let { dutyId } = this.tpa.specail.specialSetting
    if (!val && dutyId) {
      this.tpa.specialRuleList = await getInsuSpecialSet(RuleEnum.TPADuty, dutyId)
      this.tpa.specail = new SpecialDutyModel()
      this.init()
    }
  }

  /**
   * 删除限定
   */
  async deleteSpecialRueSet () {
    console.log(this.currentRow)
    await this.$confirm('确定要删除吗？', '提示', {
      type: 'error'
    })
    await this.$http.postParams('')
  }

  /**
   * 表格单选
   */
  handleCurrentRowChange (row: SpecialSetting) {
    this.currentRow = row
  }
}
