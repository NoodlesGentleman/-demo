<template>
  <div class="">
    <MainComponent
        :forms="forms"
        :columns="columns"
        ref="pkMain"
        :handleQueryParams="doSomething"
        url="/merchant/getMerchantList">
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
import Merchant from '../model/merchant'
import GoodsVo from '../model/GoodsVo'
import { Prop } from 'vue-property-decorator'

@Component({
  components: {
    MainComponent
  },
  name: 'MerchantList'
})
export default class MerchantList extends Vue {
//    currentRow: GoodsVo
  dialogFormVisible = false
  dialogShowDetail = false
  dialogFormParams: Merchant = new Merchant()

  @Prop()
  goodsVo: GoodsVo

  forms: QueryForm[] = [
    {
      prop: 'brandname',
      label: '品牌名称',
      type: 'select',
      options: [
        {
          value: 2,
          displayValue: ''
        }
      ]
    },
    {
      prop: 'merchantName',
      label: '商户名称'
    }
  ]

  columns: TableColumn[] = [
    {
      prop: 'breadName',
      label: '品牌名称'
    },
    {
      prop: 'name',
      label: '商户名称'
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

  handleCurrentRowChange (row: Merchant) {
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
//      assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
    this.openDialogShowDetail()
  }

  insert () {
    // assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
    this.openFormDialog()
  }

  disable () {
//      assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
//      this.disableMerchant()
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

//    async disableMerchant() {
//      let param = {'brandId': this.dialogFormParams.ida}
//      await this.$http.postParamsClick('/merchant/dsiableBrand', param)
//    }
}
</script>
