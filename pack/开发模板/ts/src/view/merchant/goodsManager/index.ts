/**
 * Created by slipkinem on 3/7/2018 at 10:13 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import MainComponent from '../../../components/main'
import QueryForm from '../../../components/main/model/Form'
import TableColumn from '../../../components/main/model/Table'
import { assert } from '../../../shared/util/logger'
import _ from 'lodash'
import MerchantGoodsList from './dialog/MerchantGoodsList.vue'
import MerchantList from './dialog/MerchantList.vue'
import History from './dialog/HistoryList.vue'
import GoodsVo from './model/GoodsVo'
import GoodsForm from './dialog/GoodsForm.vue'
import { isUndefined } from 'util'
import { multiDownloadFile } from '../../../shared/util/multiDownloadFile'


@Component({
  components: {
    MainComponent,
    GoodsForm,
    MerchantGoodsList,
    MerchantList,
    History
  }
})
export default class BrandManager extends Vue {
  currentRow: GoodsVo
  dialogFormVisible = false
  dialogShowDetail = false
  dialogChangeDetail = false
  dialogFormParams: GoodsVo = new GoodsVo()
  tabActive = 'baseInfo'
  data: string = 'add'
  newName: string = ''
  forms: QueryForm[] = [
    {
      prop: 'name',
      label: '商品库名称'
    }
  ]

  columns: TableColumn[] = [
    {
      prop: 'name',
      label: '商品库名称'
    },
    {
      prop: 'goods',
      label: '商品数量'
    },
    {
      prop: 'merchants',
      label: '关联商户数'
    },
    {
      prop: 'createTime',
      label: '创建时间'
    }
  ]


  $refs: {
    pkMain: MainComponent
    goodList: MerchantGoodsList
    merchantList: MerchantList
  }

  private title: string = '新增'

  openFormDialog () {
    this.dialogFormVisible = true
  }

  closeFormDialog () {
    this.dialogFormVisible = false
  }

  openDialogShowDetail () {
    this.dialogShowDetail = true
  }

  closeDialogShowDetail () {
    this.dialogShowDetail = false
  }


  update () {
    this.dialogFormParams = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
    console.log(this.$refs.pkMain.getSelectedRow())
    this.data = 'update'
    this.title = '修改'
    this.openFormDialog()
  }

  /**
   * 查看
   */

  showDetail () {
    this.dialogFormParams = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
    this.openDialogShowDetail()
  }

  insert () {
    this.title = '新增'
    this.data = 'add'
    this.openFormDialog()
    this.dialogFormParams = Object.create(null)
  }

  download () {
    this.dialogFormParams = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
    let id = this.dialogFormParams.id
    multiDownloadFile('api/merchant/downloadGoods', { id })
  }

  change () {
    this.dialogFormParams = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
    this.dialogChangeDetail = true
  }

  closeChangeDialog () {
    this.dialogChangeDetail = false
  }

  async changeWarehouse () {
    await this.$http.postParams('/merchant/updateWarehouseName', { id: this.dialogFormParams.id, name: this.newName })
    this.$refs.pkMain.query()
    this.dialogChangeDetail = false
  }

  /**
   * 提交修改
   * @returns {Promise<void>}
   */
  async submitUpdate () {
    await this.$http.post<number>('/customer/update', this.dialogFormParams)
    this.closeFormDialog()
  }

  async disableMerchant () {
    let param = { 'brandId': this.dialogFormParams.id }
    await this.$http.postParamsClick('/merchant/dsiableBrand', param)
  }


  /**
   * 处理数据
   * @param {Brand[]} data
   */
  async handleResponseData (data: GoodsVo[]) {
    return data.map((v, k) => {
      if (isUndefined(v.goods)) {
        v.goods = 0
      }
      return v
    })
  }
}
