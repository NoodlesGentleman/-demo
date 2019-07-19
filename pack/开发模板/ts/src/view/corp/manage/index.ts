/**
 * Created by slipkinem on 3/1/2018 at 3:22 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import MainComponent from '../../../components/main'
import QueryForm, { Params } from '../../../components/main/model/Form'
import { assert } from '../../../shared/util/logger'
import CorpModel from './model/CorpModel'
import CorpForm from './dialog/CorpForm.vue'
import CorpInsertForm from './dialog/CorpInsertForm.vue'
import ContactForm from './dialog/ContactForm.vue'
import SlipForm from './dialog/SlipForm.vue'
import CorpMainForm from './dialog/CorpMainForm.vue'
import SysArea from './model/SysArea'
import SysCity from './model/SysCity'
import Model from './model/Model'
import { isNumber } from 'util'

@Component({
  components: {
    MainComponent,
    CorpForm,
    CorpInsertForm,
    ContactForm,
    CorpMainForm,
    SlipForm
  }
})
export default class Corp extends Vue {
  currentRow: CorpModel
  dialogFormVisible = false
  dialogInsert = false
  dialogMainInsert = false
  dialogShowDetail = false
  changeInfo: CorpModel[] = []
  dialogFormParams: CorpModel = new CorpModel()
  dialogMainFormParams: CorpModel = new CorpModel()
  tabActive = 'corp'
  tabActiveWatch = 'corp'
  tabActiveUpdate = 'corp'
  tabActiveUpdateMain = 'corp'
  tabActiveWatchMain = 'corp'
  contactMainFormVisible = false
  originalName: string
  originalShortName: string
  originalCorpName: string
  contactFormVisible = false
  updateMainFormVisible = false
  updateFormVisible = false
  columns = [
    {
      prop: 'name',
      label: '公司名称'
    },
    {
      prop: 'shortName',
      label: '公司简称'
    },
    {
      prop: 'corpName',
      label: '集团名称'
    },
    {
      prop: 'totalShortName',
      label: '集团简称'
    },
    {
      prop: 'provinceId',
      label: '省份',
      filter: 'provinceFilter'
    },
    {
      prop: 'cityId',
      label: '市',
      filter: 'cityFilter'
    },
    {
      prop: 'areaId',
      label: '区域',
      filter: 'areaFilter'
    }
  ]

  columnsTotal = [
    {
      prop: 'corpName',
      label: '集团名称'
    },
    {
      prop: 'shortName',
      label: '集团简称'
    }
  ]

  formsTotal: QueryForm[] = [
    {
      label: '集团名称',
      prop: 'mainCorpName',
      type: 'typeahead',
      remoteUrl: '/getCorpMainListByName',
      typeaheadProp: {
        value: 'id',
        label: 'corpName',
        query: 'query'
      }
    }
  ]

  forms: QueryForm[] = [
    {
      label: '公司名称',
      prop: 'name',
      type: 'typeahead',
      remoteUrl: '/getCorpListByName',
      typeaheadProp: {
        value: 'name',
        label: 'name',
        query: 'query'
      }
    },
    {
      label: '集团名称',
      prop: 'mainCorpId',
      type: 'typeahead',
      remoteUrl: '/getCorpMainListByName',
      typeaheadProp: {
        value: 'id',
        label: 'corpName',
        query: 'query'
      }
    }
  ]
  sysArea: SysArea = new SysArea()
  sysCity: SysCity = new SysCity()
  model: Model = new Model()
  corpForm: CorpModel = new CorpModel()
  $refs: {
    pkMain: MainComponent
    pkMainCorp: MainComponent
    ContactForm: any
    CorpInsertForm: any
    CorpMainForm: any
    CorpForm: any
  }

  async mounted () {
    console.log(this.$refs)
    await this.$refs.pkMain.query()
    await this.$refs.pkMainCorp.query()
  }


  handleQueryParams (params: Params) {
    console.log(params)
    return params
  }

  handleQueryParamsMain (params: Params) {
    console.log(params)
    return params
  }

  handleCurrentRowChange (row: CorpModel) {
    // let _row = Object.assign(row, {
    //   areaList: [row.provinceId, row.cityId, row.areaId]
    // })
    // this.dialogFormParams = _row
  }

  handleCurrentRowChangeMain (rows: CorpModel) {
    this.dialogMainFormParams = rows
  }

  closeDialogShowDetail () {
    this.contactFormVisible = false
    this.contactMainFormVisible = false
  }


  closeDialogInsert () {
    this.dialogInsert = false
  }

  closeDialogMainInsert () {
    this.dialogMainInsert = false
  }

  closeFormDialog () {
    this.updateFormVisible = false
  }

  closeMainFormDialog () {
    this.updateMainFormVisible = false
  }

  // 投保公司新增
  insert () {
    this.corpForm = new CorpModel()
    this.dialogInsert = true
  }

  // 集团新增
  insertTotal () {
    this.corpForm = new CorpModel()
    this.dialogMainInsert = true
  }

  // 投保公司修改
  update () {
    this.updateFormVisible = true
    let temp = this.$refs.pkMain.getSelectedRow<CorpModel>()
    this.dialogFormParams = Object.assign({
      tableType: 3,
      areaList: [temp.provinceId, temp.cityId, temp.areaId]
    }, temp)

    this.originalName = this.dialogFormParams.name
    this.originalShortName = this.dialogFormParams.shortName

    this.$nextTick(async () => {
      await this.$refs.ContactForm.$refs.pkMain.query()
    })
  }

  // 集团修改
  updateTotal () {
    this.dialogMainFormParams = this.$refs.pkMainCorp.getSelectedRow()
    this.originalCorpName = this.dialogMainFormParams.corpName
    this.originalShortName = this.dialogMainFormParams.shortName
    this.dialogMainFormParams.tableType = 4
    this.updateMainFormVisible = true
  }

  /**
   * 查看
   */
  showDetail () {
    this.dialogFormParams = this.$refs.pkMain.getSelectedRow()
    this.dialogFormParams.tableType = 3
    this.dialogFormParams.areaList = [this.dialogFormParams.provinceId, this.dialogFormParams.cityId, this.dialogFormParams.areaId]
    this.contactFormVisible = true
    this.$nextTick(async () => {
      await this.$refs.ContactForm.$refs.pkMain.query()
    })
  }

  showDetailTotal () {
    this.dialogMainFormParams = this.$refs.pkMainCorp.getSelectedRow()
    this.contactMainFormVisible = true
    this.dialogMainFormParams.tableType = 4
  }


  /**
   * 提交修改
   * @returns {Promise<void>}
   */
  async submitUpdate () {
    await this.$refs.CorpForm.$refs.corpForm.validate()
    if (isNumber(this.dialogFormParams.corpName)) {
      this.dialogFormParams.mainCorpId = this.dialogFormParams.corpName
    }
    if (this.originalName !== this.dialogFormParams.name) {
      const count = await this.$http.postParams<any>('/getCorpByName', { name: this.dialogFormParams.name })
      assert(!(count > 0), '投保公司名已存在')
    }
    if (this.originalShortName !== this.dialogFormParams.shortName) {
      const shortNamecount = await this.$http.postParams<any>('/getCorpByShortName', { shortName: this.dialogFormParams.shortName })
      assert(!(shortNamecount > 0), '投保公司简称名已存在')
    }
    this.dialogFormParams.provinceId = this.dialogFormParams.areaList[0]
    this.dialogFormParams.cityId = this.dialogFormParams.areaList[1]
    this.dialogFormParams.areaId = this.dialogFormParams.areaList[2]
    delete this.dialogFormParams.areaList
    await this.$http.post<CorpModel>('/updateCorp', this.dialogFormParams)
    this.updateFormVisible = false
    await this.$refs.pkMain.query()
  }


  async submitMainUpdate () {
    await this.$refs.CorpMainForm.$refs.corpInsertForm.validate()
    if (this.originalCorpName !== this.dialogMainFormParams.corpName) {
      const count = await this.$http.postParams<any>('/getMainCorpByName', { corpName: this.dialogMainFormParams.corpName })
      assert(!(count > 0), '集团名已存在')
    }
    if (this.originalShortName !== this.dialogMainFormParams.shortName) {
      const shortNamecount = await this.$http.postParams<any>('/getMainCorpByShortName', { shortName: this.dialogMainFormParams.shortName })
      assert(!(shortNamecount > 0), '集团简称已存在')
    }
    await this.$http.post<CorpModel>('/updateCorp', this.dialogMainFormParams)
    this.updateMainFormVisible = false
    await this.$refs.pkMainCorp.query()
  }

  async submitMainInsert () {
    await this.$refs.CorpMainForm.$refs.corpInsertForm.validate()
    const count = await this.$http.postParams<any>('/getMainCorpByName', { corpName: this.corpForm.corpName })
    assert(!(count > 0), '集团名已存在')
    const shortNamecount = await this.$http.postParams<any>('/getMainCorpByShortName', { shortName: this.corpForm.shortName })
    assert(!(shortNamecount > 0), '集团简称已存在')
    await this.$http.post<CorpModel>('/insertCorp', this.corpForm)
    this.dialogMainInsert = false
    this.$refs.pkMainCorp.query()
  }

  async submitInsert () {
    await this.$refs.CorpInsertForm.$refs.corpInsertForm.validate()
    const count = await this.$http.postParams<any>('/getCorpByName', { name: this.corpForm.name })
    assert(!(count > 0), '投保公司名已存在')
    const shortNamecount = await this.$http.postParams<any>('/getCorpByShortName', { shortName: this.corpForm.shortName })
    assert(!(shortNamecount > 0), '投保公司简称名已存在')
    this.corpForm.provinceId = this.corpForm.areaList[0]
    this.corpForm.cityId = this.corpForm.areaList[1]
    this.corpForm.areaId = this.corpForm.areaList[2]
    delete this.corpForm.areaList
    await this.$http.post<CorpModel>('/insertCorp', this.corpForm)
    this.dialogInsert = false
    this.$refs.pkMain.query()
  }
}
