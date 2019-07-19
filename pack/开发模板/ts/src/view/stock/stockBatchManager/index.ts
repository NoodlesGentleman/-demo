/**
 * Created by luco on 4/10/2018 at 10:13 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import MainComponent from '../../../components/main'
import QueryForm, { Params } from '../../../components/main/model/Form'
import TableColumn from '../../../components/main/model/Table'
import { assert } from '../../../shared/util/logger'
import StockBatchForm from './dialog/StockBatchForm.vue'
import DownloadCardForm from './dialog/DownloadCardForm.vue'
import HistoryForm from './dialog/HistoryForm.vue'
import RecycleForm from './dialog/RecycleForm.vue'
import OutHousingForm from './dialog/OutHousingForm.vue'
import StockBatchUpdateForm from './dialog/StockBatchUpdateForm.vue'
import InventoryListForm from './dialog/InventoryListForm.vue'
import { getStockStatus, getStockType } from '../../../shared/util/service'
import { OptionItem } from '../../../shared/util/model/OptionItem'
import { default as StockBatch } from './model/StockBatch'
import StockCard from './model/StockCard'
import * as _ from 'lodash'
import { multiDownloadFile } from '../../../shared/util/multiDownloadFile'
import { getCityById, getProvinceById } from '../../../components/area-cascader/service'

@Component({
  components: {
    MainComponent,
    StockBatchForm,
    StockBatchUpdateForm,
    InventoryListForm,
    DownloadCardForm,
    OutHousingForm,
    HistoryForm,
    RecycleForm
  }
})
export default class StockBatchManage extends Vue {
  currentRow: StockBatch
  NewDialogFormVisible = false
  UpdateDialogFormVisible = false
  DownloadDialogFormVisible = false
  OutDialogFormVisible = false
  HistoryDialogFormVisible = false
  RecycleBinFormVisible = false
  tabActiveMain = 'stockBatch'
  dialogFormParams: StockBatch = new StockBatch()
  stockCard: StockCard = new StockCard()
  getStockType: Promise<OptionItem[]> = getStockType()
  getStockStatus: Promise<OptionItem[]> = getStockStatus()
  type: number
  forms: QueryForm[] = [
    {
      prop: 'stockId',
      label: '批次号'
    },
    {
      prop: 'stockName',
      label: '批次名称'
    },
    {
      prop: 'stockType',
      label: '库存类型',
      type: 'select',
      options: this.getStockType
    },
    {
      label: '批次状态',
      prop: 'stockStatus',
      type: 'select',
      options: this.getStockStatus
    },
    {
      prop: 'place',
      label: '归属地区',
      type: 'areaCascader'
    }
  ]

  columns: TableColumn[] = [
    {
      prop: 'stockId',
      label: '批次号'
    },
    {
      prop: 'stockName',
      label: '批次名称'
    },
    {
      prop: 'stockType',
      label: '库存类型',
      filter: 'stockTypeFilter'
    },
    {
      prop: 'stockStatus',
      label: '批次状态',
      filter: 'stockStatusFilter'
    },
    {
      label: '批次剩余数量',
      prop: 'stockSurpluscount'
    },
    {
      prop: 'place',
      label: '归属地区',
      filter: async (value: string, row: StockBatch) => {
        let city = await getCityById(Number(row.stockCity))
        let province = await getProvinceById(Number(row.stockProvince))
        return `${province.name}/${city.name}`
      }
    }
  ]
  $refs: {
    pkMain: MainComponent
    InventoryListForm: any
    HistoryForm: any
    RecycleForm: any
  }

  handleQueryParamsContact (params: Params) {
    if (params.place !== undefined) {
      params.stockProvince = params.place[0]
      params.stockCity = params.place[1]
    }
    return params
  }

  handleCurrentRowChange (row: StockBatch) {
    this.dialogFormParams = row
  }

  closeNewCardBinDialog () {
    this.NewDialogFormVisible = false
  }

  closeDownloadDialogFormVisible () {
    this.DownloadDialogFormVisible = false
  }

  closeOutDialogFormVisible () {
    this.OutDialogFormVisible = false
  }

  closeHistoryDialogFormVisible () {
    this.HistoryDialogFormVisible = false
  }

  closeUpdateCardBinDialog () {
    this.UpdateDialogFormVisible = false
  }

  closeRecycleBinFormVisible () {
    this.RecycleBinFormVisible = false
  }

  insert () {
    this.dialogFormParams = new StockBatch()
    this.NewDialogFormVisible = true
  }

  async recycle () {
    this.RecycleBinFormVisible = true
  }

  updateCardBin () {
    assert(!_.isEmpty(this.dialogFormParams.stockName), '请先选择一行')
    this.stockCard.stockId = this.dialogFormParams.stockId
    this.$nextTick(async () => {
      await this.$refs.InventoryListForm.$refs.pkMain.query()
    })
    this.UpdateDialogFormVisible = true
  }


  async mounted () {
    await this.$refs.pkMain.query()
  }


  /**
   * 提交修改
   * @returns {Promise<void>}
   */
  async submitUpdate () {
    await this.$http.post<number>('/stock/updateStockBatch', this.dialogFormParams)
    this.closeUpdateCardBinDialog()
    this.$refs.pkMain.query()
  }

  /**
   * 新增
   * @returns {Promise<void>}
   */
  async submitInsert () {
    await this.$http.post<number>('/stock/insertStockBatch', this.dialogFormParams)
    this.closeNewCardBinDialog()
    this.$refs.pkMain.query()
  }

  async warehousing () {
    assert(!_.isEmpty(this.dialogFormParams.stockName), '请先选择一行')
    await this.$confirm('是否入库')
    await this.$http.post<number>('/stock/warehousing', this.dialogFormParams)
    this.$refs.pkMain.query()
  }

  async outhousing () {
    assert(!_.isEmpty(this.dialogFormParams.stockName), '请先选择一行')
    this.stockCard = new StockCard()
    this.OutDialogFormVisible = true
  }

  async history () {
    this.$nextTick(async () => {
      await this.$refs.HistoryForm.$refs.pkMain.query()
    })
    this.HistoryDialogFormVisible = true
  }

  async submitOuthousing () {
    this.stockCard.stockType = this.dialogFormParams.stockType
    this.stockCard.stockId = this.dialogFormParams.stockId
    delete(this.stockCard.place)
    await this.$http.post<number>('/stock/outhousing', this.stockCard)
    this.OutDialogFormVisible = false
    this.$refs.pkMain.query()
  }

  async submitDelete () {
    this.$refs.pkMain.query()
  }

  // async download () {
  //   async submitDelete () {
  //     this.$refs.pkMain.query()
  //   }

  // async download () {
  //   assert(!_.isEmpty(this.dialogFormParams.stockName), '请先选择一行')
  //   this.DownloadDialogFormVisible = true
  // }

  // async downloadCard () {
  //   multiDownloadFile('api/stock/downloadCards', this.dialogFormParams)
  //   this.DownloadDialogFormVisible = false
  //   this.$refs.pkMain.query()
  // }
}
