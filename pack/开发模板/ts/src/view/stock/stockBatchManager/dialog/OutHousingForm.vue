<template>
  <el-form :model="outHousingForm"
           ref="outHousingForm"
           size="small"
           label-width="130px">
    <el-form-item label="库存类型">
      <el-select :value="outHousingForm.stockType"
                 v-model="outHousingForm.stockType"
                 :disabled="true"
                 placeholder="库存类型">
        <el-option v-for="(stockType, key) in stockType"
                   :label="stockType.displayValue"
                   :value="Number(stockType.value)" :key="key"/>
      </el-select>
    </el-form-item>
    <el-form-item label="批次号" v-if="outHousingForm.stockType==1">
      <el-input v-model="outHousingForm.stockId"
                :disabled="true"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="批次名称">
      <el-input v-model="outHousingForm.stockName"
                :disabled="true"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="保单号" v-if="outHousingForm.stockType==1">
      <el-select
          v-model="card.slipCode"
          filterable
          allow-create
          remote
          placeholder="请输入保单号"
          :disabled="operationType == 'show'"
          :remote-method="getInsuranceSlip"
      >
        <el-option v-if="card.slipCode"
                   :key="card.slipCode"
                   :label="card.slipCode"
                   :value="card.slipCode">
        </el-option>
        <el-option
            v-for="item in slipMains"
            :key="item.slipCode"
            :label="item.slipCode"
            :value="item.slipCode">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="数量">
      <el-input v-model="card.count"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="卡片类型" v-if="outHousingForm.stockType==1">
      <el-select :value="card.type"
                 v-model="card.type"
                 placeholder="卡片类型">
        <el-option v-for="(cardType, key) in cardType"
                   :label="cardType.displayValue"
                   :value="Number(cardType.value)" :key="key"/>
      </el-select>
    </el-form-item>
    <el-form-item label="归属地区" v-if="outHousingForm.stockType==2">
      <el-select v-model="outHousingForm.stockProvince" placeholder="请选择省份" disabled="true">
        <el-option
            v-for="item in Province"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="outHousingForm.stockCity" placeholder="请选择城市" disabled="true">
        <el-option
            v-for="item in City"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-col :span="6">
      <el-form-item label="卡片数量(卡段)" v-if="outHousingForm.stockType==1">
        <el-input v-model="card.cardBegin"
                  style="width: 200px"
                  auto-complete="off"/>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item v-if="outHousingForm.stockType==1">
        <el-input v-model="card.cardEnd"
                  style="width: 200px"
                  auto-complete="off"/>
      </el-form-item>
    </el-col>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import { OptionItem } from '../../../../shared/util/model/OptionItem'
import { default as StockBatch } from '../model/StockBatch'
import { getStockCardType, getStockType } from '../../../../shared/util/service'
import MainComponent from '../../../../components/main'
import StockCard from '../model/StockCard'
import ResPage from '../../../../model/ResPage'

@Component({
  name: 'OutHousingForm'
})
export default class OutHousingForm extends Vue {
  @Prop({
    default: () => new StockBatch()
  })
  outHousingForm: StockBatch
  @Prop({
    default: () => new StockCard()
  })
  card: StockCard
  @Prop({
    default: () => ''
  })
  templateUrl: string
  City: any[] = []
  Province: any[] = []
  slipMains: any[] = []
  stockType: OptionItem[] = []
  cardType: OptionItem[] = []
  loading: boolean = false

  $refs: {
    outHousingForm: MainComponent
  }

  async created () {
    this.stockType = await getStockType()
    this.cardType = await getStockCardType()
    const province = await this.$http.postParams<ResPage<any>>('/getProvinceList')
    const city = await this.$http.postParams<ResPage<any>>('/getCityList')
    this.Province = province.rows
    this.City = city.rows
  }

  async getInsuranceSlip (query: string) {
    if (query !== '') {
      const res = await this.$http.postParams<ResPage<any>>('/insurance/getInsuSlipList', { slipCode: query })
      this.slipMains = res.rows
    } else {
      this.slipMains = []
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
