/**
 * Created by luco on 4/10/2018 at 10:13 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import QueryForm from '../../../components/main/model/Form'
import TableColumn from '../../../components/main/model/Table'
import MainComponent from '../../../components/main'
import { assert } from '../../../shared/util/logger'
import _ from 'lodash'
import CardBinForm from './dialog/CardBinForm.vue'
import { getCardBinStatus } from '../../../shared/util/service'
import { OptionItem } from '../../../shared/util/model/OptionItem'
import CardBin from './model/CardBin'
import { ElUpload } from 'element-ui/types/upload'
import ResPage from '../../../model/ResPage'

interface CardBinUpload extends ElUpload {
  submit: () => void
}

@Component({
  components: {
    MainComponent,
    CardBinForm
  }
})
export default class CardBinManage extends Vue {
  currentRow: CardBin
  NewDialogFormVisible = false
  UpdateDialogFormVisible = false
  dialogFormParams: CardBin = new CardBin()
  cardBinList: Promise<OptionItem[]> = getCardBinStatus()
  forms: QueryForm[] = [
    {
      prop: 'cardBinName',
      label: '卡类型名称',
      type: 'typeahead',
      remoteUrl: '/stock/getCardBinByName',
      typeaheadProp: {
        value: 'cardBinName',
        label: 'cardBinName',
        query: 'query'
      }
    },
    {
      prop: 'cardBinCode',
      label: '卡bin',
      type: 'typeahead',
      remoteUrl: '/stock/getCardBinById',
      typeaheadProp: {
        value: 'cardBin',
        label: 'cardBin',
        query: 'query'
      }
    },
    {
      prop: 'cardBinStatus',
      label: '卡bin状态',
      type: 'select',
      options: this.cardBinList
    },
    {
      label: '保险公司',
      prop: 'insuranceId',
      type: 'typeahead',
      remoteUrl: '/getInsuranceListByName',
      typeaheadProp: {
        value: 'id',
        label: 'name',
        query: 'query'
      }
    },
    {
      prop: 'beginDate',
      label: '开始时间',
      type: 'date'
    },
    {
      prop: 'endDate',
      label: '结束时间',
      type: 'date'
    }
  ]

  columns: TableColumn[] = [
    {
      prop: 'cardBin',
      label: '卡bin'
    },
    {
      prop: 'cardBinName',
      label: '卡类型名称'
    },
    {
      prop: 'insuranceName',
      label: '保险公司'
    },
    {
      prop: 'status',
      label: '卡bin状态',
      filter: 'cardbinStatusFilter'
    },
    {
      prop: 'templateUrl',
      label: '卡样图片'
    },
    {
      prop: 'createTime',
      label: '创建时间'
    }
  ]

  $refs: {
    pkMain: MainComponent,
    upLoadForm: CardBinUpload
  }

  handleCurrentRowChange (row: CardBin) {
    this.dialogFormParams = row
  }

  newCardBinDialog () {
    this.NewDialogFormVisible = true
  }

  closeNewCardBinDialog () {
    this.NewDialogFormVisible = false
  }

  updateCardBinDialog () {
    this.UpdateDialogFormVisible = true
  }

  closeUpdateCardBinDialog () {
    this.UpdateDialogFormVisible = false
  }

  newCardBin () {
    this.dialogFormParams = new CardBin()
    this.newCardBinDialog()
  }

  updateCardBin () {
    assert(!_.isEmpty(this.dialogFormParams.cardBin), '请先选择一行')
    this.updateCardBinDialog()
  }


  async mounted () {
    await this.$refs.pkMain.query()
  }


  /**
   * 提交修改
   * @returns {Promise<void>}
   */
  async submitUpdate () {
    assert(this.dialogFormParams.status !== 2, '已生成卡片的卡bin不能修改')
    this.dialogFormParams.insuranceId = parseFloat(this.dialogFormParams.insuranceName)
    delete this.dialogFormParams['insuranceName']
    await this.$http.post<number>('/stock/updateStockCardBin', this.dialogFormParams)
    this.closeUpdateCardBinDialog()
    this.$refs.pkMain.query()
  }

  /**
   * 提交插入
   * @returns {Promise<void>}
   */
  async submitInsert () {
    this.dialogFormParams.insuranceId = parseFloat(this.dialogFormParams.insuranceName)
    delete this.dialogFormParams['insuranceName']
    await this.$http.post<number>('/stock/insertStockCardBin', this.dialogFormParams)
    this.closeNewCardBinDialog()
    this.$refs.pkMain.query()
  }

  async submitDelete () {
    assert(!_.isEmpty(this.dialogFormParams.cardBinName), '请先选择一行')
    await this.$confirm('是否删除')
    assert(this.dialogFormParams.status !== 2, '已生成卡片不能删除')
    await this.$http.postParams<ResPage<any>>('/stock/deleteStockCardBin', { id: this.dialogFormParams.id })
    this.$refs.pkMain.query()
  }
}
