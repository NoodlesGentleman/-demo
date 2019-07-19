/**
 * Created by luco on 4/10/2018 at 10:13 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import MainComponent from '../../../components/main'
import QueryForm, { Params } from '../../../components/main/model/Form'
import TableColumn from '../../../components/main/model/Table'
import { getStockCardDeleted, getStockCardLose, getStockCardType } from '../../../shared/util/service'
import { OptionItem } from '../../../shared/util/model/OptionItem'
import { assert } from '../../../shared/util/logger'
import _ from 'lodash'
import CardManagerModel from './model/CardManagerModel'
import CardLoseDeleted from './model/CardLoseDeleted'
import RecycleForm from '../../../view/stock/stockBatchManager/dialog/RecycleForm.vue'
import { updateCardDeleted, updateCardLose } from './service'

@Component({
  components: {
    MainComponent,
    RecycleForm
  }
})
export default class CardManager extends Vue {
  currentRow: CardManager
  RecycleBinFormVisible = false
  tabActiveMain = 'cardManager'
  dialogFormParams: CardManagerModel = new CardManagerModel()
  cardLoseDeleted: CardLoseDeleted = new CardLoseDeleted()
  getStockCardType: Promise<OptionItem[]> = getStockCardType()
  getStockCardLose: Promise<OptionItem[]> = getStockCardLose()
  getStockCardDeleted: Promise<OptionItem[]> = getStockCardDeleted()
  type: number
  forms: QueryForm[] = [
    {
      prop: 'cardCode',
      label: '卡号'
    },
    {
      prop: 'insuName',
      label: '保险公司'
    },
    {
      prop: 'slipCode',
      label: '保单号'
    },
    {
      prop: 'corpName',
      label: '投保公司'
    },
    {
      prop: 'username',
      label: '用户姓名'
    },
    {
      prop: 'certificate',
      label: '证件号'
    },
    {
      prop: 'lose',
      label: '挂失状态',
      type: 'select',
      options: this.getStockCardLose
    },
    {
      label: '卡片类型',
      prop: 'type',
      type: 'select',
      options: this.getStockCardType
    },
    {
      label: '卡片状态',
      prop: 'deleted',
      type: 'select',
      options: this.getStockCardDeleted
    }
  ]

  columns: TableColumn[] = [
    {
      prop: 'cardCode',
      label: '卡号'
    },
    {
      prop: 'insuName',
      label: '保险公司'
    },
    {
      prop: 'slipCode',
      label: '保单号'
    },
    {
      prop: 'corpName',
      label: '投保公司'
    },
    {
      label: '用户姓名',
      prop: 'username'
    },
    {
      label: '证件号',
      prop: 'certificate'
    },
    {
      label: '卡片类型',
      prop: 'type',
      filter: 'stockCardTypeFilter'
    },
    {
      label: '作废状态',
      prop: 'deleted',
      filter: 'stockCardDeletedFilter'
    },
    {
      label: '挂失状态',
      prop: 'lose',
      filter: 'stockCardLoseFilter'
    },
    {
      label: '修改时间',
      prop: 'updatetime'
    }
  ]

  $refs: {
    pkMain: MainComponent
    RecycleForm: any
  }

  handleQueryParamsContact (params: Params) {
    if (params.place !== undefined) {
      params.stockProvince = params.place[0]
      params.stockCity = params.place[1]
    }
    return params
  }

  handleCurrentRowChange (row: CardManagerModel) {
    this.dialogFormParams = row
  }

  closeRecycleBinFormVisible () {
    this.RecycleBinFormVisible = false
  }

  async recycle () {
    this.RecycleBinFormVisible = true
    this.$nextTick(async () => {
      await this.$refs.RecycleForm.$refs.pkMain.query()
    })
  }

  async mounted () {
    await this.$refs.pkMain.query()
  }

  async losesubmit () {
    assert(!_.isEmpty(this.dialogFormParams.cardCode), '请先选择一行')
    await this.$confirm('是否挂失')
    await updateCardLose(this.dialogFormParams)
    this.$refs.pkMain.query()
  }

  async deletedsubmit () {
    assert(!_.isEmpty(this.dialogFormParams.cardCode), '请先选择一行')
    await this.$confirm('是否作废')
    assert(this.dialogFormParams.lose !== 0, '未挂失的卡不能作废')
    await updateCardDeleted(this.dialogFormParams)
    this.$refs.pkMain.query()
  }

  /**
   * 提交修改
   * @returns {Promise<void>}
   */
  async submitUpdate () {
    await this.$http.post<number>('/stock/updateStockBatch', this.dialogFormParams)
    this.$refs.pkMain.query()
  }

  /**
   * 新增
   * @returns {Promise<void>}
   */
  async submitInsert () {
    await this.$http.post<number>('/stock/insertStockBatch', this.dialogFormParams)
    this.$refs.pkMain.query()
  }

  async submitOuthousing () {
    this.$refs.pkMain.query()
  }

  async submitDelete () {
    this.$refs.pkMain.query()
  }
}
