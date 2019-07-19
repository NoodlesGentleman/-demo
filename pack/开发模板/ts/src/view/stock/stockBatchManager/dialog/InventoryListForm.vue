<template>
  <MainComponent
      url="/stock/getStockCardByBatch"
      :handleQueryParams="handleQueryParams"
      multiSelect="true"
      :forms="forms"
      ref="pkMain"
      :selectable="check"
      type="selection"
      :columns="columns">
    <template slot="dispose">
      <el-button size="small" type="primary" @click="deleteCard">移除</el-button>
    </template>
  </MainComponent>
</template>


<script lang="ts">
import MainComponent from '../../../../components/main'
import { Component, Prop, Vue } from '../../../../ext-nb'
import { default as QueryForm, Params } from '../../../../components/main/model/Form'
import StockCard from '../model/StockCard'
import ResPage from '../../../../model/ResPage'

@Component({
  components: {
    MainComponent
  }
})


export default class InventoryListForm extends Vue {
  currentRow: InventoryListForm
  dialogFormParams: StockCard = new StockCard()
  @Prop({
    default: () => new StockCard()
  })
  stockCardModel: StockCard
  @Prop()
  operationType: string
  params: Params
  $refs: {
    pkMain: MainComponent
  }
  columns = [
    {
      prop: 'cardCode',
      label: '卡号'
    },
    {
      prop: 'status',
      label: '库存状态',
      filter: 'stockCardStatusFilter'
    }
  ]
  forms: QueryForm[] = [
    {
      prop: 'cardCode',
      label: '卡号'
    }
  ]

  handleQueryParams (params: Params) {
    params.stockId = this.stockCardModel.stockId
    return params
  }

  handleCurrentRowChange (row: StockCard) {
    this.dialogFormParams = row
  }

  check (row: StockCard, index: number) {
    let a = row.status
    if (a > 0) {
      return false
    } else {
      return true
    }
  }

  async mounted () {
    await this.$refs.pkMain.query()
  }

  async deleteCard () {
    const query = this.$refs.pkMain.getSelectedRows<StockCard>()
    const json = JSON.stringify(query)
    await this.$http.postParams<ResPage<any>>('/stock/deleteCard', { params: json })
    await this.$refs.pkMain.query()
  }
}
</script>
