<template>
  <div class="">
    <MainComponent
        :forms="forms"
        :columns="columns"
        ref="pkMain"
        :handleQueryParams="doSomething"
        url="/merchant/getGoodsList">
      <span slot="dispose"></span>
    </MainComponent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from '../../../../ext-nb'
import QueryForm, { Params } from '../../../../components/main/model/Form'
import TableColumn from '../../../../components/main/model/Table'
import MainComponent from '../../../../components/main'
import { assert } from '../../../../shared/util/logger'
import _ from 'lodash'
import Goods from '../model/goods'
import { Prop } from 'vue-property-decorator'
import GoodsVo from '../model/GoodsVo'

@Component({
  components: {
    MainComponent
  },
  name: 'MerchantGoodsList'
})
export default class MerchantGoodsList extends Vue {
  dialogFormVisible = false
  dialogShowDetail = false
  dialogFormParams: Goods = new Goods()

  @Prop()
  goodsVo: GoodsVo

  forms: QueryForm[] = [
    {
      prop: 'goodsName',
      label: '商品名',
      type: 'input',
      value: ''
    },
    {
      prop: 'approve',
      label: '批准文字',
      type: 'input',
      value: ''
    },
    {
      prop: 'type',
      label: '商品分类',
      type: 'select',
      options: [{
        value: 1,
        displayValue: 'otc'
      }]
    }
  ]

  columns: TableColumn[] = [
    {
      prop: 'name',
      label: '商品名'
    },
    {
      prop: 'unit',
      label: '商品规格'
    },
    {
      prop: 'vendor',
      label: '生产厂家'
    },
    {
      prop: 'approve',
      label: '批准文字'
    },
    {
      prop: 'otcType',
      label: '商品属性分类'
    },
    {
      prop: 'merchantType',
      label: '商户自主分类'
    },
    {
      prop: 'pkType',
      label: '普康分类'
    }
  ]

  $refs: {
    pkMain: MainComponent
  }

  created () {
    this.$refs.pkMain.query()
  }

  doSomething (params: Params) {
    params.warehouseId = this.goodsVo.id
    return params
  }

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

  handleCurrentRowChange (row: Goods) {
    this.dialogFormParams = row
  }

  update () {
    assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
    this.openFormDialog()
  }

  /**
   * 查看
   */
  showDetail () {
    assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
    this.$refs.pkMain.query()
    this.openDialogShowDetail()
  }

  insert () {
    // assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
    this.openFormDialog()
  }

  disable () {
    assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
    this.disableMerchant()
  }

  /**
   * 提交修改
   * @returns {Promise<void>}
   */
  async submitUpdate () {
    await this.$http.post<number>('/customer/update', this.dialogFormParams)
    this.closeFormDialog()
    this.$refs.pkMain.query()
  }

  async disableMerchant () {
    let param = { 'brandId': this.dialogFormParams.id }
    await this.$http.postParamsClick('/merchant/dsiableBrand', param)
  }
}
</script>
