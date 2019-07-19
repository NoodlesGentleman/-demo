<template>
  <div class="contact">
    <MainComponent
        :forms="forms"
        :handleResponseData="handleResponseDataContact"
        url="/stock/getRecycle"
        :handleQueryParams="handleQueryParamsContact"
        ref="pkMain"
        @handleCurrentRowChange="handleCurrentRowChangeContact"
        :columns="column">
      <template slot="dispose">
        <el-button size="mini" @click.native="deletedCard">删除</el-button>
        <el-button size="mini" @click.native="reduction">还原</el-button>
      </template>
    </MainComponent>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import MainComponent from '../../../../components/main'
import { default as QueryForm, Params } from '../../../../components/main/model/Form'
import StockCard from '../model/StockCard'
import { getStockCardType } from '../../../../shared/util/service'
import * as _ from 'lodash'
import { getCityById, getProvinceById } from '../../../../components/area-cascader/service'
import { assert } from '../../../../shared/util/logger'
import ResPage from '../../../../model/ResPage'

@Component({
  components: {
    MainComponent
  }
})
export default class RecycleForm extends Vue {
  currentRow: StockCard
  dialogFormVisible = false
  dialogFormParams: StockCard = new StockCard()
  tabActive = 'recycle'
  column = [
    {
      prop: 'cardCode',
      label: '卡号'
    },
    {
      prop: 'type',
      label: '卡片类型',
      filter: 'stockCardTypeFilter'
    },
    {
      prop: 'stockId',
      label: '批次号'
    },
    {
      prop: 'stockName',
      label: '批次名称'
    },
    {
      prop: 'place',
      label: '归属地区',
      filter: async (value: string, row: StockCard) => {
        let city = await getCityById(row.city)
        let province = await getProvinceById(row.province)
        return `${province.name}/${city.name}`
      }
    }
  ]
  forms: QueryForm[] = [
    {
      prop: 'cardCode',
      label: '卡号'
    },
    {
      prop: 'type',
      label: '卡片类型',
      type: 'select',
      options: getStockCardType()
    },
    {
      prop: 'stockId',
      label: '批次号'
    },
    {
      prop: 'stockName',
      label: '批次名称'
    },
    {
      prop: 'place',
      label: '省/市',
      type: 'areaCascader'
    }
  ]
  $refs: {
    pkMain: MainComponent
  }
  @Prop({
    default: () => new StockCard()
  })
  recycleForm: StockCard
  @Prop({
    default: () => 'edit'
  })
  operationType: string

  async mounted () {
    await this.$refs.pkMain.query()
  }

  handleCurrentRowChangeContact (row: StockCard) {
    this.dialogFormParams = row
  }

  handleResponseDataContact (data: StockCard[]): StockCard[] {
    return data
  }

  handleQueryParamsContact (params: Params) {
    if (params.place !== undefined) {
      params.province = params.place[0]
      params.city = params.place[1]
    }
    return params
  }

  async reduction () {
    assert(!_.isEmpty(this.dialogFormParams.cardCode), '请先选择一行')
    await this.$http.postParams<ResPage<any>>('/stock/reduction', { params: this.dialogFormParams.cardCode })
    this.$refs.pkMain.query()
  }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
