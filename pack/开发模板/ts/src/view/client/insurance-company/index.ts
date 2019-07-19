/**
 * Created by slipkinem on 3/1/2018 at 3:22 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import MainComponent from '../../../components/main'
import QueryForm, { Params } from '../../../components/main/model/Form'
import { assert } from '../../../shared/util/logger'
import Insurance from './model/Insurance'
import InsuContractForm from './dialog/InsuContractForm.vue'
import InsuranceMainForm from './dialog/InsuranceMainForm.vue'
import InsuranceInsertForm from './dialog/InsuranceInsertForm.vue'
import { getDockingType } from '../../../shared/util/service'
import { isNumber } from 'util'

@Component({
  components: {
    MainComponent,
    InsuranceInsertForm,
    InsuranceMainForm,
    InsuContractForm
  }
})
export default class InsuranceCompany extends Vue {
  currentRow: Insurance
  dialogInsert = false
  dialogMainInsert = false
  dialogFormVisible = false
  dialogMainFormVisible = false
  dialogShowDetail = false
  dialogMainShowDetail = false
  originalName: string
  originalShortName: string
  originalInsuName: string
  dialogFormParams: Insurance = new Insurance()
  dialogMainFormParams: Insurance = new Insurance()
  tabActiveShowDetail = 'insurance'
  tabActive = 'insurance'
  columns = [
    {
      prop: 'name',
      label: '保险公司'
    },
    {
      prop: 'shortName',
      label: '简称'
    },
    {
      prop: 'insuName',
      label: '总公司'
    },
    {
      prop: 'totalShortName',
      label: '总公司简称'
    },
    {
      prop: 'place',
      label: '业务范围'
    },
    {
      prop: 'insuranceTime',
      label: '合同期间'
    },
    {
      prop: 'dockingType',
      label: '系统对接模式',
      filter: 'insuranceTypeFilter'
    },
    {
      prop: 'tpaPercentString',
      label: 'TPA服务费'
    },
    {
      prop: 'directPaymentPer',
      label: '直付返点数'
    }
  ]

  columns2 = [
    {
      prop: 'insuName',
      label: '保险总公司'
    },
    {
      prop: 'shortName',
      label: '总公司简称'
    }
  ]

  forms1: QueryForm[] = [
    {
      label: '总公司',
      prop: 'mainInsuName',
      type: 'typeahead',
      remoteUrl: '/getInsuranceMainListByName',
      typeaheadProp: {
        value: 'insuName',
        label: 'insuName',
        query: 'query'
      }
    }
  ]

  forms: QueryForm<Insurance>[] = [
    {
      label: '保险公司',
      prop: 'name',
      type: 'typeahead',
      remoteUrl: '/getInsuranceListByName',
      typeaheadProp: {
        value: 'name',
        label: 'name',
        query: 'query'
      }
    },
    {
      label: '总公司',
      prop: 'mainId',
      type: 'typeahead',
      remoteUrl: '/getInsuranceMainListByName',
      typeaheadProp: {
        value: 'id',
        label: 'insuName',
        query: 'query'
      }
    },
    {
      label: '对接模式',
      type: 'select',
      prop: 'dockingType',
      options: getDockingType()
    }
  ]
  $refs: {
    pkMain: MainComponent
    pkMainInsurance: MainComponent
    InsuranceInsertForm: any
    InsuranceMainForm: any
    InsuContractForm: any
  }

  insuranceInsertForm: Insurance = new Insurance()
  insuranceTitle = ''
  insuranceMainTitle = ''

  handleResponseData (data: Insurance[]): Insurance[] {
    return data.map((v) => {
      if (v.tpaPercent !== undefined && v.tpaPercent !== null) {
        v.tpaPercentString = v.tpaPercent + '%'
      } else if (v.tpaPercent === null && v.tpaPerPrice === null && v.tpaPerInvoiceCount === null && v.tpaPerPriceAbove === null) {
        v.tpaPercentString = ' '
      } else {
        v.tpaPercentString = '单件价格' + v.tpaPerPrice + '元;' + '单件发票数' + v.tpaPerInvoiceCount + ';' + '超量发票单价' + v.tpaPerPriceAbove + '元;'
      }
      return v
    })
  }

  handleQueryParams (params: Params) {
    console.log(params)
    return params
  }

  handleCurrentRowChange (row: Insurance) {
    this.dialogFormParams = row
  }

  handleMainCurrentRowChange (row: Insurance) {
    this.dialogMainFormParams = row
  }

  async mounted () {
    await this.$refs.pkMain.query()
    await this.$refs.pkMainInsurance.query()
  }


  insert () {
    this.insuranceTitle = '新增'
    this.insuranceInsertForm = new Insurance()
    this.dialogInsert = true
  }

  closeInsertDialog () {
    this.dialogInsert = false
  }

  closeMainInsertDialog () {
    this.dialogMainInsert = false
  }

  closeDialogShowDetail () {
    this.dialogShowDetail = false
    this.dialogMainShowDetail = false
  }

  closeDialogFormVisible () {
    this.dialogFormVisible = false
  }

  closeDialogMainFormVisible () {
    this.dialogMainFormVisible = false
  }

  insertTotal () {
    this.insuranceMainTitle = '新增'
    this.insuranceInsertForm = new Insurance()
    this.dialogMainInsert = true
  }

  update () {
    this.dialogFormParams = this.$refs.pkMainInsurance.getSelectedRow()
    this.originalName = this.dialogFormParams.name
    this.originalShortName = this.dialogFormParams.shortName
    this.insuranceTitle = '修改保险公司'
    this.dialogFormVisible = true
  }

  updateTotal () {
    this.dialogMainFormParams = this.$refs.pkMain.getSelectedRow()
    this.originalInsuName = this.dialogMainFormParams.insuName
    this.originalShortName = this.dialogMainFormParams.shortName
    this.insuranceMainTitle = '修改总公司'
    this.dialogMainFormVisible = true
  }

  /**
   * 查看
   */
  showDetail () {
    this.dialogFormParams = this.$refs.pkMainInsurance.getSelectedRow()
    this.insuranceTitle = '查看保险公司'
    this.$nextTick(async () => {
      await this.$refs.InsuContractForm.$refs.pkMain.query()
    })
    this.dialogShowDetail = true
  }

  showDetailTotal () {
    this.dialogMainFormParams = this.$refs.pkMain.getSelectedRow()
    this.insuranceMainTitle = '查看总公司'
    this.dialogMainShowDetail = true
  }

  async submitInsert () {
    await this.$refs.InsuranceInsertForm.$refs.insuInsertForm.validate()
    if (isNumber(this.insuranceInsertForm.insuName)) {
      this.insuranceInsertForm.mainId = this.insuranceInsertForm.insuName
    }
    if (this.insuranceInsertForm.directPaymentPer !== undefined) {
      assert(Math.round(this.insuranceInsertForm.directPaymentPer) === this.insuranceInsertForm.directPaymentPer, '直付服务费只能为整数')
    }
    const count = await this.$http.postParams<any>('/getInsuByName', { name: this.insuranceInsertForm.name })
    assert(!(count > 0), '保险公司名已存在')
    const shortNamecount = await this.$http.postParams<any>('/getInsuByShortName', { shortName: this.insuranceInsertForm.shortName })
    assert(!(shortNamecount > 0), '保险公司简称名已存在')
    await this.$http.post<Insurance>('/insertInsurance', this.insuranceInsertForm)
    this.dialogInsert = false
    this.$refs.pkMainInsurance.query()
  }

  async submitMainInsert () {
    await this.$refs.InsuranceMainForm.$refs.insuMainForm.validate()
    const count = await this.$http.postParams<any>('/getMainInsuByName', { name: this.insuranceInsertForm.insuName })
    assert(!(count > 0), '主保险公司名已存在')
    const shortNamecount = await this.$http.postParams<any>('/getMainInsuByShortName', { shortName: this.insuranceInsertForm.shortName })
    assert(!(shortNamecount > 0), '主保险公司简称名已存在')
    await this.$http.post<Insurance>('/insertInsurance', this.insuranceInsertForm)
    this.dialogMainInsert = false
    this.$refs.pkMain.query()
  }

  /**
   * 提交修改
   * @returns {Promise<void>}
   */
  async submitUpdate () {
    if (isNumber(this.dialogFormParams.insuName)) {
      this.dialogFormParams.mainId = this.dialogFormParams.insuName
    }
    await this.$refs.InsuranceInsertForm.$refs.insuInsertForm.validate()
    if (this.originalName !== this.dialogFormParams.name) {
      const count = await this.$http.postParams<any>('/getInsuByName', { name: this.dialogFormParams.name })
      assert(!(count > 0), '保险公司名已存在')
    }
    if (this.originalShortName !== this.dialogFormParams.shortName) {
      const shortNamecount = await this.$http.postParams<any>('/getInsuByShortName', { shortName: this.dialogFormParams.shortName })
      assert(!(shortNamecount > 0), '保险公司简称名已存在')
    }
    await this.$http.post<Insurance>('/updateInsurance', this.dialogFormParams)
    this.dialogFormVisible = false
    await this.$refs.pkMainInsurance.query()
  }

  async submitMainUpdate () {
    await this.$refs.InsuranceMainForm.$refs.insuMainForm.validate()
    if (this.originalInsuName !== this.dialogMainFormParams.insuName) {
      const count = await this.$http.postParams<any>('/getMainInsuByName', { name: this.dialogMainFormParams.insuName })
      assert(!(count > 0), '主保险公司名已存在')
    }
    if (this.originalShortName !== this.dialogMainFormParams.shortName) {
      const shortNamecount = await this.$http.postParams<any>('/getMainInsuByShortName', { shortName: this.dialogMainFormParams.shortName })
      assert(!(shortNamecount > 0), '主保险公司简称名已存在')
    }
    await this.$http.post<Insurance>('/updateInsurance', this.dialogMainFormParams)
    this.dialogMainFormVisible = false
    await this.$refs.pkMain.query()
  }

}
