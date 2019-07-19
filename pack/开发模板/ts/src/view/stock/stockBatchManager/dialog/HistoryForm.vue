<template>
  <div class="contact">
    <MainComponent
        :forms="forms"
        :handleResponseData="handleResponseDataContact"
        url="/stock/getStockHistory"
        :handleQueryParams="handleQueryParamsContact"
        ref="pkMain"
        @handleCurrentRowChange="handleCurrentRowChangeContact"
        :columns="columnaaa">
      <span slot="dispose"/>
    </MainComponent>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import MainComponent from '../../../../components/main'
import HistoryModel from '../model/HistoryModel'
import { default as QueryForm, Params } from '../../../../components/main/model/Form'
import { stockHistoryStatus } from '../../../../shared/util/service'

@Component({
  components: {
    MainComponent
  }
})
export default class HistoryForm extends Vue {
  currentRow: HistoryModel
  dialogFormVisible = false
  dialogFormParams: HistoryModel = new HistoryModel()
  tabActive = 'history'
  columnaaa = [
    {
      prop: 'stockhistoryId',
      label: '批次号'
    },
    {
      prop: 'stockhistotyName',
      label: '批次名称'
    },
    {
      prop: 'stockhistoryStatus',
      label: '操作类型',
      filter: 'stockHistoryStatusFilter'
    },
    {
      prop: 'stockhistoryCount',
      label: '数量'
    },
    {
      prop: 'stockhistoryBegincard',
      label: '卡段号(始)'
    },
    {
      prop: 'stockhistoryEndcard',
      label: '卡段号(终)'
    },
    {
      prop: 'stockhistoryType',
      label: '库存类型',
      filter: 'stockTypeFilter'
    },
    {
      prop: 'stockhistoryTime',
      label: '操作时间'
    }
  ]
  forms: QueryForm[] = [
    {
      prop: 'stockhistoryId',
      label: '批次号'
    },
    {
      prop: 'stockhistotyName',
      label: '批次名称'
    },
    {
      prop: 'stockhistoryStatus',
      label: '操作类型',
      type: 'select',
      options: stockHistoryStatus()
    }
  ]
  $refs: {
    pkMain: MainComponent
  }
  @Prop({
    default: () => new HistoryModel()
  })
  historyForm: HistoryModel
  @Prop({
    default: () => 'edit'
  })
  operationType: string

  async mounted () {
    await this.$refs.pkMain.query()
  }

  handleCurrentRowChangeContact (row: HistoryModel) {
    this.dialogFormParams = row
  }

  handleResponseDataContact (data: HistoryModel[]): HistoryModel[] {
    return data
  }

  handleQueryParamsContact (params: Params) {
    return params
  }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
