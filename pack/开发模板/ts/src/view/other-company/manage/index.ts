/**
 * Created by slipkinem on 3/1/2018 at 3:22 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import MainComponent from '../../../components/main'
import QueryForm, { Params } from '../../../components/main/model/Form'
import OtherCompanyModel from './model/OtherCompanyModel'
import OtherCompanyInsertForm from './dialog/OtherCompanyInsertForm.vue'
import OtherCompanyForm from './dialog/OtherCompanyForm.vue'
import ContactForm from './dialog/ContactForm.vue'
import { assert } from '../../../shared/util/logger'
import * as _ from 'lodash'
import Model from './model/Model'

@Component({
  components: {
    MainComponent,
    OtherCompanyInsertForm,
    OtherCompanyForm,
    ContactForm
  }
})
export default class OtherCompany extends Vue {
  dialogFormVisible = false
  dialogInsert = false
  otherCompanyFormVisible = false
  dialogShowDetail = false
  originalName: string
  originalShortName: string
  dialogFormParams: OtherCompanyModel = new OtherCompanyModel()
  tabActive = 'otherCompany'
  tabActiveUpdate = 'otherCompany'
  columns = [
    {
      prop: 'name',
      label: '公司名称'
    },
    {
      prop: 'shortname',
      label: '简称'
    },
    {
      prop: 'province',
      label: '省份',
      filter: 'provinceFilter'
    },
    {
      prop: 'city',
      label: '市',
      filter: 'cityFilter'
    },
    {
      prop: 'area',
      label: '区域',
      filter: 'areaFilter'
    }
  ]

  forms: QueryForm[] = [
    {
      label: '公司名称',
      prop: 'name',
      type: 'typeahead',
      remoteUrl: '/getOtherCompanyListByName',
      typeaheadProp: {
        value: 'name',
        label: 'name',
        query: 'query'
      }
    }
  ]
  otherCompany: OtherCompanyModel = new OtherCompanyModel()
  model: Model = new Model()
  $refs: {
    pkMain: MainComponent
    ContactForm: any
    OtherCompanyInsertForm: any
  }

  async mounted () {
    await this.$refs.pkMain.query()
  }

  handleResponseData (data: OtherCompanyModel[]): OtherCompanyModel[] {
    return data.map((v) => {
      return v
    })
  }

  handleCurrentRowChange (row: OtherCompanyModel) {
    this.dialogFormParams = row
  }

  openFormDialog () {
    this.dialogFormVisible = true
  }

  openInsertDialog () {
    this.dialogInsert = true
  }

  closeFormDialog () {
    this.dialogFormVisible = false
  }

  closeInsertDialog () {
    this.dialogInsert = false
  }

  handleQueryParams (params: Params) {
    console.log(params)
    return params
  }


  openDialogShowDetail () {
    this.dialogShowDetail = true
  }

  closeDialogShowDetail () {
    this.dialogShowDetail = false
    this.dialogFormVisible = false
  }

  async insertTotal () {
    this.otherCompany = new OtherCompanyModel()
    this.openInsertDialog()
  }

  async showDetailTotal () {
    this.dialogFormParams = this.$refs.pkMain.getSelectedRow()
    this.dialogFormParams.areaList = [this.dialogFormParams.province, this.dialogFormParams.city, this.dialogFormParams.area]
    this.$nextTick(async () => {
      await this.$refs.ContactForm.$refs.pkMain.query()
    })
    this.openDialogShowDetail()
  }

  async update () {
    this.dialogFormParams = this.$refs.pkMain.getSelectedRow()
    this.openFormDialog()
    this.dialogFormParams.areaList = [this.dialogFormParams.province, this.dialogFormParams.city, this.dialogFormParams.area]
    this.$nextTick(async () => {
      await this.$refs.ContactForm.$refs.pkMain.query()
    })
  }

  /**
   * 提交修改
   * @returns {Promise<void>}
   */
  async submitUpdate () {
    this.dialogFormParams.province = this.dialogFormParams.areaList[0]
    this.dialogFormParams.city = this.dialogFormParams.areaList[1]
    this.dialogFormParams.area = this.dialogFormParams.areaList[2]
    delete this.dialogFormParams.areaList
    if (this.originalName !== this.dialogFormParams.name) {
      const count = await this.$http.postParams<any>('/getOtherCompanyByName', { name: this.dialogFormParams.name })
      assert(!(count > 0), '保险公司名已存在')
    }
    if (this.originalShortName !== this.dialogFormParams.shortname) {
      const count = await this.$http.postParams<any>('/getOtherCompanyByShortName', { shortName: this.dialogFormParams.shortname })
      assert(!(count > 0), '保险公司简称已存在')
    }
    await this.$http.post<OtherCompanyModel>('/updateOtherCompany', this.dialogFormParams)
    this.closeFormDialog()
    this.$refs.pkMain.query()
  }

  async submitInsert () {
    await this.$refs.OtherCompanyInsertForm.$refs.othercompany.validate()
    this.otherCompany.province = this.otherCompany.areaList[0]
    this.otherCompany.city = this.otherCompany.areaList[1]
    this.otherCompany.area = this.otherCompany.areaList[2]
    delete this.otherCompany.areaList
    const count = await this.$http.postParams<any>('/getOtherCompanyByName', { name: this.otherCompany.name })
    assert(!(count > 0), '保险公司名已存在')
    const shortCount = await this.$http.postParams<any>('/getOtherCompanyByShortName', { shortName: this.otherCompany.shortname })
    assert(!(shortCount > 0), '保险公司简称已存在')
    await this.$http.post<OtherCompanyModel>('/insertOtherCompany', this.otherCompany)
    this.dialogInsert = false
    this.$refs.pkMain.query()
  }
}
